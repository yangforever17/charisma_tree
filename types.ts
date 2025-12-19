export interface OrnamentProps {
  position: [number, number, number];
  color: string;
  scale?: number;
}

export interface TreeLayerProps {
  position: [number, number, number];
  scale: number;
  rotationSpeed?: number;
}

export enum AppState {
  IDLE = 'IDLE',
  GENERATING_WISH = 'GENERATING_WISH',
  SHOWING_WISH = 'SHOWING_WISH',
}