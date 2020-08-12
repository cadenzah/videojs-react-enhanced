import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

// interface PlayerOptionsFromUser extends videojs.PlayerOptions {
//   autoplay?: boolean | 'muted' | 'play' | 'any';
//   controls?: boolean;
//   loop?: boolean;  // 어디에도 없음
//   muted?: boolean; // 어디에도 없음
//   src: string;
//   poster?: string; // Player 인터페이스
//   preload: 'auto' | 'metadata' | 'none';
//   width: string | number;
//   height: string | number;
// }

interface IPlayerOptions extends videojs.PlayerOptions {
  preload?: 'auto' | 'metadata' | 'none';
  autoplay?: 'muted' | 'play' | 'any';
}

interface IResources extends videojs.PlayerOptions {
  sources?: Array<videojs.Tech.SourceObject>;
  poster?: string;
}

// interface IVideojsOptions extends videojs.PlayerOptions

interface PlayerProps {
  playerOptions: IPlayerOptions;
  resources: IResources;
  // videojsOptions: IVideojsOptions;

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
  })
}

export default Player
