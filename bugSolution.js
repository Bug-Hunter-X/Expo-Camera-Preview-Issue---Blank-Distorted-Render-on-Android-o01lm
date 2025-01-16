The core problem was that the camera wasn't properly restarting after lifecycle events or mode changes.  This solution uses `useEffect` and a ref to manage the camera object.  When the component updates or after a mode switch, the camera is stopped and restarted to ensure a clean refresh.  Note the asynchronous nature of the camera functions.

```javascript
import * as React from 'react';
import { Camera, CameraType } from 'expo-camera';
import { useState, useRef, useEffect } from 'react';

const App = () => {
  const [type, setType] = useState(CameraType.back);
  const [hasPermission, setHasPermission] = useState(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const switchCamera = () => {
    setType(type === CameraType.back ? CameraType.front : CameraType.back);
    if (cameraRef.current) {
      cameraRef.current.stopRecording(); // Stop recording if necessary
      cameraRef.current.pausePreview(); // Pause the preview
      cameraRef.current.resumePreview(); // Restart preview
    }
  };

  if (hasPermission === null) {
    return <View><Text>Requesting permissions...</Text></View>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={type} ref={cameraRef}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
          }}>
          <TouchableOpacity style={{ flex: 0.1, backgroundColor: 'red' }} onPress={switchCamera}>
            <Text>Flip Camera</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
};
export default App; 
```