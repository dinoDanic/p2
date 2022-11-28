import { Plane, Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Debug, Physics, RigidBody } from "@react-three/rapier";
import { Campfire } from "components";
import { Controls } from "features/controls";
import { Hobys } from "features/hobys";
import { Hover } from "features/hover";
import { Fog } from "features/land/Fog";
import { Land2 } from "features/land/Land2";
import { Ground } from "features/physics";
import { PhysicsPlayer } from "features/player/PhysicsPlayer";

export default function Home() {
  return (
    <>
      <Canvas shadows style={{ width: "100%", height: "100vh" }}>
        <color attach="background" args={["#000000"]} />
        <Stars count={300} radius={80} />
        <Land2 />
        <Physics>
        <Debug />
          <Ground />
          <PhysicsPlayer />
        </Physics>
        <Campfire position={[40.7, 3.5, -22.4]} />
        <Hobys />

        <Hover />
        <Fog />
      </Canvas>
      <Controls />
    </>
  );
}
