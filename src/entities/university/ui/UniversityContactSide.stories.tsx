import type { Meta, StoryObj } from "@storybook/react-vite";

import type { UniversitySideContact } from "@/entities/university/model/university-contact.vm";

import { UniversityContactSide } from "./UniversityContactSide";

const meta: Meta<typeof UniversityContactSide> = {
  title: "Entities/University/UniversityContactSide",
  component: UniversityContactSide,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "대학교 연락처 정보를 보여주는 사이드 카드입니다. 전화/웹사이트/이메일 중 값이 있는 항목만 표시됩니다.",
      },
    },
  },
  argTypes: {
    data: { control: "object", description: "대학교 연락처 정보 객체" },
  },
};
export default meta;

type Story = StoryObj<typeof UniversityContactSide>;

const sampleData: UniversitySideContact = {
  tel: "042-821-5114",
  web: "https://www.cnu.ac.kr",
  email: "contact@cnu.ac.kr",
};

export const Playground: Story = {
  args: {
    data: sampleData,
  },
};

export const TelOnly: Story = {
  args: {
    data: { tel: "02-123-4567" },
  },
};

export const WebOnly: Story = {
  args: {
    data: { web: "https://example-univ.kr" },
  },
};

export const EmailOnly: Story = {
  args: {
    data: { email: "info@example-univ.kr" },
  },
};

export const Empty: Story = {
  args: {
    data: {},
  },
  parameters: {
    docs: {
      description: {
        story:
          "값이 없는 경우 아무 항목도 표시되지 않습니다. 필요 시 '연락처 정보 없음' 같은 빈 상태 표시를 고려할 수 있습니다.",
      },
    },
  },
};
