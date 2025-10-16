import type { AxiosError } from "axios";
import { Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useCreateLectureReview } from "@/entities/lecture-review";
import type { CourseEvalForm } from "@/features/course-review-form/model/schema";
import { useCourseEvalForm } from "@/features/course-review-form/model/useCourseEvalForm";
import { EvalCard } from "@/features/eval";
import { StarRatingField } from "@/features/rating-field";
import { ControlledSelect } from "@/features/select-field";
import { Button } from "@/shared/ui/button";
import { Label } from "@/shared/ui/label";
import { Textarea } from "@/shared/ui/textarea";

type SelectOption = Readonly<{ label: string; value: string }>;

type CourseEvalTextShape = {
  title: string;
  semesterLabel: string;
  yearSuffix: string;
  termSuffix: string;
  yearPlaceholder: string;
  termPlaceholder: string;

  gradeKindness: string;
  examDifficulty: string;
  lectureSkill: string;

  taskAmount: string;
  teamProject: string;

  taskAmountOptions: ReadonlyArray<SelectOption>;
  teamProjectOptions: ReadonlyArray<SelectOption>;

  totalComment: string;
  commentPlaceholder: string;

  validate: {
    yearRequired: string;
    yearInvalid: string;
    yearRange: string;
    termRequired: string;
    termInvalid: string;
    requiredStar: string;
    selectRequired: string;
  };
};

type Props = {
  lecSeq: number;
  lecName?: string;
  text: CourseEvalTextShape;
  onSubmitted?: (data: CourseEvalForm & { lecSeq: number; semesterKey: string }) => void;
};

const HOMEWORK_MAP: Record<string, number> = {
  "very-few": 1,
  few: 2,
  normal: 3,
  many: 4,
  "very-many": 5,
};

export function CourseReviewForm({ lecSeq, lecName, text, onSubmitted }: Props) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid, isSubmitting },
  } = useCourseEvalForm(text);

  const navigate = useNavigate();
  const { mutateAsync, isPending } = useCreateLectureReview();

  const onSubmit = async (data: CourseEvalForm) => {
    const semesterKey = `${data.year}-${data.term}`; // 예: 2025-1
    await Promise.resolve(onSubmitted?.({ ...data, lecSeq, semesterKey }));

    const body = {
      lecSeq,
      year: data.year,
      semester: data.term,
      lecDifficulty: data.lectureSkill,
      gradeDistribution: data.gradeKindness,
      examDifficulty: data.examDifficulty,
      homework: HOMEWORK_MAP[data.taskAmount],
      groupProjReq: data.teamProject === "yes" ? "Y" : "N",
      overallReview: data.comment || undefined,
    } as const;

    try {
      await mutateAsync(body);
      navigate(-1);
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      const msg = error.response?.data?.message ?? "강의 평가 등록에 실패했습니다.";
      alert(msg);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h1 className="text-2xl font-bold">
        {text.title} · {lecName ?? lecSeq}
      </h1>

      <EvalCard title={text.semesterLabel}>
        <div className="flex items-center gap-2">
          <Controller<CourseEvalForm>
            control={control}
            name="year"
            render={({ field }) => (
              <input
                type="number"
                inputMode="numeric"
                placeholder={text.yearPlaceholder}
                className="border p-2 rounded-md w-32"
                value={field.value ?? ""}
                min={1900}
                max={2100}
                onChange={(e) => {
                  const v = e.target.value;
                  field.onChange(v === "" ? undefined : Number(v));
                }}
              />
            )}
          />
          <span className="text-sm text-muted-foreground">{text.yearSuffix}</span>

          <Controller<CourseEvalForm>
            control={control}
            name="term"
            render={({ field }) => (
              <input
                type="number"
                inputMode="numeric"
                placeholder={text.termPlaceholder}
                className="border p-2 rounded-md w-24"
                value={field.value ?? ""}
                min={1}
                max={2}
                onChange={(e) => {
                  const v = e.target.value;
                  field.onChange(v === "" ? undefined : Number(v));
                }}
              />
            )}
          />
          <span className="text-sm text-muted-foreground">{text.termSuffix}</span>
        </div>

        {(errors.year || errors.term) && (
          <p className="mt-2 text-sm text-red-500">
            {errors.year?.message || errors.term?.message}
          </p>
        )}
      </EvalCard>

      <EvalCard title={text.gradeKindness} center>
        <StarRatingField
          control={control}
          name="gradeKindness"
          aria-label={text.gradeKindness}
          error={errors.gradeKindness?.message}
        />
      </EvalCard>

      <EvalCard title={text.examDifficulty} center>
        <StarRatingField
          control={control}
          name="examDifficulty"
          aria-label={text.examDifficulty}
          error={errors.examDifficulty?.message}
        />
      </EvalCard>

      <EvalCard title={text.lectureSkill} center>
        <StarRatingField
          control={control}
          name="lectureSkill"
          aria-label={text.lectureSkill}
          error={errors.lectureSkill?.message}
        />
      </EvalCard>

      <EvalCard title={text.taskAmount}>
        <ControlledSelect<CourseEvalForm>
          control={control}
          name="taskAmount"
          options={text.taskAmountOptions}
          error={errors.taskAmount?.message}
        />
      </EvalCard>

      <EvalCard title={text.teamProject}>
        <ControlledSelect<CourseEvalForm>
          control={control}
          name="teamProject"
          options={text.teamProjectOptions}
          error={errors.teamProject?.message}
        />
      </EvalCard>

      <EvalCard title={text.totalComment}>
        <Label htmlFor="comment" className="sr-only">
          {text.totalComment}
        </Label>
        <Textarea id="comment" placeholder={text.commentPlaceholder} {...register("comment")} />
      </EvalCard>

      <Button
        type="submit"
        disabled={!isValid || isSubmitting || isPending}
        className="w-full rounded-lg py-3 text-sm font-semibold text-white
                   bg-indigo-500 hover:bg-indigo-500/90
                   shadow-[0_6px_18px_rgba(79,70,229,0.45)]
                   disabled:opacity-60"
      >
        제출하기
      </Button>
    </form>
  );
}
