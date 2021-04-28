// 플레이어 생성에 필요한 옵션을 하나로 합친다
// 이후 추가 작업 수행한 뒤 player를 반환

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
