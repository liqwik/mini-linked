import Card from '../cards/Card';
import BrandLogo from '../avatar/BrandLogo';
import Title from '../typography/Title';
import Description from '../typography/Description';
import TagList from '../TagList';
import JobModel from '@/models/JobModel';

type TJobCard = {
  idx: number;
  job: JobModel;
  [props: string]: any;
};

export default function JobCard({ idx, job, ...props }: TJobCard) {
  return (
    <Card key={`${job.id}_${idx}}`} {...props}>
      <div className='container'>
        <div className='container mb-2 flex flex-row content-center'>
          <div className='flex h-12 w-12 flex-col justify-center overflow-hidden rounded-md bg-gray-200'>
            <BrandLogo src={job.logo} alt={job.title} />
          </div>

          <div className='ml-4'>
            <Title>{job.title}</Title>
            <Description>{job.companyName}</Description>

            <div className='mt-2'>
              <TagList items={job.tags} />
            </div>
          </div>
        </div>

        <div className='container'>
          <div className='flex flex-row justify-end'>
            {/* <p className='text-slate-500 text-xs'>2 hours ago</p> */}
            <p className='text-xs text-slate-300'>
              <strong>{job.salary}</strong>
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
