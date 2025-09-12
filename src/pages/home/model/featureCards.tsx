import { FaBook, FaChalkboardTeacher, FaUniversity } from "react-icons/fa";

import { HOME_TEXT } from "../text";

export const FEATURE_ICONS = {
  univ: <FaUniversity className="h-6 w-6 text-indigo-400" />,
  prof: <FaChalkboardTeacher className="h-6 w-6 text-green-400" />,
  major: <FaBook className="h-6 w-6 text-purple-400" />,
} as const;

export const FEATURE_ITEMS = [
  { key: "univ", ...HOME_TEXT.features.univ },
  { key: "prof", ...HOME_TEXT.features.prof },
  { key: "major", ...HOME_TEXT.features.major },
] as const;
