import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef, useEffect } from 'react';
import { Group, SkinnedMesh, Audio as ThreeAudio } from 'three';
import { useBlinkAnimation } from '../hooks/useBlinkAnimation';
import { AvatarControls } from './AvatarControls';
import { useAvatarStore } from '../store/useAvatarStore';

export function AvatarModel() {
  const group = useRef<Group>(null);
  const audioRef = useRef<ThreeAudio>();
  const { scene } = useGLTF('https://models.readyplayer.me/6762a9194b12e41cea3e0bef.glb');
  const { audioUrl, visemeData, isPlaying, setIsPlaying } = useAvatarStore();

  // Clone the scene to avoid sharing morphTargetInfluences between instances
  const clonedScene = scene.clone();
  
  useBlinkAnimation(group);

  useEffect(() => {
    if (audioUrl && isPlaying) {
      const audioLoader = new ThreeAudio.AudioLoader();
      audioLoader.load(audioUrl, (buffer) => {
        if (audioRef.current) {
          audioRef.current.setBuffer(buffer);
          audioRef.current.play();
          audioRef.current.onEnded = () => setIsPlaying(false);
        }
      });
    }
  }, [audioUrl, isPlaying]);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;

      // Apply lip sync if playing
      if (isPlaying && visemeData.length > 0) {
        const currentTime = state.clock.elapsedTime;
        const currentViseme = visemeData.find(v => v.time <= currentTime);
        if (currentViseme) {
          const headMesh = group.current.children[0].children.find(
            child => child.name === 'Wolf3D_Head'
          ) as SkinnedMesh;
          
          if (headMesh?.morphTargetDictionary && headMesh?.morphTargetInfluences) {
            // Apply viseme morph target
            const visemeIndex = headMesh.morphTargetDictionary[currentViseme.value];
            if (visemeIndex !== undefined) {
              headMesh.morphTargetInfluences[visemeIndex] = 1;
            }
          }
        }
      }
    }
  });

  return (
    <>
      <group ref={group}>
        <primitive object={clonedScene} scale={2} position={[0, -2, 0]} />
      </group>
      <AvatarControls modelRef={group} />
    </>
  );
}