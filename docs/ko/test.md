# 라이브러리 테스트용 개발 환경 세팅

## TL;DR;
1. 라이브러리의 동작을 확인할 예시 테스트 프로젝트(이하 테스트 프로젝트)에서 `videojs-react-enhanced`(이하 **모듈**)을 사용할 때에는 `yarn link`를 통하여 사용한다. 직접 `npm`으로 의존성 설치 NO

  - (1) 모듈 프로젝트 install
  - (2) peerDependencies 설치

2. 모듈에서 Peer Dependency로 사용되는 의존성 패키지는 테스트 프로젝트에서 해당 패키지를 `npm`으로 설치하지 말고, `yarn link`를 통하여 **모듈 프로젝트에 설치된 의존성**을 참조하도록
  - `react`
  - `video.js`
Video.js에서 전역 모듈 객체의 상태를 변경하는 동작이 내부적으로 이루어질 경우, 모듈의 참조가 여러 개 존재하면 혼선이 생긴다. 동일 참조의 모듈이 다루어지도록 조정해주어야 한다.

3. `video.js`를 사용할 때, 의존성을 불러오는 순서를 주의한다. **반드시 `video.js` 모듈을 가장 먼저 `import`해야 한다.**

## 테스트 환경 설정 단계 별 안내

### 1. `videojs-react-enhanced`

처음 저장소를 클론하면 의존성들을 우선 설치

```bash
# (1) 기본 라이브러리 설치
$ npm install

# (2) Peer dependencies에 해당하는 라이브러리의 수동 설치
$ npm run prepare:peers

```

다음으로, Peer Dependencies로 설정된 의존성 패키지들이 테스트 프로젝트와 플러그인 프로젝트에서 동일하게 공유될 수 있도록 `yarn link`를 통하여 설정한다.

```bash
# `videojs-react-enhanced/node_modules` 내의 아래 두 라이브러리의 디렉토리에서 각각 `yarn link` 실행
$ cd react
$ yarn link

$ cd video.js
$ yarn link
```

이 작업은 React Hooks의 실행 오류, Video.js Plugin 초기화시 오류 등을 해결하기 위하여 반드시 필요하다

### 2. `videojs-thumbnail-sprite` (이하 플러그인 프로젝트)

이 플러그인은 자기자신을 전역 객체 `video.js`에 등록한다. 여기서 자신을 등록하는 `video.js` 객체는 Video.js 플레이어 인스턴스가 동작 과정에서 참조하는 'video.js'와 동일 대상이어야 한다. 따라서, 모듈 프로젝트에서 기존에 `yarn link`로 등록한 `video.js`를 참조하여, 동일 객체를 참조하도록 설정한다.

```bash
# 플러그인 프로젝트의 루트에서 실행
$ yarn link video.js
```

### 3. 테스트 프로젝트

라이브러리에 대한 설정이 완료되었으므로, 이제 테스트 프로젝트에서 이를 그대로 사용하면 된다. 본 단계의 설정 과정이 이루어지는 목적은 다음과 같다.

1. 모듈 프로젝트의 `react` 의존성을 테스트 프로젝트에서 동일하게 공유해야 한다.
2. 모듈 프로젝트와 플러그인이 공유하는 `video.js` 의존성을 테스트 프로젝트에서 동일하게 공유해야 한다.

따라서 테스트 프로젝트는 앞선 단계에서 `yarn link`로 참조 대상이 설정된 `react`와 `video.js`를 사용한다. 이미 `npm install`을 통하여 해당 의존성을 설치헀더라도, 해당 설치 내용을 *임시로* 무시한 채 덮어씌워지므로 상관없다.

```bash
# 테스트 프로젝트의 루트에서 실행
$ yarn link react
$ yarn link video.js
```

다음으로, 현재 개발 테스트 중인 모듈 프로젝트와 플러그인 프로젝트의 로컬 개발 형상을 직접 참조하기 위하여 `yarn link`를 사용하여 해당 프로젝트를 참조한다.

```bash
# `videojs-react-enhanced`의 프로젝트 디렉토리에서 아래의 명령어 실행
$ yarn link

# 테스트 프로젝트에서 `videojs-react-enhanced`를 직접 참조
$ yarn link videojs-react-enhanced
```

```bash
# `videojs-thumbnail-sprite`의 프로젝트 디렉토리에서 아래의 명령어 실행
$ yarn link

# 테스트 프로젝트에서 `videojs-thumbnail-sprite`를 직접 참조
$ yarn link videojs-thumbnail-sprite
```

여기까지 완료하면, `videojs-thumbnail-sprite`의 개발 형상을 로컬 테스트 프로젝트에서 직접 확인하기 위한 준비가 완료되는 것이다. `package.json` 설정에 따라, 모듈을 로드할 때 `dist/` 디렉토리의 결과물을 활용하므로, 테스트에 앞서 모듈을 빌드하여 `dist/`에 생성해주어야 한다.

```bash
# `videojs-react-enhanced` 프로젝트에서 실행
npm run build:prod
```

## Appendix

### `yarn link`를 헤제하려면 - 아래 둘 중 하나 수행
1. yarn unlink '패키지명'
2. ~/.config/yarn/link 디렉토리 내에 있는 링크 파일 제거
