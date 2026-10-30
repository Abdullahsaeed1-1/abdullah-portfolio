"use client";

import { useEffect, useRef } from "react";
import {
  AdditiveBlending,
  BufferGeometry,
  Color,
  Float32BufferAttribute,
  Group,
  LineBasicMaterial,
  LineSegments,
  PerspectiveCamera,
  Points,
  PointsMaterial,
  Scene,
  WebGLRenderer
} from "three";

import { themeTokens } from "@/constants/theme";

const NODE_COUNT = 140;
const CONNECTION_DISTANCE = 0.62;
const SHELL_RADIUS = 1.6;
const MAX_PIXEL_RATIO = 1.5;
const ROTATION_SPEED = 0.045;
const POINTER_INFLUENCE = 0.18;

function tokenToColor(rgbToken: string) {
  const [red, green, blue] = rgbToken.split(" ").map((channel) => Number(channel) / 255);

  return new Color(red, green, blue);
}

// Nodes sit on a fibonacci sphere so the network looks deliberate rather than random noise.
function createNodePositions() {
  const positions: number[] = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));

  for (let index = 0; index < NODE_COUNT; index += 1) {
    const y = 1 - (index / (NODE_COUNT - 1)) * 2;
    const ringRadius = Math.sqrt(1 - y * y);
    const theta = goldenAngle * index;
    const jitter = 0.86 + ((index * 37) % 17) / 100;

    positions.push(
      Math.cos(theta) * ringRadius * SHELL_RADIUS * jitter,
      y * SHELL_RADIUS * jitter,
      Math.sin(theta) * ringRadius * SHELL_RADIUS * jitter
    );
  }

  return positions;
}

function createConnectionPositions(nodePositions: readonly number[]) {
  const connections: number[] = [];

  for (let first = 0; first < NODE_COUNT; first += 1) {
    for (let second = first + 1; second < NODE_COUNT; second += 1) {
      const deltaX = nodePositions[first * 3] - nodePositions[second * 3];
      const deltaY = nodePositions[first * 3 + 1] - nodePositions[second * 3 + 1];
      const deltaZ = nodePositions[first * 3 + 2] - nodePositions[second * 3 + 2];

      if (Math.hypot(deltaX, deltaY, deltaZ) < CONNECTION_DISTANCE) {
        connections.push(...nodePositions.slice(first * 3, first * 3 + 3));
        connections.push(...nodePositions.slice(second * 3, second * 3 + 3));
      }
    }
  }

  return connections;
}

function buildNetwork() {
  const nodePositions = createNodePositions();
  const network = new Group();

  const nodeGeometry = new BufferGeometry();
  nodeGeometry.setAttribute("position", new Float32BufferAttribute(nodePositions, 3));
  const nodeMaterial = new PointsMaterial({
    color: tokenToColor(themeTokens.accent.cyan),
    size: 0.035,
    transparent: true,
    opacity: 0.9,
    blending: AdditiveBlending,
    depthWrite: false
  });

  const lineGeometry = new BufferGeometry();
  lineGeometry.setAttribute("position", new Float32BufferAttribute(createConnectionPositions(nodePositions), 3));
  const lineMaterial = new LineBasicMaterial({
    color: tokenToColor(themeTokens.accent.blue),
    transparent: true,
    opacity: 0.22,
    blending: AdditiveBlending,
    depthWrite: false
  });

  network.add(new Points(nodeGeometry, nodeMaterial), new LineSegments(lineGeometry, lineMaterial));

  return {
    network,
    dispose() {
      nodeGeometry.dispose();
      nodeMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
    }
  };
}

export default function HeroScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const renderer = new WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, MAX_PIXEL_RATIO));
    container.appendChild(renderer.domElement);

    const scene = new Scene();
    const camera = new PerspectiveCamera(42, 1, 0.1, 50);
    camera.position.z = 5;

    const { network, dispose } = buildNetwork();
    scene.add(network);

    const pointerTarget = { x: 0, y: 0 };
    let animationFrameId = 0;
    let isVisible = true;
    let lastTimestamp = performance.now();

    function resize() {
      const { clientWidth, clientHeight } = container!;
      renderer.setSize(clientWidth, clientHeight, false);
      camera.aspect = clientWidth / Math.max(clientHeight, 1);
      camera.updateProjectionMatrix();
    }

    function renderFrame(timestamp: number) {
      animationFrameId = 0;
      const elapsedSeconds = Math.min((timestamp - lastTimestamp) / 1000, 0.1);
      lastTimestamp = timestamp;

      network.rotation.y += ROTATION_SPEED * elapsedSeconds;
      // Ease toward the pointer so the camera drifts instead of snapping.
      network.rotation.x += (pointerTarget.y * POINTER_INFLUENCE - network.rotation.x) * 0.04;
      network.position.x += (pointerTarget.x * POINTER_INFLUENCE - network.position.x) * 0.04;
      renderer.render(scene, camera);

      if (isVisible && document.visibilityState === "visible") {
        animationFrameId = requestAnimationFrame(renderFrame);
      }
    }

    function startLoop() {
      if (animationFrameId === 0 && isVisible) {
        lastTimestamp = performance.now();
        animationFrameId = requestAnimationFrame(renderFrame);
      }
    }

    function handlePointerMove(event: PointerEvent) {
      pointerTarget.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointerTarget.y = (event.clientY / window.innerHeight) * 2 - 1;
    }

    // Stop rendering entirely once the hero scrolls out of view.
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry?.isIntersecting ?? false;
      startLoop();
    });
    const resizeObserver = new ResizeObserver(resize);

    resize();
    visibilityObserver.observe(container);
    resizeObserver.observe(container);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("visibilitychange", startLoop);
    startLoop();

    return () => {
      cancelAnimationFrame(animationFrameId);
      visibilityObserver.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("visibilitychange", startLoop);
      dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={containerRef} className="size-full [&>canvas]:size-full" />;
}
