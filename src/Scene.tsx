// @ts-nocheck
import { Canvas } from "@react-three/fiber"
import { OrbitControls, useProgress, Html } from "@react-three/drei"
import Model from "./Model"
import { Suspense } from "react"

function Loader() {
  const { progress } = useProgress()
  return (
    <Html center>
      <div className='loader'>{progress} % Loaded</div>
    </Html>
  )
}

const Scene = () => {
  return (
    <Canvas shadows camera={{ position: [0, 40, 60] }}>
      <hemisphereLight intensity={0.2} />
      <directionalLight castShadow intensity={0.8} position={[0, 40, 0]} />
      <OrbitControls />
      <Suspense fallback={<Loader />}>
        <Model />
      </Suspense>
    </Canvas>
  )
}

export default Scene
