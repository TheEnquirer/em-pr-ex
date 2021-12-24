
import React, { useRef, useState, Suspense } from 'react'
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

extend({ OrbitControls })


export default function Controls() {
    const controls = useRef()
    //const pointl = useRef()
    const { camera, gl } = useThree()
    useFrame((state, delta) => {
	//pointl.current.position.x += 0.1
	//pointl.current.position.y += 0.1

	controls.current.update()
    }
    )
    return <orbitControls 
	ref={controls} 
	args={[camera, gl.domElement]}
	enableDamping
	dampingFactor={0.1}
	rotateSpeed={0.5}
    />
}

