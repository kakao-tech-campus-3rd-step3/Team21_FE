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
  univId: string | number;
  text: TText;
  onSubmitted?: (data: UniversityEvalForm & { univId: string | number }) => void;
};

export function UniversityReviewForm<
  TText extends {
    title: string;
    categories: string[];
    totalComment: string;
    commentPlaceholder: string;
    validate: { requiredStar: string };
  },
>({ univId, text, onSubmitted }: Props<TText>) {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isValid, isSubmitting },
  } = useUniversityEvalForm(text);

  const onSubmit = (data: UniversityEvalForm) => {
    onSubmitted?.({ ...data, univId });
    if (!onSubmitted) console.log("UNIV REVIEW SUBMIT", { univId, ...data });
  };

  const keys = ["food", "dorm", "conv", "campus", "overall"] as const;

  const getFieldError = <K extends keyof UniversityEvalForm>(key: K) =>
    errors[key]?.message as string | undefined;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h1 className="text-2xl font-bold">
        {text.title} · {univId}
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
        disabled={!isValid || isSubmitting}
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
