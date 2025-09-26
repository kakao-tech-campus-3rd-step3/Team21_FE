import { useNavigate } from "react-router-dom";

import { EvalCard } from "@/features/eval";
import type { ProfessorEvalForm } from "@/features/professor-review-form/model/schema";
import { useProfessorEvalForm } from "@/features/professor-review-form/model/useProfessorEvalForm";
import { StarRatingField } from "@/features/rating-field";
import { Button } from "@/shared/ui/button";
import { Label } from "@/shared/ui/label";
import { Textarea } from "@/shared/ui/textarea";

type Props<
  TText extends {
    title: string;
    paperEval: string;
    labEval: string;
    paperComment: string;
    paperPlaceholder: string;
    validate: { requiredStar: string };
  },
> = {
  profId: string | number;
  text: TText;
  onSubmitted?: (data: ProfessorEvalForm & { profId: string | number }) => void;
};

export function ProfessorReviewForm<
  TText extends {
    title: string;
    paperEval: string;
    labEval: string;
    paperComment: string;
    paperPlaceholder: string;
    validate: { requiredStar: string };
  },
>({ profId, text, onSubmitted }: Props<TText>) {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isValid, isSubmitting },
  } = useProfessorEvalForm(text);

  const navigate = useNavigate();

  const onSubmit = async (data: ProfessorEvalForm) => {
    await Promise.resolve(onSubmitted?.({ ...data, profId }));
    if (!onSubmitted) {
      console.log("PROF REVIEW SUBMIT", { profId, ...data });
    }
    //성공했다고 가정
    navigate(-1);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h1 className="text-2xl font-bold">
        {text.title} · {profId}
      </h1>

      <EvalCard title={text.paperEval} center>
        <StarRatingField
          control={control}
          name="thesisPerf"
          error={errors.thesisPerf?.message as string | undefined}
          aria-label={text.paperEval}
        />
      </EvalCard>

      <EvalCard title={text.paperComment}>
        <Label htmlFor="thesisReview" className="sr-only">
          {text.paperComment}
        </Label>
        <Textarea
          id="thesisReview"
          placeholder={text.paperPlaceholder}
          {...register("thesisReview")}
        />
      </EvalCard>

      <EvalCard title={text.labEval} center>
        <StarRatingField
          control={control}
          name="labPerf"
          error={errors.labPerf?.message as string | undefined}
          aria-label={text.labEval}
        />
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
