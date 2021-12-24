

import React, { useRef, useState, Suspense } from 'react'
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

extend({ OrbitControls })


export default function Controls() {
    const controls = useRef()
    const gltf = useLoader(GLTFLoader, '/word_lilys3.gltf')
    let blenderCamera = gltf.cameras[0]
    const [c, setC] = useState(null)
    //console.log(blendCam)

    let { camera, gl } = useThree()

    useThree(({camera}) => {
	camera = blenderCamera
	//camera.position.x = blenderCamera.parent.position.x + 1.2
	//camera.position.y = blenderCamera.parent.position.y - 1
	//camera.position.z = blenderCamera.parent.position.z - 1.8

	//camera.position.x = blenderCamera.parent.position.x 
	//camera.position.y = blenderCamera.parent.position.z - 0.4
	//camera.position.z = blenderCamera.parent.position.y

	//camera.aspect = blenderCamera.aspect;
	//camera.fov = blenderCamera.fov;
	//camera.far = blenderCamera.far;
	//camera.near = blenderCamera.near;
	


	//camera.rotation.set(blenderCamera.parent.rotation)

	//camera.position.copy(gltf.cameras[0].parent.position);
	//camera.rotation.copy(gltf.cameras[0].parent.rotation);
	//console.log(gltf.cameras[0].parent)
	//camera.quaternion.copy(gltf.cameras[0].quaternion);
	//camera.scale.copy(gltf.cameras[0].parent.scale);
	//let mat = camera.matrix.fromArray(gltf.cameras[0].parent.matrix.toArray())
	//console.log(mat)
	//camera.matrix.decompose(...mat);
    });

    useFrame((state, delta) => {
	setC(blenderCamera)
	//console.log(!!c)
	//controls.current.update()
    })

    return <orbitControls 
	ref={controls} 
	args={[c ? c : camera, gl.domElement]}
	//enableDamping
	dampingFactor={0.1}
	rotateSpeed={0.5}
	//enabled={false}
    />
}

