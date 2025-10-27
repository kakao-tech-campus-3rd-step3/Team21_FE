import { CollegeGrid } from "@/entities/college";
import { useCollegesByUniversity } from "@/entities/college/hooks/useCollegesByUniversity";
import type { CollegeCard } from "@/entities/college/model/college-card.vm";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { EmptyState } from "@/shared/ui/EmptyState";
import { ErrorView } from "@/shared/ui/ErrorView";
import { LoadingView } from "@/shared/ui/LoadingView";

type Props = { univId: number };

export function CollegeSection({ univId }: Props) {
  const { data, isLoading, isError, refetch } = useCollegesByUniversity(univId);

  if (!Number.isFinite(univId) || univId <= 0) {
    return (
      <Card className="bg-zinc-900/60 border-zinc-600/80 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-xl">단과대학</CardTitle>
        </CardHeader>
        <CardContent>
          <EmptyState
            title="잘못된 접근입니다"
            description="요청한 대학 정보를 확인할 수 없습니다."
          />
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card className="bg-zinc-900/60 border-zinc-600/80 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-xl">단과대학</CardTitle>
        </CardHeader>
        <CardContent>
          <LoadingView message="단과대 정보를 불러오는 중…" />
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="bg-zinc-900/60 border-zinc-600/80 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-xl">단과대학</CardTitle>
        </CardHeader>
        <CardContent>
          <ErrorView
            title="단과대 정보를 불러오지 못했어요"
            description="네트워크 상태를 확인하시고 다시 시도해 주세요."
            onRetry={refetch}
          />
        </CardContent>
      </Card>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Card className="bg-zinc-900/60 border-zinc-600/80 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-xl">단과대학</CardTitle>
        </CardHeader>
        <CardContent>
          <EmptyState
            title="표시할 단과대 정보가 없습니다"
            description="등록된 단과대 데이터가 없어요."
            action={
              <button
                className="px-4 py-2 rounded bg-zinc-800 border border-zinc-600"
                onClick={() => refetch()}
              >
                다시 시도
              </button>
            }
          />
        </CardContent>
      </Card>
    );
  }

  const items: CollegeCard[] = data.map((c) => ({
    collegeSeq: c.id,
    name: c.name,
    description: c.intro,
    departmentCount: c.departmentCount,
  }));

  return (
    <Card className="bg-zinc-900/60 border-zinc-600/80 backdrop-blur">
      <CardHeader>
        <CardTitle className="text-xl">단과대학</CardTitle>
      </CardHeader>
      <CardContent className="px-4 py-2">
        <CollegeGrid colleges={items} />
      </CardContent>
    </Card>
  );
}
