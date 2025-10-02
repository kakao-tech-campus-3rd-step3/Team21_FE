import type { Meta, StoryObj } from "@storybook/react-vite";

import type { ProfessorHeroData } from "../model/professor-hero.vm";
import { ProfessorHero } from "./ProfessorHero";

const meta: Meta<typeof ProfessorHero> = {
  title: "Entities/Professor/ProfessorHero",
  component: ProfessorHero,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "교수 상세 상단 Hero 카드. 교수의 이름, 학과, 대학, 이메일, 오피스, 평점, 액션 버튼(리뷰 작성/비교) 표시.",
      },
    },
  },
  args: {
    data: {
      id: 1,
      name: "이영석",
      department: "컴퓨터공학과",
      university: "충남대학교",
      email: "yslee@example.ac.kr",
      office: "공대 5호관 401호",
      avatarUrl: "",
      rating: 4.3,
      ratingCount: 124,
    } satisfies ProfessorHeroData,
  },
};

export default meta;
type Story = StoryObj<typeof ProfessorHero>;

export const Playground: Story = {};

// NoAvatar
export const NoAvatar: Story = {
  args: {
    data: {
      id: 2,
      name: "홍길동",
      department: "전자공학과",
      university: "서울대학교",
      email: "hong@example.ac.kr",
      office: "공대 1호관 101호",
      avatarUrl: "",
      rating: 3.8,
      ratingCount: 52,
    },
  },
};

// LongTexts
export const LongTexts: Story = {
  args: {
    data: {
      id: 3,
      name: "이영석-아주아주길고복잡한이름테스트케이스입니다-교수교수교수교수교수",
      department: "컴퓨터공학부-컴퓨터융합학부-매우긴학과명",
      university: "충남대학교-공과대학-컴퓨터인공지능융합소프트웨어학부-컴퓨터공학부",
      email: "longtext-professor@example.ac.kr",
      office: "제1공학관 999호",
      avatarUrl: "",
      rating: 4.9,
      ratingCount: 9999,
    },
  },
};
