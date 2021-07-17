import sinon from 'sinon';
import videojs from 'video.js';
import { Player } from 'videojs-react-enhanced';

import {
    initializeEventListeners,
    initializePlayerComponentsDisplay,
    filterPlugins,
    generatePlayerOptions,
} from '@/lib/utils';

// player 객체를 전달하여 이벤트 리스너를 등록하고나면,
// 특정 이벤트가 발생하였을 때 핸들러가 실행이 되는가?
// 이벤트 발생을 어떻게 시뮬레이팅하는가? 

// player.trigger 등을 활용하고,
// 이벤트 리스너는 sinon stub을 줘서
// 호출이 되었는지 여부를 확인하자
let events: {
    [key: string]: any;
} = { };

describe(`Unit tests - Utility module functions`, () => {
    describe(`# initializeEventListener.ts`, () => {
        let player: videojs.Player;

        beforeEach(() => {
            // mock videojs player object for test
            player = {
                trigger: trigger,
                on: on,
                off: () => { },
                one: () => { },
                currentTime: () => { },
            } as videojs.Player;
        });

        afterEach(() => {
            events = { };
        });

        it(`Custom event listeners are properly registered`, () => {
            //given
            const on = sinon.spy(player, 'on');
            const props: Player.PlayerProps = {

            };

            //when
            initializeEventListeners(player, props);
            on.restore();

            //then
            expect(on.callCount).toBe(11);
        });

        it(`Registered listeners are properly executed when an event emits`, () => {
            // given
            const counts: Array<number> = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
            const props: Player.PlayerProps = {
                onPlay: () => { counts[0]++ },
                onPause: () => { counts[1]++ },
                onWaiting: () => { counts[2]++ },
                onTimeUpdate: () => { counts[3]++ },
                onSeeking: () => { counts[4]++ },
                onSeeked: () => { counts[5]++ },
                onEnded: () => { counts[6]++ },
                onError: () => { counts[7]++ },
                onLoadedData: () => { counts[8]++ },
                onLoadedMetadata: () => { counts[9]++ },
                onPlaying: () => { counts[10]++ },
            };

            // when
            initializeEventListeners(player, props);
            player.trigger('play');
            player.trigger('pause');
            player.trigger('waiting');
            player.trigger('playing');
            player.trigger('timeupdate');
            player.trigger('seeking');
            player.trigger('seeked');
            player.trigger('ended');
            player.trigger('error');
            player.trigger('loadeddata');
            player.trigger('loadedmetadata');

            // then
            counts.forEach(count => {
                expect(count).toBe(1);
            });
        });
    });

    describe(`# initializePlayerComponentDisplay.ts`, () => {
        let player: videojs.Player;

        beforeEach(() => {
            player = {
                controlBar: {
                playToggle: {
                    hide: () => { }
                },
                volumeButton: {
                    hide: () => { }
                }
                } as unknown
            } as videojs.Player;
        });

        it(`Address properly when \`hideList\` is an empty array`, () => {
            // hidelist가 빈 배열일 때 에러가 안 발샏하는지
            // given
            const hideList: Array<string> = [];
            
            // when
            initializePlayerComponentsDisplay(player, hideList);

            // then - no error occurs
            
        });

        it(`Executes \`.hide()\` methods preperly for elements in \`hideList\``, () => {
            // hidelist를 기반으로 controlBar의 컴포넌트에 대하여 hide를 잘 실행시키는지
            // given
            const hideList: Array<string> = ['playToggle'];
            const controlBar: {
                [key: string]: any;
            } = player.controlBar;
            const playToggle: videojs.Component = controlBar['playToggle'];
            const hide = sinon.spy(playToggle, 'hide');
            
            // when
            initializePlayerComponentsDisplay(player, hideList);

            // then
            expect(hide.callCount).toBe(1);
        });
    });

    describe(`# filterPlugins.ts`, () => {
        // 각각에서 plugin이 function인지 undefined인지에 따라 다르게 분류된다.
        it(`Properly filters whether a plugin is auto or manual`, () => {
            // given
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
            ]
            // when
            const [autoPlugins, manualPlugins] = filterPlugins(plugins);

            // then
            expect(typeof autoPlugins).toBe('object');
            expect(Object.keys(autoPlugins as object)[0]).toBe('PluginB');
            const optionsB = (autoPlugins !== undefined) ? autoPlugins['PluginB'] : {};
            expect(Object.keys(optionsB as object)[0]).toBe('settings');
            
            expect(Array.isArray(manualPlugins)).toBe(true);
            expect(manualPlugins[0].name).toBe('PluginA');
        });

        // AutoPlugin이 없을 경우, 첫번째 반환값은 undefined이다
        it(`Returns \`undefined\` as 1st element if there is no auto plugin`, () => {
            // given
            const plugins: Array<Player.IVideoJsPlugin> = [
                {
                name: 'PluginA',
                plugin: (option) => { },
                options: { settings: true },
                },
            ]

            // when
            const [autoPlugins, manualPlugins] = filterPlugins(plugins);

            // then
            expect(typeof autoPlugins).toBe('undefined');
            expect(Array.isArray(manualPlugins)).toBe(true);
        });

        // Manual Plugin이 없을 경우, 두번째 반환값은 []이다
        it(`Returns \`[]\` as 2nd element if there is no manual plugin`, () => {
            // given
            const plugins: Array<Player.IVideoJsPlugin> = [
                {
                name: 'PluginA',
                options: { settings: true },
                },
            ]

            // when
            const [autoPlugins, manualPlugins] = filterPlugins(plugins);

            // then
            expect(typeof autoPlugins).toBe('object');
            expect(Array.isArray(manualPlugins)).toBe(true);
            expect(manualPlugins.length).toBe(0);
        });
    });

    describe(`# generatePlayerOptions.ts`, () => {
        // 전달된 옵션들이 하나의 객체로 잘 합쳐지는가
        it(`Merges passed options into single option object`, () => {
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
            const props: Player.PlayerProps = {
                playerOptions,
                videojsOptions,
                onPlay: () => { },
                onPause: () => { },
            };

            // when
            const _playerOptions: videojs.PlayerOptions = generatePlayerOptions(props);

            // then
            const propsCount = Object.keys(_playerOptions).length;
            expect(propsCount).toBe(7);
        });
    });
});

function on(event: string, listener: (e: any) => void) {
    if (typeof events[event] !== 'object') {
        events[event] = [];
    }
    events[event].push(listener);
}

function trigger(event: string) {
    var i, listeners, length, args = [].slice.call(arguments, 1);

    if (typeof events[event] === 'object') {
        listeners = events[event].slice();
        length = listeners.length;

        for (i = 0; i < length; i++) {
            listeners[i](args);
        }
    }
}
