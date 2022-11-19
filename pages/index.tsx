import { Cloud, GizmoHelper, Plane, Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Camera, Controls } from "features/controls";
import { Campfire } from "features/land/Campfire";
import { Land2 } from "features/land/Land2";
import { Player } from "features/player";

export default function Home() {
  return (
    <>
      <Canvas shadows style={{ width: "100%", height: "100vh" }}>
        {/* <Camera /> */}
        <color attach="background" args={["#000000"]} />
        <Stars count={300} radius={80} />
        <Land2 />

        <Plane
          receiveShadow
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 0, 0]}
          args={[1000, 1000]}
        >
          <meshStandardMaterial attach="material" color="gray" />
        </Plane>
        <Campfire />
        <Player />
        <GizmoHelper />
      </Canvas>
      <Controls />
    </>
  );
}
