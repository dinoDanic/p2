import { useEffect, useState } from "react";

type KeyTypes = "KeyW" | "KeyS" | "KeyA" | "KeyD" | "ShiftLeft" | "Space";

interface Keys {
  KeyW: "forward";
  KeyS: "backward";
  KeyA: "left";
  KeyD: "right";
  ShiftLeft: "shift";
  Space: "jump";
}

const keys: Keys = {
  KeyW: "forward",
  KeyS: "backward",
  KeyA: "left",
  KeyD: "right",
  ShiftLeft: "shift",
  Space: "jump",
};

export const useInput = () => {
  const [input, setInput] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
    shift: false,
    jump: false,
  });

  const findKey = (key: KeyTypes) => keys[key];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setInput((i) => ({ ...i, [findKey(e.code as KeyTypes)]: true }));
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      setInput((i) => ({ ...i, [findKey(e.code as KeyTypes)]: false }));
    };

    document.addEventListener("keydown", handleKeyDown, true);
    document.addEventListener("keyup", handleKeyUp, true);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return input
};
