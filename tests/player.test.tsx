import React from 'react';
import { cleanup, render, fireEvent, RenderResult } from '@testing-library/react';
import sinon from 'sinon';
import videojs, { VideoJsPlayer } from 'video.js';
import Player from '../lib';

let component: RenderResult;

describe(`Integrated Test - Wrapper Component`, () => {
  describe(`<Player />`, () => {
    let component: JSX.Element;
    it(`Renders and unmounts well without any error`, () => {
      // given
      component = <Player />;

      // when
      render(component);

      // done - no error occurs
      cleanup();
    });

    it(`Renders well with auto plugins`, () => {
      // given
      videojs.registerPlugin('PluginB', (options: any) => {})

      const plugins: Array<Player.IVideoJsPlugin> = [
        {
          name: 'PluginB',
          options: { settings: false },
        },
      ];
      const videojsOptions: Player.IVideoJsOptions = {
        plugins,
      }

      component =
      <Player
        videojsOptions={videojsOptions}
      />

      // when
      render(component);

      // done - no error occurs
      cleanup();
      videojs.deregisterPlugin('PluginB');
    });

    it(`Renders well with manual plugins`, () => {
      // given
      const plugins: Array<Player.IVideoJsPlugin> = [
        {
          name: 'PluginA',
          plugin: (option) => { },
          options: { settings: true },
        },
      ];
      const videojsOptions: Player.IVideoJsOptions = {
        plugins,
      }

      component =
      <Player
        videojsOptions={videojsOptions}
      />

      // when
      render(component);

      // done - no error occurs
      cleanup();
      videojs.deregisterPlugin('PluginA');
    });
  });
});
