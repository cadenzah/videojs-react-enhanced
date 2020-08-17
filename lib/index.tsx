import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import videojs, { VideoJsPlayer } from 'video.js';
import {
  initializeEventListeners,
  initializePlayerComponentsDisplay,
} from './utils/index';
import 'video.js/dist/video-js.css';

function Player(props: Player.PlayerProps):JSX.Element {
  const playerOptions: videojs.PlayerOptions = {
    ...props.playerOptions,
    ...props.resources,
    ...props.videojsOptions,
  };
  let playerRef = useRef<HTMLVideoElement>(null);
  let player: VideoJsPlayer;

  useEffect(() => { 
    player = videojs(
      playerRef.current,
      playerOptions, () => {
        // Right after the player gets initialized
        const videoSrc = props.playerOptions?.src
        const videoPoster = props.resources?.poster
        if (videoSrc !== undefined)
          player.src(videoSrc);
        if (videoPoster !== undefined)
          player.poster(videoPoster);
        props.onReady && props.onReady(player);
      }
    );

    initializePlayerComponentsDisplay(player, props.hideList);
    initializeEventListeners(player, props);

    return (): void => {
      if (player)
        player.dispose();
    }
  }, []);

  return (
    <div>
      <div data-vjs-player>
        <video
          ref={playerRef}
          className={`video-js`}
        />
      </div>
    </div>
  );
}

namespace Player {
  export interface IPlayerOptions {
    autoplay?: 'muted' | 'play' | 'any';
    controls?: boolean;
    height?: number;
    loop?: boolean;
    muted?: boolean;
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
    onTimeUpdate?: (event: EventTarget, player: VideoJsPlayer, currentTimeSecond: number) => void;
    onSeeking?: (event: EventTarget, player: VideoJsPlayer, startTimeSecond: number) => void;
    onSeeked?: (event: EventTarget, player: VideoJsPlayer, startTimeSecond: number, finishTimeSecond: number) => void;
    onEnded?: (event: EventTarget, player: VideoJsPlayer) => void;
    onError?: (error: MediaError, player: VideoJsPlayer) => void;
    onLoadedData?: (event: EventTarget, player: VideoJsPlayer) => void;
    onLoadedMetadata?: (event: EventTarget, player: VideoJsPlayer) => void;
  }
}

Player.propTypes = {
  playerOptions: PropTypes.shape({
    autoplay: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.oneOf(['muted', 'play', 'any']),
    ]),
    controls: PropTypes.bool,
    height: PropTypes.number,
    loop: PropTypes.bool,
    muted: PropTypes.bool,
    preload: PropTypes.oneOf(['auto', 'metadata', 'none']),
    src: PropTypes.string,
    width: PropTypes.string,
  }),
  resources: PropTypes.shape({
    sources: PropTypes.arrayOf(PropTypes.shape({
      url: PropTypes.string,
      type: PropTypes.string,
    })),
    poster: PropTypes.string,
  }),
  videojsOptions: PropTypes.shape({
    aspectRatio: PropTypes.string,
    fluid: PropTypes.bool,
    inactivityTimeout: PropTypes.number,
    language: PropTypes.string,
    nativeControlsForTouch: PropTypes.bool,
    notSupportedMessage: PropTypes.string,
    playbackRates: PropTypes.arrayOf(PropTypes.number),
  }),
  hideList: PropTypes.arrayOf(PropTypes.string),

  onReady: PropTypes.func.isRequired,
  onPlay: PropTypes.func.isRequired,
  onPause: PropTypes.func.isRequired,
  onWaiting: PropTypes.func.isRequired,
  onTimeUpdate: PropTypes.func.isRequired,
  onSeeking: PropTypes.func.isRequired,
  onSeeked: PropTypes.func.isRequired,
  onEnded: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
  onLoadedData: PropTypes.func.isRequired,
  onLoadedMetadata: PropTypes.func.isRequired,
}

Player.defaultProps = {
  playOptions: {
    src: "",
    hideList: [],
  },
  resources: {
    sources: [],
    poster: "",
  },
  hideList: [],

  onReady: () => { },
  onPlay: () => { },
  onPause: () => { },
  onWaiting: () => { },
  onTimeUpdate: () => { },
  onSeeking: () => { },
  onSeeked: () => { },
  onEnded: () => { },
  onError: () => { },
  onLoadedData: () => { },
  onLoadedMetadata: () => { },
}

export default Player;
