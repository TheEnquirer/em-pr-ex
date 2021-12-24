import ReactDOM from 'react-dom'
import React, { useRef, useState, useEffect, Suspense} from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

function Lily(props) {

    //const gltf = useLoader(GLTFLoader, '../models/all_lilys.glb')
    const gltf = useLoader(GLTFLoader, '/word_lilys2.gltf')

    //for (let i = 0; i < gltf.scene.children.length; i++) {
    //    gltf.scene.children[i].onClick= () => console.log("ive been clicked!", i)

    //}

    //useFrame((state, delta) => {
    //    for (let i = 1; i < gltf.scene.children.length; i++) {
    //        gltf.scene.children[i].position.x += (Math.random() -0.5) / 100
    //        //gltf.scene.children[0].position.x = gltf.scene.children[1].position.x 
    //        //console.log(gltf.scene.children[i].position.x)
    //    }
    //    //gltf.scene.children[2].position.x = 10
    //    //console.log(gltf.scene.children[0].position.x)
    //})
    let objs = gltf.scene.children
    objs = objs.map((e, i) => {
	return <primitive 
	    object={gltf.scene.children[i]} 
	    //position={[0, 0.1, 0]}
	    position={[e.position.x, e.position.y + 0.1, e.position.z]}
	    onClick={() => console.log("clicked!", i)}
	/>
	//return 1
    })
    console.log(objs)

    //console.log(gltf.scene.children)
    return (
	<>
	    {objs}
	</>
    )
}

export default Lily

