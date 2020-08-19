import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import videojs, { VideoJsPlayer } from 'video.js';
import {
  initializeEventListeners,
  initializePlayerComponentsDisplay,
} from './utils/index';
import 'video.js/dist/video-js.css';

function Player(props: Player.PlayerProps):JSX.Element {
  // plugins 배열을 한번 전처리
  // import를 통하여 register가 이미 이루어졌고, 옵션 초기화만 하면 되는 경우를 plugins에 남기고
  // 직접 register 및 실행까지 진행해야 하는 상황이면 manualPlugins에 놔두어서 별도의 등록 및 초기화 과정을 걸친다
  // plugins는 전처리 이후 그대로 players 옵션에 포함시킨다
    // plugins: {
      // 플러그인 이름: { 옵션 객체 }
    // }
  // 만약 plugins가 빈 배열이라면, undefined로 만든다
  let plugins: Player.IIndexableObject | undefined;
  const tempPlugins: Player.IIndexableObject = { };
  const manualPlugins: Array<Player.IVideoJsPlugin> = [];
  props.videojsOptions?.plugins && props.videojsOptions.plugins.map(element => {
    if (element.plugin === undefined) {
      // 이미 plugin의 register 끝남
      tempPlugins[element.name] = element.options;
    } else {
      manualPlugins.push(element);
    }
  });
  plugins = (Object.keys(tempPlugins).length === 0) ? undefined : tempPlugins;

  const playerOptions: videojs.PlayerOptions = {
    ...props.playerOptions,
    ...props.resources,
    ...props.videojsOptions,
    plugins,
  };
  let playerRef = useRef<HTMLVideoElement>(null);
  let player: Player.IVideoJsPlayer;

  useEffect(() => { 
    player = videojs(
      playerRef.current,
      playerOptions
    );

    const videoSrc = props.playerOptions?.src
    videoSrc && player.src(videoSrc);
    const videoPoster = props.resources?.poster
    videoPoster && player.poster(videoPoster);
    props.onReady && props.onReady(player);

    initializePlayerComponentsDisplay(player, props.hideList);
    initializeEventListeners(player, props);
    
    // Registration and Option initialization of new plugin
    manualPlugins.map(element => {
      element.plugin && videojs.registerPlugin(
        element.name,
        element.plugin,
      );
      player[element.name](player, element.options);
    });

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
    plugins: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      plugin: PropTypes.func,
      options: PropTypes.object,
    }))
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
  playerOptions: {
    src: "",
    hideList: [],
  },
  resources: {
    sources: [],
    poster: "",
  },
  videojsOptions: {
    plugins: [],
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
