import useJobDetail from '@/context/useJobDetail';
import useTelegram from '@/context/useTelegram';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';

export default function JobDetailPage() {
  const router = useRouter();
  const { TlgWebApp }: any = useTelegram();
  const { jobDetail } = useJobDetail();

  const { id } = router.query;

  const handleBack = useCallback(async () => {
    router.back();
  }, [router]);

  const handleApply = useCallback(async () => {
    router.push({
      pathname: `/apply-job/[id]`,
      query: { id },
    });
  }, [router, id]);

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
  }, [TlgWebApp.BackButton, TlgWebApp.MainButton, handleApply, handleBack]);

  if (!jobDetail) {
    return <p>Loading...</p>;
  }

  return (
    <div className='container'>
      <div className='flex flex-col gap-8'>
        <div className='flex flex-col items-center gap-4'>
          <Image src={jobDetail.logo} width={72} height={72} alt='Logo' />

          <h1 className='text-xl'>{jobDetail.title}</h1>

          <div className=''>
            <h2 className='text-slate-400'>{jobDetail.companyName}</h2>
          </div>

          <div>
            <ul className='flex flex-row gap-2'>
              <li className='rounded  bg-slate-600 px-2'>{jobDetail.salary}</li>
              {jobDetail.tags &&
                jobDetail.tags.length > 0 &&
                jobDetail.tags.map((tag: string) => (
                  <li key={tag} className='rounded  bg-slate-600 px-2'>
                    {tag}
                  </li>
                ))}
            </ul>
          </div>
        </div>

        <div className='flex flex-col gap-4'>
          <div className='flex flex-col gap-2'>
            <h3 className='text-lg'>Job Description</h3>
            <p
              className='text-slate-400'
              dangerouslySetInnerHTML={{ __html: jobDetail.description }}
            />
          </div>
          <div className='flex flex-col gap-2'>
            <h3 className='text-lg'>Job Requirement</h3>
            <p
              className='text-slate-400'
              dangerouslySetInnerHTML={{ __html: jobDetail.requirement }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
