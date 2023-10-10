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
  );
}
