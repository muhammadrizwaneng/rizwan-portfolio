import headingMetrics from "./heading-metrics.json";
import { addCounterModel, type CounterModel } from "./counter-model";
import { createKeyWell } from "./key-well";
import { Euler, Matrix4, Quaternion, Vector3 } from "three";
import {
  createDocument, createMaterial, newId,
  type ChibiDocument, type ChibiMaterial, type ChibiNode, type Vec3,
} from "@chibi3d/runtime/schema";

export type KeyboardSkill = {
  name: string;
  label: string;
  shortDescription: string;
  color: string;
  keyboardColor?: string;
  icon: string;
  shortcut?: string;
};

export type KeyboardKey = {
  skill: KeyboardSkill;
  nodeId: string;
  motionId: string;
  materialId: string;
  pressedStateId: string;
  labelId: string;
  /** The cap's resting slot in keyboard-layout space. */
  slot: Vec3;
  /** Where this cap sits in the hero avatar, relative to its own slot. */
  formation: { position: Vec3; quaternion: [number, number, number, number] };
};

export type KeyboardScene = {
  document: ChibiDocument;
  keys: KeyboardKey[];
  boardId: string;
  /** Case, rim and plate: shrinks away while the keys leave the board. */
  caseId: string;
  spinId: string;
  revealId: string;
  catId: string;
  frameIds: [string, string];
  labelsId: string;
  defaultLabelId: string;
  pointerTargets: string[];
  counter: CounterModel;
  counterId: string;
  columns: number;
  /** Placement of the keyboard layout group inside the board, to map board space to slot space. */
  layout: { offset: Vec3; scale: number };
};

// Geometry contract of assets/keyboard/keycaps.glb, in key-width units.
const KIT = {
  pitch: 1.04468, keyY: 1.21117, keyHeight: 0.7629, logoY: 0.13985,
  keyTop: 0.13102987408638,
  cutX: 3.189, cutZ: 2.053, halfW: 3.67448, halfD: 2.57744,
};

export const KEYBOARD_MODEL_URL = "/assets/keyboard/keycaps.glb";

export function createKeyboardScene(skills: readonly KeyboardSkill[], columns = 6): KeyboardScene {
  if (!skills.length || skills.length > 96) throw new RangeError("Choose between 1 and 96 keyboard skills");
  if (!Number.isInteger(columns) || columns < 1 || columns > 12) throw new RangeError("Keyboard columns must be between 1 and 12");
  if (new Set(skills.map((s) => s.name)).size !== skills.length) throw new Error("Keyboard skill names must be unique");
  const cols = Math.min(columns, skills.length);
  const rows = Math.ceil(skills.length / cols);
  const doc = createDocument("Portfolio skills");
  doc.root = [];
  doc.nodes = {};
  doc.materials = {};
  doc.environment = {
    ...doc.environment, preset: "product", shadows: true, softShadows: true,
    exposure: 0.84, toneMapping: "linear", ao: false, bloom: false,
  };
  doc.camera = { position: [-9, 9.6, 9], target: [0, 0.6, 0], fov: 36, parallax: 0 };
  doc.editor.grid = false;
  const assetId = newId("as");
  doc.assets[assetId] = { id: assetId, kind: "glb", name: "keycaps.glb", hash: "0101f5f6f7ac426e0cca9bdbc1c96a752b06b03d9d24d3553209a44b028f3b8e", size: 204284 };

  const add = (node: ChibiNode, parent?: string) => {
    doc.nodes[node.id] = node;
    (parent ? doc.nodes[parent].children : doc.root).push(node.id);
    return node.id;
  };
  const transform = (position: Vec3 = [0, 0, 0], scale: Vec3 = [1, 1, 1]) => ({ position, rotation: [0, 0, 0] as Vec3, scale });
  const group = (name: string, parent?: string, position?: Vec3, scale?: Vec3) => add({
    id: newId("nd"), name, type: "group", visible: true, transform: transform(position, scale), children: [],
  }, parent);
  const material = (name: string, patch: Partial<ChibiMaterial>) => {
    const id = newId("mt"); doc.materials[id] = { ...createMaterial(id, name), ...patch }; return id;
  };
  const model = (name: string, path: string, materialId: string, parent: string, position?: Vec3, scale?: Vec3) => add({
    id: newId("nd"), name, type: "model", assetId, path, materialId,
    visible: true, castShadow: true, receiveShadow: true, children: [], transform: transform(position, scale),
  }, parent);
  for (const [name, position, intensity, castShadow] of [
    ["Key light", [-6, 8, -3], 2.8, true], ["Fill", [4, 6, 6], 0.12, false],
  ] as const) add({ id: newId("nd"), name, type: "light", visible: true, children: [],
    transform: transform([...position]), light: { kind: "directional", color: "#ffffff", intensity, castShadow } });

  const boardId = group("Keyboard placement");
  doc.nodes[boardId].visible = false;
  const revealId = group("Keyboard reveal", boardId);
  const spinId = group("Keyboard rotation", revealId);
  const innerX = KIT.cutX + (cols - 6) * KIT.pitch / 2;
  const innerZ = KIT.cutZ + (rows - 4) * KIT.pitch / 2;
  const span = innerX + innerZ + KIT.halfW - KIT.cutX + KIT.halfD - KIT.cutZ;
  const fit = Math.min(1.2, (KIT.halfW + KIT.halfD) / span);
  // Resting case + keycaps span y=0 through keyY + keyTop. Text and cat are excluded.
  const keyboardCenterY = (KIT.keyY + KIT.keyTop) / 2;
  const layout = group("Keyboard layout", spinId, [0, -keyboardCenterY * fit, 0], [fit, fit, fit]);
  const caseMaterial = material("Case", { color: "#171819", roughness: 0.64 });
  const counterId = group("Left side counter", layout);
  doc.nodes[counterId].visible = false;
  const outerX = innerX + KIT.halfW - KIT.cutX;
  const outerZ = innerZ + KIT.halfD - KIT.cutZ;
  const counter = addCounterModel(doc, counterId, [-outerX - 0.003, 0.36, -0.3]);
  const well = createKeyWell(outerX, outerZ, (cols - 1) * KIT.pitch + 1, (rows - 1) * KIT.pitch + 1);
  const plateMaterial = material("Recessed switch plate", { color: "#101213", roughness: 0.82 });
  const caseId = group("Case", layout);
  for (const [name, geometry, materialId, x] of [
    ["Case left edge", well.edge, caseMaterial, 0],
    ["Case top rim", well.shelf, caseMaterial, well.shelfCenter],
    ["Case body", well.body, caseMaterial, 0],
    ["Recessed switch plate", well.plate, plateMaterial, 0],
  ] as const) {
    const position: Vec3 = [x, 0, 0];
    const scale: Vec3 = [1, 1, 1];
    add({
      id: newId("nd"), name, type: "mesh", geometry, materialId,
      visible: true, castShadow: true, receiveShadow: true, children: [], transform: transform(position, scale),
    }, caseId);
  }
  const labelsId = group("Skill labels", layout, [-outerX + KIT.pitch / 2, 1.15, -outerZ - 0.7]);
  doc.nodes[labelsId].visible = false;
  const textMaterial = material("Skill text", { color: "#ffffff", roughness: 0.8 });
  const label = (title: string, description: string) => {
    const id = group(`Label ${title}`, labelsId);
    doc.nodes[id].visible = false;
    const bounds = headingBounds(title);
    const size = Math.min(0.64, 4.8 / Math.max(bounds.width, 1));
    add({ id: newId("nd"), name: `Heading ${title}`, type: "mesh", materialId: textMaterial,
      geometry: { kind: "text3d", params: { text: title, size, depth: 0.1, bevel: 0.005 } },
      transform: { ...transform([-bounds.left * size, 0, -0.65]), rotation: [-Math.PI / 2, 0, 0] },
      visible: true, castShadow: true, receiveShadow: true, children: [] }, id);
    const descriptionId = newId("as");
    doc.assets[descriptionId] = { id: descriptionId, kind: "texture", name: descriptionArtwork(description),
      hash: `description-${id}`, size: 0 };
    const descriptionMaterial = material(`Description ${title}`, { color: "#ffffff", roughness: 1,
      transparent: true, maps: { map: descriptionId, normalMap: null, roughnessMap: null } });
    add({ id: newId("nd"), name: `Description ${title}`, type: "mesh", materialId: descriptionMaterial,
      geometry: { kind: "plane", params: { width: 4.8, height: 1.4 } },
      transform: { ...transform([2.4, 0, 0.15]), rotation: [-Math.PI / 2, 0, 0] },
      visible: true, castShadow: false, receiveShadow: false, children: [] }, id);
    return id;
  };
  const defaultLabelId = label("Explore my skills", "Hover, tap, or press a key");
  doc.nodes[defaultLabelId].visible = true;
  const keys = skills.map((skill, index): KeyboardKey => {
    // separate groups let placement, motion, and presses compose
    const slotPosition: Vec3 = [
      (index % cols - (cols - 1) / 2) * KIT.pitch, KIT.keyY,
      (Math.floor(index / cols) - (rows - 1) / 2) * KIT.pitch,
    ];
    const slot = group(`Slot ${skill.name}`, layout, slotPosition);
    const motionId = group(`Motion ${skill.name}`, slot);
    const capColor = skill.keyboardColor ?? skill.color;
    const color = /^#[0-9a-f]{3}$/i.test(capColor)
      ? `#${capColor.slice(1).split("").map((c) => c + c).join("")}` : capColor;
    const materialId = material(`Key ${skill.name}`, { color, roughness: 0.34, clearcoat: 0.12, clearcoatRoughness: 0.38 });
    const nodeId = model(skill.name, "0", materialId, motionId);
    if (skill.icon) {
      const iconId = newId("as");
      doc.assets[iconId] = { id: iconId, kind: "texture", name: skill.icon, hash: `icon-${skill.name}`, size: 0 };
      const logoMaterial = material(`Logo ${skill.name}`, {
        color: "#ffffff", roughness: 0.6, transparent: true,
        maps: { map: iconId, normalMap: null, roughnessMap: null },
      });
      add({ id: newId("nd"), name: `Logo ${skill.name}`, type: "mesh", materialId: logoMaterial,
        geometry: { kind: "plane", params: { width: 0.52, height: 0.52 } },
        transform: { ...transform([0, KIT.logoY, 0]), rotation: [-Math.PI / 2, 0, 0] },
        visible: true, castShadow: false, receiveShadow: true, children: [] }, nodeId);
    }
    const pressedStateId = newId("st");
    doc.states[pressedStateId] = { id: pressedStateId, nodeId, name: "Pressed", overrides: {
      [nodeId]: { "transform.position": [0, -KIT.keyHeight * 0.6, 0] },
    } };
    return { skill, nodeId, motionId, materialId, pressedStateId, labelId: label(skill.label, skill.shortDescription),
      slot: slotPosition, formation: formationTarget(index, skills.length, slotPosition) };
  });

  // Unlit image planes preserve the original artwork under any scene lighting.
  // Original Spline frame center/rotation, converted from 296.7413-unit caps.
  const catId = group("Bongo cat", layout, [-0.277, 2.356, outerZ - 0.631]);
  doc.nodes[catId].transform.rotation = [-141.199253, -1.535221, -167.469916].map((angle) => angle * Math.PI / 180) as Vec3;
  doc.nodes[catId].visible = false;
  const catAssetId = newId("as");
  doc.assets[catAssetId] = { id: catAssetId, kind: "glb", name: "/assets/keyboard/bongo-frames.glb",
    hash: "2a16506ae6e6b571fc02a73e6822345a73e15de05a5a13b86a391fafd94fa908", size: 28292 };
  const frameIds = [0, 1].map((frame) => add({
    id: newId("nd"), name: `Bongo frame ${frame + 1}`, type: "model", assetId: catAssetId, path: String(frame),
    transform: transform([0, -5.336 * 289 / 457 / 2, 0], [5.336, 5.336 * 289 / 457, 1]),
    visible: frame === 0, castShadow: false, receiveShadow: false, children: [],
  }, catId)) as [string, string];
  return { document: doc, keys, boardId, caseId, spinId, revealId, catId, frameIds, labelsId, defaultLabelId, counter, counterId, columns: cols,
    pointerTargets: keys.map((k) => k.nodeId), layout: { offset: [0, -keyboardCenterY * fit, 0], scale: fit } };
}

// Hero formation: a little voxel "AI avatar" built from the keycaps, in key-width units.
// [x, y, z] grid cells (y up, figure faces +z): head, torso, arms, legs = 24 cells.
const AVATAR: Vec3[] = [
  // head (2x2) and a visor row
  [-0.5, 5.6, 0], [0.5, 5.6, 0], [-0.5, 4.6, 0.15], [0.5, 4.6, 0.15],
  // torso: shoulders, chest, waist
  [-1, 3.4, 0], [0, 3.4, 0.1], [1, 3.4, 0],
  [-1, 2.4, 0], [0, 2.4, 0.1], [1, 2.4, 0],
  [-0.5, 1.4, 0], [0.5, 1.4, 0],
  // arms, angled slightly out
  [-2.1, 3.2, 0], [-2.35, 2.2, 0.1], [-2.55, 1.2, 0.2],
  [2.1, 3.2, 0], [2.35, 2.2, 0.1], [2.55, 1.2, 0.2],
  // legs
  [-0.55, 0.3, 0], [-0.6, -0.7, 0], [-0.65, -1.7, 0.15],
  [0.55, 0.3, 0], [0.6, -0.7, 0], [0.65, -1.7, 0.15],
];
const AVATAR_SPACING = 0.95;
const AVATAR_MID_Y = (5.6 + -1.7) / 2;
const AVATAR_CENTER = new Vector3(0, KIT.keyY + 0.6, 0);
const UP = new Vector3(0, 1, 0);
// cap +Y (the legend) turned to the figure's front (+Z)
const FACING = new Quaternion().setFromUnitVectors(UP, new Vector3(0, 0, 1));
const AVATAR_ROLL = -0.3;
const CAMERA_EYE = new Vector3(-9, 9.6, 9);
const CAMERA_TARGET = new Vector3(0, 0.6, 0);
// desktop board tilt applied by motion.ts's sectionRotation in the hero pose
const BOARD_TILT = new Quaternion()
  .setFromEuler(new Euler(0.119863065, 0.007200782, 0.119863065))
  .multiply(new Quaternion().setFromEuler(new Euler(0, -Math.PI / 12, 0)));
/** Figure axes in layout space: stands upright facing the camera, undoing the board tilt. */
const AVATAR_BASIS = (() => {
  const view = CAMERA_TARGET.clone().sub(CAMERA_EYE).normalize();
  const right = new Vector3().crossVectors(view, UP).normalize();
  const up = new Vector3().crossVectors(right, view).normalize();
  const front = view.clone().negate();
  const untilt = BOARD_TILT.clone().invert();
  const m = new Matrix4().makeBasis(right.applyQuaternion(untilt), up.applyQuaternion(untilt), front.applyQuaternion(untilt));
  // the camera's perspective leans the figure left on screen; roll it upright
  const roll = new Quaternion().setFromAxisAngle(new Vector3(0, 0, 1), AVATAR_ROLL);
  return new Quaternion().setFromRotationMatrix(m).multiply(roll);
})();
const AVATAR_CAP = AVATAR_BASIS.clone().multiply(FACING);

/**
 * Cap position in the hero avatar, expressed relative to the cap's keyboard slot so
 * the motion group can blend between the two layouts. Extra caps (more than 24
 * skills) stack behind the torso.
 */
function formationTarget(index: number, _count: number, slot: Vec3): KeyboardKey["formation"] {
  const cell = AVATAR[index] ?? [0, 2.4, -1 - (index - AVATAR.length) * 0.9];
  const point = new Vector3(cell[0], cell[1] - AVATAR_MID_Y, cell[2])
    .multiplyScalar(AVATAR_SPACING)
    .applyQuaternion(AVATAR_BASIS)
    .add(AVATAR_CENTER);
  const q = AVATAR_CAP;
  return {
    position: [point.x - slot[0], point.y - slot[1], point.z - slot[2]],
    quaternion: [q.x, q.y, q.z, q.w],
  };
}

export const resolveKeyboardAsset = async (asset: ChibiDocument["assets"][string]): Promise<string> =>
  asset.name === "keycaps.glb" ? KEYBOARD_MODEL_URL : asset.name;

/** Rasterized by the texture loader, then rendered on a scene mesh. */
function descriptionArtwork(text: string): string {
  const lines: string[] = [];
  const caption = text.replace(/\p{Extended_Pictographic}|[\uFE0F\u200D]/gu, "").trim();
  for (const word of caption.split(/\s+/)) {
    if (!lines.length || lines[lines.length - 1].length + word.length > 28) lines.push(word);
    else lines[lines.length - 1] += ` ${word}`;
  }
  const escape = (line: string) => line.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const size = Math.min(68, 250 / Math.max(lines.length, 1));
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="300" viewBox="0 0 1024 300"><g fill="white" font-family="Arial, sans-serif" font-size="${size}" text-anchor="start">${lines.map((line, index) => `<text x="0" y="${78 + index * size * 1.2}">${escape(line)}</text>`).join("")}</g></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

function headingBounds(text: string): { width: number; left: number } {
  const metrics: Record<string, number[]> = headingMetrics;
  let advance = 0;
  let left = Infinity;
  let right = -Infinity;
  for (const character of text) {
    const [width, min, max] = metrics[character] ?? metrics["?"];
    left = Math.min(left, advance + min);
    right = Math.max(right, advance + max);
    advance += width;
  }
  return text ? { width: right - left, left } : { width: 0, left: 0 };
}
