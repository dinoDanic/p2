import { useFrame } from "@react-three/fiber";
import { useAppSelector } from "hooks";
import React, { useEffect, useRef } from "react";

export const Fog = () => {
  const cameraType = useAppSelector((s) => s.controls.cameraType);
  const fogRef = useRef();
  console.log("cameraType", cameraType);

  useEffect(() => {
    if (cameraType === "map") {
      fogRef.current.far = 1000;
    } else {
      fogRef.current.far = 50;
    }
  }, [cameraType]);

  return <fog ref={fogRef} attach="fog" near={30} far={40} color={"black"} />;
};
