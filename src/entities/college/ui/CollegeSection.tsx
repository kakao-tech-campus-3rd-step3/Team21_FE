import { CollegeGrid } from "@/entities/college";
import { useCollegesByUniversity } from "@/entities/college/hooks/useCollegesByUniversity";
import type { CollegeCard } from "@/entities/college/model/types";
import { DataSection } from "@/shared/ui/DataSection";

type Props = { univId: number };

export function CollegeSection({ univId }: Props) {
  const { data, isLoading, isError, refetch } = useCollegesByUniversity(univId);

  if (!Number.isFinite(univId) || univId <= 0) {
    return (
      <DataSection.Empty
        title="단과대학"
        emptyTitle="잘못된 접근입니다"
        emptyDescription="요청한 대학 정보를 확인할 수 없습니다."
      />
    );
  }

  if (isLoading) {
    return <DataSection.Loading title="단과대학" message="단과대 정보를 불러오는 중…" />;
  }

  if (isError) {
    return (
      <DataSection.Error
        title="단과대학"
        errorTitle="단과대 정보를 불러오지 못했어요"
        errorDescription="네트워크 상태를 확인하시고 다시 시도해 주세요."
        onRetry={refetch}
      />
    );
  }

  if (!data || data.length === 0) {
    return (
      <DataSection.Empty
        title="단과대학"
        emptyTitle="표시할 단과대 정보가 없습니다"
        emptyDescription="등록된 단과대 데이터가 없어요."
        emptyAction={
          <button
            className="px-4 py-2 rounded bg-zinc-800 border border-zinc-600"
            onClick={() => refetch()}
          >
            다시 시도
          </button>
        }
      />
    );
  }

  const items: CollegeCard[] = data.map((c) => ({
    collegeSeq: c.id,
    name: c.name,
    description: c.intro,
    departmentCount: c.departmentCount,
  }));

  return (
    <DataSection title="단과대학">
      <div className="px-4 py-2">
        <CollegeGrid colleges={items} />
      </div>
    </DataSection>
  );
}
