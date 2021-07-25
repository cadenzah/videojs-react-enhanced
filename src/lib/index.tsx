import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import {
    initializeEventListeners,
    initializePlayerComponentsDisplay,
    filterPlugins,
    generatePlayerOptions,
    initializePlayer,
} from '@/lib/utils/index';

import videojs, { VideoJsPlayer } from 'video.js';

namespace VideojsReactEnhanced {
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
        sources?: videojs.Tech.SourceObject[];
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
        playbackRates?: number[];
        plugins?: IVideoJsPlugin[];
    }

    export interface IVideoJsPlugin {
        name: string;
        plugin?: (option: object) => void;
        options: object;
    }

    export interface IPlayerProps {
        playerOptions?: IPlayerOptions;
        resources?: IResources;
        videojsOptions?: IVideoJsOptions;
        hideList?: string[];

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

export function VREPlayer(props: VideojsReactEnhanced.IPlayerProps) {
    let playerRef: React.RefObject<HTMLVideoElement> = useRef<HTMLVideoElement>(null);
    let player: VideojsReactEnhanced.IVideoJsPlayer;
    let autoPlugins: VideojsReactEnhanced.IIndexableObject | undefined;
    let manualPlugins: VideojsReactEnhanced.IVideoJsPlugin[] = [];

    if (props.videojsOptions?.plugins !== undefined) {
        [autoPlugins, manualPlugins] = filterPlugins(props.videojsOptions?.plugins);
    }

    const playerOptions: videojs.PlayerOptions = generatePlayerOptions(props, autoPlugins);

    useEffect(() => {
        if (playerRef.current !== null) {
            player = initializePlayer(playerRef.current, playerOptions, manualPlugins);
            initializePlayerComponentsDisplay(player, props.hideList);
            initializeEventListeners(player, props);
            props.onReady && props.onReady(player);
        }

        return (): void => {
            if (player) {
                player.dispose();
                // should deregister plugins here?
            }
        }
    }, []);

    return (
        <div>
            <div data-vjs-player>
                <video ref={playerRef} className={`video-js`} />
            </div>
        </div>
    );
}

// Player.propTypes = {
//   playerOptions: PropTypes.shape({
//     autoplay: PropTypes.oneOfType([
//       PropTypes.bool,
//       PropTypes.oneOf(['muted', 'play', 'any']),
//     ]),
//     controls: PropTypes.bool,
//     height: PropTypes.number,
//     loop: PropTypes.bool,
//     muted: PropTypes.bool,
//     preload: PropTypes.oneOf(['auto', 'metadata', 'none']),
//     src: PropTypes.string,
//     width: PropTypes.string,
//   }),
//   resources: PropTypes.shape({
//     sources: PropTypes.arrayOf(PropTypes.shape({
//       url: PropTypes.string,
//       type: PropTypes.string,
//     })),
//     poster: PropTypes.string,
//   }),
//   videojsOptions: PropTypes.shape({
//     aspectRatio: PropTypes.string,
//     fluid: PropTypes.bool,
//     inactivityTimeout: PropTypes.number,
//     language: PropTypes.string,
//     nativeControlsForTouch: PropTypes.bool,
//     notSupportedMessage: PropTypes.string,
//     playbackRates: PropTypes.arrayOf(PropTypes.number),
//     plugins: PropTypes.arrayOf(PropTypes.shape({
//       name: PropTypes.string,
//       plugin: PropTypes.func,
//       options: PropTypes.object,
//     }))
//   }),
//   hideList: PropTypes.arrayOf(PropTypes.string),

//   onReady: PropTypes.func.isRequired,
//   onPlay: PropTypes.func.isRequired,
//   onPause: PropTypes.func.isRequired,
//   onWaiting: PropTypes.func.isRequired,
//   onTimeUpdate: PropTypes.func.isRequired,
//   onSeeking: PropTypes.func.isRequired,
//   onSeeked: PropTypes.func.isRequired,
//   onEnded: PropTypes.func.isRequired,
//   onError: PropTypes.func.isRequired,
//   onLoadedData: PropTypes.func.isRequired,
//   onLoadedMetadata: PropTypes.func.isRequired,
// }

// Player.defaultProps = {
//   playerOptions: {
//     src: "",
//     hideList: [],
//   },
//   resources: {
//     sources: [],
//     poster: "",
//   },
//   videojsOptions: {
//     plugins: [],
//   },
//   hideList: [],

//   onReady: () => { },
//   onPlay: () => { },
//   onPause: () => { },
//   onWaiting: () => { },
//   onPlaying: () => { },
//   onTimeUpdate: () => { },
//   onSeeking: () => { },
//   onSeeked: () => { },
//   onEnded: () => { },
//   onError: () => { },
//   onLoadedData: () => { },
//   onLoadedMetadata: () => { },
// }

export default VideojsReactEnhanced;