// @ts-nocheck
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import Cube from "./Cube"

const Scene = () => {
  return (
    <Canvas shadows>
      <hemisphereLight intensity={0.4} />
      <directionalLight intensity={0.4} position={[0, 20, 0]} />
      <OrbitControls />
      <Cube />
    </Canvas>
  )
}

export default Scene
