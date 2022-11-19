import { DirectionProps } from "./types";

export const directionOffset = ({
  forward,
  backward,
  left,
  right,
}: DirectionProps): number => {
  let directionOffset: number = 0;
  if (forward) {
    if (left) {
      directionOffset = Math.PI / 4;
    } else if (right) {
      directionOffset = -Math.PI / 4;
    }
  } else if (backward) {
    if (left) {
      directionOffset = Math.PI / 4 + Math.PI / 2;
    } else if (right) {
      directionOffset = -Math.PI / 4 - Math.PI / 2;
    } else {
      directionOffset = Math.PI;
    }
  } else if (left) {
    directionOffset = Math.PI / 2;
  } else if (right) {
    directionOffset = -Math.PI / 2;
  }
  return directionOffset;
};

interface LightIntensityProps {
  currentIntensity: number;
  delta: number;
  min: number;
  max: number;
}

export const lightIntensity = ({
  currentIntensity,
  delta,
  min,
  max,
}: LightIntensityProps): number => {
  const chance = Math.random() * 4;
  let newIntensity = currentIntensity;

  if (chance < 0.5) {
    if (currentIntensity > max) return currentIntensity;
    newIntensity += 2 * delta;
  }
  if (chance > 0.5 && chance < 1) {
    if (currentIntensity < min) return currentIntensity;
    newIntensity -= 2 * delta;
  }
  return newIntensity;
};
