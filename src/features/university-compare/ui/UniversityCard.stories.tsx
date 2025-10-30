import type { Meta, StoryObj } from "@storybook/react-vite";

import { UniversityCard } from "./UniversityCard";

const meta: Meta<typeof UniversityCard> = {
  title: "Features/UniversityCompare/UniversityCard",
  component: UniversityCard,
  decorators: [
    (S) => (
      <div style={{ width: 360, margin: "40px auto" }}>
        <S />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof UniversityCard>;

export const Playground: Story = {
  args: {
    university: {
      id: 1,
      name: "충남대학교",
      address: "대전 유성구 대학로 99",
      tel: "042-821-5114",
      rating: 4.3,
      food: 0,
      dorm: 0,
      conv: 0,
      campus: 0,
      welfare: 0,
    },
  },
};
