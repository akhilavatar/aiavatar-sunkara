import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { X } from 'lucide-react';
import { AvatarModel } from './AvatarModel';
import { Environment, OrbitControls } from '@react-three/drei';
import { useEscapeKey } from '../hooks/useEscapeKey';
import { ChatInput } from './ChatInput';

interface AvatarPopupProps {
  onClose: () => void;
}

export function AvatarPopup({ onClose }: AvatarPopupProps) {
  useEscapeKey(onClose);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-4xl h-[80vh] bg-gray-900 rounded-lg overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        >
          <X className="w-6 h-6 text-white" />
        </button>
        
        <div className="absolute top-6 left-6 z-10">
          <div className="bg-blue-500 rounded-lg p-4 text-white max-w-sm">
            <h2 className="text-xl font-bold mb-2">Welcome to your AI virtual girlfriend!</h2>
            <p className="text-sm opacity-90 leading-relaxed">
              I'm here to keep you company, chat with you, and help with whatever you need. Whether you want to talk about anything on your mind or explore new conversations, I'm always here to listen. Let's get started!
            </p>
          </div>
        </div>

        <div className="absolute bottom-6 left-6 right-6 z-10">
          <ChatInput />
        </div>

        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <Suspense fallback={null}>
            <AvatarModel />
            <Environment preset="city" />
            <OrbitControls
              enablePan={false}
              enableZoom={false}
              minPolarAngle={Math.PI / 2.5}
              maxPolarAngle={Math.PI / 2.5}
            />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}