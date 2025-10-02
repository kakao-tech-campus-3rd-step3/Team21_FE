import type { Meta, StoryObj } from "@storybook/react-vite";

import { CollegeContactCard } from "./CollegeContactCard";

const meta: Meta<typeof CollegeContactCard> = {
  title: "Entities/College/CollegeContactCard",
  component: CollegeContactCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "단과대학 연락처 카드. 전화번호, 이메일, 주소 정보를 표시합니다.",
      },
    },
  },
  args: {
    tel: "042-123-4567",
    email: "contact@cnu.ac.kr",
    address: "대전광역시 유성구 대학로 99",
  },
  decorators: [
    (Story) => (
      <div className="w-[400px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof CollegeContactCard>;

export const Playground: Story = {};

// 이메일이 없는 경우
export const MissingEmail: Story = {
  args: {
    tel: "042-987-6543",
    email: undefined,
    address: "서울특별시 관악구 대학길 12",
  },
};

// 모든 값이 없는 경우
export const NoData: Story = {
  args: {
    tel: undefined,
    email: undefined,
    address: undefined,
  },
};
