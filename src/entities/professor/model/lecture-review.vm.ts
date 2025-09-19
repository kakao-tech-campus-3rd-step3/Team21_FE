export type LectureReview = {
  id: number;
  course: string;
  semesterText: string;
  rating?: number;
  content: string;
  chips: string[];
};
