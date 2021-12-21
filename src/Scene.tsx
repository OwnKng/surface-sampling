import { Canvas } from "@react-three/fiber"
import Model from "./Model"
import { Suspense } from "react"
import Orbit from "./Orbit"
import StageLights from "./StageLights"
import Loader from "./Loader"

const Scene = () => (
  <Canvas camera={{ position: [-10, 50, 60] }}>
    <Orbit />
    <StageLights />
    <Suspense fallback={<Loader />}>
      <Model />
    </Suspense>
  </Canvas>
)

export default Scene
