/*
 * # Process `plugins` array
 *
 * Plugins already registered on videojs object only need to pass options to `Videojs Player constructor`.
 * On the other hand, plugins not registered yet have to be registered manually with its options.
 *
 * As an input, function will get a `plugins` array which contains plugin objects passed through React `props`, following `Player.IVideoJsPlugin` interface.
 * - For the former case, `autoPlugins` object will be created, which contains each plugins' options that is used when player instance is created.
 *   - Each key's name maps to a plugin's name, and its value has an option for that plugin.
 *   - If there is no plugins that were previously generated, then `autoPlugins` object will be `undefined`, so that it can be ignored when creating player instance.
 * - For the latter case, `manualPlugins` array will be created, in which plugins need to be manually registered and initialize their option afterwards.
 */
import Player from '../index';
// import { Plugins, AutoPlugins } from 'filterPlugins';

function filterPlugins(plugins: filterPlugins.Plugins): [
  filterPlugins.AutoPlugins | undefined,
  filterPlugins.Plugins] {
  let resultAutoPlugins: filterPlugins.AutoPlugins | undefined;
  const autoPlugins: filterPlugins.AutoPlugins = { };
  const manualPlugins: filterPlugins.Plugins = [];

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

namespace filterPlugins {
  export interface Plugins extends Array<Player.IVideoJsPlugin> { };
  export interface AutoPlugins {
    [key: string]: any;
  }
};

export default filterPlugins
