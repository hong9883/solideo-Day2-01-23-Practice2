# 기여 가이드

TravelMate 프로젝트에 기여해 주셔서 감사합니다! 이 문서는 프로젝트에 기여하는 방법을 안내합니다.

## 🎯 기여 방법

### 버그 리포트
버그를 발견하셨나요? 다음 정보를 포함하여 Issue를 작성해 주세요:
- 버그 설명
- 재현 단계
- 예상 동작
- 실제 동작
- 스크린샷 (선택사항)
- 환경 정보 (OS, 브라우저, Node.js 버전)

### 기능 제안
새로운 기능을 제안하고 싶으신가요?
- 기능의 목적과 이점 설명
- 사용 사례 예시
- 가능하다면 mockup이나 diagram 첨부

### Pull Request

1. **Fork & Clone**
   ```bash
   git clone https://github.com/your-username/travel-app.git
   cd travel-app
   ```

2. **브랜치 생성**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **개발 환경 설정**
   ```bash
   npm run install:all
   cp .env.example .env
   # .env 파일에 Google Maps API 키 입력
   ```

4. **코드 작성**
   - 기존 코드 스타일 유지
   - TypeScript 타입 정의 추가
   - 주석 작성 (한국어 또는 영어)

5. **테스트**
   ```bash
   npm run dev
   # 기능이 정상 작동하는지 확인
   ```

6. **커밋**
   ```bash
   git add .
   git commit -m "feat: 새로운 기능 추가"
   ```

   커밋 메시지 컨벤션:
   - `feat:` 새로운 기능
   - `fix:` 버그 수정
   - `docs:` 문서 변경
   - `style:` 코드 스타일 변경 (포맷팅)
   - `refactor:` 코드 리팩토링
   - `test:` 테스트 추가/수정
   - `chore:` 빌드/설정 변경

7. **Push & PR**
   ```bash
   git push origin feature/your-feature-name
   ```
   GitHub에서 Pull Request 생성

## 📝 코드 스타일

### TypeScript
- 명확한 타입 정의 사용
- `any` 타입 지양
- Interface vs Type: 객체 타입은 interface 사용

### React
- 함수형 컴포넌트 사용
- Hooks 사용 (useState, useEffect 등)
- Props는 interface로 정의

### 네이밍
- 컴포넌트: PascalCase (예: `SearchForm`)
- 함수/변수: camelCase (예: `getUserData`)
- 상수: UPPER_SNAKE_CASE (예: `API_URL`)

### 파일 구조
```
components/
  ComponentName.tsx  # 컴포넌트 파일
services/
  serviceName.ts     # 서비스 파일
types/
  index.ts           # 타입 정의
```

## 🧪 테스트

현재 프로젝트에는 자동화된 테스트가 없습니다. 테스트 프레임워크 추가는 환영합니다!

수동 테스트 체크리스트:
- [ ] 검색 기능이 정상 작동하는가?
- [ ] 지도가 올바르게 표시되는가?
- [ ] 교통편 정보가 정확한가?
- [ ] 추천 기능이 작동하는가?
- [ ] 모바일에서 정상 작동하는가?

## 🤔 질문이 있으신가요?

Issue를 통해 질문해 주세요. 최대한 빠르게 답변드리겠습니다!

## 📜 행동 강령

- 존중: 모든 기여자를 존중합니다
- 협력: 건설적인 피드백을 제공합니다
- 포용: 다양한 관점을 환영합니다

감사합니다! 🙏
