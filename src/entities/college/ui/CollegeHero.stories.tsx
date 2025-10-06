import type { Meta, StoryObj } from "@storybook/react-vite";

import logo from "@/assets/cnulogo.svg";

import { CollegeHero } from "./CollegeHero";

const meta: Meta<typeof CollegeHero> = {
  title: "Entities/College/CollegeHero",
  component: CollegeHero,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "단과대학 상세 상단 Hero 카드. 대학명, 단과대학명, 소개문, 재학생/교수진 수, 설립연도, 로고를 표시합니다.",
      },
    },
  },
  args: {
    collegeName: "공과대학",
    universityName: "충남대학교",
    intro: "엔지니어링 기반 융합 교육과 연구를 선도합니다.",
    students: 12345,
    professors: 456,
    foundedYear: 1952,
    logoUrl: undefined,
  },
  decorators: [
    (Story) => (
      <div className="w-[860px] max-w-[92vw]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof CollegeHero>;

export const Playground: Story = {};

// 로고가 있는 경우
export const WithLogo: Story = {
  args: {
    logoUrl: logo,
  },
};

// 최소 정보
export const Minimal: Story = {
  args: {
    intro: undefined,
    students: undefined,
    professors: undefined,
    foundedYear: undefined,
    logoUrl: undefined,
  },
};

// 줄바꿈/레이아웃 확인
export const LongTexts: Story = {
  args: {
    collegeName: "공과대학-차세대지능형융합시스템 · 초지능·초연결·초융합-테스트-아주아주긴이름",
    universityName: "국립충남대학교-대전광역시유성구대학로-미래융합캠퍼스-매우긴대학명테스트",
    intro:
      "공과대학은 다학제 간 융합을 중심으로 산업 전반의 혁신을 주도합니다. 인공지능·클라우드·로보틱스·반도체·차세대 네트워크 등 폭넓은 교육 과정을 제공합니다.",
  },
};

// 포맷과 배치 확인
export const LargeNumbers: Story = {
  args: {
    students: 1234567,
    professors: 9876,
    foundedYear: 1900,
  },
};
