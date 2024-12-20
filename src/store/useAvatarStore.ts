import { create } from 'zustand';

interface AvatarState {
  isPlaying: boolean;
  audioUrl: string | null;
  visemeData: Array<{ time: number; value: string }>;
  setIsPlaying: (playing: boolean) => void;
  setAudioUrl: (url: string | null) => void;
  setVisemeData: (data: Array<{ time: number; value: string }>) => void;
}

export const useAvatarStore = create<AvatarState>((set) => ({
  isPlaying: false,
  audioUrl: null,
  visemeData: [],
  setIsPlaying: (playing) => set({ isPlaying: playing }),
  setAudioUrl: (url) => set({ audioUrl: url }),
  setVisemeData: (data) => set({ visemeData: data }),
}));