// Merge options required to create a video.js player instance

import videojs from 'video.js';
import { Player } from 'videojs-react-enhanced';

function generatePlayerOptions(props: Player.PlayerProps, autoPlugins?: Player.IIndexableObject): videojs.PlayerOptions {
    const playerOptions: videojs.PlayerOptions = {
        ...props.playerOptions,
        ...props.resources,
        ...props.videojsOptions,
        plugins: autoPlugins,
    };

    return playerOptions;
}

export default generatePlayerOptions;
