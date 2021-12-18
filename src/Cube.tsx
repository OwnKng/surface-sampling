// @ts-nocheck
import { useFrame, useThree } from "@react-three/fiber"
import { useLayoutEffect, useMemo, useRef, useEffect } from "react"
import * as THREE from "three"
import { MeshSurfaceSampler } from "three/examples/jsm/math/MeshSurfaceSampler"

const tempObject = new THREE.Object3D()
const tempPosition = new THREE.Vector3()
let matrix = new THREE.Matrix4()

const Cube = ({ colorArray }: any) => {
  const meshRef = useRef()

  const cube = useMemo(
    () =>
      new THREE.Mesh(
        new THREE.BoxGeometry(10, 10, 10),
        new THREE.MeshBasicMaterial()
      ),
    []
  )

  const sampler = useMemo(() => new MeshSurfaceSampler(cube).build(), [cube])

  useLayoutEffect(() => {
    for (let i = 0; i < 1000; i++) {
      sampler.sample(tempPosition)

      tempObject.position.set(tempPosition.x, tempPosition.y, tempPosition.z)
      tempObject.scale.setScalar(Math.random() * 0.5 + 0.5)
      tempObject.updateMatrix()

      meshRef.current.setMatrixAt(i, tempObject.matrix)
    }
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime()
    for (let i = 0; i < 1000; i++) {
      meshRef.current.getMatrixAt(i, matrix)

      tempPosition.setFromMatrixPosition(matrix)
      tempObject.position.set(tempPosition.x, tempPosition.y, tempPosition.z)
      tempObject.rotation.set(
        Math.sin(time / 10 + i),
        Math.sin(time + i / 10),
        0
      )

      tempObject.updateMatrix()

      meshRef.current.setMatrixAt(i, tempObject.matrix)
    }

    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh
      receiveShadow
      castShadow
      ref={meshRef}
      args={[null, null, 1000]}
    >
      <coneGeometry args={[0.25, 0.75, 3]}>
        <instancedBufferAttribute
          attachObject={["attributes", "color"]}
          args={[colorArray, 3]}
        />
      </coneGeometry>
      <meshPhongMaterial vertexColors={THREE.VertexColors} />
    </instancedMesh>
  )
}

const tempColor = new THREE.Color()

const data = Array.from({ length: 1000 }, () => ({
  color: ["#5ADBFF", "#006DAA", "#F15152", "#ffffff"][
    Math.floor(Math.random() * 5)
  ],
  scale: 1,
}))

export default function CubeWrapper() {
  const colorArray = useMemo(
    () =>
      Float32Array.from(
        new Array(1000)
          .fill(0)
          .flatMap((_, i) => tempColor.set(data[i].color).toArray())
      ),
    []
  )

  return <Cube colorArray={colorArray} />
}
