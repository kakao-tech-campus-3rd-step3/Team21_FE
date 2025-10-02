import type { Meta, StoryObj } from "@storybook/react-vite";

import { DepartmentList } from "./DepartmentList";

type Department = {
  name: string;
  description?: string;
  tags: string[];
  students: number;
  professors: number;
  founded: number;
  employmentRate: number;
};

const meta: Meta<typeof DepartmentList> = {
  title: "Entities/Department/DepartmentList",
  component: DepartmentList,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "단과대학 하위 학과 목록을 카드 형태로 보여주는 리스트 컴포넌트입니다. 각 학과별로 설명, 태그, 학생 수, 교수진 수, 설립 연도, 취업률 등을 표시합니다.",
      },
    },
  },
  argTypes: {
    title: { control: "text", description: "리스트 제목" },
    items: { control: "object", description: "학과 데이터 배열" },
  },
};
export default meta;

type Story = StoryObj<typeof DepartmentList>;

const sampleDepartments: Department[] = [
  {
    name: "컴퓨터공학과",
    description: "최신 IT 기술을 연구하고 혁신을 선도합니다.",
    tags: ["AI", "Big Data", "Security"],
    students: 1200,
    professors: 45,
    founded: 1985,
    employmentRate: 92,
  },
  {
    name: "전자공학과",
    description: "반도체 및 전자 회로 분야의 전문 인력을 양성합니다.",
    tags: ["Semiconductor", "Circuit", "IoT"],
    students: 950,
    professors: 38,
    founded: 1978,
    employmentRate: 88,
  },
  {
    name: "기계공학과",
    description: "기계 설계 및 제조 분야의 미래를 개척합니다.",
    tags: ["Robotics", "CAD", "Thermodynamics"],
    students: 800,
    professors: 32,
    founded: 1970,
    employmentRate: 85,
  },
];

export const Playground: Story = {
  args: {
    title: "공과대학 학과 목록",
    items: sampleDepartments,
  },
};

export const SingleDepartment: Story = {
  args: {
    title: "단일 학과",
    items: [sampleDepartments[0]],
  },
};

export const NoTags: Story = {
  args: {
    title: "태그 없는 학과",
    items: [
      {
        name: "수학과",
        description: "순수 및 응용 수학 분야를 연구합니다.",
        tags: [],
        students: 600,
        professors: 25,
        founded: 1965,
        employmentRate: 80,
      },
    ],
  },
};

export const Empty: Story = {
  args: {
    title: "빈 목록",
    items: [],
  },
  parameters: {
    docs: {
      description: {
        story: "학과 배열이 비어 있으면 콘텐츠가 렌더링되지 않습니다.",
      },
    },
  },
};
