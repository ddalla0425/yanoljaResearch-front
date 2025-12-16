# 🎨 Yanolja Search 메인 페이지 클론 및 UI 커스터마이징

본 프로젝트는 야놀자 서치(Yanolja Search) 메인 페이지의 Insights 카드 슬라이더 UI를 분석하여,</br>
Swiper 기반으로 원본과 동일한 UX를 재현하고, 필요한 부분은 직접 개선하여 최적화한 클론 프로젝트입니다.

특히 메인 Insights 영역의</br>
“스택형 카드 슬라이더(Stacked Card Slider)”를 실제 동작 방식과 최대한 유사하게 커스텀하였으며,</br>
반응형 품질 개선에 집중하여 구현하였습니다.

---

# 📌 프로젝트 개요

이 프로젝트는 아래 흐름을 중심으로 설계되었습니다.
- UI 구조 분석: 야놀자 메인의 스택형 카드 UI 동작 방식 분석
- Swiper 커스터마이징: cardsEffect 기반 부분 커스텀 → opacity 제어 방식으로 안정적 스택 구조 구현
- 반응형 UI/UX 개선: 원본에서 스택 해제로 인해 발생하는 shadow 잘림 문제 보완
- 데이터 구조화 및 다국어 처리: 콘텐츠를 JSON 기반 다국어 구조로 재정리
- 컴포넌트 설계: 컴포넌트 단위로 Insights, Trends, Report 등 메인 영역 제작

단순한 클론이 아니라, </br>
실제 야놀자의 UI 동작 방식과 동일하게 보이도록 디테일까지 구현하도록 노혁하였고,</br>
반응형 품질개선에 집중한 작지만 깊이 있는 프로젝트입니다.

---

# 🔧 사용 기술

### **Framework & Library**
- **Next.js 16**
  - App Router 기반 페이지 구성
  - 이미지 최적화 및 정적 리소스 관리
- **React 19**
  - 컴포넌트 기반 UI 구조 설계
  - Custom LanguageProvider
  - Custom hooks (useLanguage, useIsMobile 등)
  - 콘텐츠 필터링 유틸 제작 (filterByCategory)
### **UI & Interaction**
- **Swiper 12**
    - cardsEffect 커스텀
    - autoplay(prev/next/start/pause), pagination 직접 구현

---

# 🔍 **주요 기능**

## ⭐ 1) Insights 스택형 카드 슬라이더 (Stacked Card Slider)
야놀자 리서치 메인의 핵심 인터랙션을 그대로 재현한 UI입니다.

### **특징**
- 항상 **3장의 카드만 노출**  
  `active → next1 → next2`
- prev 카드 및 next3 이상 카드는 모두 비노출 처리
- Swiper cardsEffect의 자연스러운 transform/z-index/scale 유지
- loop 환경에서도 순서 어긋남 없이 안정 작동
- autoplay + prev/next + pagination **완전 커스텀**
- **반응형에서도 스택 구조 유지** (원본 대비 개선된 품질)


## ⭐ 2) 다국어 지원 

이 프로젝트는 단순한 UI 복사 클론이 아니라,  
실제 서비스처럼 콘텐츠를 **언어별로 관리**하고,  
전역 Provider를 통해 **언어 상태를 다른 컴포넌트에서도 공유**할 수 있도록 설계했습니다.

### **특징**
- `LanguageProvider`를 이용한 글로벌 언어 상태 관리
- `contents[lang]` 구조를 기반으로 한 **데이터 분리 설계**
- 한국어(KR) / 영어(EN) 기준의 텍스트 및 이미지 매핑
- Insights, Trends, Report, Press 등 모든 콘텐츠가 언어 변경 즉시 반영됨
- 새로고침 필요 없는 **즉시 UI 변환**

### **구조 예시**

```js
// /data/mainContents.js
export const contents = {
  kr: { insight: [...], trends: [...], ... },
  en: { insight: [...], trends: [...], ... }
};
```

```jsx
// components 사용 예시
const { lang } = useLanguage();
const insightItems = filterByCategory(contents[lang], "insight", lang);
```

→ 이런 구조는 실제 기업 서비스에서도 많이 사용하는 형태이며,
클론 프로젝트가 아니라 “실 서비스형 아키텍처 설계”에 가깝다는 장점이 있습니다.

---

# 🚀 원본 대비 개선 사항 

### ✔ 1) 반응형에서도 스택 구조 유지
원본 야놀자는 화면이 작아지면 스택 구조를 없애며 shadow·transform이 잘림</br>
→ overflow 조정 + 카드 레이아웃 유지로 반응형에서도 자연스러운 스택 유지

<table>
  <thead>
    <th>Before</th>
    <th>After</th>
  </thead>
  <tbody>
    <td><img src="https://github.com/ddalla0425/yanoljaResearch-front/blob/main/public/assets/readme/%EC%9B%90%EB%B3%B8%ED%8E%98%EC%9D%B4%EC%A7%80%EC%8A%AC%EB%9D%BC%EC%9D%B4%EB%93%9C.gif"/></td>
    <td><img src="https://github.com/ddalla0425/yanoljaResearch-front/blob/main/public/assets/readme/%ED%81%B4%EB%A1%A0%ED%8E%98%EC%9D%B4%EC%A7%80%EC%8A%AC%EB%9D%BC%EC%9D%B4%EB%93%9C.gif"/></td>
  </tbody>
</table>

### ✔ 2) 페이지 ReSize 시 슬라이드 튐 현상 개선
원본: 화면 resize 시 "동향보고서" 슬라이드 튐 현상 </br>
개선: 화면 resize 시 "동향보고서" 슬라이드 튀지 않게 UI 조정</br>
→ 튐 현상 없는 자연스러운 UI 구성

<table>
  <thead>
    <th>Before</th>
    <th>After</th>
  </thead>
  <tbody>
    <td><img src="https://github.com/ddalla0425/yanoljaResearch-front/blob/main/public/assets/readme/%EC%9B%90%EB%B3%B8%EB%A6%AC%EC%82%AC%EC%9D%B4%EC%A6%88%ED%8A%90%ED%98%84%EC%83%81.gif"/></td>
    <td><img src="https://github.com/ddalla0425/yanoljaResearch-front/blob/main/public/assets/readme/%ED%81%B4%EB%A1%A0%EB%A6%AC%EC%82%AC%EC%9D%B4%EC%A7%95%ED%8A%90%EC%9E%A1%EC%9D%8C.gif"/></td>
  </tbody>
</table>

### ✔ 3) Press 영역 텍스트 줄바꿈 개선
원본: 2줄까지 보여주고 넘어가면 "..."</br>
개선: 항상 1줄 보여주고 "..." 처리</br>
→ 한눈에 들어오는 깔끔한 UI 구성

<table>
  <thead>
    <th>Before</th>
    <th>After</th>
  </thead>
  <tbody>
    <td><img src="https://github.com/ddalla0425/yanoljaResearch-front/blob/main/public/assets/readme/%EC%9B%90%EB%B3%B8%EB%AA%A8%EB%B0%94%EC%9D%BC%EB%B6%80%EC%9E%90%EC%97%B0%EC%8A%A4%EB%9F%AC%EC%9A%B4UI.png"/></td>
    <td style="vertical-align: top;"><img src="https://github.com/ddalla0425/yanoljaResearch-front/blob/main/public/assets/readme/%ED%81%B4%EB%A1%A0%EB%AA%A8%EC%9E%90%EC%9D%BC%EC%9E%90%EC%97%B0%EC%8A%A4%EB%9F%AC%EC%9A%B4UI.png"/></td>
  </tbody>
</table>

---

# 🧩 트러블슈팅 요약

Insights 스택형 슬라이더를 구현하는 과정에서  
Swiper의 `cardsEffect`와 `creativeEffect`가 가진 구조적 제약 때문에 다양한 문제가 발생했습니다.

핵심 이슈는 다음과 같습니다.

- cardsEffect는 기본적으로 스택 구조를 제공하지만, Swiper 내부에서 자동 계산해 덮어쓰기 때문에 사용자가 원하는 형태로 커스텀 하기가 어려움
- creativeEffect 로도 시도 했으나, 위와 비슷한 이유로 내부에서 덮어써짐
- loop 모드에서 index 점프 및 순서 불안정
- prev 버튼에서 transition 타이밍 달라 “한 프레임 튐” 현상 발생

최종적으로 cardsEffect로 다시 돌아와 **transform은 Swiper에게 맡기고**,
**보여질 카드만 opacity로 제어하는 ‘부분 커스텀 전략’** 으로 안정적으로 해결했습니다.

> 전체 문제 분석 · 시행착오 · 해결 과정은 아래 Notion 링크에 상세히 정리했습니다.  
> 👉 [상세 트러블슈팅 기록](https://ddalla0425.notion.site/?p=2c327e1365db80279b77d8334e872365&pm=s)

---

# 프로젝트 구조
```
src/
├─ app/                # Next.js App Router 파일 구조(페이지 엔트리)
├─ components/
│   ├─ common/         # 프로젝트 전반에서 재사용되는 공용 UI 컴포넌트
│   ├─ layout/         # Header, Footer, LayoutWrapper 등 레이아웃 구성 요소
│   └─ home/           # 홈 화면 전용 섹션 UI 컴포넌트
├─ data/               # 콘텐츠 및 정적 데이터 정의
├─ providers/          # 전역 상태 · 컨텍스트 Providers(LanguageProvider 등)
├─ styles/             # 전역 스타일 CSS
└─ utils/
    └─ hooks/          # 커스텀 훅 모음
```


---

# ▶️ 실행 방법

1. repository clone
```
 git clone https://github.com/ddalla0425/yanoljaResearch-front.git
```
2. 패키지 설치
```
 npm install
```
3. 개발 서버 실행
```
 npm run dev
```
4. 브라우저에서 접속
```
http://localhost:3000
```

---
