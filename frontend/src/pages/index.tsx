import { useRouter } from 'next/router';
import { useJobList } from '@/context/useJobList';
import JobCard from '@/components/jobs/JobCard';
import JobCardSkeleton from '@/components/jobs/JobCardSkeleton';

export default function Home() {
  const { isLoading, data } = useJobList();
  const router = useRouter();

  const handleViewDetail = async (id: string) => {
    router.push(`/detail/${id}`);
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between bg-slate-100 p-4`}
    >
      <div className='container'>
        {isLoading &&
          [1, 2, 3, 4].map((item) => <JobCardSkeleton key={item.toString()} />)}
        {data &&
          data?.length > 0 &&
          data.map((item, idx) => (
            <JobCard
              idx={idx}
              job={item}
              onClick={() => handleViewDetail(item.id)}
            />
          ))}
      </div>
    </main>
  );
}
