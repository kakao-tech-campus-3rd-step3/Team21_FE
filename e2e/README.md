# E2E 테스트 가이드 (Playwright)

## 🎯 테스트 전략

- **API 연동 테스트**: 실제 API 호출과 응답을 검증
- **크로스 브라우저 테스트**: Chromium, Firefox, WebKit에서 동작 확인
- **모바일 테스트**: 모바일 뷰포트에서도 테스트 가능
- **시각적 회귀 테스트**: 스크린샷을 통한 UI 변경 감지

## 📦 설치

```bash
npm install
npx playwright install
```

## 🚀 테스트 실행

### 모든 브라우저에서 테스트

```bash
npm run test:e2e
```

### 특정 브라우저에서만 테스트

```bash
npm run test:e2e:chromium
npm run test:e2e:firefox
npm run test:e2e:webkit
```

### UI 모드로 테스트

```bash
npm run test:e2e:ui
```

### 디버그 모드

```bash
npm run test:e2e:debug
```

## 📁 테스트 파일 구조

```
e2e/
├── home.spec.ts              # 홈페이지 테스트
├── search.spec.ts            # 검색 기능 테스트
├── university-detail.spec.ts # 대학 상세 페이지 테스트
├── professor-detail.spec.ts  # 교수 상세 페이지 테스트
└── review-form.spec.ts       # 리뷰 작성 폼 테스트
```

## ✍️ 테스트 작성 가이드

### 1. API 응답 검증

```typescript
test("API 데이터를 불러온다", async ({ page }) => {
  const responsePromise = page.waitForResponse((response) =>
    response.url().includes("/api/universities/"),
  );

  await page.goto("/university/1");

  const response = await responsePromise;
  expect(response.status()).toBe(200);

  const data = await response.json();
  await expect(page.locator("h1")).toContainText(data.name);
});
```

### 2. API 모킹

```typescript
test("에러 상황을 테스트한다", async ({ page }) => {
  await page.route("**/api/universities/**", (route) => {
    route.fulfill({
      status: 404,
      body: JSON.stringify({ message: "Not Found" }),
    });
  });

  await page.goto("/university/1");
  await expect(page.getByText(/에러/i)).toBeVisible();
});
```

### 3. 폼 제출 테스트

```typescript
test("리뷰를 작성한다", async ({ page }) => {
  const requestPromise = page.waitForRequest(
    (request) => request.url().includes("/reviews") && request.method() === "POST",
  );

  await page.goto("/professor/1");
  await page.getByRole("button", { name: /리뷰 작성/i }).click();
  await page.locator("textarea").fill("좋은 강의였습니다");
  await page.getByRole("button", { name: /제출/i }).click();

  const request = await requestPromise;
  expect(request.postDataJSON()).toHaveProperty("content");
});
```

## 🔧 CI/CD 통합

GitHub Actions에서 자동으로 실행됩니다:

- PR 생성 시 자동 실행
- develop/main 브랜치 푸시 시 실행
- 3개 브라우저에서 병렬 실행 (matrix 전략)
- 실패 시 스크린샷 자동 업로드

## 📊 테스트 리포트

테스트 실행 후 HTML 리포트 확인:

```bash
npx playwright show-report
```

## 💡 팁

1. **HTML이 바뀌지 않으면 테스트 수정 불필요**:
   - `getByRole`, `getByText` 같은 시맨틱 셀렉터 사용
   - CSS 클래스나 ID 대신 사용자가 보는 텍스트로 선택

2. **API 테스트에 집중**:
   - 스토리북으로 커버하기 어려운 API 연동 부분 테스트
   - 실제 사용자 플로우 검증

3. **병렬 실행으로 속도 향상**:
   - 각 테스트는 독립적으로 작성
   - 테스트 간 의존성 제거

4. **실패 시 디버깅**:
   - 스크린샷 자동 저장
   - trace viewer로 상세 분석

## ⚠️ 주의사항

- E2E 테스트는 실제 API 서버와 통신합니다
- 테스트 실행 전 백엔드 서버가 동작 중인지 확인하세요
- 일부 테스트는 실제 데이터가 있어야 통과합니다
- `test.skip()`으로 표시된 테스트는 실제 폼 구조 파악 후 활성화 필요

## 📈 현재 테스트 커버리지

- ✅ 홈페이지 렌더링 및 검색 기능
- ✅ 대학/교수 상세 페이지 API 연동
- ✅ 검색 기능 (대학, 교수, 학과)
- ✅ 에러 핸들링 및 로딩 상태
- ⏭️ 리뷰 작성 폼
- ⏭️ 단과대/리뷰 목록 (데이터 의존)
