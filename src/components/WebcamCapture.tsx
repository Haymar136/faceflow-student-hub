
import React, { useRef, useState, useCallback, useEffect } from 'react';
import Webcam from 'react-webcam';

interface WebcamCaptureProps {
  onCapture?: (imageSrc: string | null) => void;
  showControls?: boolean;
  isAttendanceMode?: boolean;
}

const WebcamCapture: React.FC<WebcamCaptureProps> = ({ 
  onCapture,
  showControls = true,
  isAttendanceMode = false
}) => {
  const webcamRef = useRef<Webcam | null>(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [faceDetected, setFaceDetected] = useState(false);
  
  // In a real application, this would be connected to a face detection library
  useEffect(() => {
    if (isAttendanceMode && isCameraReady) {
      // Simulate face detection
      const interval = setInterval(() => {
        setFaceDetected(Math.random() > 0.3); // Randomly toggle for demo purposes
      }, 1500);
      
      return () => clearInterval(interval);
    }
  }, [isAttendanceMode, isCameraReady]);
  
  const captureImage = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (onCapture) {
        onCapture(imageSrc);
      }
    }
  }, [onCapture]);

  const handleUserMedia = () => {
    setIsCameraReady(true);
  };

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
  };

  return (
    <div className="space-y-4">
      <div className="webcam-container">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
          className="w-full h-full object-cover"
          onUserMedia={handleUserMedia}
        />
        <div className="webcam-overlay animate-pulse"></div>
        
        {isAttendanceMode && isCameraReady && faceDetected && (
          <div className="face-detection-indicator animate-fade-in">
            <span className="h-2 w-2 bg-green-400 rounded-full"></span>
            Face Detected
          </div>
        )}
      </div>
      
      {showControls && (
        <div className="flex justify-center">
          <button
            onClick={captureImage}
            disabled={!isCameraReady}
            className="px-4 py-2 bg-faceflow-600 text-white font-medium rounded-lg hover:bg-faceflow-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Capture Photo
          </button>
        </div>
      )}
    </div>
  );
};

export default WebcamCapture;
