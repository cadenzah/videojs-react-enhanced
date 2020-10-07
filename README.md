# videojs-react-enhanced

[![NPM](https://nodei.co/npm/videojs-react-enhanced.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/videojs-react-enhanced/)

[![Build Status](https://travis-ci.com/cadenzah/videojs-react-enhanced.svg?branch=master)](https://travis-ci.com/cadenzah/videojs-react-enhanced)
[![codecov](https://codecov.io/gh/cadenzah/videojs-react-enhanced/branch/master/graph/badge.svg)](https://codecov.io/gh/cadenzah/videojs-react-enhanced)

React.js wrapper component for Video.js player with handy and powerful features.

> NOTE: The basic feature is working, but still it's currently working in progress, so provided features are unstable and in-depth features are not supported yet, and some usage could change in the future release. Please understand and be careful on using!

## Table of Contents
- Features
- Install
  - Prerequisite
- Usage
  - TypeScript Usage
  - Props to initialize player
  - Props to add custom event handlers
  - Plugins
- Contribution
- License

## Features
- Easy to use
- Easy to configure video.js options
  - native HTML5 `<video>` options, `video.js`-native options
- Add custom event handlers for video events
- Configure Video.js plugins
- TypeScript support - `props`, options
- ...and more features later!
  - CSS Style modification for UI components
  - Adding / Editing UI components

## Install

```bash
# using npm
npm install --save videojs-react-enhanced
# using yarn
yarn add videojs-react-enhanced
```

### Prerequisite
`videojs-react-enhanced` uses React and Video.js as peer dependencies. To use this module, you should manually install those dependencies in your project.

```bash
# using npm
npm install --save react video.js
# using yarn
yarn add react video.js
```

## Usage

```js
import React from 'react';
import videojs from 'video.js';
import VREPlayer from 'videojs-react-enhanced';
import 'video.js/dist/video-js.css';

function App() {
  const playerOptions = {
    src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    controls: true, 
    autoplay: "play",
  };
  const videojsOptions = {
    fluid: true,
  };

  return (
    <VREPlayer
      playerOptions={options}
      videojsOptions={videojsOptions}
      onReady={(player) => console.log(player)}
      onPlay={(e, _, second) => console.log('Play!')}
      onPause={(e, _, second) => console.log('Pause!')}
      onEnded={(e, _) => console.log('Ended!')}
    />
  );
}

export default App;
```

> NOTE: You should **import `video.js` first than `videojs-react-enhanced`** so that `videojs` object instantiated here is shared with `videojs-react-enhanced`.

> NOTE: You should import `video.js/dist/video-js.css` after you import `videojs-react-enhanced`, otherwise the default style of player UI will be all broken. If you are using [Next.js](https://github.com/vercel/next.js) for your service, you can remove the statement importing CSS style as that is a global CSS style. See [this issue](https://github.com/cadenzah/videojs-react-enhanced/issues/32) for better understanding.

### Typescript Usage

```tsx
import React from 'react';
import videojs from 'video.js';
import VREPlayer from 'videojs-react-enhanced';
import 'video.js/dist/video-js.css';

function App(): JSX.Element {
  const playerOptions: VREPlayer.IPlayerOptions = {
    src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    controls: true, 
    autoplay: "play",
  };
  const videojsOptions: VREPlayer.IVideoJsOptions = {
    fluid: true,
  };

  return (
    <VREPlayer
      playerOptions={options}
      videojsOptions={videojsOptions}
      onReady={(player) => console.log(player)}
      onPlay={(e, _, second) => console.log('Play!')}
      onPause={(e, _, second) => console.log('Pause!')}
      onEnded={(e, _) => console.log('Ended!')}
    />
  );
}

export default App;
```

You can use TypeScript types from `videojs-react-enhanced` module.

### Props to initialize player
Options to initizliae player are categorized depending on characterisics of each options. There are 4 different options to pass into `props`: `playerOptions`, `resources`, `videojsOptions`, `hideList`

You can configure each options and pass it through `props` as you can see in the **Usage** section above. **Every option can be omitted** and default value will be placed in it.

> NOTE: If you are using TypeScript in your project, you can utilize `Player.PlayerProps` type to get information of types you can use

> NOTE: See all available options for `videojs` in [official documentation](https://docs.videojs.com/tutorial-options.html); Currently not every option is supported via this module. If you want other options to be supported which are not on the list below, please make an issue for it!

#### `playerOptions`
Options which are standard HTML5 `<video>` element attributes.

> `IPlayerOptions` type in TypeScript

|Option name|Datatype|Default value|Description|
|--------|------------|----|----|
|autoplay|`boolean`, `'muted'`, `'play'`, `'any'`|`false`|On loaded whether the content will be started automatically or not|
|control|`boolean`|`false`|Whether the player control bar will be shown or not|
|height|`number`|The content's height|The player's height|
|loop|`boolean`|`false`|Whether the content will be played again when the playback ends|
|muted|`boolean`|`false`|Whether the content's audio will be muted or not|
|preload|`'auto'`, `'metadata'`, `'none'`|`'auto'`|The way the content will be loaded.|
|src|`string`|`""`|The content's URL to load|
|width|`number`|The content's width|The player's width|

#### `resources`
Options to provide multiple content's resources. An array of objects that mirror the native `<video>` element's capability to have a series of child `<source>` elements. This should be an array of objects with the src and type properties.

In `poster` props, you can provide the URL for the content's poster image. This image will be displayed before the content starts playing.

> `IResources` type in TypeScript

```js
// example
const resources = {
  sources: [
    {
      src: 'http://url/to/source',
      type: 'video/type'
    },
    // ...
  ],
  poster: 'http://url/to/poster/image'
}
```

#### `videojsOptions`
Options which are `videojs` specific.

> `IVideoJsOptions` type in TypeScript

|Option name|Datatype|Default value|Description|
|--------|------------|----|----|
|aspectRatio|`string`|Content's original ratio|Player's screen ratio|
|fluid|`bool`|`false`|The player's size will fit its container|
|inactivityTimeout|`number`|`0`|How many milliseconds of inactivity is required before declaring the user inactive|
|language|`string`|`en`|The player's language|
|nativeControlsForTouch|`bool`|`false`|Whether to enable native controls for touch devices|
|notSupportedMessage|`string`|Default string|Override the default message that is displayed when Video.js cannot play back a media source|
|playbackRates|`Array<number>`|undefined|List of playback rates available to switch|
|plugins|`Array<IVideoJsPlugin`|`[]`|List of Video.js plugins used for the player (See [Plugins]() section)|

#### `hideList`
Videojs player displays several UI components as a default, and you can choose what to hide by providing the target UI component's names.

```js
// example
const hideList = [
  'remainingTimeDisplay',
  'playbackRateMenuButton',
]

<Player
  hideList={hideList}
/>
```

You can hide the components on the list below:

|Component name|Description|
|--------|------------|
|`remainingTimeDisplay`|The text showing the remaining running time|
|`pictureInPictureToggle`|The button to toggle PIP feature|
|`playbackRateMenuButton`|The menu button to choose playback rate|
|`playToggle`|The button to play/pause the content|
|`progressControl`|The UI to control the content play|
|`volumePanel`|The menu button to control volume|

> NOTE: This feature will be renewed after **Adding / Editing UI components** feature is updated, so please be careful on using it.

### Props to add custom event handlers
You can set custom event handlers for standard HTML5 Video events through `props` as you can see in **Usage** section above.

> NOTE: If you want other events to be supported which are not on the list below, please make an issue for it!

#### `onReady`
- Mapped event: `ready`
- Callback arguments:
    |No.|Arg. name|Arg. datatype|Description|
    |---|---------|-------------|-----------|
    |1|`event`|`EventTarget`|Information object describing the emitted event|
    |2|`player`|`VideoJsPlayer`|Videojs `Player` object from which the event emitted|

#### `onPlay`
- Mapped event: `play`
- Callback arguments:
    |No.|Arg. name|Arg. datatype|Description|
    |---|---------|-------------|-----------|
    |1|`event`|`EventTarget`|Information object describing the emitted event|
    |2|`player`|`VideoJsPlayer`|Videojs `Player` object from which the event emitted|
    |3|`currentTimeSecond`|`number`|The timestamp value when the event occured|

#### `onPause`
- Mapped event: `pause`
- Callback arguments:
    |No.|Arg. name|Arg. datatype|Description|
    |---|---------|-------------|-----------|
    |1|`event`|`EventTarget`|Information object describing the emitted event|
    |2|`player`|`VideoJsPlayer`|Videojs `Player` object from which the event emitted|
    |3|`currentTimeSecond`|`number`|The timestamp value when the event occured|

#### `onWaiting`
- Mapped event: `waiting`
- Callback arguments:
    |No.|Arg. name|Arg. datatype|Description|
    |---|---------|-------------|-----------|
    |1|`event`|`EventTarget`|Information object describing the emitted event|
    |2|`player`|`VideoJsPlayer`|Videojs `Player` object from which the event emitted|
    |3|`currentTimeSecond`|`number`|The timestamp value when the event occured|

#### `onTimeUpdate`
- Mapped event: `timeupdate`
- Callback arguments:
    |No.|Arg. name|Arg. datatype|Description|
    |---|---------|-------------|-----------|
    |1|`event`|`EventTarget`|Information object describing the emitted event|
    |2|`player`|`VideoJsPlayer`|Videojs `Player` object from which the event emitted|
    |3|`currentTimeSecond`|`number`|The timestamp value when the event occured|

#### `onSeeking`
- Mapped event: `seeking`
- Callback arguments:
    |No.|Arg. name|Arg. datatype|Description|
    |---|---------|-------------|-----------|
    |1|`event`|`EventTarget`|Information object describing the emitted event|
    |2|`player`|`VideoJsPlayer`|Videojs `Player` object from which the event emitted|
    |3|`currentTimeSecond`|`number`|The timestamp value when the seeking action started|

#### `onSeeked`
- Mapped event: `seeked`
- Callback arguments:
    |No.|Arg. name|Arg. datatype|Description|
    |---|---------|-------------|-----------|
    |1|`event`|`EventTarget`|Information object describing the emitted event|
    |2|`player`|`VideoJsPlayer`|Videojs `Player` object from which the event emitted|
    |3|`startPositionSecond`|`number`|The timestamp value when the seeking action initially started|
    |4|`completeTimeSecond`|`number`|The timestamp value when the seeking action finally finished|

#### `onEnded`
- Mapped event: `ended`
- Callback arguments:
    |No.|Arg. name|Arg. datatype|Description|
    |---|---------|-------------|-----------|
    |1|`event`|`EventTarget`|Information object describing the emitted event|
    |2|`player`|`VideoJsPlayer`|Videojs `Player` object from which the event emitted|

#### `onError`
- Mapped event: `error`
- Callback arguments:
    |No.|Arg. name|Arg. datatype|Description|
    |---|---------|-------------|-----------|
    |1|`event`|`EventTarget`|Information object describing the emitted event|
    |2|`player`|`VideoJsPlayer`|Videojs `Player` object from which the event emitted|

#### `onLoadedData`
- Mapped event: `ended`
- Callback arguments:
    |No.|Arg. name|Arg. datatype|Description|
    |---|---------|-------------|-----------|
    |1|`event`|`EventTarget`|Information object describing the emitted event|
    |2|`player`|`VideoJsPlayer`|Videojs `Player` object from which the event emitted|

#### `onLoadedMetadata`
- Mapped event: `ended`
- Callback arguments:
    |No.|Arg. name|Arg. datatype|Description|
    |---|---------|-------------|-----------|
    |1|`event`|`EventTarget`|Information object describing the emitted event|
    |2|`player`|`VideoJsPlayer`|Videojs `Player` object from which the event emitted|

### Plugins
You can apply any plugins and augment your player easily. You can simply list over plugins you want to use in `props`, and that's it!

```js
import React from 'react';
import videojs from 'video.js';
import '<PLUGIN_YOU_WANT_TO_USE>';
import VREPlayer from 'videojs-react-enhanced';

function App() {
  // ...
  return (
    <VREPlayer
      // ...
      videojsOptions={{
        plugins: [
          {
            name: '<NAME_OF_PLUGIN>',
            options: {
              // ...
            }
          },
          // ...
        ]
      }}
      // ...
    />
  );
}

export default App;
```

`plugins` is an array of plugin objects which have properties as below:

|No.|property name|Arg. datatype|Description|
|---|---------|-------------|-----------|
|1  |name     |`string`     |The name of plugin (identifier after registration)|
|2  |plugin   |`function`   |The plugin function for manual registration|
|3  |option   |`object`     |The option for plugin|

You should include `plugins` array in `videojsOptions` and pass it through `props`.

Depending on the way the plugin executes, there are 2 ways of using plugins, which will be covered right after. You can use both ways together, but just remember that the plugins passed will be **handled in the order of `plugins` array**.

#### Automatic registration and initialization

In some cases, a plugin registers itself on `video.js` module instance and makes itself available to use by the time it is loaded in the project. Which means, all you have to do is import the plugin and set up an option if exists:

```js
import React from 'react';
import videojs from 'video.js';
import '<PLUGIN_YOU_WANT_TO_USE>';
import VREPlayer from 'videojs-react-enhanced';
// codes to be continued...
```

When `import '<PLUGIN_YOU_WANT_TO_USE>';` line executes, the plugin will locate `videojs` object in the project and register itself on it. This is important, because **you have to import `video.js` on first, and import the plugin on the next line,** so that your plugin uses the `video.js` module previously loaded, not importing its own `video.js` inside the plugin.

Also, when you import `video.js`, it is recommended to import it with the name `videojs`, as most plugins activates under the assumption that `videojs` is the name of a variable where `video.js` module instance is.

All you have to do next is hand over an option object via `props` if needed:

```js
// continues from the code right above:
function App() {
  // ...

  const videojsOptions = {
    plugins: [
      {
        name: '<NAME_OF_PLUGIN>',
        options: {
          // ...
        },
      },
      // ...
    ]
  }

  return (
    <VREPlayer
      // ...
      videojsOptions={videojsOptions}
      // ...
    />
  );
}

export default App;
```

> NOTE: [As official document says](https://docs.videojs.com/tutorial-plugins.html), `videojs-react-enhanced` assumes that a plugin accepts only single `option` argument to initialize itself.

Keep in mind that there is no `plugin` property passed in `plugin` object. That's because the plugin is already loaded and registered by importing `'<PLUGIN_YOU_WANT_TO_USE>'`, so you don't have to specify `plugin` property. All you have to do is pass the name and an option object for the plugin.

#### Manual registration and initialization

On the other hand, if you provide plugin in the basic form of `function`, you need to pass the plugin function through `plugin` object:

```js
// continues from the code right above:
function myPlugin(player, option) {
  // your plugin's jobs to do...
};

function App() {
  // ...

  const videojsOptions = {
    plugins: [
      {
        name: 'myPlugin',
        plugin: myPlugin,
        options: {
          // ...
        },
      },
      // ...
    ]
  }

  return (
    <VREPlayer
      // ...
      videojsOptions={videojsOptions}
      // ...
    />
  );
}

export default App;
```

When `videojs-react-enhanced` gets the passed plugin, it will register the plugin and initialize with the option provided.

> NOTE: [As official document says](https://docs.videojs.com/tutorial-plugins.html), `videojs-react-enhanced` assumes that a plugin accepts only single `option` argument to initialize itself.

## Contribution
Fork the repository, make changes, commit your work, and make Pull Request.

## License
[MIT Lisence](https://github.com/cadenzah/videojs-react-enhanced/blob/master/LICENSE)
