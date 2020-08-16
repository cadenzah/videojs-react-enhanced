# videojs-react-enhanced
React.js wrapper component for Video.js player with handy and powerful features.

> NOTE: The basic feature is working, but still it's currently working in progress, so provided features are unstable and in-depth features are not supported yet, be careful on using!

## Features
- Easy to use
- Easy to configure video.js options
  - native HTML5 `<video>` options, `video.js`-native options
- Add custom event handlers for video events
- TypeScript support
- ...and more comming soon!
  - CSS Style modification for UI components
  - Adding / Editing UI components
  - Configuiring Video.js plugins

## Install

```bash
# using npm
npm install --save videojs-react-enhanced
# using yarn
yarn add videojs-react-enhanced
```

## Usage

```js
import React from 'react';
import VREPlayer from 'videojs-react-enhanced';

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

### Props to initialize player
Options to initizliae player are categorized depending on characterisics of each options. There are 4 different options to pass into `props`: `playerOptions`, `resources`, `videojsOptions`, `hideList`

You can configure each options and pass it through `props` as you can see in the **Usage** section above. **Every option can be omitted** and default value will be placed in it.

> NOTE: See all available options for `videojs` in [official documentation](https://docs.videojs.com/tutorial-options.html); Currently not every option is supported via this module. If you want other options to be supported which are not on the list below, please make an issue for it!

#### `playerOptions`
Options which are standard HTML5 `<video>` element attributes.

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

```js
// example
const resources = {
  sources: [
    {
      src: 'http://url/to/source',
      type: 'video/type'
    }
  ],
  poster: 'http://url/to/poster/image'
}
```

#### `videojsOptions`
Options which are `videojs` specific.

|Option name|Datatype|Default value|Description|
|--------|------------|----|----|
|aspectRatio|`string`|Content's original ratio|Player's screen ratio|
|fluid|`bool`|`false`|The player's size will fit its container|
|inactivityTimeout|`number`|`0`|How many milliseconds of inactivity is required before declaring the user inactive|
|language|`string`|`en`|The player's language|
|nativeControlsForTouch|`bool`|`false`|Whether to enable native controls for touch devices|
|notSupportedMessage|`string`|Default string|Override the default message that is displayed when Video.js cannot play back a media source|

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

## License
[MIT Lisence](https://github.com/cadenzah/videojs-react-enhanced/blob/master/LICENSE)
