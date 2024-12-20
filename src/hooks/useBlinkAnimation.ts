import { useEffect, useRef } from 'react';
import { Group, SkinnedMesh } from 'three';

export function useBlinkAnimation(modelRef: React.RefObject<Group>) {
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const blink = () => {
      if (!modelRef.current) return;

      // Find the Wolf3D_Head mesh
      const headMesh = modelRef.current.children[0].children.find(
        child => child.name === 'Wolf3D_Head'
      ) as SkinnedMesh;

      if (!headMesh?.morphTargetDictionary || !headMesh?.morphTargetInfluences) return;

      const blinkIndex = headMesh.morphTargetDictionary['eyesClosed'];
      if (blinkIndex === undefined) return;

      // Quick blink animation
      headMesh.morphTargetInfluences[blinkIndex] = 1;
      setTimeout(() => {
        if (headMesh.morphTargetInfluences) {
          headMesh.morphTargetInfluences[blinkIndex] = 0;
        }
      }, 150);

      // Schedule next blink
      const nextBlinkDelay = Math.random() * 4000 + 1000; // Random delay between 1-5 seconds
      timeoutRef.current = setTimeout(blink, nextBlinkDelay);
    };

    // Start blinking
    blink();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [modelRef]);
}