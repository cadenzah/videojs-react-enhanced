import { VideoJsPlayer } from 'video.js';
import { Player } from 'videojs-react-enhanced';

// Initialize listeners of video.js events which are included in `props`
function initializeEventListeners(player: VideoJsPlayer, props: Player.PlayerProps): void {
    let currentTimeSecond: number = 0;
    let previousTimeSecond: number = 0;
    let startPositionSecond: number = 0;

    player.on('play', (event) => {
        props.onPlay && props.onPlay(event, player, player.currentTime());
    });

    player.on('pause', (event) => {
        props.onPause && props.onPause(event, player, player.currentTime());
    });

    player.on('waiting', (event) => {
        props.onWaiting && props.onWaiting(event, player, player.currentTime());
    });
    
    player.on('playing', (event) => {
        props.onPlaying && props.onPlaying(event, player, player.currentTime());
    });

    player.on('timeupdate', (event) => {
        // The current time point on which the mouse cursor is located,
        // on which the content is playing
        let temp = player.currentTime();
        props.onTimeUpdate && props.onTimeUpdate(event, player, temp);
        previousTimeSecond = currentTimeSecond;
        currentTimeSecond = temp;
        if (previousTimeSecond < currentTimeSecond) {
            startPositionSecond = previousTimeSecond;
            previousTimeSecond = currentTimeSecond;
        }
    });

    player.on('seeking', (event) => {
        // 탐색을 시작한 시점이 시작 지점
        player.off('timeupdate', () => { });
        player.one('seeked', () => { });
        props.onSeeking && props.onSeeking(event, player, player.currentTime());
    });

    player.on('seeked', (event) => {
        // 최종적으로 마우스 커서가 멈춘 곳을 기준으로 두 정보 모두 전달
        const completeTimeSecond = player.currentTime();
        props.onSeeked && props.onSeeked(event, player, startPositionSecond, completeTimeSecond);
    });

    player.on('ended', (event) => {
        props.onEnded && props.onEnded(event, player);
    });

    player.on('error', (event) => {
        props.onError && props.onError(event, player);
    });

    player.on('loadeddata', (event) => {
        props.onLoadedData && props.onLoadedData(event, player);
    });

    player.on('loadedmetadata', (event) => {
        props.onLoadedMetadata && props.onLoadedMetadata(event, player);
    });
}

export default initializeEventListeners;
