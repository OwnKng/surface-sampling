// @ts-nocheck
import { useLayoutEffect, useMemo, useRef } from "react"
import * as THREE from "three"
import { MeshSurfaceSampler } from "three/examples/jsm/math/MeshSurfaceSampler"
import { useGLTF } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"

const tempObject = new THREE.Object3D()
const tempPosition = new THREE.Vector3()

const Model = ({ colorArray }: any) => {
  const meshRef = useRef()

  const { nodes } = useGLTF("/cesar.glb")

  const geo = useMemo(
    () => new THREE.Mesh(nodes.Mesh_4.geometry, new THREE.MeshBasicMaterial()),
    [nodes]
  )

  const sampler = new MeshSurfaceSampler(geo).build()

  useLayoutEffect(() => {
    for (let i = 0; i < 8000; i++) {
      sampler.sample(tempPosition)

      tempObject.position.set(tempPosition.x, tempPosition.y, tempPosition.z)
      tempObject.rotation.set(
        Math.PI * Math.random(),
        Math.PI * Math.random(),
        Math.PI * Math.random()
      )
      tempObject.scale.setScalar(Math.random() * 0.5 + 0.5)
      tempObject.updateMatrix()

      meshRef.current.setMatrixAt(i, tempObject.matrix)
    }
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  useFrame(() => {
    meshRef.current.rotation.z -= 0.001
  })

  return (
    <instancedMesh
      receiveShadow
      castShadow
      ref={meshRef}
      args={[null, null, 8000]}
      rotation={[-Math.PI * 0.5, 0, -Math.PI * 0.5]}
      scale={2}
    >
      <icosahedronGeometry args={[0.1, 0]}>
        <instancedBufferAttribute
          attachObject={["attributes", "color"]}
          args={[colorArray, 3]}
        />
      </icosahedronGeometry>
      <meshPhongMaterial vertexColors={THREE.VertexColors} />
    </instancedMesh>
  )
}

const tempColor = new THREE.Color()

const data = Array.from({ length: 8000 }, () => ({
  color: ["#5ADBFF", "#006DAA", "#F15152", "#ffffff"][
    Math.floor(Math.random() * 5)
  ],
}))

export default function ModelWrapper() {
  const colorArray = useMemo(
    () =>
      Float32Array.from(
        new Array(8000)
          .fill(0)
          .flatMap((_, i) => tempColor.set(data[i].color).toArray())
      ),
    []
  )

  return <Model colorArray={colorArray} />
}
