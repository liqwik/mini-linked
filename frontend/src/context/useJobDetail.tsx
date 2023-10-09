import { useEffect, useState } from 'react';
import ApiUtil from '@/utils/api';
import JobList from '@/_mockdata/jobs-list.json';
import JobModel from '@/models/JobModel';

export const useJobDetail = (jobId: string | string[] | undefined) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<JobModel | null>(null);

  useEffect(() => {
    const item = JobList.find((job) => job.id === jobId);

    if (item) {
      setData({
        id: item.id,
        title: item.title,
        description: item.description,
        companyName: item.employer_name,
        logo: item.employer_logo!,
        salary: item.salary,
        tags: [item.term],
      });
      setIsLoading(false);
    }
  }, [jobId]);

  return {
    data,
    isLoading,
  };
};
