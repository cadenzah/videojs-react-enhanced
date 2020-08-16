import videojs, { VideoJsPlayer } from 'video.js';

// props로 전달된 스트링 값들을 파싱하여, 플레이어 UI 중 일부를 가려버린다
interface IDefaultControlBar extends videojs.ControlBar {
  currentTimeDisplay?: videojs.Component;
  pictureInPictureToggle?: videojs.Component;
  playbackRateMenuButton?: videojs.Component;
  playToggle?: videojs.Component;
  progressControl?: videojs.Component;
  remainingTimeDisplay?: videojs.Component;
  volumePanel?: videojs.Component;
}

function initializePlayerComponentsDisplay(player: VideoJsPlayer, hideList: Array<string>): void {
  const hideSet: Set<string> = new Set<string>();
  hideList.map((el) => {
    hideSet.add(el);
  })

  const controlBar: IDefaultControlBar = player.controlBar;
  
  const remainingTimeDisplay = controlBar.remainingTimeDisplay;
  if (hideSet.has('remainingTimeDisplay'))
    remainingTimeDisplay?.hide();
  
  const pictureInPictureToggle = controlBar.pictureInPictureToggle;
  if (hideSet.has('pictureInPictureToggle'))
    pictureInPictureToggle?.hide();
  
  const playbackRateMenuButton = controlBar.playbackRateMenuButton;
  if (hideSet.has('playbackRateMenuButton'))
    playbackRateMenuButton?.hide();    

  const playToggle = controlBar.playToggle;
  if (hideSet.has('playToggle'))
    playToggle?.hide();

  const progressControl = controlBar.progressControl;
  if (hideSet.has('progressControl'))
    progressControl?.hide();

  const volumePanel = controlBar.volumePanel;
  if (hideSet.has('volumePanel'))
    volumePanel?.hide();
}

export default initializePlayerComponentsDisplay;
