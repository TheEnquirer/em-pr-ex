import ReactDOM from 'react-dom'
import React, { useRef, useState, useEffect, Suspense} from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import SimplexNoise from 'simplex-noise';

function Lily(props) {
    const SPED = 0.01;
    const [objs, setObjs] = useState([])
    const [targets, setTargets] = useState([])
    const [mouseDown, setMouseDown] = useState(false)
    //const [t, setT] = useState(0)
    //const simplex = new SimplexNoise()
    const gltf = useLoader(GLTFLoader, '/word_lilys3.gltf')
    //let targets;
    const { viewport } = useThree()


    useEffect(() => {
	//let blendCam = gltf.cameras[0]
	//console.log(blendCam)
	let tobjs = gltf.scene.children
	setTargets(tobjs.map((x) => {
	    return {
		x: x.position.x, 
		y: x.position.y, 
		z: x.position.z, 
		twelve: "12."
	    }}
	))
	tobjs = tobjs.map((e, i) => {
	    return <primitive 
		object={gltf.scene.children[i]} 
		position={[e.position.x, e.position.y, e.position.z]}
		//position={[Math.random() * 3, e.position.y, Math.random() * 3]}
		onClick={() => { }}
	    />
	})
	document.body.onmousedown = () => {setMouseDown(true)}
	document.body.onmouseup = () => {setMouseDown(false)}
	setObjs(tobjs)
    }, []);

    useFrame(({ mouse }) => {
	const x = (mouse.x * viewport.width) / 2
	const y = -(mouse.y * viewport.height) / 2
	//console.log(document.body.onmousedown)
	//console.log(mouse)
	//console.log(x, y)

	//console.log(objs[0].props.object.position.x)
	for (let i = 0; i < objs.length; i++) {
	    const obj = objs[i]
	    //let vx = obj.tx - mesh.position.x;
	    //console.log(targets[i].x, "what?")
	    let vx = targets[i].x - obj.props.object.position.x;
	    //console.log(vx)
	    //let vy = obj.ty - mesh.position.y;
	    let vy = targets[i].z - obj.props.object.position.z;
	    //console.log(targets[i].x - obj.props.object.position.x, obj.props.object.position.x, targets[i].x)
	    if (mouseDown) {
		//let vmx = (x - obj.props.object.position.x)
		let xd = 1/(obj.props.object.position.x - x)
		let yd = 1/(obj.props.object.position.z - y)

		if (xd > 1) { xd = 1 }
		else if (xd < -1) { xd = -1 }

		if (yd > 1) { yd = 1 }
		else if (yd < -1) { yd = -1 }

		//if (1/yd > 1) { yd = 1 }


		let vmx = (xd) * 0.5
		let vmy = (yd) * 0.5
		vx += vmx
		vy += vmy
	    }
	    //vy = 

	    vx *= SPED; vy *= SPED; 
	    if (vx && vy != 0) {
		//console.log(vx, vy)
	    }
	    //console.log(vx, vy)

	    obj.props.object.position.x += vx;
	    obj.props.object.position.z += vy;
	    ////mesh.position.y += vy;
	}
    })
    
    return (
	<> 
      	    {objs} 
	    {/*{console.log(objs[0])}*/}
	</>
    )
}

export default Lily

