import type { Meta, StoryObj } from "@storybook/react";
import { DepartmentJobsCard } from "./DepartmentJobsCard";

const meta: Meta<typeof DepartmentJobsCard> = {
  title: "Entities/Department/DepartmentJobsCard",
  component: DepartmentJobsCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "학과 졸업 후 진출 가능한 직업/진로를 태그 형태로 보여주는 카드 컴포넌트입니다.",
      },
    },
  },
  argTypes: {
    title: { control: "text", description: "카드 제목" },
    tags: { control: "object", description: "직업/진로 태그 리스트" },
  },
};
export default meta;

type Story = StoryObj<typeof DepartmentJobsCard>;

export const Playground: Story = {
  args: {
    title: "졸업 후 진로",
    tags: ["소프트웨어 엔지니어", "데이터 사이언티스트", "AI 연구원", "웹 개발자"],
  },
};

export const FewTags: Story = {
  name: "Few Tags",
  args: {
    title: "졸업 후 진로",
    tags: ["교수", "공무원"],
  },
};

export const ManyTags: Story = {
  name: "Many Tags",
  args: {
    title: "졸업 후 진로",
    tags: [
      "소프트웨어 엔지니어",
      "데이터 사이언티스트",
      "AI 연구원",
      "웹 개발자",
      "모바일 개발자",
      "보안 전문가",
      "게임 개발자",
      "IT 컨설턴트",
      "네트워크 엔지니어",
      "클라우드 아키텍트",
    ],
  },
};

export const Empty: Story = {
  name: "Empty",
  args: {
    title: "졸업 후 진로",
    tags: [],
  },
  parameters: {
    docs: {
      description: {
        story: "태그가 비어 있을 경우 아무 내용도 표시되지 않습니다.",
      },
    },
  },
};
