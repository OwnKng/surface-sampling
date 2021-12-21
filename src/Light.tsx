import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import { Mesh } from "three"

const Light = () => {
  const ref = useRef<Mesh>(null!)

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime()
    ref.current.position.x = Math.sin(time * 2) * Math.PI * 2 * 3
    ref.current.position.z = 20 + Math.cos(time * 2) * Math.PI * 2 * 3
    ref.current.position.y = (Math.sin(time * 2) * 0.5 + 0.5) * 30
  })

  return <pointLight ref={ref} intensity={4.0} decay={1} distance={20} />
}

export default Light
