/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from "three";
import React, { useContext, useRef } from "react";
import { useGLTF, PerspectiveCamera, useTexture } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useLoader } from "@react-three/fiber";
import Context from "../providers/ContextProvider.provider";

type GLTFResult = GLTF & {
  nodes: {
    AroundScreen: THREE.Mesh;
    cameraCircle: THREE.Mesh;
    Screen: THREE.Mesh;
    Rim: THREE.Mesh;
    Phone001: THREE.Mesh;
  };
  materials: {
    Side: THREE.MeshStandardMaterial;
    Black: THREE.MeshStandardMaterial;
    ["Screen.002"]: THREE.MeshPhysicalMaterial;
  };
};

export default function Android(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/models/android.gltf") as GLTFResult;

  const { model } = useContext(Context);

  const texture = useLoader(THREE.TextureLoader, model.image.src);

  /* MARBLE MATERIAL */
  const textureMarbleProps = useTexture({
    map: "/textures/marble/White_Marble_004_COLOR.jpg",
    normalMap: "/textures/marble/White_Marble_004_NORM.jpg",
    roughnessMap: "/textures/marble/White_Marble_004_ROUGH.jpg",
    aoMap: "/textures/marble/White_Marble_004_OCC.jpg",
  });

  textureMarbleProps.aoMap.repeat.set(4, 4);
  textureMarbleProps.roughnessMap.repeat.set(4, 4);
  textureMarbleProps.normalMap.repeat.set(4, 4);
  textureMarbleProps.map.repeat.set(4, 4);

  textureMarbleProps.map.wrapS =
    textureMarbleProps.map.wrapT =
    textureMarbleProps.roughnessMap.wrapS =
    textureMarbleProps.roughnessMap.wrapT =
    textureMarbleProps.normalMap.wrapS =
    textureMarbleProps.normalMap.wrapT =
    textureMarbleProps.aoMap.wrapS =
    textureMarbleProps.aoMap.wrapT =
      THREE.RepeatWrapping;

  /* PLASTIC MATERIAL */
  const texturePlasticProps = useTexture({
    map: "/textures/plastic/Plastic_Rough_001_basecolor.jpg",
    normalMap: "/textures/plastic/Plastic_Rough_001_normal.jpg",
    roughnessMap: "/textures/plastic/Plastic_Rough_001_roughness.jpg",
    aoMap: "/textures/plastic/Plastic_Rough_001_ambientOcclusion.jpg",
  });

  texturePlasticProps.aoMap.repeat.set(4, 4);
  texturePlasticProps.roughnessMap.repeat.set(4, 4);
  texturePlasticProps.normalMap.repeat.set(4, 4);
  texturePlasticProps.map.repeat.set(4, 4);

  texturePlasticProps.map.wrapS =
    texturePlasticProps.map.wrapT =
    texturePlasticProps.roughnessMap.wrapS =
    texturePlasticProps.roughnessMap.wrapT =
    texturePlasticProps.normalMap.wrapS =
    texturePlasticProps.normalMap.wrapT =
    texturePlasticProps.aoMap.wrapS =
    texturePlasticProps.aoMap.wrapT =
      THREE.ClampToEdgeWrapping;

  //   THREE.RepeatWrapping;

  /* SCREEN MOCKUP */
  //   @ts-ignore
  texture.center.set(0.5, 0.5); // Set the rotation center to the middle of the texture
  //   @ts-ignore
  texture.rotation = Math.PI / 2; // Rotate 90 degrees
  //   @ts-ignore
  texture.repeat.set(-4.25, 4.1); // Invert and scale down the texture (adjust values as needed)
  //   @ts-ignore
  texture.offset.set(-0.52, 0); // Adjust the offset to keep it centered after scaling and inversion

  return (
    <>
      <PerspectiveCamera
        makeDefault={false}
        far={10}
        near={0.1}
        fov={22.895}
        position={[21.481, 0.263, 0.037]}
        rotation={[-1.027, 1.554, 1.027]}
      />
      <group {...props} rotation={[0, -Math.PI / 2, 0]} dispose={null}>
        <group rotation={[0, model.position.x, -model.position.y]}>
          <mesh
            // castShadow
            // receiveShadow
            geometry={nodes.AroundScreen.geometry}
            material={materials.Side}
            position={[0, 0.016, 0]}
          >
            <meshStandardMaterial color={model.color} />
            {/* {model.texture === "color" ? (
              <meshStandardMaterial
                side={THREE.DoubleSide}
                color={model.color}
              />
            ) : (
              <meshStandardMaterial
                side={THREE.DoubleSide}
                color={model.color}
                {...(model.texture === "plastic"
                  ? texturePlasticProps
                  : textureMarbleProps)}
              />
            )} */}
          </mesh>

          <mesh
            // castShadow
            // receiveShadow
            geometry={nodes.cameraCircle.geometry}
            material={materials.Black}
            position={[0.144, 3.317, 0]}
            scale={0.424}
          />

          {/* MOCKUP GOES HERE */}
          <mesh
            // castShadow
            // receiveShadow
            geometry={nodes.Screen.geometry}
            material={materials["Screen.002"]}
            position={[0.004, 0.016, 0]}
            rotation={[-Math.PI / 1, 0, 0]}
          >
            <meshStandardMaterial
              attach="material"
              side={THREE.DoubleSide}
              //   color={model.color}
              // @ts-ignore
              map={texture}
            />
          </mesh>
          <mesh
            // castShadow
            // receiveShadow
            geometry={nodes.Rim.geometry}
            material={materials.Side}
            position={[0, 0.016, 0]}
          >
            <meshStandardMaterial color={model.color} />
          </mesh>

          {/* BLACK INSIDE THE PHONE */}
          <mesh
            // castShadow
            // receiveShadow
            geometry={nodes.Phone001.geometry}
            material={materials.Black}
            position={[0, 0.016, 0]}
          ></mesh>
        </group>
      </group>
    </>
  );
}

useGLTF.preload("/models/android.gltf");
