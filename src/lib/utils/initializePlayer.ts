import videojs, { VideoJsPlayer } from 'video.js';
import VRE from '@/lib';

function initializePlayer(
    playerRef: HTMLVideoElement,
    playerOptions: videojs.PlayerOptions,
    manualPlugins: VRE.IVideoJsPlugin[]
): VideoJsPlayer {
    const player: VRE.IVideoJsPlayer = videojs(
        playerRef,
        playerOptions
    );

    // Initialization of src and poster if exists
    const videoSrc = playerOptions.src;
    const videoPoster = playerOptions.poster;
    videoSrc && player.src(videoSrc);
    videoPoster && player.poster(videoPoster);

    // Registration and Option initialization of manual plugins
    manualPlugins.map(element => {
        element.plugin && videojs.registerPlugin(
            element.name,
            element.plugin,
        );
        player[element.name](player, element.options);
    });

    return player;
}

export default initializePlayer;
