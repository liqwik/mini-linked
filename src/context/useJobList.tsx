import { useEffect, useState } from 'react';
import Job from '@/models/job';
import ApiUtil from '@/utils/api';
import JobList from '@/_mockdata/jobs-list.json';

export const useJobList = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<Job[] | null>(null);

  useEffect(() => {
    setData(
      JobList.map((item) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        companyName: item.employer_name,
        logo: item.employer_logo!,
        salary: item.salary,
        tags: [item.term],
      }))
    );
    setIsLoading(false);
    // fetch(`${ApiUtil.search}?query=software`)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setData(data.data);
    //     setIsLoading(false);
    //   });
  }, []);

  return {
    data,
    isLoading,
  };
};