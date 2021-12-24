import ReactDOM from 'react-dom'
import React, { useRef, useState, useEffect, Suspense} from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import SimplexNoise from 'simplex-noise';

function Lily(props) {
    const [objs, setObjs] = useState([])
    const [t, setT] = useState(0)
    const simplex = new SimplexNoise()
    const gltf = useLoader(GLTFLoader, '/word_lilys2.gltf')

    useEffect(() => {
	let tobjs = gltf.scene.children
	tobjs = tobjs.map((e, i) => {
	    return <primitive 
		object={gltf.scene.children[i]} 
		position={[e.position.x, e.position.y + 0.1, e.position.z]}
		onClick={() => { }}
	    />
	})
	setObjs(tobjs)
    }, []);

    useFrame((state, delta) => {
    })
    
    return (
	<> 
      	    {objs} 
	    {/*{console.log(objs[0])}*/}
	</>
    )
}

export default Lily

