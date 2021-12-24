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
		//position={[0, 0.1, 0]}
		position={[e.position.x, e.position.y + 0.1, e.position.z]}
		onClick={() => {
		    //console.log("clicked!", i, objs[i].props.object.position.y)
		    //objs[i].props.object.position.y = -1;
		    //objs[i].props.position.y = -1;
		}}
	    />
	})
	setObjs(tobjs)
    }, []);
    //value3d = simplex.noise3D()
    //console.log(value3d)

    //const gltf = useLoader(GLTFLoader, '../models/all_lilys.glb')


    useFrame((state, delta) => {
	//setT(t+0.01)
	//setT(t+0.1)
	setObjs(objs.map((e, i) => {
	    //let val = simplex.noise3D(e.props.object.position.x, e.props.object.position.z, e.props.object.position.y)
	//    let val = Math.sin(t) / 500
	//    //let val = Math.sin(t) / 100
	//    if (Math.sin(t) < 0.1 && Math.sin(t) > -0.1) {
	//    //if (Math.sin(t) > 0.9) {
	//        if (!e.props.object.flip) {
	//            e.props.object.direction = (Math.random() - 0.5) * 2
	//            console.log("resetting direction")
	//        }
	//        e.props.object.flip = true;
	//    }
	//    else { e.props.object.flip = false; }

	//    //let slope = -0.5
	////    //console.log(val, e.props.position)
	////    //console.log(e.props.position)
	////    //e.props.position[2] += 0.1

	//    e.props.object.position.z += val
	//    e.props.object.position.x += e.props.object.direction * val

	//    //console.log(e.props.position)
	    return e
	}))
    })
    //    for (let i = 1; i < gltf.scene.children.length; i++) {
    //        gltf.scene.children[i].position.x += (Math.random() -0.5) / 100
    //        //gltf.scene.children[0].position.x = gltf.scene.children[1].position.x 
    //        //console.log(gltf.scene.children[i].position.x)
    //    }
    //    //gltf.scene.children[2].position.x = 10
    //    //console.log(gltf.scene.children[0].position.x)
    //})
    
    return (
	<> 
      	    {objs} 
	    {/*{console.log(objs[0])}*/}
	</>
    )
}

export default Lily

