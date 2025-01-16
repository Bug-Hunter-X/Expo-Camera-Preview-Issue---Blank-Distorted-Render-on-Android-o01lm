# Expo Camera Preview Issue

This repository demonstrates a bug encountered when using the Expo Camera API on Android. The camera preview intermittently displays a blank screen or a distorted image, particularly after component lifecycle events (like screen rotation) or changes in camera modes (switching between front and back cameras).

## Reproducing the Issue

1. Clone the repository.
2. Run `expo start`.
3. Observe the camera preview.  The issue may not appear immediately; try rotating the device or switching camera modes.

## Potential Causes and Solutions (see bugSolution.js)

The root cause appears to be related to how the Expo Camera component handles lifecycle events and state updates in conjunction with Android's camera hardware.  The solution involves more careful state management and using techniques to ensure the Camera component is properly re-initialized when needed.  See `bugSolution.js` for implementation details.