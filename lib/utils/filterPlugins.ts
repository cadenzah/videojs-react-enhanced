// plugins 배열을 받아서
// 오토와 매뉴얼 두가지로 분류하여 그 결과를 반환해주는 함수
import Player from '../index';

interface Plugins extends Array<Player.IVideoJsPlugin> { };
interface AutoPlugins {
  [key: string]: any;
}

function filterPlugins(plugins: Plugins): [
  AutoPlugins | undefined,
  Plugins | undefined] {
  let resultAutoPlugins: AutoPlugins | undefined;
  const autoPlugins: AutoPlugins = { };
  const manualPlugins: Plugins = [];

  plugins.map(element => {
    if (element.plugin === undefined) {
      autoPlugins[element.name] = element.options;
    } else {
      manualPlugins.push(element);
    }
  });
  resultAutoPlugins = (Object.keys(autoPlugins).length === 0) ? undefined : autoPlugins;

  return [
    resultAutoPlugins,
    manualPlugins,
  ];
}

export default filterPlugins
