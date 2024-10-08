import * as THREE from "three";
import { useRecoilValue } from "recoil";
import { GLTF } from "three-stdlib";
import { useGLTF } from "@react-three/drei";
import { useLoader, useThree } from "@react-three/fiber";

import { IMAGE_SETTINGS } from "@/lib/constants/generator";
import { modelAtom } from "@/lib/atoms/generator";

type GLTFResult = GLTF & {
  nodes: {
    Phone: THREE.Mesh;
    CutAround: THREE.Mesh;
    Glass: THREE.Mesh;
    Screen: THREE.Mesh;
    CameraHOle: THREE.Mesh;
  };
  materials: {
    Body: THREE.MeshStandardMaterial;
    Black: THREE.MeshStandardMaterial;
    Glas: THREE.MeshPhysicalMaterial;
    Screen: THREE.MeshStandardMaterial;
    ["Black.001"]: THREE.MeshStandardMaterial;
  };
};

export default function Iphone(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/models/iphone.glb") as GLTFResult;

  const model = useRecoilValue(modelAtom);

  const texture: any = useLoader(
    THREE.TextureLoader,
    model.image.src as string
  );
  const { gl } = useThree();

  /* SCREEN MOCKUP */
  const image = model.image;

  texture.center.set(0.5, 0.5);

  texture.anisotropy = gl.capabilities.getMaxAnisotropy();

  texture.rotation = Math.PI / 2;

  texture.minFilter = THREE.LinearMipMapLinearFilter;
  texture.magFilter = THREE.NearestFilter;

  texture.repeat.set(
    4 + image.width / IMAGE_SETTINGS.dimensionDivider,
    -4.1 + image.height / IMAGE_SETTINGS.dimensionDivider
  );

  texture.offset.set(
    0.5 + image.x / IMAGE_SETTINGS.positionDivider,
    0 + image.y / IMAGE_SETTINGS.positionDivider
  );
  return (
    <group
      {...props}
      rotation={[model.position.y, model.position.x, model.position.z]}
      dispose={null}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Phone.geometry}
        material={materials.Body}
        rotation={[0, -Math.PI / 2, 0]}
      >
        <meshStandardMaterial
          color={model.color}
          roughness={model.bodyReflection}
        />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.CutAround.geometry}
        material={materials.Black}
        rotation={[0, -Math.PI / 2, 0]}
      />
      {model.screenReflection && (
        <mesh
          geometry={nodes.Glass.geometry}
          material={materials.Glas}
          rotation={[0, -Math.PI / 2, 0]}
        >
          <meshStandardMaterial
            attach="material"
            {...materials.Glas}
            transparent
            opacity={model.screenAlphaReflection}
          />
        </mesh>
      )}
      <mesh
        geometry={nodes.Screen.geometry}
        material={materials.Screen}
        position={[0, 0, -0.006]}
        rotation={[0, -Math.PI / 2, 0]}
      >
        <meshStandardMaterial
          attach="material"
          map={texture}
          envMapIntensity={1.5}
          metalness={0.2}
        />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.CameraHOle.geometry}
        material={materials["Black.001"]}
        position={[0.002, 3.154, 0.068]}
        rotation={[0, -Math.PI / 2, 0]}
      />
    </group>
  );
}

useGLTF.preload("/models/iphone.glb");
