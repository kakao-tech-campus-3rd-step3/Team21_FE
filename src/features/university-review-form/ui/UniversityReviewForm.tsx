import type { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

import { useCreateUnivReview } from "@/entities/univ-review";
import { EvalCard } from "@/features/eval";
import { StarRatingField } from "@/features/rating-field";
import type { UniversityEvalForm } from "@/features/university-review-form/model/schema";
import { useUniversityEvalForm } from "@/features/university-review-form/model/useUniversityEvalForm";
import { Button } from "@/shared/ui/button";
import { Label } from "@/shared/ui/label";
import { Textarea } from "@/shared/ui/textarea";

type Props<
  TText extends {
    title: string;
    categories: string[];
    totalComment: string;
    commentPlaceholder: string;
    validate: { requiredStar: string };
  },
> = {
  univSeq: number;
  univName?: string;
  text: TText;
  onSubmitted?: (data: UniversityEvalForm & { univSeq: number }) => void;
};

export function UniversityReviewForm<
  TText extends {
    title: string;
    categories: string[];
    totalComment: string;
    commentPlaceholder: string;
    validate: { requiredStar: string };
  },
>({ univSeq, univName, text, onSubmitted }: Props<TText>) {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isValid, isSubmitting },
  } = useUniversityEvalForm(text);

  const navigate = useNavigate();
  const { mutateAsync, isPending } = useCreateUnivReview();

  const onSubmit = async (data: UniversityEvalForm) => {
    await Promise.resolve(onSubmitted?.({ ...data, univSeq }));

    const body = {
      univSeq: univSeq,
      food: data.food,
      dormitory: data.dorm,
      convenience: data.conv,
      campus: data.campus,
      welfare: data.overall,
      reviewText: data.comment || undefined,
    } as const;

    try {
      await mutateAsync(body);
      navigate(-1);
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      const msg = error.response?.data?.message ?? "학교 평가 등록에 실패했습니다.";
      alert(msg);
    }
  };

  const keys = ["food", "dorm", "conv", "campus", "overall"] as const;

  const getFieldError = <K extends keyof UniversityEvalForm>(key: K) => errors[key]?.message;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h1 className="text-2xl font-bold">
        {text.title} · {univName ?? univSeq}
      </h1>

      {keys.map((k, idx) => (
        <EvalCard key={k} title={text.categories[idx]} center>
          <StarRatingField
            control={control}
            name={k}
            error={getFieldError(k)}
            aria-label={text.categories[idx]}
          />
        </EvalCard>
      ))}

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
