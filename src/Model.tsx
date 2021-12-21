//@ts-nocheck
import { useLayoutEffect, useMemo, useRef } from "react"
import * as THREE from "three"
import { MeshSurfaceSampler } from "three/examples/jsm/math/MeshSurfaceSampler"
import { useGLTF, Instances, Instance } from "@react-three/drei"
import { InstancedMesh, Mesh } from "three"
import { useFrame } from "@react-three/fiber"

const data = Array.from({ length: 8000 }, () => ({
  color: ["#5ADBFF", "#006DAA", "#F15152", "#ffffff"][
    Math.floor(Math.random() * 5)
  ],
  scale: Math.random(),
  rotation: {
    x: Math.PI * Math.random(),
    y: Math.PI * Math.random(),
    z: Math.PI * Math.random(),
  },
}))

const Model = () => {
  const meshRef = useRef<InstancedMesh>(null!)

  const { nodes } = useGLTF("/cesar.glb") as any

  const geo = useMemo(
    () => new THREE.Mesh(nodes.Mesh_4.geometry, new THREE.MeshBasicMaterial()),
    [nodes]
  )

  const positions = useMemo(() => {
    const positionArray = []
    const sampler = new MeshSurfaceSampler(geo).build()

    for (let i = 0; i < 8000; i++) {
      const tempPosition = new THREE.Vector3()
      sampler.sample(tempPosition)

      positionArray[i] = { position: tempPosition, ...data[i] }
    }

    return positionArray
  }, [geo])

  useFrame(({ mouse, viewport }) => {
    const x = (mouse.x * viewport.width) / 2
    const y = (mouse.y * viewport.height) / 2

    meshRef.current.rotation.z = THREE.MathUtils.lerp(
      meshRef.current.rotation.z,
      -Math.PI * 0.75 + x / 250,
      0.1
    )

    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      -Math.PI * 0.5 - y / 360,
      0.1
    )
  })

  return (
    <Instances
      ref={meshRef}
      limit={10000}
      rotation={[-Math.PI * 0.5, 0, -Math.PI * 0.75]}
      scale={2}
    >
      <coneGeometry args={[0.2, 0.2, 3]} />
      <meshPhongMaterial flatShading />
      {positions.map((data, i) => (
        <Pixel key={i} {...data} />
      ))}
    </Instances>
  )
}

const Pixel = ({ position, scale, color, rotation }: any) => {
  const ref = useRef<Mesh>(null!)

  useLayoutEffect(() => {
    ref.current.position.set(position.x, position.y, position.z)
    ref.current.rotation.set(rotation.x, rotation.y, rotation.z)
  })

  return <Instance ref={ref} scale={scale} color={color} />
}

export default Model
