import { useControls } from "leva";

export default function Controls({ material }) {
    const { stepSize, stepCount, lightPos, backgroundColor } = useControls({
        stepSize: { value: 0.01, min: 0.001, max: 1, step: 0.001, label: "Step Size" },
        stepCount: { value: 500, min: 10.0, max: 1000, step: 1, label: "Step Count" },
        lightPos: { value: [0, 0, 0], step: 0.1, label: "Light Position" },
        backgroundColor: { value: "#efefef" },
    });

    if (material.current) {
        material.current.uniforms.uStepSize.value = stepSize;
        material.current.uniforms.uStepCount.value = stepCount;
        material.current.uniforms.uBackgroundColor.value.set(backgroundColor);
        material.current.uniforms.uLightPos.value.x = lightPos[0];
        material.current.uniforms.uLightPos.value.y = lightPos[1];
        material.current.uniforms.uLightPos.value.z = lightPos[2];
    }

    return <></>;
}
