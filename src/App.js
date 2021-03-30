import { Canvas } from "react-three-fiber";
import { OrbitControls, Plane } from "@react-three/drei";
import frag from "./background.frag";
import vert from "./background.vert";
import Controls from "Controls";
import { useRef } from "react";
import * as THREE from "three";
import { Perf } from "r3f-perf";

const uniforms = {
    uScene: {
        value: [
            {
                color: new THREE.Color("blue"),
                position: new THREE.Vector3(0, 0, 3),
                radius: 0.2,
            },
            {
                color: new THREE.Color("green"),
                position: new THREE.Vector3(0.4, 0, 4),
                radius: 0.3,
            },
            {
                color: new THREE.Color("red"),
                position: new THREE.Vector3(0, 1, 6),
                radius: 0.9,
            },
            {
                color: new THREE.Color("yellow"),
                position: new THREE.Vector3(-1, 0, 3),
                radius: 0.8,
            },
            {
                color: new THREE.Color("blue"),
                position: new THREE.Vector3(1.2, 0, 1.7),
                radius: 0.1,
            },
        ],
    },
    uLightPos: { value: new THREE.Vector3(0, 0, 0) },
    uStepSize: { value: 0.1 },
    uStepCount: { value: 10 },
    uBackgroundColor: { value: new THREE.Color("#fff") },
};

function App() {
    const mat = useRef();
    return (
        <div className="App" style={{ width: "100vw", height: "100vh" }}>
            <Controls material={mat} />
            <Canvas gl={{ powerPreference: "high-performance" }}>
                <Perf position={"top-left"} />
                <OrbitControls />
                <Plane scale={[6, 6, 1]}>
                    <shaderMaterial ref={mat} uniforms={uniforms} fragmentShader={frag} vertexShader={vert} />
                </Plane>
            </Canvas>
        </div>
    );
}

export default App;
