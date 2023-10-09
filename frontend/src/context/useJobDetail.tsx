import { useEffect, useState } from 'react';
import ApiUtil from '@/utils/api';
import JobList from '@/_mockdata/jobs-list.json';
import JobModel from '@/models/JobModel';

type JobDetail = JobModel & { requirement: string };

export const useJobDetail = (jobId: string | string[] | undefined) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<JobDetail | null>(null);

  useEffect(() => {
    const item = JobList.find((job) => job.id === jobId);

    if (item) {
      setData({
        id: item.id,
        title: item.title,
        companyName: item.employer_name,
        logo: item.employer_logo!,
        salary: item.salary,
        tags: [item.term],
        description: item.description.replace(/[\n]/g, '<br>'),
        requirement: item.requirement.replace(/[\n]/g, '<br>'),
      });

      setIsLoading(false);
    }
  }, [jobId]);

  return {
    data,
    isLoading,
  };
};
