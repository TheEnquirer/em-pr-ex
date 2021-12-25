import ReactDOM from 'react-dom'
import React, { useRef, useState, useEffect, Suspense} from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { MeshWobbleMaterial } from '@react-three/drei'
import SimplexNoise from 'simplex-noise';

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}


function Lily(props) {
    const SPED = 0.01;
    const [objs, setObjs] = useState([])
    const [targets, setTargets] = useState([])
    const [mouseDown, setMouseDown] = useState(false)
    const [hovered, setHovered] = useState(new Array(100))
    //const [t, setT] = useState(0)
    //const simplex = new SimplexNoise()
    const gltf = useLoader(GLTFLoader, '/word_lilys5.gltf')
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
		attach="geometry"
		position={[e.position.x, e.position.y, e.position.z]}
		//position={[getRandomArbitrary(-1, 5), e.position.y, getRandomArbitrary(-4, 2)]}
		onClick={() => { }}
		onPointerOver={(e) => {
		    let h = hovered
		    h[i] = true;
		    setHovered(h)
		}}
		onPointerOut={(e) => {
		    let h = hovered
		    h[i] = false;
		    setHovered(h)
		}}

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
	    if (hovered[i]) {
		//obj.props.object.geometry.center()
		//obj.props.object.rotation.z += 0.1
		//obj.props.object.rotation.y += 0.1
		obj.props.object.position.y  = 0.01
		//obj.props.object.rotation.x += 0.1
	    } else {
		obj.props.object.position.y  = 0
	    }
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
	    {objs.map((e) => {
		return <mesh>
		    {e}
		      {/*<boxBufferGeometry attach="geometry" />*/}
		      <MeshWobbleMaterial attach="material" factor={0.2} speed={10} />
		    </mesh>
	    })}
		  {/*{objs} */}
	    {/*{console.log(objs[0])}*/}
	</>
    )
}

export default Lily

