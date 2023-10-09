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
    TlgWebApp.MainButton.isVisible = true;

    TlgWebApp.BackButton.onClick(handleBack);
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
    alert('apply');
  };

  if (!job) {
    return <p>Loading...</p>;
  }

  return (
    <div className='container bg-slate-900 p-8 text-slate-100'>
      <div className='flex flex-col gap-8'>
        <div className='header-section flex flex-col items-center gap-4 text-center'>
          <div className='logo-wrapper'>
            <Image src={job.logo} width={72} height={72} alt='Logo' />
          </div>
          <div className='headline'>
            <h1 className='text-xl'>{job?.title}</h1>
          </div>

          <div className=''>
            <h2 className='text-slate-400'>Phnom Penh, Cambodia</h2>
            <p className='text-slate-400'>$249/hr</p>
          </div>

          <div>
            <ul>
              <li>Full-time</li>
            </ul>
          </div>
        </div>

        <div className='flex flex-col gap-6'>
          <div className='job-detail flex flex-col gap-2'>
            <h3>Job Highlights</h3>
            <p className='text-slate-400'>
              Lorem ipsum dolor sit amet, qui minim labore adipisicing minim
              sint cillum sint consectetur cupidatat.
            </p>
          </div>
          <div className='job-detail flex flex-col gap-2'>
            <h3>Job Highlights</h3>
            <p className='text-slate-400'>
              Lorem ipsum dolor sit amet, qui minim labore adipisicing minim
              sint cillum sint consectetur cupidatat.
            </p>
          </div>
          <div className='job-detail flex flex-col gap-2'>
            <h3>Job Highlights</h3>
            <p className='text-slate-400'>
              Lorem ipsum dolor sit amet, qui minim labore adipisicing minim
              sint cillum sint consectetur cupidatat.
            </p>
          </div>

          <div className='job-detail flex flex-col gap-2'>
            <h3>Job Highlights</h3>
            <p className='text-slate-400'>
              Lorem ipsum dolor sit amet, qui minim labore adipisicing minim
              sint cillum sint consectetur cupidatat.
            </p>
          </div>
          <div className='job-detail flex flex-col gap-2'>
            <h3>Job Highlights</h3>
            <p className='text-slate-400'>
              Lorem ipsum dolor sit amet, qui minim labore adipisicing minim
              sint cillum sint consectetur cupidatat.
            </p>
          </div>
          <div className='job-detail flex flex-col gap-2'>
            <h3>Job Highlights</h3>
            <p className='text-slate-400'>
              Lorem ipsum dolor sit amet, qui minim labore adipisicing minim
              sint cillum sint consectetur cupidatat.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
