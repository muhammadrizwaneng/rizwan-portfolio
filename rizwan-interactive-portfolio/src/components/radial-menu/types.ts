export interface MenuItem {
  id: string;
  /** Sent over the socket as the reaction key (older clients sent an emoji here). */
  emoji: string;
  /** Logo shown in the menu and the burst flash. */
  icon: string;
  label: string;
  color: string;
}

export interface Position {
  x: number;
  y: number;
}

/** 0 = minimum pull, 1 = maximum pull */
export type Intensity = number;
