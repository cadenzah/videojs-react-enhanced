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
  onReady: (player: VideoJsPlayer) => void;
  onProgress: (event: EventTarget, player: VideoJsPlayer) => void;
  onPlay: (event: EventTarget, player: VideoJsPlayer) => void;
  onPause: (event: EventTarget, player: VideoJsPlayer) => void;
  onWaiting: (event: EventTarget, player: VideoJsPlayer) => void;
  onTimeUpdate: (event: EventTarget, player: VideoJsPlayer, currentTimeSecond: number) => void;
  onSeeking: (event: EventTarget, player: VideoJsPlayer, startTimeSecond: number) => void;
  onSeeked: (event: EventTarget, player: VideoJsPlayer, startTimeSecond: number, finishTimeSecond: number) => void;
  onEnded: (event: EventTarget, player: VideoJsPlayer) => void;
  onError: (error: MediaError, player: VideoJsPlayer) => void;
  onLoadedData: (event: EventTarget, player: VideoJsPlayer) => void;
  onLoadedMetadata: (event: EventTarget, player: VideoJsPlayer) => void;
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
function initializeEventListeners(player: VideoJsPlayer, props: PlayerProps): void {
  let currentTimeSecond: number = 0;
  let previousTimeSecond: number = 0;
  let startPositionSecond: number = 0;

  player.on('play', () => {

  });

  player.on('progress', () => {

  });

  player.on('pause', () => {
    
  });

  player.on('waiting', () => {
    
  });

  player.on('timeupdate', (e) => {
    // 현재 마우스 커서가 위치한 시점, 재생 중인 시점
    let temp = player.currentTime();
    props.onTimeUpdate(e, player, temp);
    previousTimeSecond = currentTimeSecond;
    currentTimeSecond = temp;
    if (previousTimeSecond < currentTimeSecond) {
        startPositionSecond = previousTimeSecond;
        previousTimeSecond = currentTimeSecond;
    }
  });

  player.on('seeking', (e) => {
    // 탐색을 시작한 시점이 시작 지점
    player.off('timeupdate', () => { });
    player.one('seeked', () => { });
    props.onSeeking(e, player, player.currentTime());
  });

  player.on('seeked', (e) => {
    // 최종적으로 마우스 커서가 멈춘 곳을 기준으로 두 정보 모두 전달
    const completeTimeSecond = player.currentTime();
    props.onSeeked(e, player, startPositionSecond, completeTimeSecond);
  });

  player.on('ended', (e) => {
    props.onEnded(e, player);
  });

  player.on('error', (e) => {
    props.onError(e, player);
  });

  player.on('loadeddata', (e) => {
    props.onLoadedData(e, player);
  });

  player.on('loadedmetadata', (e) => {
    props.onLoadedMetadata(e,player);
  });
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
      playerOptions, () => {
        // Right after the player gets initialized
        props.onReady(player);
      }
    );

    initializePlayerComponentsDisplay(player, props.hideList);

    initializeEventListeners(player, props);

    // const controlBar: IDefaultControlBar = player.controlBar;
    // controlBar.playbackRateMenuButton?.show();

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

  onReady: PropTypes.func.isRequired,
  onProgress: PropTypes.func.isRequired,
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
  onProgress: () => { },
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

export { 
  IPlayerOptions,
  IResources,
  IVideojsOptions,
}
export default Player
