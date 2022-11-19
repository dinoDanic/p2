import { useGLTF } from "@react-three/drei";
import React, { useEffect } from "react";
import * as three from 'three'

export const Land = () => {
  const model = useGLTF("./models/land.glb");
  const { animations, scene } = model;
  console.log(model)
  useEffect(() => {
    const scale = 60
      scene.scale.x = scale
      scene.scale.y = scale
      scene.scale.z = scale
      scene.position.y = 15
    }, [])
  return <primitive object={scene} />;
};
