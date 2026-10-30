"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import {
  BoxGeometry,
  CatmullRomCurve3,
  Color,
  type MeshBasicMaterial,
  TubeGeometry,
  Vector3
} from "three";

import { colorTokens, themePalettes } from "@/lib/tokens";

/*
 * The only 3D on the site (CLAUDE.md §6): one ribbon the camera follows as the visitor scrolls.
 * Flat unlit material, no lights, no post-processing, no controls, and frameloop="demand" so it
 * renders only when the scroll position changes.
 */

const CURVE_POINTS = 24;
const VERTICAL_STEP = 1.4;
const CAMERA_DISTANCE = 4.2;
const LOOK_AHEAD = 0.03;
const RIBBON_RADIUS = 0.012;
const NODE_SIZE = 0.09;

interface ThreadColors {
  readonly ink: string;
  readonly signal: string;
}

function buildCurve() {
  const points: Vector3[] = [];

  for (let index = 0; index < CURVE_POINTS; index += 1) {
    points.push(
      new Vector3(Math.sin(index * 0.55) * 0.9, -index * VERTICAL_STEP, Math.cos(index * 0.4) * 0.7)
    );
  }

  return new CatmullRomCurve3(points);
}

interface ThreadRigProps {
  readonly milestoneCount: number;
  readonly colors: ThreadColors;
  readonly getProgress: () => number;
}

function ThreadRig({ milestoneCount, colors, getProgress }: ThreadRigProps) {
  const { camera, invalidate } = useThree();
  const curve = useMemo(() => buildCurve(), []);
  const ribbon = useMemo(() => new TubeGeometry(curve, 400, RIBBON_RADIUS, 6, false), [curve]);
  const nodeGeometry = useMemo(() => new BoxGeometry(NODE_SIZE, NODE_SIZE, NODE_SIZE), []);
  const nodeMaterials = useRef<(MeshBasicMaterial | null)[]>([]);
  const inkColor = useMemo(() => new Color(colors.ink), [colors.ink]);
  const signalColor = useMemo(() => new Color(colors.signal), [colors.signal]);

  // Milestones sit evenly between 8% and 92% of the thread so the first and last are never at the edge.
  const nodePositions = useMemo(
    () =>
      Array.from({ length: milestoneCount }, (_, index) =>
        curve.getPointAt(0.08 + (index / Math.max(milestoneCount - 1, 1)) * 0.84)
      ),
    [curve, milestoneCount]
  );

  useEffect(() => {
    const lookTarget = new Vector3();
    let lastProgress = -1;

    function update() {
      const progress = 0.08 + getProgress() * 0.84;

      if (Math.abs(progress - lastProgress) < 0.0005) {
        return;
      }

      lastProgress = progress;
      const point = curve.getPointAt(Math.min(progress, 1));
      lookTarget.copy(curve.getPointAt(Math.min(progress + LOOK_AHEAD, 1)));
      camera.position.set(point.x + 0.6, point.y + 0.4, point.z + CAMERA_DISTANCE);
      camera.lookAt(lookTarget);

      const currentIndex = Math.round(((progress - 0.08) / 0.84) * (milestoneCount - 1));
      nodeMaterials.current.forEach((material, index) => {
        material?.color.copy(index === currentIndex ? signalColor : inkColor);
      });

      invalidate();
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [camera, curve, getProgress, inkColor, invalidate, milestoneCount, signalColor]);

  useEffect(
    () => () => {
      ribbon.dispose();
      nodeGeometry.dispose();
    },
    [nodeGeometry, ribbon]
  );

  return (
    <>
      <mesh geometry={ribbon}>
        <meshBasicMaterial color={colors.ink} />
      </mesh>
      {nodePositions.map((position, index) => (
        <mesh key={index} geometry={nodeGeometry} position={position} rotation={[0.4, 0.6, 0]}>
          <meshBasicMaterial
            ref={(material: MeshBasicMaterial | null) => {
              nodeMaterials.current[index] = material;
            }}
            color={colors.ink}
          />
        </mesh>
      ))}
    </>
  );
}

interface JourneyThreadProps {
  readonly milestoneCount: number;
  readonly getProgress: () => number;
}

export default function JourneyThread({ milestoneCount, getProgress }: JourneyThreadProps) {
  // The journey sits in a dark section; the ribbon is cream and the current milestone orange.
  const colors = useMemo<ThreadColors>(
    () => ({ ink: themePalettes.dark.fg, signal: colorTokens.signal }),
    []
  );

  return (
    <Canvas
      aria-hidden="true"
      flat
      frameloop="demand"
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      camera={{ fov: 35, near: 0.1, far: 100, position: [0, 0, CAMERA_DISTANCE] }}
    >
      <ThreadRig milestoneCount={milestoneCount} colors={colors} getProgress={getProgress} />
    </Canvas>
  );
}
