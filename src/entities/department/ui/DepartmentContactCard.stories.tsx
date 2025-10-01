import type { Meta, StoryObj } from "@storybook/react";
import { DepartmentContactCard } from "./DepartmentContactCard";

const meta: Meta<typeof DepartmentContactCard> = {
  title: "Entities/Department/DepartmentContactCard",
  component: DepartmentContactCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "학과 연락처 카드 컴포넌트입니다. 전화/이메일/주소 중 전달된 값만 표시합니다. 이메일은 mailto 링크로 렌더링됩니다.",
      },
    },
  },
  argTypes: {
    tel: { control: "text", description: "전화번호" },
    email: { control: "text", description: "이메일 주소 (mailto 링크로 표시)" },
    address: { control: "text", description: "학과 주소" },
  },
};
export default meta;

type Story = StoryObj<typeof DepartmentContactCard>;

export const Playground: Story = {
  args: {
    tel: "042-821-6114",
    email: "cs@cnu.ac.kr",
    address: "대전광역시 유성구 대학로 99, 충남대학교 공과대학 4호관 123호",
  },
};

export const TelOnly: Story = {
  name: "Tel Only",
  args: { tel: "02-123-4567" },
};

export const EmailOnly: Story = {
  name: "Email Only",
  args: { email: "contact@univ.ac.kr" },
};

export const AddressOnly: Story = {
  name: "Address Only",
  args: { address: "세종특별자치시 대학로 1, 공학관 101호" },
};

export const LongAddress: Story = {
  name: "Long Address",
  args: {
    tel: "031-987-6543",
    address:
      "경기도 어딘가 정말 길고 상세한 주소가 이어집니다. 동네 이름, 도로명, 건물명, 동/호수 등등이 아주 길게 표시되도록 테스트합니다. 123-45, 6층 601호",
  },
};

export const Empty: Story = {
  name: "Empty",
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          "모든 값이 없으면 본문이 비게 됩니다. 필요 시 컴포넌트에서 빈 상태 문구를 추가하는 개선을 고려할 수 있습니다.",
      },
    },
  },
};
