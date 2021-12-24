

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
    const pos = {
	x: 1.2266027759623142,
	y: 1.7926754167099483,
	z: 0.4485769457577807
    }
    const rot = {
	x: -1.0419324004883406,
	y: -0.1141716882838732,
	z: -0.19252950318302414
    } 
    const mat = {
	"elements": [
	    0.9862352120633925,
	    0,
	    0.16534843962455542,
	    0,
	    0.12958528972939717,
	    0.62112641882115,
	    -0.772922780443274,
	    0,
	    -0.10270228416166523,
	    0.783710387734151,
	    0.6125767453842523,
	    0,
	    1.2266027759623142,
	    1.7926754167099483,
	    0.44857694575778106,
	    1
	]
    }

    //camera.position.set(pos.x, pos.y, pos.z)
    //camera.rotation.set(rot.x, rot.y, rot.z)
    camera.matrix.set(mat)
    camera.updateProjectionMatrix();

    useThree(({camera}) => {
        document.addEventListener('click', () => { console.log(camera.position, camera.quaternion) })
	const p = {
	    x: 0.0597870771295759,
	    y: 3.000773996785382,
	    z: 0.7128802915181168
	    //{
	    //x: 1.0844262634377058,
	    //y: 1.7844636030677399,
	    //z: 0.35800227888586483
	}
	const q = {
	    //    x: -0.4844482229471796,
	    //        y: -0.09146103813489773,
	    //        z: -0.05101516281517356,
	    //        w: 0.868528785331579
	    ////}
	    x: -1.37460713560281345,
	    y: -1.2580321076277524,
	    z: -1.10936762737003625,
	    w: 1.8838142607313395
	}

	//camera.position.set(-0.08023635258132256, 2.672178718117016, 1.3122871869653498);
	camera.position.set(p.x, p.y, p.z);
        //camera.position.set(1.0547170588848762, 3.01622518469842, 0.681107417640759);
        //camera.rotation.order = "XYZ"
        //camera.rotation.set(-1.0525266358296719, -0.20533459651144434, -0.34337865747507007);
        camera.quaternion.set(q.x, q.y, q.z, q.w);
        

	//camera = blenderCamera
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
	//setC(blenderCamera)
	//console.log(!!c)
	controls.current.update()
	//console.log(camera)
    })

    return <orbitControls 
	ref={controls} 
	args={[camera, gl.domElement]}
	//enableDamping
	dampingFactor={0.1}
	rotateSpeed={0.5}
	//rotation={[-1.0419324004883406, -0.1141716882838732, -0.19252950318302414]}
	//enabled={false}
    />
}

