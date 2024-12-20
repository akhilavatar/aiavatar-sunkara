import { useControls, button } from 'leva';
import { useCallback } from 'react';
import { Group, SkinnedMesh } from 'three';
import { facialExpressions } from '../data/facialExpressions';

interface AvatarControlsProps {
  modelRef: React.RefObject<Group>;
}

export function AvatarControls({ modelRef }: AvatarControlsProps) {
  const applyMorphTargets = useCallback((expressions: Record<string, number>) => {
    if (!modelRef.current) return;
    
    // Find the Wolf3D_Head mesh which contains the morph targets
    const headMesh = modelRef.current.children[0].children.find(
      child => child.name === 'Wolf3D_Head'
    ) as SkinnedMesh;

    if (!headMesh?.morphTargetDictionary || !headMesh?.morphTargetInfluences) {
      console.warn('Head mesh or morph targets not found');
      return;
    }

    // Reset all morph targets first
    headMesh.morphTargetInfluences.fill(0);

    // Apply new expressions
    Object.entries(expressions).forEach(([name, value]) => {
      const index = headMesh.morphTargetDictionary[name];
      if (index !== undefined) {
        headMesh.morphTargetInfluences[index] = value;
      }
    });
  }, [modelRef]);

  useControls('Expressions', {
    'Reset': button(() => applyMorphTargets({})),
    'Smile': button(() => applyMorphTargets(facialExpressions.smile)),
    'Funny Face': button(() => applyMorphTargets(facialExpressions.funnyFace)),
    'Sad': button(() => applyMorphTargets(facialExpressions.sad)),
    'Surprised': button(() => applyMorphTargets(facialExpressions.surprised)),
    'Angry': button(() => applyMorphTargets(facialExpressions.angry)),
    'Crazy': button(() => applyMorphTargets(facialExpressions.crazy)),
  });

  return null;
}