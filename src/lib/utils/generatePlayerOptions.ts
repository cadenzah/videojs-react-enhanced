// Merge options required to create a video.js player instance

import videojs from 'video.js';
import VRE from '@/lib';

function generatePlayerOptions(
    props: VRE.PlayerProps,
    autoPlugins?: VRE.IIndexableObject
): videojs.PlayerOptions {
    const playerOptions: videojs.PlayerOptions = {
        ...props.playerOptions,
        ...props.resources,
        ...props.videojsOptions,
        plugins: autoPlugins,
    };

    return playerOptions;
}

export default generatePlayerOptions;
