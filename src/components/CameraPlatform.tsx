import { Html, Plane } from "@react-three/drei";
import { useAppSelector } from "hooks";
import React, { FC, ReactNode, useState } from "react";

interface Props {
  position: [number, number, number];
  size?: [number, number];
  children: ReactNode;
}

export const CameraPlatform: FC<Props> = ({
  position,
  children,
  size = [10, 10],
}) => {
  const [hover, setHover] = useState(false);

  const cameraType = useAppSelector((s) => s.controls.cameraType);

  return (
    <>
      <Plane
        onPointerOver={() => setHover(true)}
        onPointerLeave={() => setHover(false)}
        rotation={[-Math.PI / 2, 0, 0]}
        position={position}
        args={size}
      >
        <meshStandardMaterial attach="material" color="white" />
      </Plane>
      {hover && (
        <Html position={position}>
          {children}
        </Html>
      )}
    </>
  );
};
