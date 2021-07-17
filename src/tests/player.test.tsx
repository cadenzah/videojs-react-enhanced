import React from 'react';
import { cleanup, render, fireEvent, RenderResult } from '@testing-library/react';
import sinon from 'sinon';
import videojs, { VideoJsPlayer } from 'video.js';
// TODO: @/lib/index.tsx won't export React component and namespace altogether; It get's type-error
import PlayerComponent from '@/lib';
import { Player } from 'videojs-react-enhanced';

let component: RenderResult;

describe(`Integrated Test - Wrapper Component`, () => {
    describe(`<Player />`, () => {
        let component: JSX.Element;

        it(`Renders and unmounts well without any error`, () => {
            // given
            component = <PlayerComponent />;

            // when
            render(component);

            // done - no error occurs
            cleanup();
        });

        it(`Renders with options properly`, () => {
            // given
            const playerOptions: Player.IPlayerOptions = {
                controls: true,
                autoplay: 'play',
                src: 'https://sample.com/video.mp4',
            };
            const videojsOptions: Player.IVideoJsOptions = {
                fluid: true,
                language: 'ko',
                playbackRates: [0.5, 1.0, 1.5],
            };
            const hideList: Array<string> = [
                'playToggle'
            ];
            component =
                <PlayerComponent
                playerOptions={playerOptions}
                videojsOptions={videojsOptions}
                hideList={hideList}
                onPlay={() => { }}
                onReady={() => { }}
                />

            // when
            render(component);

            // done - no error occurs
            cleanup();
        });

        it(`Renders well with plugins`, () => {
            // given
            videojs.registerPlugin('PluginB', (options: any) => {})

            const plugins: Array<Player.IVideoJsPlugin> = [
                {
                name: 'PluginA',
                plugin: (option) => { },
                options: { settings: true },
                },
                {
                name: 'PluginB',
                options: { settings: false },
                },
            ];
            const videojsOptions: Player.IVideoJsOptions = {
                plugins,
            }

            component =
            <PlayerComponent
                videojsOptions={videojsOptions}
            />

            // when
            render(component);

            // done - no error occurs
            cleanup();
            let _videojs  = videojs as any; // due to type missing
            _videojs.deregisterPlugin('PluginA');
            _videojs.deregisterPlugin('PluginB');
        });
    });
});
