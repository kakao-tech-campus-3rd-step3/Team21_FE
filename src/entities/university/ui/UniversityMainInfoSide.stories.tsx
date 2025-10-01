import type { UniversityMainInfo } from "@/entities/university/model/university-maininfo.vm";
import type { Meta, StoryObj } from "@storybook/react";
import { UniversityMainInfoSide } from "./UniversityMainInfoSide";

const meta: Meta<typeof UniversityMainInfoSide> = {
  title: "Entities/University/UniversityMainInfoSide",
  component: UniversityMainInfoSide,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "대학교의 주요 지표(캠퍼스 수, 단과대학 수, 학과 수, 재학생)를 카드 타일로 보여주는 사이드 컴포넌트입니다.",
      },
    },
  },
  argTypes: {
    data: { control: "object", description: "주요 정보 데이터 객체" },
  },
};
export default meta;

type Story = StoryObj<typeof UniversityMainInfoSide>;

const baseData: UniversityMainInfo = {
  campuses: 2,
  colleges: 14,
  departments: 78,
  students: 24567,
};

export const Playground: Story = {
  args: { data: baseData },
};

export const LargeNumbers: Story = {
  name: "Large Numbers",
  args: {
    data: {
      campuses: 5,
      colleges: 30,
      departments: 250,
      students: 123456,
    },
  },
};

export const ZeroValues: Story = {
  name: "Zero Values",
  args: {
    data: {
      campuses: 0,
      colleges: 0,
      departments: 0,
      students: 0,
    },
  },
};

export const PartialData: Story = {
  name: "Partial Data",
  args: {
    data: {
      campuses: 1,
      colleges: 10,
      departments: 0,
      students: 9800,
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "일부 값이 0이거나 비정상적으로 낮은 경우의 표시 상태를 점검합니다. 필요 시 0표시에 대한 보조 문구를 고려할 수 있습니다.",
      },
    },
  },
};
