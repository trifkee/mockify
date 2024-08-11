"use client";

import { Suspense, useContext, useEffect, useRef, useState } from "react";

import { Environment, OrbitControls, Stage } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Context from "./ContextProvider.provider";

import Model from "@/ui/components/atoms/Model.atom";
import Lights from "@/ui/components/atoms/Lights.atom";

export default function ModelProvider() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const parentRef = useRef<HTMLDivElement | null>(null);

  const { sceneDocument } = useContext(Context);

  return (
    <div className="model" ref={parentRef}>
      <Suspense fallback={null}>
        <Canvas
          gl={{ preserveDrawingBuffer: true }}
          ref={canvasRef}
          linear
          shadows={sceneDocument.env.castShadow ? true : false}
        >
          {/* TODO:
              ADD LATER BACKGROUND 
        */}
          {/* <color attach="background" args={["#15151a"]} /> */}

          <Lights />
          {sceneDocument.env.castShadow ? (
            <Stage
              environment={sceneDocument.env.preset}
              intensity={sceneDocument.env.intensity}
            >
              <Model />
            </Stage>
          ) : (
            <>
              <Environment preset={sceneDocument.env.preset} />
              <Model />
            </>
          )}

          <OrbitControls enableRotate={false} />
        </Canvas>
      </Suspense>
    </div>
  );
}
