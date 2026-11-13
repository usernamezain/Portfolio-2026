export interface MascotCrewOptions {
  mascots?: string[];
  textInteraction?: boolean;
  container?: string;
  selectors?: string;
  radius?: number;
  maxShift?: number;
  size?: number;
  speed?: number;
  hopsBeforeVanish?: [number, number];
  hiddenFor?: [number, number];
  pauseFor?: [number, number];
  edge?: number;
}

export interface MascotCrewAPI {
  start(options?: MascotCrewOptions): void;
  stop(): void;
  destroy(): void;
}

export const MascotCrew: MascotCrewAPI;
export default MascotCrew;

