import type { Meta, StoryObj } from "@storybook/react-vite";

import logo from "@/assets/cnulogo.svg";
import type { UniversityHeroData } from "@/entities/university/model/hero.vm";

import { UniversityHero } from "./UniversityHero";

const meta: Meta<typeof UniversityHero> = {
  title: "Entities/University/UniversityHero",
  component: UniversityHero,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "대학교 상세 페이지 상단에 표시되는 Hero 카드입니다. 학교명/주소/재학생 수/설립연도/평점, 그리고 리뷰 작성/비교 버튼을 제공합니다.",
      },
    },
  },
  argTypes: {
    data: { control: "object", description: "대학교 Hero 데이터" },
  },
};
export default meta;

type Story = StoryObj<typeof UniversityHero>;

const baseData: UniversityHeroData = {
  id: 100,
  name: "충남대학교",
  logoUrl: logo,
  address: "대전광역시 유성구 대학로 99",
  foundedYear: 1952,
  rating: 4.3,
  ratingCount: 12874,
  students: 24567,
};

export const Playground: Story = { args: { data: baseData } };
export const WithoutLogo: Story = {
  args: { data: { ...baseData, logoUrl: undefined, name: "국립 모범대학교" } },
};
export const NoAddress: Story = {
  args: { data: { ...baseData, address: "", name: "서울 모 대학" } },
};
export const NoFoundedYear: Story = {
  args: { data: { ...baseData, foundedYear: undefined, name: "부산 모 대학" } },
};
export const LargeNumbers: Story = {
  args: {
    data: {
      ...baseData,
      students: 123456,
      ratingCount: 987654,
      rating: 4.9,
      name: "수치 검증용 대학",
    },
  },
};
