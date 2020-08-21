import React from 'react';
import { render, fireEvent, RenderResult } from '@testing-library/react';
import sinon from 'sinon';
import Player from '../lib';

let component: RenderResult;

describe(`Wrapper Component`, () => {
  describe(`<Player />`, () => {
    it(`not done yet!!!!`, () => {
      render(<Player />);
    });
  });
});

// component 렌더링 과정에서 문제가 없는지 확인하려면,
// proptype에 의하여 오류가 체크되는지 확인해야 하는데,

// component proptype은 오류를 console.error로 출력하므로,
// console.error가 실행되는지 아닌지 여부를 확인해면 된다
// https://tiffany.devpools.kr/2018/03/19/sinon/
// https://stackoverflow.com/questions/26124914/how-to-test-react-proptypes-through-jest

// proptype과 대응되는 동일한 제약 문법을 Typescript interface를 통하여 체크할 수 있도록, 둘 다 적용

// describe('Rendered properly', () => {
//   it('Receives option object as an argument when instantiated', () => {
//     // 컴포넌트 초기화시 옵션 object을 props로 전달받는지 검사하도록
//     // 즉, option을 props로 전달하지 않았을 경우 오류가 발생하도록 해야 (proptype)
//     // 기본적인 옵션 객체를 정의하고, 아래 regex에 추가
//     component = render(<Player />);
//     expect(component).toThrowError(/(Failed prop type)/);
//   });

//   it('Received option object has required option values in it', () => {
//     // props에 전달된 옵션값 중 필수 값들이 제대로 전달되었는지 검사하도록
//     // 즉, option props에 일부 주요값들이 전달되지 않았을 경우 오류가 발생하도록 해야 (proptype, 객체 속성 검사)
//     // 주요 옵션값들을 정의하고, 아래 regex에 추가
//     const emptyOption: object = {};
//     const playerProps: object = {
//       options: emptyOption
//     };

//     component = render(<Player {...playerProps} />);
//     expect(component).toThrowError(/(is marked as required in)/);
//   });

//   it('Allows optional option values to be undefined in received option object', () => {
//     // 필수가 아닌 옵션값의 경우 전달하지 않더라도 문제가 없는지 검사
//     // 즉, 주요 옵션값만 전달한다면 렌더링에 문제가 없어야 함
//     const minimalOption: object = {};
//     const playerProps: object = {
//       options: minimalOption
//     };
    
//     component = render(<Player {...playerProps} />);
//   });

//   // ## APIs for linking user-defined function with Video.js events and features
//   // props로 메서드들을 전달하였을 때, 이 각각의 메서드들이 Video.js의 특정 이벤트 및 기능과 연동되도록
//   it('Can trigger custom action when \`event\` fired on player', () => {
    
//     // 플레이어 상에서 발생하는 주요 이벤트들이 발생할 때
//     // 실행되는 함수

//     // 내부에서 각각의 stub 함수가 실행되었는지 spy를 통하여 확인하자
//     const callbackOnPlay = sinon.spy();
//     const callbackOnPause = sinon.spy();
//     const callbackOnTimeUpdate = sinon.spy();
//     const callbackOnEnded = sinon.spy();
//     const callbackOnSeeking = sinon.spy();
//     const callbackOnSeeked = sinon.spy();

//     function onPlay(): void {
//       callbackOnPlay();
//     }
//     function onPause(): void {
//       callbackOnPause();
//     }
//     function onTimeUpdate(): void {
//       callbackOnTimeUpdate();
//     }
//     function onEnded(): void {
//       callbackOnEnded();
//     }
//     function onSeeking(): void {
//       callbackOnSeeking();
//     }
//     function onSeeked(): void {
//       callbackOnSeeked();
//     }

//     const options: object = {
//       onPlay,
//       onPause,
//       onTimeUpdate,
//       onEnded,
//       onSeeking,
//       onSeeked,
//     }

//     component = render(<Player {...options} />);
//     // DOM 조작 과정에서 특정 이벤트가 발생헀을 때, 대응하는 API가 함께 실행되는지 확인
//   });

//   it('Applies plugin if provided', () => {
//     // props로 플러그인이 전달된다면, 이것이 반영되어서 플레이어가 렌더링이 문제없이 이루어지는지 검사
//     const minimalOption: object = {};

//     const videojsPlugin: object = {};
//     const plugins: Array<object> = [videojsPlugin];

//     const playerProps: object = {
//       options: minimalOption,
//       plugins: plugins,
//     };
    
//     component = render(
//       <Player {...playerProps} />
//     );
//   });
// });

// describe('Can set customized skin via props', () => {
//   it('Receives Style relevant option object via props', () => {
//     // props로 style 객체가 존재하는지 검사
//     // proptype
//     // style 옵션 관련된 객체 추가
//     const minimalOption: object = { };
//     const styleOption: object = {};

//     component = render(
//       <Player
//         {...minimalOption}
//         {...styleOption}
//       />
//     );
//     // 아무 문제 없이 렌더링 되도록
//   });

//   it('Allows Style relevant option object to be undefined (allow default skin)', () => {
//     // style 객체가 {} 또는 undefined여도 허용하도록
//     // proptype
//     const minimalOption: object = {};
    
//     component = render(
//       <Player
//         {...minimalOption}
//       />
//     );
//     // 이 경우, 없는 상태로 기본 스타일이 적용되는지 검사해야
//     // 렌더링 결과에서 주요 스타일들 검사
//     // 주요 스타일 요소들을 중심으로...
//   });

//   it('Style relevant option object has hierarchy that is mapped to each style of Player\'s components', () => {
//     // style 객체 내부의 구조를 검사
//     // 플레이어의 각 구성 요소의 CSS 스타일에 대응되는 속성들이 존재하는지,
//     // 각각의 값이 undefined이라면 기본값을 그대로 사용할 수 있도록

//     // proptype으로 잘 구현이 되어있는지 검사
//     const minimalOption: object = { };
    
//     // 다양한 스타일 옵션들로 검증
//     const styleOption: object = {};
//     component = render(
//       <Player
//         {...minimalOption}
//         {...styleOption}
//       />
//     );
//   });
// });

// describe('Custom skin is properly set and rendered', () => {
//   // 위에서 props를 통하여 전달된 것들이 제대로 videojs의 스타일을 변경해서 렌더링해주는지
//   // 각각의 것들을 확인
// })

// // ## todos ##
// // sinon, stub, mock에 대하여
// // proptype을 (react-testing-library에서) 검증하는 법
// // component의 props 검증하는 법
// // enzyme과 react-testing-library 비교
