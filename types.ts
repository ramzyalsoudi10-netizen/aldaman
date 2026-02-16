
export enum AppStep {
  REGISTRATION = 'REGISTRATION',
  LOADING_SCREEN = 'LOADING_SCREEN',
  GAME = 'GAME',
  WIN_MODAL = 'WIN_MODAL',
  SHARING = 'SHARING',
  FINAL_VERIFICATION = 'FINAL_VERIFICATION',
  COMPLETED = 'COMPLETED'
}

export interface Comment {
  id: number;
  name: string;
  text: string;
  time: string;
  avatar: string;
}
