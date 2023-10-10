import { useRouter } from 'next/router';
import { useJobList } from '@/context/useJobList';
import JobCard from '@/components/jobs/JobCard';
import JobCardSkeleton from '@/components/jobs/JobCardSkeleton';
import useJobDetail from '@/context/useJobDetail';

export default function Home() {
  const router = useRouter();
  const { isLoading, data: jobs } = useJobList();
  const { setJobDetail } = useJobDetail();

  const handleViewDetail = async (id: string) => {
    const jobDetail = jobs?.find(job => job.id === id);

    if (!jobDetail) return;

    setJobDetail((prev: any) => ({
      ...prev,
      ...jobDetail,
      description: jobDetail.description.replace(/[\n]/g, '<br>'),
      requirement: jobDetail.requirement.replace(/[\n]/g, '<br>'),
    }));

    router.push({
      pathname: '/detail/[id]',
      query: { id }
    });
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
            key={job.id}
            idx={idx}
            job={job}
            onClick={() => handleViewDetail(job.id)}
          />
        ))}
    </div>
  );
}
