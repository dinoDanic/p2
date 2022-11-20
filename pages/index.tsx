import { Plane, Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Campfire } from "components";
import { Controls } from "features/controls";
import { Hobys } from "features/hobys";
import { Hover } from "features/hover";
import { Fog } from "features/land/Fog";
import { Land2 } from "features/land/Land2";
import { Player } from "features/player";

export default function Home() {
  return (
    <>
      <Canvas shadows style={{ width: "100%", height: "100vh" }}>
        <color attach="background" args={["#000000"]} />
        <Stars count={300} radius={80} />
        <Land2 />
        {/* <ambientLight /> */}
        {/* <OrbitControls /> */}

        <Plane
          receiveShadow
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -0.14, 0]}
          args={[1000, 1000]}
        >
          <meshStandardMaterial attach="material" color="gray" />
        </Plane>
        <Campfire position={[40.7, 3.5, -22.4]} />
        <Hobys />
        <Player />
        <Hover />
        <Fog />
      </Canvas>
      <Controls />
    </>
  );
}
