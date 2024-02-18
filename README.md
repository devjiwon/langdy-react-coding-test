# 랭디 과제테스트

랭디 과제 테스트입니다.

### 프로젝트 실행 방법
* package.json을 통해 npm install
* npm run start

### 버전정보
* node version : v16.20.2
* npm version : v8.19.4

### 추가적인 라이브러리 설치
* sass 설치 (v1.70.0)
* react-modal 설치 (v3.16.1)
* react-select 설치 (v5.8.0)

### 프로젝트 구조

```bash
├── src
│   ├── component
│   │   ├── Audio.jsx
│   │   ├── Input.jsx
│   │   ├── Select.jsx
│   │   └── style.scss
│   ├── pages
│   │   ├── lesson
│   │   │   ├── Lesson.jsx
│   │   │   └── index.scss
│   │   └── component
│   │       └── EvaluationModal.jsx
│   ├── App.js
│   ├── App.css
│   ├── index.css
│   └── index.js
├── README.md
├── package-lock.json
└── package.json
```

### 요구사항 체크 리스트 및 구현내용

#### form 공통
- [x] 이미지에서 판단할 수 있는 form 요소는 적합한 form 요소를 사용해주세요.
- [x] 모든 항목에 유효한 값, 또는 데이터가 입력된 경우에만 form 제출 버튼을 활성화 해주세요. 
- [x] form을 제출하지 않은 상태에서 모달을 종료할 경우 file을 제외한 현재 상태의 값들을 localStorage에 저장하고, 모달을 재실행할 경우 저장된 값들을 입력해주세요.
- [x] form을 제출 완료하면 localStorage에 포함된 값들은 모두 삭제해주세요.

#### select 항목
- [x] 값이 선택된 경우에만 유효한 값으로 판단해주세요.

#### text 항목
- [x] 값이 있고, 항목별로 명시되어 있는 최소 단어 수 이상인 경우에만 유효한 값으로 판단해주세요. 예를 들어 `(min. 3 words)`로 표시된 항목은 3개 단어 이상인 경우에만 유효합니다.
- [x] "단어"는 띄어쓰기를 기준으로 판단해주세요. 예를 들어 "I'm a boy."라는 문장은 3개 단어입니다.

#### 녹음 항목
- [x] 마이크 버튼을 누르면 녹음을 시작하고, 마이크 버튼을 한번 더 누르면 녹음이 완료되게 해주세요.
- [x] 녹음된 파일의 길이가 10초 이상인 경우 유효한 값으로 판단해주세요.

#### form 제출
- [x] 제출 버튼을 누르면 form의 데이터는 json 형식으로 console에 로그를 남겨주시고, 녹음된 음성 파일은 다운로드 처리를 해주세요.

감사합니다.
