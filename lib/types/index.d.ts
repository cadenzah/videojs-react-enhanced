declare module 'videojs-react-enhanced' {
  import { VideoJsPlayer } from 'video.js';

  namespace Player {
    export interface IIndexableObject {
      [key: string]: any;
    }
      
    export interface IVideoJsPlayer extends VideoJsPlayer {
      [key: string]: any;
    }
      
    export interface IPlayerOptions {
      autoplay?: 'muted' | 'play' | 'any';
      controls?: boolean;
      height?: number;
      loop?: boolean;
      muted?: boolean;
      playsinline?: boolean;
      preload?: 'auto' | 'metadata' | 'none';
      src?: string;
      width?: number;
    }

    export interface IResources {
      sources?: Array<videojs.Tech.SourceObject>;
      poster?: string;
    }

    export interface IVideoJsOptions {
      aspectRatio?: string;
      fluid?: boolean;
      inactivityTimeout?: number;
      language?: string;
      // liveui?: boolean;
      nativeControlsForTouch?: boolean;
      notSupportedMessage?: string;
      playbackRates?: Array<number>;
      plugins?: Array<IVideoJsPlugin>;
    }

    export interface IVideoJsPlugin {
      name: string;
      plugin?: (option: object) => void;
      options: object;
    }

    export interface PlayerProps {
      playerOptions?: IPlayerOptions;
      resources?: IResources;
      videojsOptions?: IVideoJsOptions;
      hideList?: Array<string>;

      // Custom Event Handlers
      onReady?: (player: VideoJsPlayer) => void;
      onPlay?: (event: EventTarget, player: VideoJsPlayer, currentTimeSecond: number) => void;
      onPause?: (event: EventTarget, player: VideoJsPlayer, currentTimeSecond: number) => void;
      onWaiting?: (event: EventTarget, player: VideoJsPlayer, currentTimeSecond: number) => void;
      onPlaying?: (event: EventTarget, player: VideoJsPlayer, currentTimeSecond: number) => void;
      onTimeUpdate?: (event: EventTarget, player: VideoJsPlayer, currentTimeSecond: number) => void;
      onSeeking?: (event: EventTarget, player: VideoJsPlayer, startTimeSecond: number) => void;
      onSeeked?: (event: EventTarget, player: VideoJsPlayer, startTimeSecond: number, finishTimeSecond: number) => void;
      onEnded?: (event: EventTarget, player: VideoJsPlayer) => void;
      onError?: (error: MediaError, player: VideoJsPlayer) => void;
      onLoadedData?: (event: EventTarget, player: VideoJsPlayer) => void;
      onLoadedMetadata?: (event: EventTarget, player: VideoJsPlayer) => void;
    }
  }
}
