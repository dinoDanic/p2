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

export const HumanOne = () => {
  const model = useGLTF("./models/humanone.glb");
  const { animations, scene } = model;
  const { actions } = useAnimations(animations, scene);

  useEffect(() => {
    console.log(actions);
    actions.sittingOnFloor.play();

    // model.scene.scale.x = 0.7;
    // model.scene.scale.z = 0.7;
    // model.scene.scale.y = 0.7;


    console.log(model);
  }, []);

  return (
    <mesh position={[-17, 0, -50.6]} rotation={[0,3.7,0]}>
      <primitive object={scene} />
    </mesh>
  );
};
