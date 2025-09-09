## UniScope FSD 가이드

### 1. index.ts 규칙

- 각 레이어 폴더 루트에 `index.ts`를 생성한다.
- **외부에서는 반드시 `index.ts`만 import**하며, 내부 구조 변경이 외부에
  퍼지지 않도록 한다.

### 2. 네이밍 컨벤션

- 일반적으로 `utils`, `lib`와 같이 **명사형**으로 작성한다.
- 기능을 나타낼 때는 `univ-compare`처럼 **동사형 + 명사형**을 조합해 사용한다.
- **디렉토리명**: `kebab-case`
- **컴포넌트명 및 파일명(React 컴포넌트)**: `PascalCase`

### 3. 레이어 의존성 규칙

- shared -> entities -> features -> widgets -> pages -> app
- 상위 레이어는 하위 레이어만 참조할 수 있으며, 역참조는 금지한다.

### 4. widgets / pages 규칙

- `widgets` 및 `pages` 하위에는 **`ui/`와 `index.ts`만 존재**한다.
- 나머지 레이어(`model`, `api` 등)는 해당 책임 레이어에 위치시킨다.

### 5. 전역 상태 관리

- 전역 상태는 **React Context API**를 사용한다.
- 도메인/피처 단위의 상태는 해당 레이어 내부에서 관리한다.

### 6. 디자인 시스템

- 디자인 시스템은 `shadcn`을 사용한다.
- `shared/ui`: atomic 컴포넌트만 정의.
- 도메인 개념이 들어가는 컴포넌트는 `entities` 또는 `features`에 정의한다.

### 7. 사용자 노출 텍스트

- 사용자 노출 텍스트는 `해당 도메인/texts` 에 정의한다.
- 하드코딩된 문자열은 UI 컴포넌트에 직접 포함하지 않는다.
