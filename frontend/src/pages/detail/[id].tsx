import { useJobDetail } from '@/context/useJobDetail';
import useTelegram from '@/context/useTelegram';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function JobDetailPage() {
  const router = useRouter();
  const { TlgWebApp }: any = useTelegram();
  const { data: job } = useJobDetail(router.query.id);

  useEffect(() => {
    TlgWebApp.BackButton.isVisible = true;
    TlgWebApp.BackButton.onClick(handleBack);

    TlgWebApp.MainButton.isVisible = true;
    TlgWebApp.MainButton.setText('APPLY');
    TlgWebApp.MainButton.onClick(handleApply);

    return () => {
      TlgWebApp.BackButton.isVisible = false;
      TlgWebApp.MainButton.isVisible = false;

      TlgWebApp.BackButton.offClick(handleBack);
      TlgWebApp.MainButton.offClick(handleApply);
    };
  }, []);

  const handleBack = async () => {
    router.back();
  };

  const handleApply = async () => {
    router.push(`/apply-job/${router.query.id}`);
  };

  if (!job) {
    return <p>Loading...</p>;
  }

  return (
    <div className='container bg-slate-900 p-8 text-slate-100'>
      <div className='flex flex-col gap-8'>
        <div className='header-section flex flex-col items-center gap-4'>
          <div className='logo-wrapper'>
            <Image src={job.logo} width={72} height={72} alt='Logo' />
          </div>

          <div className='headline'>
            <h1 className='text-xl'>{job?.title}</h1>
          </div>

          <div className=''>
            <h2 className='text-slate-400'>{job.companyName}</h2>
          </div>

          <div>
            <ul className='flex flex-row gap-2'>
              <li className='rounded  bg-slate-600 px-2'>{job.salary}</li>
              {job.tags &&
                job.tags.length > 0 &&
                job.tags.map((tag) => (
                  <li className='rounded  bg-slate-600 px-2'>{tag}</li>
                ))}
            </ul>
          </div>
        </div>

        <div className='flex flex-col gap-4'>
          <div className='job-detail flex flex-col gap-2'>
            <h3 className='text-lg'>Job Description</h3>
            <p
              className='text-slate-400'
              dangerouslySetInnerHTML={{ __html: job.description }}
            />
          </div>
          <div className='job-detail flex flex-col gap-2'>
            <h3 className='text-lg'>Job Requirement</h3>
            <p
              className='text-slate-400'
              dangerouslySetInnerHTML={{ __html: job.requirement }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
