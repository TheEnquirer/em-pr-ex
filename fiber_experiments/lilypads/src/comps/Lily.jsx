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
    const RETURN_SPED = 0.04;
    const AWAY_SPED = 0.01;
    const [objs, setObjs] = useState([])
    const [targets, setTargets] = useState([])
    const [mouseDown, setMouseDown] = useState(false)
    const [hovered, setHovered] = useState(new Array(100))
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
		//attach="geometry"
		//position={[e.position.x, e.position.y, e.position.z]}
		position={[getRandomArbitrary(-1, 5), e.position.y, getRandomArbitrary(-4, 2)]}
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

    const zip = (a, b) => a.map((k, i) => [k, b[i]]);
    useFrame(({ raycaster }) => {
        for (let [ obj, hover ] of zip(objs, hovered)) {
            obj.props.object.position.y = hover ? 0.01 : 0;
        }
        for (let [ obj, targ ] of zip(objs, targets)) {
            let [ vx, vz ] = [ 0, 0 ];
            if (mouseDown) {
                const point = raycaster.intersectObject(props.waterRef.current)[0]?.point;
                if (typeof point === 'undefined') console.error('unreachable: clicked out of the water');
                const dx = obj.props.object.position.x - point.x;
                const dz = obj.props.object.position.z - point.z;
                const norm = Math.pow(dx, 2) + Math.pow(dz, 2);
                vx += AWAY_SPED / norm * dx;
                vz += AWAY_SPED / norm * dz;
            }
            const dx = obj.props.object.position.x - targ.x + vx;
            const dz = obj.props.object.position.z - targ.z + vz;
            vx -= RETURN_SPED * dx;
            vz -= RETURN_SPED * dz;
            obj.props.object.position.x += vx;
            obj.props.object.position.z += vz;
        }
    });

    return (
	<> 
	    {objs.map((e, i) => {
		return <mesh key={i}>
		    {e}
		      {/*<boxBufferGeometry attach="geometry" />*/}
			  //<MeshWobbleMaterial attach="material" factor={0.2} speed={10} />
		    </mesh>
	    })}
		  {/*{objs} */}
	    {/*{console.log(objs[0])}*/}
	</>
    )
}

export default Lily

