declare module 'video-react-enhanced' {
  import videojs, { VideoJsPlayer, Tech, ControlBar, Component } from 'video.js';

  interface IPlayerOptions {
    autoplay?: 'muted' | 'play' | 'any';
    controls?: boolean;
    height?: number;
    loop?: boolean;
    muted?: boolean;
    preload?: 'auto' | 'metadata' | 'none';
    width?: number;
  }
  
  interface IResources {
    sources?: Array<Tech.SourceObject>;
    poster?: string;
  }
  
  interface IVideoJsOptions {
    aspectRatio?: string;
    fluid?: boolean;
    inactivityTimeout?: number;
    language?: string;
    // liveui?: boolean;
    nativeControlsForTouch?: boolean;
    notSupportedMessage?: string;
    playbackRates?: Array<number>;
  }
  
  interface PlayerProps {
    playerOptions?: IPlayerOptions;
    resources?: IResources;
    videojsOptions?: IVideoJsOptions;
    hideList: Array<string>;
  
    // Custom Event Handlers
    onReady: (player: VideoJsPlayer) => void;
    onPlay: (event: EventTarget, player: VideoJsPlayer, currentTimeSecond: number) => void;
    onPause: (event: EventTarget, player: VideoJsPlayer, currentTimeSecond: number) => void;
    onWaiting: (event: EventTarget, player: VideoJsPlayer, currentTimeSecond: number) => void;
    onTimeUpdate: (event: EventTarget, player: VideoJsPlayer, currentTimeSecond: number) => void;
    onSeeking: (event: EventTarget, player: VideoJsPlayer, startTimeSecond: number) => void;
    onSeeked: (event: EventTarget, player: VideoJsPlayer, startTimeSecond: number, finishTimeSecond: number) => void;
    onEnded: (event: EventTarget, player: VideoJsPlayer) => void;
    onError: (error: MediaError, player: VideoJsPlayer) => void;
    onLoadedData: (event: EventTarget, player: VideoJsPlayer) => void;
    onLoadedMetadata: (event: EventTarget, player: VideoJsPlayer) => void;
  }
}
