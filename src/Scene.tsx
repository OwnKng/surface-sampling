// @ts-nocheck
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import Cube from "./Cube"
import { Suspense } from "react"

const Scene = () => {
  return (
    <Canvas camera={{ position: [0, 20, 0] }}>
      <hemisphereLight intensity={0.4} />
      <directionalLight castShadow intensity={0.4} position={[0, 20, 0]} />
      <OrbitControls />
      <Suspense fallback={null}>
        <Cube />
      </Suspense>
    </Canvas>
  )
}

export default Scene
