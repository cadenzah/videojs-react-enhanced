import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import Player from '../lib';

let component: RenderResult;

// component 렌더링 과정에서 문제가 없는지 확인하려면,
// proptype에 의하여 오류가 체크되는지 확인해야 하는데,

// component proptype은 오류를 console.error로 출력하므로,
// console.error가 실행되는지 아닌지 여부를 확인해면 된다
// https://tiffany.devpools.kr/2018/03/19/sinon/
// https://stackoverflow.com/questions/26124914/how-to-test-react-proptypes-through-jest

describe('Rendered properly', () => {
  it('Receives option object as an argument when instantiated', () => {
    // 컴포넌트 초기화시 옵션 object을 props로 전달받는지 검사하도록
    // 즉, option을 props로 전달하지 않았을 경우 오류가 발생하도록 해야 (proptype)
  });

  it('Received option object has required option values in it', () => {
    // props에 전달된 옵션값 중 필수 값들이 제대로 전달되었는지 검사하도록
    // 즉, option props에 일부 주요값들이 전달되지 않았을 경우 오류가 발생하도록 해야 (proptype, 객체 속성 검사)
  });

  it('Allows optional option values to be undefined in received option object', () => {
    // 필수가 아닌 옵션값의 경우 전달하지 않더라도 문제가 없는지 검사
    // 즉, 주요 옵션값만 전달한다면 렌더링에 문제가 없어야 함
  });

  it('Applies plugin if provided', () => {
    // props로 플러그인이 전달된다면, 이것이 반영되어서 플레이어가 렌더링이 문제없이 이루어지는지 검사
  });
});

describe('Can set customized skin via props', () => {
  it('Receives Style relevant option object via props', () => {
    // props로 style 객체가 존재하는지 검사
    // proptype
  });

  it('Allows Style relevant option object to be undefined (allow default skin)', () => {
    // style 객체가 {} 또는 undefined여도 허용하도록
    // proptype

    // 이 경우, 없는 상태로 기본 스타일이 적용되는지 검사해야
    // 렌더링 결과에서 주요 스타일들 검사
  });

  it('Style relevant option object has hierarchy that is mapped to each style of Player\'s components', () => {
    // style 객체 내부의 구조를 검사
    // 플레이어의 각 구성 요소의 CSS 스타일에 대응되는 속성들이 존재하는지,
    // 각 값이 undefined이어도 허용하도록
  });
});

describe('Custom skin is properly set and rendered', () => {
  // 위에서 props를 통하여 전달된 것들이 제대로 videojs의 스타일을 변경해서 렌더링해주는지
  // 각각의 것들을 확인
})
