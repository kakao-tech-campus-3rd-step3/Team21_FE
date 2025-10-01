import cnulogo from "@/assets/cnulogo.svg";
import type { Meta, StoryObj } from "@storybook/react";
import { DepartmentHero } from "./DepartmentHero";

const meta: Meta<typeof DepartmentHero> = {
  title: "Entities/Department/DepartmentHero",
  component: DepartmentHero,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "학과 상세 페이지 상단에 표시되는 Hero 카드입니다. 대학명/학과명/소개/학생수/교수진/설립연도 등을 시각적으로 보여줍니다.",
      },
    },
  },
  argTypes: {
    collegeName: { control: "text", description: "단과대학 이름" },
    departmentName: { control: "text", description: "학과 이름" },
    intro: { control: "text", description: "학과 소개" },
    students: { control: "number", description: "재학생 수" },
    professors: { control: "number", description: "교수진 수" },
    foundedYear: { control: "number", description: "설립 연도" },
    logoUrl: { control: "text", description: "학과 로고 이미지 URL" },
    universityName: { control: "text", description: "대학 이름 (optional)" },
  },
};
export default meta;

type Story = StoryObj<typeof DepartmentHero>;

export const Playground: Story = {
  args: {
    collegeName: "공과대학",
    departmentName: "컴퓨터공학과",
    intro: "최신 IT 기술과 융합 연구를 선도하는 컴퓨터공학과입니다.",
    students: 1200,
    professors: 45,
    foundedYear: 1985,
    logoUrl: cnulogo,
    universityName: "충남대학교",
  },
};

export const WithoutLogo: Story = {
  name: "Without Logo",
  args: {
    collegeName: "인문대학",
    departmentName: "철학과",
    intro: "철학적 사고와 인문학적 소양을 함양하는 철학과입니다.",
    students: 320,
    professors: 12,
    foundedYear: 1972,
    universityName: "충남대학교",
  },
};

export const CollegeOnly: Story = {
  name: "College Only",
  args: {
    collegeName: "자연과학대학",
    departmentName: "",
    intro: "자연현상에 대한 탐구와 연구를 선도합니다.",
    students: 850,
    professors: 30,
    foundedYear: 1990,
  },
};

export const Minimal: Story = {
  name: "Minimal",
  args: {
    collegeName: "사회과학대학",
    departmentName: "정치외교학과",
    intro: "",
    students: 400,
    professors: 15,
    foundedYear: 2000,
  },
};
