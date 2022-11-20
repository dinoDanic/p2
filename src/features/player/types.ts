export type PlayerAnimationTypes = "jump" | "walk" | "run" | "idle" | "jumprun"

export interface DirectionProps {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
}
