import { useEffect, useState } from 'react';
import ApiUtil from '@/utils/api';
import JobModel, { toJobMap } from '@/models/JobModel';

export const useJobList = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<JobModel[] | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      const res = await fetch(`${ApiUtil.search}?query=software`);
      const jsonRes = await res.json();

      if (jsonRes && jsonRes.data) {
        const jobList = jsonRes.data.map((item: any) => toJobMap(item));

        setData(jobList);
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return {
    data,
    isLoading,
  };
};
