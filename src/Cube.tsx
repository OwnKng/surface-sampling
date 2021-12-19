// @ts-nocheck
import { useLayoutEffect, useMemo, useRef } from "react"
import * as THREE from "three"
import { MeshSurfaceSampler } from "three/examples/jsm/math/MeshSurfaceSampler"
import { useLoader, useThree } from "@react-three/fiber"
import { FontLoader } from "three/examples/jsm/loaders/FontLoader"
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry"

const tempObject = new THREE.Object3D()
const tempPosition = new THREE.Vector3()

const Cube = ({ colorArray }: any) => {
  const meshRef = useRef()

  const { viewport } = useThree()

  const font = useLoader(FontLoader, "/bold.blob")

  const config = useMemo(
    () => ({
      font,
      size: 100,
      height: 10,
      curveSegments: 12,
    }),
    [font]
  )

  const geo = useMemo(
    () =>
      new THREE.Mesh(
        new TextGeometry("THREE", config),
        new THREE.MeshBasicMaterial()
      ),
    [config]
  )

  const sampler = new MeshSurfaceSampler(geo).build()

  useLayoutEffect(() => {
    for (let i = 0; i < 10000; i++) {
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

  return (
    <instancedMesh
      receiveShadow
      castShadow
      ref={meshRef}
      args={[null, null, 10000]}
      rotation={[-Math.PI * 0.5, 0, 0]}
      position={[-50, 0, viewport.height]}
    >
      <coneGeometry args={[1, 3, 3]}>
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

const data = Array.from({ length: 10000 }, () => ({
  color: ["#5ADBFF", "#006DAA", "#F15152", "#ffffff"][
    Math.floor(Math.random() * 5)
  ],
  scale: 1,
}))

export default function CubeWrapper() {
  const colorArray = useMemo(
    () =>
      Float32Array.from(
        new Array(10000)
          .fill(0)
          .flatMap((_, i) => tempColor.set(data[i].color).toArray())
      ),
    []
  )

  return <Cube colorArray={colorArray} />
}
