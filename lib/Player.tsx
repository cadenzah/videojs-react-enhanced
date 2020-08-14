import { PlayerProps } from 'video-react-enhanced';
import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import videojs, { VideoJsPlayer } from 'video.js';
import {
  initializeEventListeners,
  initializePlayerComponentsDisplay,
} from './utils/index';
import 'video.js/dist/video-js.css';

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

export default Player
