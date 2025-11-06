# 🗺️ TravelMate - AI 기반 여행 개인화 앱

실시간 교통편 연계와 AI 추천으로 완벽한 여행 계획을 세워보세요!

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## ✨ 주요 기능

### 🚆 실시간 교통편 통합
- **다양한 교통수단**: 버스, 기차(KTX), 비행기, 지하철, 택시 통합 검색
- **최적 경로 추천**: 시간/비용 기반 최적 경로 자동 계산
- **실시간 시간표**: 출발/도착 시간 실시간 연동
- **가격 비교**: 교통수단별 요금 비교 및 총 비용 계산

### 🗺️ Google Maps 시각화
- **인터랙티브 지도**: Google Maps API 기반 경로 시각화
- **경로 하이라이트**: 교통수단별 색상 구분 경로 표시
- **실시간 업데이트**: 경로 변경 시 지도 자동 업데이트
- **마커 표시**: 출발지/도착지 명확한 표시

### 🎯 AI 맞춤 추천
- **취향 분석**: 여행 스타일, 음식 취향, 예산, 페이스 기반 추천
- **관광지 추천**: 8가지 여행 스타일에 맞는 관광지 큐레이션
- **맛집 추천**: 10가지 음식 카테고리 기반 레스토랑 추천
- **개인화 알고리즘**: 사용자 설정에 따른 스마트 필터링

### 🎨 현대적 UI/UX
- **반응형 디자인**: 모바일/태블릿/데스크톱 완벽 지원
- **직관적 인터페이스**: 누구나 쉽게 사용 가능한 UX
- **Material Design**: Tailwind CSS 기반 모던한 디자인
- **실시간 피드백**: 로딩 상태 및 에러 처리

## 🛠️ 기술 스택

### Frontend
- **React 18** - 최신 React 버전
- **TypeScript** - 타입 안정성
- **Vite** - 빠른 빌드 도구
- **Tailwind CSS** - 유틸리티 기반 스타일링
- **Google Maps API** - 지도 및 경로 시각화
- **React DatePicker** - 날짜/시간 선택
- **Axios** - HTTP 클라이언트
- **Lucide React** - 아이콘 라이브러리

### Backend
- **Node.js** - JavaScript 런타임
- **Express.js** - 웹 프레임워크
- **TypeScript** - 타입 안정성
- **RESTful API** - API 설계

## 📋 사전 요구사항

- Node.js 18.x 이상
- npm 또는 yarn
- Google Maps API Key (필수)

## 🚀 설치 및 실행

### 1. 저장소 클론

```bash
git clone <repository-url>
cd solideo-Day2-01-23-Practice2
```

### 2. Google Maps API Key 발급

1. [Google Cloud Console](https://console.cloud.google.com/) 접속
2. 새 프로젝트 생성
3. "APIs & Services" > "Library" 이동
4. 다음 API 활성화:
   - Maps JavaScript API
   - Places API
   - Geocoding API
5. "APIs & Services" > "Credentials" 이동
6. "CREATE CREDENTIALS" > "API key" 클릭
7. API 키 복사

### 3. 환경 변수 설정

프로젝트 루트에 `.env` 파일 생성:

```bash
# .env 파일 생성
cp .env.example .env
```

`.env` 파일에 Google Maps API 키 입력:

```env
VITE_GOOGLE_MAPS_API_KEY=your_actual_api_key_here
VITE_API_URL=http://localhost:3001
```

### 4. 의존성 설치

```bash
# 루트, 프론트엔드, 백엔드 모든 패키지 설치
npm run install:all
```

또는 개별 설치:

```bash
# 루트
npm install

# 프론트엔드
cd frontend && npm install

# 백엔드
cd backend && npm install
```

### 5. 개발 서버 실행

#### 방법 1: 통합 실행 (권장)
```bash
# 루트 디렉토리에서
npm run dev
```

프론트엔드: http://localhost:3000
백엔드: http://localhost:3001

#### 방법 2: 개별 실행
```bash
# 터미널 1 - 프론트엔드
cd frontend
npm run dev

# 터미널 2 - 백엔드
cd backend
npm run dev
```

## 📱 사용 방법

### 1. 기본 검색
1. 출발지 입력 (예: "서울역", "인천공항")
2. 도착지 입력 (예: "부산역", "제주공항")
3. 출발 일시 선택
4. 여행 기간 입력 (일 단위)
5. "여행 경로 검색" 버튼 클릭

### 2. 취향 설정
1. 우측 상단 "여행 취향 설정" 버튼 클릭
2. 여행 스타일 선택 (복수 선택 가능):
   - 럭셔리, 알뜰여행, 모험, 휴양, 문화, 자연, 도시, 가족
3. 음식 취향 선택 (복수 선택 가능):
   - 한식, 일식, 중식, 양식, 채식, 비건, 길거리음식, 파인다이닝, 로컬맛집, 카페
4. 예산 수준 선택:
   - 저예산, 중간, 고예산, 럭셔리
5. 여행 속도 선택:
   - 느긋하게, 적당히, 빠르게
6. "저장하기" 클릭

### 3. 결과 확인
- **지도**: 경로가 색상별로 표시됩니다
- **교통편**: 여러 경로 옵션과 상세 정보 확인
- **추천**: 취향에 맞는 관광지와 맛집 추천

## 🏗️ 프로젝트 구조

```
solideo-Day2-01-23-Practice2/
├── frontend/                # React 프론트엔드
│   ├── src/
│   │   ├── components/     # React 컴포넌트
│   │   │   ├── Header.tsx
│   │   │   ├── SearchForm.tsx
│   │   │   ├── MapView.tsx
│   │   │   ├── TransportationResults.tsx
│   │   │   ├── RecommendationsPanel.tsx
│   │   │   └── PreferencesModal.tsx
│   │   ├── services/       # API 서비스
│   │   │   └── api.ts
│   │   ├── types/          # TypeScript 타입 정의
│   │   │   └── index.ts
│   │   ├── styles/         # 스타일 파일
│   │   │   └── index.css
│   │   ├── App.tsx         # 메인 앱 컴포넌트
│   │   └── main.tsx        # 엔트리 포인트
│   ├── package.json
│   ├── vite.config.ts
│   └── tailwind.config.js
├── backend/                 # Express 백엔드
│   ├── src/
│   │   ├── routes/         # API 라우트
│   │   │   ├── search.ts
│   │   │   └── recommendations.ts
│   │   ├── services/       # 비즈니스 로직
│   │   │   ├── geocoding.ts
│   │   │   ├── transportationService.ts
│   │   │   └── recommendationService.ts
│   │   ├── types/          # TypeScript 타입 정의
│   │   │   └── index.ts
│   │   └── index.ts        # 서버 엔트리 포인트
│   ├── package.json
│   └── tsconfig.json
├── package.json            # 루트 패키지
├── .gitignore
├── .env.example
└── README.md
```

## 🔌 API 엔드포인트

### POST `/api/search`
여행 경로 검색

**Request Body:**
```json
{
  "departure": "서울역",
  "arrival": "부산역",
  "departureTime": "2024-01-15T09:00:00",
  "duration": 2,
  "preferences": {
    "travelStyle": ["cultural", "food"],
    "foodPreferences": ["korean", "local"],
    "budget": "medium",
    "pace": "moderate"
  }
}
```

**Response:**
```json
{
  "id": "trip-123",
  "departure": { "name": "서울역", "lat": 37.5547, "lng": 126.9707 },
  "arrival": { "name": "부산역", "lat": 35.1149, "lng": 129.0414 },
  "routes": [...],
  "recommendations": {
    "destinations": [...],
    "restaurants": [...]
  }
}
```

### POST `/api/recommendations/destinations`
관광지 추천

### POST `/api/recommendations/restaurants`
레스토랑 추천

## 🎨 주요 컴포넌트 설명

### SearchForm
- 출발지/도착지 입력
- 날짜/시간 선택
- 여행 기간 설정
- 폼 검증 및 제출

### MapView
- Google Maps 통합
- 경로 시각화
- 마커 표시
- 자동 바운딩

### TransportationResults
- 경로 옵션 표시
- 교통수단별 아이콘
- 상세 정보 토글
- 가격/시간 비교

### RecommendationsPanel
- 탭 기반 UI (관광지/맛집)
- 카드 형식 레이아웃
- 평점 표시
- 이미지 미리보기

### PreferencesModal
- 모달 다이얼로그
- 다중 선택 옵션
- 실시간 미리보기
- 설정 저장

## 🚀 배포

### 프론트엔드 빌드

```bash
cd frontend
npm run build
```

빌드된 파일은 `frontend/dist/` 디렉토리에 생성됩니다.

### 백엔드 빌드

```bash
cd backend
npm run build
npm start
```

### 환경별 설정

#### 개발 환경
- `.env` 파일 사용
- Hot reload 활성화
- Source maps 활성화

#### 프로덕션 환경
- 환경 변수를 서버에 직접 설정
- 빌드 최적화
- 에러 로깅 설정

### 배포 플랫폼 추천

**프론트엔드:**
- Vercel (추천)
- Netlify
- AWS S3 + CloudFront

**백엔드:**
- Railway (추천)
- Heroku
- AWS EC2
- DigitalOcean

## 🔧 커스터마이징

### 색상 테마 변경
`frontend/tailwind.config.js` 파일의 색상 설정 수정:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // 원하는 색상으로 변경
      }
    }
  }
}
```

### 추가 교통수단 지원
`backend/src/services/transportationService.ts`에 새로운 함수 추가

### 추가 추천 카테고리
`backend/src/services/recommendationService.ts`의 데이터베이스 확장

## 🐛 문제 해결

### Google Maps가 로드되지 않는 경우
1. API 키가 올바른지 확인
2. Maps JavaScript API가 활성화되어 있는지 확인
3. 브라우저 콘솔에서 에러 메시지 확인

### CORS 에러
백엔드의 CORS 설정이 올바른지 확인:
```typescript
// backend/src/index.ts
app.use(cors({
  origin: 'http://localhost:3000'
}));
```

### 포트 충돌
다른 포트 사용:
```bash
# 프론트엔드
PORT=3002 npm run dev

# 백엔드
PORT=3003 npm run dev
```

## 📈 향후 개선 계획

- [ ] 실제 교통 API 연동 (Amadeus, 공공데이터포털)
- [ ] 사용자 계정 및 저장 기능
- [ ] 여행 일정 공유 기능
- [ ] 실시간 교통 상황 반영
- [ ] 모바일 앱 개발 (React Native)
- [ ] 다국어 지원
- [ ] 결제 시스템 통합
- [ ] 소셜 로그인 (Google, Kakao, Naver)

## 🤝 기여하기

이 프로젝트는 오픈소스입니다. 기여를 환영합니다!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 있습니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

## 📧 연락처

프로젝트 문의: [GitHub Issues](https://github.com/yourusername/travel-app/issues)

## 🙏 감사의 말

- Google Maps Platform
- React 커뮤니티
- Open Source Contributors

---

**Made with ❤️ for travelers**
