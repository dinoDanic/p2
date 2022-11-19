export type PlayerAnimationTypes = "jump" | "walk" | "run" | "idle";

export interface DirectionProps {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
}
