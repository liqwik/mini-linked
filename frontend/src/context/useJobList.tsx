import { useEffect, useState } from 'react';
import ApiUtil from '@/utils/api';
import JobModel, { toJobMap } from '@/models/JobModel';

export const useJobList = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<JobModel[] | null>(null);

  useEffect(() => {
    fetch(`${ApiUtil.search}?query=software`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.data) {
          const jobList = data.data.map((item: any) => toJobMap(item));

          setData(jobList);
          setIsLoading(false);
        }
      });
  }, []);

  return {
    data,
    isLoading,
  };
};
