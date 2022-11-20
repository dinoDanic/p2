import {
  Sparkles,
  useGLTF,
  Html,
  Box,
  Plane,
  useAnimations,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { lightIntensity } from "features/player/helpers";
import React, { useEffect, useRef, useState } from "react";

export const HumanTwo = () => {
  const model = useGLTF("./models/humantwo.glb");
  const { animations, scene } = model;
  const { actions } = useAnimations(animations, scene);

  useEffect(() => {
    actions.sittingtalking.play();

  }, []);

  return (
    <mesh position={[-18.5, -0.1, -46.6]} rotation={[0,5,0]}>
      <primitive object={scene} />
    </mesh>
  );
};
