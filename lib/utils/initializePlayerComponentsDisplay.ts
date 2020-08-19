import videojs, { VideoJsPlayer } from 'video.js';

// props로 전달된 스트링 값들을 파싱하여, 플레이어 UI 중 일부를 가려버린다
interface IDefaultControlBar extends videojs.ControlBar {
  [key: string]: any;
}

function initializePlayerComponentsDisplay(player: VideoJsPlayer, hideList?: Array<string>): void {
  const controlBar: IDefaultControlBar = player.controlBar;
  hideList && hideList.map(component => {
    controlBar[component] && controlBar[component].hide();
  });
}

export default initializePlayerComponentsDisplay;
