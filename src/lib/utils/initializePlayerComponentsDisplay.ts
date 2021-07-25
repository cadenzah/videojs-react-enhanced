import videojs, { VideoJsPlayer } from 'video.js';

// Parse string values included in `hideList`,
// Controls display & hide of the player UI accordingly
interface IDefaultControlBar extends videojs.ControlBar {
    [key: string]: any;
}

function initializePlayerComponentsDisplay(
    player: VideoJsPlayer,
    hideList?: string[]
): void {
    const controlBar: IDefaultControlBar = player.controlBar;
    hideList && hideList.map(component => {
        controlBar[component] && controlBar[component].hide();
    });
}

export default initializePlayerComponentsDisplay;
