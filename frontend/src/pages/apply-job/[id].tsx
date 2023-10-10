import useTelegram from '@/context/useTelegram';
import ApiUtil from '@/utils/api';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

export default function ApplyJob() {
  const router = useRouter();
  const { getValues, trigger, register, handleSubmit } = useForm();
  const { TlgWebApp }: any = useTelegram();

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
  }, []);

  const handleBack = async () => {
    router.back();
  };

  const onSubmit = async () => {
    const isValid = await trigger();

    if (isValid) {
      try {
        TlgWebApp.MainButton.showProgress();
        const data = getValues();
        const formData = new FormData();

        formData.append('job_id', data.jobId);
        formData.append('subject', data.subject);
        formData.append('description', data.description);
        formData.append('file', data.file[0]);

        // const response = await fetch(`${ApiUtil.applyJob}`, {
        //   method: 'POST',
        //   body: formData,
        // });
        //
        // const payload = await response.json();

        TlgWebApp.showPopup(
          {
            title: 'Application Submitted Successfully!',
            message: `Thank you for applying for the position at [Company Name]. Your job application has been successfully submitted. We appreciate the time and effort you put into completing the application.`,
          },
          () => {
            TlgWebApp.close();
          }
        );
      } catch (err: any) {
        TlgWebApp.showAlert(err.message);
      } finally {
        TlgWebApp.MainButton.hideProgress();
      }
    }
  };

  return (
    <form>
      <div className='flex h-max flex-col gap-4 bg-slate-900 p-8'>
        <input type='hidden' value={router.query.id} {...register('jobId')} />
        <label className='block'>
          <span className='block text-slate-200'>Subject</span>
          <input
            type='text'
            className='mt-1 block w-full rounded border border-slate-300 bg-white px-3 py-2 text-sm placeholder-slate-400 shadow-sm invalid:border-pink-500 invalid:text-pink-600 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none'
            {...register('subject', { required: true })}
          />
        </label>
        <label className='block'>
          <span className='block text-slate-200'>Description</span>
          <input
            type='text'
            className='mt-1 block w-full rounded border border-slate-300 bg-white px-3 py-2 text-sm placeholder-slate-400 shadow-sm invalid:border-pink-500 invalid:text-pink-600 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none'
            {...register('description', { required: true })}
          />
        </label>

        <label className='block'>
          <span className='block text-slate-200'>Resume</span>
          <input
            type='file'
            className='mt-1 block w-full rounded border border-slate-300 bg-white px-3 py-2 text-sm placeholder-slate-400 shadow-sm invalid:border-pink-500 invalid:text-pink-600 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none'
            {...register('file', { required: true })}
          />
        </label>
      </div>
    </form>
  );
}
