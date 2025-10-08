import type { Meta, StoryObj } from "@storybook/react-vite";

import type { University } from "@/entities/university/model/university";

import { UniversityCard } from "./UniversityCard";

const makeUniv = (over?: Partial<University>): University =>
  ({
    id: 1,
    name: "충남대학교",
    address: "대전광역시 유성구 대학로 99",
    tel: "042-821-5114",
    rating: 4.4,
    tags: ["캠퍼스 쾌적", "교통 편리", "동아리 활발"],
    ...over,
  }) as University;

const meta: Meta<typeof UniversityCard> = {
  title: "Features/University/UniversityCard",
  component: UniversityCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    backgrounds: { default: "dark" },
    docs: {
      description: {
        component: "대학 정보 카드-> 대학명/주소/전화/평점/태그를 표시, 우상단 X 버튼으로 제거",
      },
    },
  },
  argTypes: {
    onRemove: { action: "remove" },
  },
  args: {
    university: makeUniv(),
  },
  decorators: [
    (Story) => (
      <div className="w-[360px] h-[300px] max-w-[92vw]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof UniversityCard>;

export const Playground: Story = {};

export const NoTags: Story = {
  args: { university: makeUniv({ tags: [] }) },
};

export const ManyTags: Story = {
  args: {
    university: makeUniv({
      tags: [
        "기숙사 최신",
        "장학 혜택",
        "국제 교류",
        "산학 협력",
        "동아리 多",
        "체육 시설",
        "문화 공간",
        "학생 복지",
      ],
    }),
  },
};

export const LowRating: Story = {
  args: { university: makeUniv({ rating: 1.8, tags: ["리모델링 필요", "주차 혼잡"] }) },
};

export const PerfectRating: Story = {
  args: { university: makeUniv({ rating: 5.0, tags: ["최고의 캠퍼스", "만족도 높음"] }) },
};

export const LongTexts: Story = {
  args: {
    university: makeUniv({
      name: "국립충남대학교-대전광역시유성구대학로-미래융합캠퍼스(아주긴이름테스트)",
      address:
        "대전광역시 유성구 대학로 99, 공학관 A동 101호, 우편번호 34134 (주소 줄바꿈/클램핑 확인용 매우 긴 텍스트)",
      tel: "042-821-5114 내선 1234",
      tags: ["아주 긴 태그 내용으로 줄바꿈 확인"],
    }),
  },
};

export const MissingInfo: Story = {
  args: {
    university: makeUniv({
      address: undefined,
      tel: undefined,
      tags: undefined,
    }),
  },
};
