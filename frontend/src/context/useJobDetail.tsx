import { PropsWithChildren, createContext, useContext, useState } from 'react';
import JobModel from '@/models/JobModel';

type JobDetail = JobModel & { requirement: string };

const JobDetailContext = createContext<any>(null);

export const JobDetailProvider = ({ children }: PropsWithChildren) => {
  const [jobDetail, setJobDetail] = useState<any>();

  return <JobDetailContext.Provider value={{ jobDetail, setJobDetail }}>{children}</JobDetailContext.Provider>
}

const useJobDetail = () => {
  const context = useContext(JobDetailContext);

  if (!context) {
    throw new Error('Please use JobDetailContext in parent component');
  }

  return context;
};

export default useJobDetail;
