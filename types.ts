export enum Tab {
  CHAT = 'CHAT',
  VISION = 'VISION',
  IMAGE_GEN = 'IMAGE_GEN'
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: number;
  isError?: boolean;
}

export interface VisionResult {
  text: string;
  analyzedImage?: string; // base64
}

export interface GeneratedImage {
  url: string;
  prompt: string;
}
