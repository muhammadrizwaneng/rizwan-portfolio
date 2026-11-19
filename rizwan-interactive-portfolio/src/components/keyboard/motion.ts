import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Euler, Quaternion, Vector3 } from "three";
import type { ChibiSceneApi, Vec3 } from "@chibi3d/runtime";
import type { KeyboardScene } from "./scene";

export type KeyboardSection = "hero" | "skills" | "projects" | "contact";
const SCROLL_SECTIONS = [
  { id: "skills", previous: "hero", threshold: 0.5 },
  { id: "projects", previous: "skills", threshold: 0.7 },
  { id: "contact", previous: "projects", threshold: 0.85 },
] as const;

type Vector = { x: number; y: number; z: number };
const vector = (v: Vec3): Vector => ({ x: v[0], y: v[1], z: v[2] });
const array = (v: Vector): Vec3 => [v.x, v.y, v.z];
const IDENTITY = new Quaternion();
const TAU = Math.PI * 2;
// hero only: the caps leave the board and assemble into a slowly turning voxel avatar
const FORMATION_SECTION: KeyboardSection = "hero";
// caps scatter from when the skills constellation (else Experience) top passes 70% of the viewport until
// Projects' bottom reaches 85% of it: the moment Contact starts entering, which is also
// where the Contact trigger fires, so the caps reassemble straight into the contact keyboard
const AWAY_START = 0.7;
const AWAY_END = 0.85;
// scattered caps: a little smaller, and bobbing this far (key-width units)
const SCATTER_SCALE = 0.55;
const FORMATION_SCALE = 0.7;
// scatter grid across the whole viewport
const SCATTER_COLS = 6;
const SCATTER_BOB = 0.18;
const AVATAR_BREATH = 0.12;
// how far (radians) the avatar turns each way
const AVATAR_TURN = 0.6;
const WORLD_UP = new Vector3(0, 1, 0);
// stable per-key pseudo-random in [0, 1): same scatter layout on every visit
const rand = (index: number, salt: number) => {
  const x = Math.sin(index * 127.1 + salt * 311.7) * 43758.5453;
  return x - Math.floor(x);
};

// Animate the original Euler components before converting camera coordinates.
// Equivalent end rotations do not produce equivalent GSAP transition paths.
function sectionRotation(rotation: Vector, mobile: boolean): Vec3 {
  const skills = new Quaternion().setFromEuler(new Euler(0.119863065, 0.007200782, 0.119863065));
  const reference = new Quaternion().setFromEuler(new Euler(0, mobile ? -Math.PI / 6 : -Math.PI / 12, 0));
  const legacy = new Quaternion().setFromEuler(new Euler(rotation.x, rotation.y, rotation.z));
  const euler = new Euler().setFromQuaternion(skills.multiply(reference).multiply(legacy));
  return [euler.x, euler.y, euler.z];
}

/** GSAP animates host values; Chibi applies them through its public API. */
export function createKeyboardMotion(
  api: ChibiSceneApi,
  scene: KeyboardScene,
  onSection: (section: KeyboardSection) => void,
  onActivity?: () => void,
) {
  gsap.registerPlugin(ScrollTrigger);
  const setTransform: ChibiSceneApi["setNodeTransform"] = (id, patch) => {
    onActivity?.();
    return api.setNodeTransform(id, patch);
  };
  let section: KeyboardSection = "hero";
  let disposed = false;
  let revealed = false;
  const position = vector([0, 0, 0]);
  const scale = vector([0.001, 0.001, 0.001]);
  const rotation = vector([0, 0, 0]);
  const revealScale = { value: 0.001 };
  const keyOffsets = scene.keys.map(() => ({ y: 0 }));
  const keyRevealOffsets = scene.keys.map(() => ({ y: 0 }));
  // 0 = cap in its keyboard slot, 1 = cap on the formation
  const keyFormation = scene.keys.map(() => ({ t: 0 }));
  const formationQuaternions = scene.keys.map((key) => new Quaternion(...key.formation.quaternion));
  // Experience + Certificates: caps leave the board and drift in the page gutters.
  // 0 = in place (keyboard or formation), 1 = scattered
  const keyAway = scene.keys.map(() => ({ t: 0 }));
  const scatterPositions: Vec3[] = scene.keys.map(() => [0, 0, 0]);
  const scatterQuaternions = scene.keys.map((_, i) => new Quaternion().setFromEuler(
    new Euler((rand(i, 1) - 0.5) * 1.4, rand(i, 2) * TAU, (rand(i, 3) - 0.5) * 1.4)));
  const drift = { t: 0 };
  const blendQuaternion = new Quaternion();
  const tumble = new Quaternion();
  const tumbleEuler = new Euler();
  const spare = new Quaternion();
  let driftTween: gsap.core.Tween | null = null;
  // the float clock runs only while caps are off the board (hero cloud or scatter)
  const updateDrift = () => {
    const wanted = isAway || section === FORMATION_SECTION;
    if (wanted && !driftTween) {
      driftTween = gsap.fromTo(drift, { t: 0 }, { t: TAU, duration: 14, repeat: -1, ease: "none",
        onUpdate: () => { scene.keys.forEach((_, index) => applyKey(index)); } });
      driftTween.paused(document.hidden);
    } else if (!wanted && driftTween) {
      // let the caps settle with their float at rest
      driftTween.kill(); driftTween = null;
      gsap.to(drift, { t: 0, duration: 0.6, onUpdate: () => { scene.keys.forEach((_, index) => applyKey(index)); } });
    }
  };
  const blendEuler = new Euler();
  const caseFormation = { t: 0 };
  const caseAway = { t: 0 };
  const applyKey = (index: number) => {
    const g = keyFormation[index].t;
    const a = keyAway[index].t;
    const [gx, gy, gz] = scene.keys[index].formation.position;
    const [sx, sy, sz] = scatterPositions[index];
    const lift = keyOffsets[index].y + keyRevealOffsets[index].y;
    // off the board (cloud or scatter) each cap floats and tumbles on its own rhythm;
    // only whole-number multiples of drift.t so the looping clock never jumps
    // scattered caps tumble freely; in the avatar they only "breathe" together
    const free = a;
    const t = drift.t;
    const bob = free * Math.sin(t * 2 + rand(index, 7) * TAU) * SCATTER_BOB
      + g * (1 - a) * Math.sin(t * 2) * AVATAR_BREATH;
    tumbleEuler.set(
      Math.sin(t + rand(index, 10) * TAU) * 0.35,
      (rand(index, 11) < 0.5 ? -1 : 1) * t + rand(index, 12) * TAU,
      Math.sin(t * 2 + rand(index, 13) * TAU) * 0.2,
    );
    tumble.setFromEuler(tumbleEuler);
    blendQuaternion.slerpQuaternions(IDENTITY, formationQuaternions[index], g).slerp(scatterQuaternions[index], a)
      .multiply(spare.slerpQuaternions(IDENTITY, tumble, free));
    blendEuler.setFromQuaternion(blendQuaternion);
    // smaller caps off the board keep the cloud airy
    const size = (1 - g * (1 - FORMATION_SCALE)) * (1 - a * (1 - SCATTER_SCALE));
    setTransform(scene.keys[index].motionId, {
      position: [
        gx * g + (sx - gx * g) * a,
        gy * g + (sy - gy * g) * a + lift + bob,
        gz * g + (sz - gz * g) * a,
      ],
      rotation: [blendEuler.x, blendEuler.y, blendEuler.z],
      scale: [size, size, size],
    });
  };
  const applyCase = () => {
    const t = Math.max(caseFormation.t, caseAway.t);
    const size = Math.max(0.001, 1 - t);
    api.setNodeVisible(scene.caseId, t < 0.999);
    setTransform(scene.caseId, { scale: [size, size, size] });
  };
  const formationTweens: gsap.core.Tween[] = [];
  const awayTweens: gsap.core.Tween[] = [];
  let isAway = false;
  /**
   * Scatter targets: a jittered grid over the whole viewport, sitting behind the
   * page content. Built in camera space, then mapped back into
   * slot space through the skills pose (that pose's tilt is a few degrees; ignored).
   */
  const computeScatter = () => {
    const camera = scene.document.camera;
    const eye = new Vector3(...camera.position);
    const target = new Vector3(...camera.target);
    const forward = target.clone().sub(eye);
    const distance = forward.length();
    forward.normalize();
    const right = new Vector3().crossVectors(forward, WORLD_UP).normalize();
    const up = new Vector3().crossVectors(right, forward).normalize();
    const height = 2 * distance * Math.tan((camera.fov * Math.PI) / 360);
    const width = height * (window.innerWidth / window.innerHeight);
    const board = pose("skills");
    const [ox, oy, oz] = scene.layout.offset;
    const cols = Math.min(SCATTER_COLS, Math.max(3, Math.round(SCATTER_COLS * width / height / 1.8)));
    const rows = Math.ceil(scene.keys.length / cols);
    // shuffle cells so neighbouring keys (similar colours) don't cluster
    const cells = scene.keys.map((_, i) => i).sort((a, b) => rand(a, 9) - rand(b, 9));
    scene.keys.forEach((key, i) => {
      const cell = cells[i];
      const column = cell % cols;
      const row = Math.floor(cell / cols);
      // jittered grid over the whole background
      const fx = ((column + 0.5) / cols - 0.5) * 0.9 + (rand(i, 4) - 0.5) * (0.5 / cols);
      const fy = ((row + 0.5) / rows - 0.5) * 0.84 + (rand(i, 5) - 0.5) * (0.4 / rows);
      const world = target.clone()
        .addScaledVector(right, fx * width)
        .addScaledVector(up, -fy * height)
        .addScaledVector(forward, (rand(i, 6) - 0.5) * 3);
      const toSlot = (w: number, b: number, s: number, o: number, slot: number) =>
        ((w - b) / s - o) / scene.layout.scale - slot;
      scatterPositions[i] = [
        toSlot(world.x, board.position.x, board.scale.x, ox, key.slot[0]),
        toSlot(world.y, board.position.y, board.scale.y, oy, key.slot[1]),
        toSlot(world.z, board.position.z, board.scale.z, oz, key.slot[2]),
      ];
    });
  };
  const inCardSections = () => {
    const start = (document.getElementById("constellation") ?? document.getElementById("experience"))?.getBoundingClientRect();
    const end = document.getElementById("projects")?.getBoundingClientRect();
    return Boolean(start && end && start.top <= window.innerHeight * AWAY_START && end.bottom >= window.innerHeight * AWAY_END);
  };
  const setAway = (scattered: boolean, immediate = false) => {
    isAway = scattered;
    kill(awayTweens);
    computeScatter();
    // re-apply the section so the board settles into (or out of) the held skills pose
    applySection(section, immediate);
    const t = scattered ? 1 : 0;
    scene.keys.forEach((_, index) => {
      awayTweens.push(gsap.to(keyAway[index], { t, duration: immediate ? 0 : 1.2,
        delay: immediate ? 0 : rand(index, 8) * 0.35, ease: "power3.inOut", overwrite: true,
        onUpdate: () => { applyKey(index); } }));
    });
    awayTweens.push(gsap.to(caseAway, { t, duration: immediate ? 0 : 0.7,
      delay: immediate || !scattered ? 0 : 0.15, ease: "power2.inOut", overwrite: true, onUpdate: applyCase }));
    updateDrift();
    if (immediate) { scene.keys.forEach((_, index) => applyKey(index)); applyCase(); }
  };
  const catFrame = { value: 0 };
  const sectionTweens: gsap.core.Tween[] = [];
  const loops: gsap.core.Tween[] = [];
  const revealTweens: gsap.core.Tween[] = [];
  const pending: gsap.core.Tween[] = [];
  const keyTweens: gsap.core.Tween[] = [];
  let counterWanted = false;
  let counterEnabled = false;
  const showCounter = (visible: boolean) => {
    counterWanted = visible;
    api.setNodeVisible(scene.counterId, visible && counterEnabled);
    onActivity?.();
  };
  const inSkills = () => {
    const bounds = document.getElementById("skills")?.getBoundingClientRect();
    return Boolean(bounds && bounds.top <= window.innerHeight * 0.5 && bounds.bottom > window.innerHeight * 0.2);
  };
  const applyPose = () => {
    setTransform(scene.boardId, {
      position: array(position),
      scale: array(scale),
      rotation: sectionRotation(rotation, window.innerWidth < 768),
    });
  };
  const pose = (current: KeyboardSection = section) => {
    const mobile = window.innerWidth < 768;
    const fit = Math.min(1, window.innerWidth / window.innerHeight * 1.05);
    const [centerX, centerY, centerZ] = scene.document.camera.target;
    // On narrower desktop screens (tablet / small laptop) the hero copy needs more room,
    // so shrink the board and nudge it right as the aspect ratio narrows.
    const heroSqueeze = !mobile && current === "hero" ? Math.max(0, Math.min(1, (1.85 - window.innerWidth / window.innerHeight) / 0.9)) : 0;
    // the helix is narrower than the flat board, so it can sit a little larger
    const size = fit * (current === "hero" ? 0.85 - 0.25 * heroSqueeze : current === "contact" ? 0.75 : current === "skills" ? (mobile ? 0.88 : 1.05) : 0.95);
    const right = !mobile && current === "hero" ? 2.5 + 0.2 * heroSqueeze : !mobile && current === "contact" ? 3.8 : 0;
    const up = mobile && current === "hero" ? -2.4 : current === "contact" ? -0.8 : 0;
    return {
      // The placement origin is the keyboard's geometry center, independent of its labels.
      position: {
        x: centerX + right / Math.sqrt(2) + up / Math.sqrt(6),
        y: centerY + up * Math.sqrt(2 / 3),
        z: centerZ + right / Math.sqrt(2) - up / Math.sqrt(6),
      },
      rotation: current === "projects" || (mobile && current === "contact")
        ? { x: Math.PI, y: Math.PI / 3, z: Math.PI }
        : { x: 0, y: current === "skills" ? (mobile ? Math.PI / 6 : Math.PI / 12) : 0, z: 0 },
      scale: { x: size, y: size, z: size },
    };
  };
  const kill = (tweens: gsap.core.Tween[]) => {
    tweens.splice(0).forEach((tween) => tween.kill());
  };
  const applySection = (next: KeyboardSection, immediate = false) => {
    if (disposed) return;
    section = next;
    onSection(next);
    // while the caps are scattered the board holds its skills pose (the scatter is
    // mapped through it) and section extras like the bongo cat wait
    const look: KeyboardSection = isAway ? "skills" : next;
    kill(sectionTweens);
    kill(loops);
    kill(pending);
    // unwrap the endless formation spin so leaving the hero never rewinds whole turns
    rotation.y = ((rotation.y % TAU) + TAU + Math.PI) % TAU - Math.PI;
    morphFormation(look === FORMATION_SECTION, immediate);
    const target = pose(look);
    for (const [value, destination] of [[position, target.position], [rotation, target.rotation], [scale, target.scale]] as const) {
      sectionTweens.push(gsap.to(value, { ...destination, duration: immediate ? 0 : 1, ease: "power1.out", overwrite: true, onUpdate: applyPose }));
    }
    api.setNodeVisible(scene.labelsId, next === "skills" && !isAway);
    showCounter(next === "skills" && !isAway && inSkills());
    if (look === FORMATION_SECTION) {
      // the avatar turns left and right to look around; eases in from the live rotation
      loops.push(gsap.to(rotation, { y: AVATAR_TURN, duration: 3, ease: "sine.inOut", onUpdate: applyPose,
        onComplete: () => {
          loops.push(gsap.to(rotation, { y: -AVATAR_TURN, duration: 6, repeat: -1, yoyo: true,
            ease: "sine.inOut", onUpdate: applyPose }));
        },
      }));
    }
    updateDrift();
    // Legacy manageAnimations waits for the cat, then another 600ms for keys.
    const catDelay = look === "projects" ? 0.3 : 0.2;
    pending.push(gsap.delayedCall(catDelay, () => {
      if (disposed || section !== next) return;
      api.setNodeVisible(scene.catId, look === "projects");
      catFrame.value = 0;
      let displayedFrame = -1;
      const showFrame = () => {
        const frame = Math.floor(catFrame.value) % 2;
        if (frame === displayedFrame) return;
        displayedFrame = frame;
        scene.frameIds.forEach((id, index) => api.setNodeVisible(id, look === "projects" && index === frame));
      };
      showFrame();
      if (look === "projects") loops.push(gsap.to(catFrame, {
        value: 2, duration: 0.2, repeat: -1, ease: "none", onUpdate: showFrame,
      }));
    }));
    pending.push(gsap.delayedCall(catDelay + 0.6, () => {
      if (disposed || section !== next) return;
      kill(keyTweens);
      if (look === "contact") {
        // The normalized mesh is already upright; retain only the teardown yaw.
        sectionTweens[1]?.kill();
        loops.push(gsap.fromTo(rotation, { x: 0, y: 0, z: 0 }, {
          y: -Math.PI / 2, duration: 5, repeat: -1, yoyo: true,
          yoyoEase: true, ease: "power1.out", onUpdate: applyPose,
        }));
      }
      const keys = scene.keys.map((key, index) => ({ key, index, offset: keyOffsets[index] }));
      if (look === "contact") keys.sort(() => Math.random() - 0.5);
      keys.forEach(({ index: keyIndex, offset }, index) => {
        // Spline animates the skill group by 200–400 units; one cap is 296.7413.
        keyTweens.push(gsap.to(offset, look === "contact" ? {
          y: (200 + Math.random() * 200) / 296.741333,
          duration: 2 + Math.random() * 2, delay: index * 0.6,
          repeat: -1, yoyo: true, yoyoEase: "none", ease: "elastic.out(1,0.3)",
          onUpdate: () => { applyKey(keyIndex); },
        } : {
          y: 0, duration: 4, ease: "elastic.out(1,0.7)",
          onUpdate: () => { applyKey(keyIndex); },
        }));
      });
      onVisibility();
    }));
    onVisibility();
  };
  function morphFormation(toFormation: boolean, immediate: boolean) {
    kill(formationTweens);
    const t = toFormation ? 1 : 0;
    // ripple: caps peel off one after another instead of moving as a block
    scene.keys.forEach((_, index) => {
      formationTweens.push(gsap.to(keyFormation[index], { t, duration: immediate ? 0 : 1.1,
        delay: immediate ? 0 : index * 0.03, ease: "power3.inOut", overwrite: true,
        onUpdate: () => { applyKey(index); } }));
    });
    formationTweens.push(gsap.to(caseFormation, { t, duration: immediate ? 0 : 0.8,
      delay: immediate || !toFormation ? 0 : 0.2, ease: "power2.inOut", overwrite: true, onUpdate: applyCase }));
    if (immediate) { scene.keys.forEach((_, index) => applyKey(index)); applyCase(); }
  }
  const onVisibility = () => {
    const hidden = document.hidden;
    api.setPaused(hidden);
    [...loops, ...sectionTweens, ...revealTweens, ...pending, ...keyTweens, ...formationTweens, ...awayTweens].forEach((t) => t.paused(hidden));
    driftTween?.paused(hidden);
  };
  const syncSection = () => {
    let next: KeyboardSection = "hero";
    for (const { id, threshold } of SCROLL_SECTIONS) {
      if ((document.getElementById(id)?.getBoundingClientRect().top ?? Infinity) <= window.innerHeight * threshold) next = id;
    }
    return next;
  };
  const triggers = SCROLL_SECTIONS
    .filter(({ id }) => document.getElementById(id))
    .map(({ id, previous, threshold }) => ScrollTrigger.create({
      trigger: `#${id}`,
      start: `top ${threshold * 100}%`,
      onEnter: () => { if (revealed) applySection(id); },
      onLeaveBack: () => { if (revealed) applySection(previous); },
    }));
  if (document.getElementById("experience") && document.getElementById("projects")) triggers.push(ScrollTrigger.create({
    trigger: document.getElementById("constellation") ? "#constellation" : "#experience", endTrigger: "#projects",
    start: `top ${AWAY_START * 100}%`, end: `bottom ${AWAY_END * 100}%`,
    onToggle: ({ isActive }) => { if (revealed) setAway(isActive); },
  }));
  if (document.getElementById("skills")) triggers.push(ScrollTrigger.create({
    trigger: "#skills", start: "top 50%", end: "bottom 20%",
    onToggle: ({ isActive }) => { if (revealed) showCounter(isActive && section === "skills"); },
  }));
  const resize = () => { if (revealed) { applySection(syncSection(), true); setAway(inCardSections(), true); } };
  window.addEventListener("resize", resize);
  document.addEventListener("visibilitychange", onVisibility);
  api.setNodeVisible(scene.boardId, false);
  return {
    // hide until socket connected + counts received
    setCounterEnabled(enabled: boolean) {
      if (disposed || enabled === counterEnabled) return;
      counterEnabled = enabled;
      showCounter(counterWanted);
    },
    reveal() {
      if (revealed || disposed) return;
      revealed = true;
      api.setNodeVisible(scene.boardId, true);
      applySection(syncSection(), true);
      setAway(inCardSections(), true);
      revealScale.value = 0.001;
      setTransform(scene.revealId, { scale: [0.001, 0.001, 0.001] });
      revealTweens.push(gsap.to(revealScale, { value: 1, duration: 1.5, ease: "elastic.out(1,0.6)",
        onUpdate: () => { setTransform(scene.revealId, { scale: [revealScale.value, revealScale.value, revealScale.value] }); },
      }));
      if (section !== "contact") scene.keys.forEach((key, index) => {
        const offset = keyRevealOffsets[index];
        // Original reveal: 900ms wait, 70ms per key, then a 100ms hold before dropping.
        offset.y = (200 - 50) / 296.741333;
        api.setNodeVisible(key.motionId, false);
        applyKey(index);
        revealTweens.push(gsap.delayedCall(0.9 + index * 0.07, () => {
          api.setNodeVisible(key.motionId, true);
        }));
        revealTweens.push(gsap.to(offset, { y: 0, delay: 1 + index * 0.07,
          duration: 0.5, ease: "bounce.out", onUpdate: () => { applyKey(index); } }));
      });
      onVisibility();
    },
    dispose() {
      disposed = true;
      kill(loops); kill(sectionTweens); kill(revealTweens); kill(pending); kill(keyTweens); kill(formationTweens); kill(awayTweens); driftTween?.kill();
      triggers.forEach((t) => t.kill());
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
      [scene.boardId, scene.caseId, scene.spinId, scene.revealId, ...scene.keys.map((key) => key.motionId), ...scene.frameIds, scene.labelsId].forEach((id) => api.clearNodeOverrides(id));
      api.clearNodeOverrides(scene.counterId);
      api.setNodeVisible(scene.catId, false);
    },
  };
}
