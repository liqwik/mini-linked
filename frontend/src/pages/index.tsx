import { useRouter } from 'next/router';
import { useJobList } from '@/context/useJobList';
import JobCard from '@/components/jobs/JobCard';
import JobCardSkeleton from '@/components/jobs/JobCardSkeleton';

export default function Home() {
  const { isLoading, data: jobs } = useJobList();
  const router = useRouter();

  const handleViewDetail = async (id: string) => {
    router.push(`/detail/${id}`);
  };

  if (isLoading) {
    return (
      <div className='container'>
        {[1, 2, 3, 4].map((item) => (
          <JobCardSkeleton key={item.toString()} />
        ))}
      </div>
    );
  }

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between bg-slate-900 p-4 text-slate-100`}
    >
      <div className='container'>
        {jobs &&
          jobs?.length > 0 &&
          jobs.map((job, idx) => (
            <JobCard
              idx={idx}
              job={job}
              onClick={() => handleViewDetail(job.id)}
            />
          ))}
      </div>
    </main>
  );
}
