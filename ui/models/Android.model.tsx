import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useLoader } from "@react-three/fiber";
import { IMAGE_SETTINGS } from "@/lib/constants/generator";
import { useRecoilValue } from "recoil";
import { modelAtom } from "@/lib/atoms/generator";

type GLTFResult = GLTF & {
  nodes: {
    Phone: THREE.Mesh;
    Glass: THREE.Mesh;
    camerahole: THREE.Mesh;
    sidebutton1: THREE.Mesh;
    sidebutton2: THREE.Mesh;
    aroundphone: THREE.Mesh;
    Screen001: THREE.Mesh;
  };
  materials: {
    Body: THREE.MeshStandardMaterial;
    Glas: THREE.MeshPhysicalMaterial;
    Black: THREE.MeshStandardMaterial;
    Screen: THREE.MeshStandardMaterial;
  };
};

export default function Model(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/models/android.gltf") as GLTFResult;

  const model = useRecoilValue(modelAtom);

  const texture: any = useLoader(
    THREE.TextureLoader,
    model.image.src as string
  );

  /* SCREEN MOCKUP */
  const image = model.image;
  texture.center.set(0.5, 0.5);

  texture.rotation = Math.PI / 2;

  texture.repeat.set(
    4.25 + image.width / IMAGE_SETTINGS.dimensionDivider,
    -4.1 + image.height / IMAGE_SETTINGS.dimensionDivider
  );

  texture.offset.set(
    -1.6 + image.x / IMAGE_SETTINGS.positionDivider,
    0 + image.y / IMAGE_SETTINGS.positionDivider
  );

  return (
    <group
      {...props}
      rotation={[model.position.y, model.position.x, 0]}
      dispose={null}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Phone.geometry}
        material={materials.Body}
        rotation={[0, Math.PI / 2, 0]}
      >
        <meshStandardMaterial
          color={model.color}
          roughness={model.bodyReflection}
        />
      </mesh>
      {model.screenReflection && (
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Glass.geometry}
          material={materials.Glas}
          rotation={[0, Math.PI / 2, 0]}
        >
          <meshStandardMaterial
            attach={"mateial"}
            {...materials.Glas}
            transparent
            opacity={model.screenAlphaReflection}
          />
        </mesh>
      )}
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.camerahole.geometry}
        material={materials.Black}
        position={[0, 3.4, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.sidebutton1.geometry}
        material={materials.Body}
        position={[1.7, 1.8, 0]}
      >
        <meshStandardMaterial
          color={model.color}
          roughness={model.bodyReflection}
        />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.sidebutton2.geometry}
        material={materials.Body}
        position={[1.7, 0.6, 0]}
        scale={[1, 0.5, 1]}
      >
        <meshStandardMaterial
          color={model.color}
          roughness={model.bodyReflection}
        />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.aroundphone.geometry}
        material={materials.Black}
        rotation={[0, Math.PI / 2, 0]}
      />
      <mesh
        geometry={nodes.Screen001.geometry}
        material={materials.Screen}
        rotation={[0, Math.PI / 2, 0]}
      >
        <meshBasicMaterial attach="material" map={texture} />
      </mesh>
    </group>
  );
}

useGLTF.preload("/models/android.gltf");
