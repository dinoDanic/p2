import { Html } from "@react-three/drei";
import { CameraPlatform, Campfire, HoverPlatform } from "components";
import { useCameraPlatform } from "hooks";
import React from "react";
import { Dog, HumanOne, HumanTwo } from "./components";

export const Hobys = () => {
  useCameraPlatform()
  return (
    <>
      <Dog />
      <HumanOne />
      <HumanTwo />
      <Campfire position={[-15, 3.5, -48]} />
      <HoverPlatform position={[-15, 3.5, -48]}>
        <h1 style={{ color: "white" }}>hi</h1>
      </HoverPlatform>
    </>
  );
};
