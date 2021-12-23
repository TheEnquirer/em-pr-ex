import ReactDOM from 'react-dom'
import React, { useRef, useState, useEffect, Suspense} from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

function Lily(props) {

    //const gltf = useLoader(GLTFLoader, '../models/all_lilys.glb')
    const gltf = useLoader(GLTFLoader, '/l.gltf')
    return (
	<primitive object={gltf.scene} />
    )
}

export default Lily

