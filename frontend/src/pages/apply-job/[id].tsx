import useJobDetail from '@/context/useJobDetail';
import useTelegram from '@/context/useTelegram';
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';

export default function ApplyJob() {
  const router = useRouter();
  const { getValues, trigger, register } = useForm();
  const { TlgWebApp }: any = useTelegram();
  const { jobDetail } = useJobDetail();

  const handleBack = useCallback(async () => {
    router.back();
  }, [router]);

  const onSubmit = useCallback(async () => {
    const isValid = await trigger();

    if (isValid) {
      try {
        TlgWebApp.MainButton.showProgress();
        const data = getValues();
        const formData = new FormData();

        formData.append('job_id', data.jobId);
        formData.append('email', data.email);
        formData.append('phone', data.phone);
        formData.append('file', data.file[0]);

        // TODO: We can implement call Job Apply API here

        TlgWebApp.showPopup(
          {
            title: 'Application Submitted Successfully!',
            message: `Thank you for applying for the position at ${jobDetail?.companyName}, Your job application has been successfully submitted. We appreciate the time and effort you put into completing the application.`,
          },
          () => {
            TlgWebApp.isClosingConfirmationEnabled = false;
            TlgWebApp.close();
          }
        );
      } catch (err: any) {
        TlgWebApp.showAlert(err.message);
      } finally {
        TlgWebApp.MainButton.hideProgress();
      }
    }
  }, [TlgWebApp, getValues, jobDetail?.companyName, trigger]);

  useEffect(() => {
    TlgWebApp.BackButton.isVisible = true;
    TlgWebApp.BackButton.onClick(handleBack);

    TlgWebApp.MainButton.isVisible = true;
    TlgWebApp.MainButton.setText('SUBMIT');
    TlgWebApp.onEvent('mainButtonClicked', onSubmit);

    return () => {
      TlgWebApp.BackButton.isVisible = false;
      TlgWebApp.MainButton.isVisible = false;

      TlgWebApp.BackButton.offClick(handleBack);
      TlgWebApp.offEvent('mainButtonClicked', onSubmit);
    };
  }, [TlgWebApp, handleBack, onSubmit]);

  return (
    <form>
      <div className='flex h-max flex-col gap-4 bg-slate-900 p-8'>
        <input type='hidden' value={router.query.id} {...register('jobId')} />
        <label className='block'>
          <span className='block text-slate-200'>Email</span>
          <input
            type='text'
            className='mt-1 block w-full rounded border border-slate-300 bg-white px-3 py-2 text-slate-900 invalid:border-pink-500 invalid:text-pink-600 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none'
            {...register('email', { required: true })}
          />
        </label>
        <label className='block'>
          <span className='block text-slate-200'>Phone Number</span>
          <textarea
            className='mt-1 block w-full rounded border border-slate-300 bg-white px-3 py-2 text-slate-900 invalid:border-pink-500 invalid:text-pink-600 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none'
            {...register('phone', { required: true })}
          />
        </label>

        <label className='block'>
          <span className='block text-slate-200'>Resume</span>
          <input
            type='file'
            className='mt-1 block w-full rounded border border-slate-300 bg-white px-3 py-2 text-slate-900 invalid:border-pink-500 invalid:text-pink-600 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none'
            {...register('file', { required: true })}
          />
        </label>
      </div>
    </form>
  );
}
