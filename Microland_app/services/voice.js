import * as Speech from "expo-speech";

export function speak(text) {
  if (!text) return;
  Speech.speak(text);
}

// Placeholder for hackathon demo.
// For real voice-to-text, integrate react-native-voice or Expo compatible speech input.
export async function mockVoiceInput() {
  return "I have fever and headache";
}
