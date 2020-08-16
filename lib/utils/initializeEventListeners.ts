import { VideoJsPlayer } from 'video.js';
import { PlayerProps } from 'video-react-enhanced';
// props로 전달된 각 이벤트 리스너들을 대응되는 이벤트가 발생시 실행되도록 초기화
function initializeEventListeners(player: VideoJsPlayer, props: PlayerProps): void {
  let currentTimeSecond: number = 0;
  let previousTimeSecond: number = 0;
  let startPositionSecond: number = 0;

  player.on('play', (event) => {
    props.onPlay(event, player, player.currentTime());
  });

  player.on('pause', (event) => {
    props.onPause(event, player, player.currentTime());
  });

  player.on('waiting', (event) => {
    props.onWaiting(event, player, player.currentTime());
  });

  player.on('timeupdate', (event) => {
    // 현재 마우스 커서가 위치한 시점, 재생 중인 시점
    let temp = player.currentTime();
    props.onTimeUpdate(event, player, temp);
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
    props.onSeeking(event, player, player.currentTime());
  });

  player.on('seeked', (event) => {
    // 최종적으로 마우스 커서가 멈춘 곳을 기준으로 두 정보 모두 전달
    const completeTimeSecond = player.currentTime();
    props.onSeeked(event, player, startPositionSecond, completeTimeSecond);
  });

  player.on('ended', (event) => {
    props.onEnded(event, player);
  });

  player.on('error', (event) => {
    props.onError(event, player);
  });

  player.on('loadeddata', (event) => {
    props.onLoadedData(event, player);
  });

  player.on('loadedmetadata', (event) => {
    props.onLoadedMetadata(event, player);
  });
}

export default initializeEventListeners;
