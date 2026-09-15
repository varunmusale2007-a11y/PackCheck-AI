"use client";

import { useEffect, useRef, useState } from "react";
import { Camera, X, RefreshCw, Check } from "lucide-react";

interface CameraModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCapture: (file: File) => void;
}

export default function CameraModal({ isOpen, onClose, onCapture }: CameraModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<"environment" | "user">("environment");

  useEffect(() => {
    if (!isOpen) {
      stopCamera();
      return;
    }

    startCamera();

    return () => {
      stopCamera();
    };
  }, [isOpen, facingMode]);

  const startCamera = async () => {
    setError(null);
    try {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: facingMode, width: { ideal: 1920 }, height: { ideal: 1080 } },
        audio: false,
      });

      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err: any) {
      console.error("Camera access error:", err);
      setError("Unable to access camera. Please allow camera permissions or upload an image file.");
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  const handleCapture = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;

    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 720;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], `label_capture_${Date.now()}.jpg`, {
            type: "image/jpeg",
          });
          onCapture(file);
          onClose();
        }
      }, "image/jpeg", 0.95);
    }
  };

  const toggleFacingMode = () => {
    setFacingMode((prev) => (prev === "environment" ? "user" : "environment"));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="relative w-full max-w-xl bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-800">
        {/* Header */}
        <div className="p-4 flex items-center justify-between border-b border-slate-800 text-white">
          <div className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-sky-400" />
            <h3 className="font-semibold text-sm">Capture Product Label</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Viewport */}
        <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
          {error ? (
            <div className="p-6 text-center text-rose-400 text-xs max-w-sm">
              <p>{error}</p>
            </div>
          ) : (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-contain"
            />
          )}

          {/* Guide Overlay */}
          <div className="absolute inset-8 border-2 border-dashed border-sky-400/40 rounded-xl pointer-events-none flex items-center justify-center">
            <span className="text-[11px] text-sky-300/80 bg-slate-950/60 px-3 py-1 rounded-full backdrop-blur-xs">
              Position mandatory declarations inside frame
            </span>
          </div>
        </div>

        {/* Hidden Canvas for capture */}
        <canvas ref={canvasRef} className="hidden" />

        {/* Controls */}
        <div className="p-4 bg-slate-950 flex items-center justify-between border-t border-slate-800">
          <button
            type="button"
            onClick={toggleFacingMode}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1.5 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Switch Camera</span>
          </button>

          <button
            type="button"
            onClick={handleCapture}
            disabled={!!error}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-emerald-500 hover:from-sky-600 hover:to-emerald-600 text-white font-bold text-sm shadow-lg shadow-sky-500/20 flex items-center gap-2 active:scale-95 transition-all disabled:opacity-50"
          >
            <Camera className="w-4 h-4" />
            <span>Snap Label</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-2 rounded-xl text-slate-400 hover:text-white text-xs transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
