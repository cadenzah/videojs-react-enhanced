import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import videojs, { VideoJsPlayer } from 'video.js';
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
  playerOptions?: IPlayerOptions;
  resources?: IResources;
  videojsOptions?: IVideojsOptions;
  hideList: Array<string>;

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

interface IDefaultControlBar extends videojs.ControlBar {
  currentTimeDisplay?: videojs.Component;
  pictureInPictureToggle?: videojs.Component;
  playbackRateMenuButton?: videojs.Component;
  playToggle?: videojs.Component;
  progressControl?: videojs.Component;
  remainingTimeDisplay?: videojs.Component;
  volumePanel?: videojs.Component;
}

// props로 전달된 각 이벤트 리스너들을 대응되는 이벤트가 발생시 실행되도록 초기화
function initializeEventListeners(props: PlayerProps): void {

}

// props로 전달된 스트링 값들을 파싱하여, 플레이어 UI 중 일부를 가려버린다

function initializePlayerComponentsDisplay(player: VideoJsPlayer, hideList: Array<string>): void {
  const hideSet: Set<string> = new Set<string>();
  hideList.map((el) => {
    hideSet.add(el);
  })

  const controlBar: IDefaultControlBar = player.controlBar;
  
  const remainingTimeDisplay = controlBar.remainingTimeDisplay;
  if (hideSet.has('remainingTimeDisplay'))
    remainingTimeDisplay?.hide();
  
  const pictureInPictureToggle = controlBar.pictureInPictureToggle;
  if (hideSet.has('pictureInPictureToggle'))
    pictureInPictureToggle?.hide();
  
  const playbackRateMenuButton = controlBar.playbackRateMenuButton;
  if (hideSet.has('playbackRateMenuButton'))
    playbackRateMenuButton?.hide();    

  const playToggle = controlBar.playToggle;
  if (hideSet.has('playToggle'))
    playToggle?.hide();

  const progressControl = controlBar.progressControl;
  if (hideSet.has('progressControl'))
    progressControl?.hide();

  const volumePanel = controlBar.volumePanel;
  if (hideSet.has('volumePanel'))
    volumePanel?.hide();
}

function Player(props: PlayerProps):JSX.Element {
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
      playerOptions
    );

    initializePlayerComponentsDisplay(player, props.hideList)
    // const controlBar: IDefaultControlBar = player.controlBar;

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
  hideList: PropTypes.arrayOf(PropTypes.string).isRequired,

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

Player.defaultProps = {
  hideList: [],
}

export { 
  IPlayerOptions,
  IResources,
  IVideojsOptions,
}
export default Player
