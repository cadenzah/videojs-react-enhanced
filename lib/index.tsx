import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

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
  sources?: Array<videojs.Tech.SourceObject>;
  poster?: string;
}

interface IVideojsOptions {
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
  playerOptions: IPlayerOptions;
  resources: IResources;
  videojsOptions: IVideojsOptions;

  // Custom Event Handlers
  onProgress?: () => void;
  onPlay?: () => void;
  onPause?: () => void;
  onWaiting?: () => void;
  onTimeUpdate?: () => void;
  onSeeking?: () => void;
  onSeeked?: () => void;
  onEnded?: () => void;
  onError?: () => void;
  onLoadedData?: () => void;
  onLoadedMetadata?: () => void;
}

// props로 전달된 각 이벤트 리스너들을 대응되는 이벤트가 발생시 실행되도록 초기화
function initializeEventListeners(props: PlayerProps): void {

}

function Player(props: PlayerProps):JSX.Element {
  const playerOptions: videojs.PlayerOptions = {
    ...props.playerOptions,
    ...props.resources,
    ...props.videojsOptions,
  };
  let playerRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const player = videojs(
      playerRef.current,
      playerOptions,
      () => {
        if (playerOptions.src !== undefined)
          player.src(playerOptions.src)
      }
    );

    return (): void => {
      if (player)
        player.dispose();
    }
  }, []);

  return (
    <div data-vjs-player>
      <video
        ref={playerRef}
        className={`video-js`}
      />
    </div>
  );
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
  onProgress: PropTypes.func,
  onPlay: PropTypes.func,
  onPause: PropTypes.func,
  onWaiting: PropTypes.func,
  onTimeUpdate: PropTypes.func,
  onSeeking: PropTypes.func,
  onSeeked: PropTypes.func,
  onEnded: PropTypes.func,
  onError: PropTypes.func,
  onLoadedData: PropTypes.func,
  onLoadedMetadata: PropTypes.func,
}

export default Player
