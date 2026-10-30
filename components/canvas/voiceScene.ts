import type { CanvasFrame, CanvasScene } from "@/lib/canvas";

/*
 * Igris's three states drawn as a ring of ink strokes whose lengths follow an amplitude envelope.
 * TODO: Abdullah to supply a real recorded phrase; replace `buildAmplitudes` with its sampled
 * RMS values (256 points, 0–1). Until then the envelope below is synthesised and deterministic.
 */

const STROKE_COUNT = 120;
const AMPLITUDE_SAMPLES = 256;
const IDLE_MS = 2600;
const LISTENING_MS = 4200;
const SPEAKING_MS = 4200;
const CYCLE_MS = IDLE_MS + LISTENING_MS + SPEAKING_MS;
const TOOL_CALL_AT_MS = 1400; // Into the speaking state.
const TOOL_CALL_MS = 700;
const TOOL_CALL_STROKE = 18;

type VoiceState = "idle" | "listening" | "speaking";

function buildAmplitudes() {
  const amplitudes = new Float32Array(AMPLITUDE_SAMPLES);

  for (let index = 0; index < AMPLITUDE_SAMPLES; index += 1) {
    const position = index / AMPLITUDE_SAMPLES;
    // Four "words" separated by short pauses, each with a syllable ripple.
    const word = Math.max(0, Math.sin(position * Math.PI * 4));
    const syllable = 0.55 + 0.45 * Math.abs(Math.sin(position * Math.PI * 26));
    amplitudes[index] = word * syllable;
  }

  return amplitudes;
}

export function createVoiceScene(): CanvasScene {
  const amplitudes = buildAmplitudes();
  const cosines = new Float32Array(STROKE_COUNT);
  const sines = new Float32Array(STROKE_COUNT);

  for (let stroke = 0; stroke < STROKE_COUNT; stroke += 1) {
    const angle = (stroke / STROKE_COUNT) * Math.PI * 2 - Math.PI / 2;
    cosines[stroke] = Math.cos(angle);
    sines[stroke] = Math.sin(angle);
  }

  let cachedWidth = -1;
  let labelFont = "";

  function stateAt(cycleTime: number): VoiceState {
    if (cycleTime < IDLE_MS) {
      return "idle";
    }

    return cycleTime < IDLE_MS + LISTENING_MS ? "listening" : "speaking";
  }

  function strokeAmplitude(state: VoiceState, stroke: number, cycleTime: number) {
    if (state === "idle") {
      return 0.04 + 0.02 * Math.sin(stroke * 0.5 + cycleTime * 0.002);
    }

    // Listening scrolls the envelope slowly; speaking reads it faster and offset, so the rhythms differ.
    const speed = state === "listening" ? 0.018 : 0.034;
    const offset = state === "listening" ? 0 : 97;
    const sample = Math.floor(stroke * 2 + offset + cycleTime * speed) % AMPLITUDE_SAMPLES;
    const scale = state === "listening" ? 0.85 : 0.6;

    return 0.04 + amplitudes[sample] * scale;
  }

  function render(frame: CanvasFrame, cycleTime: number) {
    const { context, width, height, palette, fonts } = frame;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) * 0.2;
    const maxLength = Math.min(width, height) * 0.24;
    const state = stateAt(cycleTime);
    const speakingTime = cycleTime - IDLE_MS - LISTENING_MS;
    const isToolCall =
      state === "speaking" &&
      speakingTime >= TOOL_CALL_AT_MS &&
      speakingTime < TOOL_CALL_AT_MS + TOOL_CALL_MS;

    if (cachedWidth !== width) {
      cachedWidth = width;
      labelFont = `400 ${width < 480 ? 11 : 12}px ${fonts.mono}`;
    }

    context.lineCap = "butt";
    context.lineWidth = 1;
    context.strokeStyle = palette.ink;
    context.beginPath();

    for (let stroke = 0; stroke < STROKE_COUNT; stroke += 1) {
      if (isToolCall && stroke === TOOL_CALL_STROKE) {
        continue;
      }

      const length = strokeAmplitude(state, stroke, cycleTime) * maxLength;
      context.moveTo(centerX + cosines[stroke] * radius, centerY + sines[stroke] * radius);
      context.lineTo(
        centerX + cosines[stroke] * (radius + length),
        centerY + sines[stroke] * (radius + length)
      );
    }

    context.stroke();

    if (isToolCall) {
      const length = maxLength;
      context.strokeStyle = palette.signal;
      context.lineWidth = 2;
      context.beginPath();
      context.moveTo(
        centerX + cosines[TOOL_CALL_STROKE] * radius,
        centerY + sines[TOOL_CALL_STROKE] * radius
      );
      context.lineTo(
        centerX + cosines[TOOL_CALL_STROKE] * (radius + length),
        centerY + sines[TOOL_CALL_STROKE] * (radius + length)
      );
      context.stroke();
    }

    context.font = labelFont;
    context.fillStyle = palette.muted;
    context.textAlign = "left";
    context.textBaseline = "alphabetic";
    context.fillText(isToolCall ? "speaking · tool call" : state, 0, height - 4);
  }

  return {
    draw: (frame) => {
      render(frame, frame.elapsed % CYCLE_MS);
      return false;
    },
    // The still frame is the moment the tool call fires — the point of the whole agent.
    drawFinal: (frame) => render(frame, IDLE_MS + LISTENING_MS + TOOL_CALL_AT_MS + TOOL_CALL_MS / 2)
  };
}
