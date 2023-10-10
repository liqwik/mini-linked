import useJobDetail from '@/context/useJobDetail';
import useTelegram from '@/context/useTelegram';
import ApiUtil from '@/utils/api';
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';

export default function ApplyJob() {
  const router = useRouter();
  const {
    getValues,
    trigger,
    register,
    formState: { errors },
  } = useForm();
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
        formData.append('subject', data.subject);
        formData.append('description', data.description);
        formData.append('file', data.file[0]);

        // TODO: We can implement call Job Apply API here
        const response = await fetch(ApiUtil.applyJob, {
          method: 'POST',
          body: formData,
        });
        const payload = await response.json();

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
      <div className='flex flex-col gap-2'>
        <input type='hidden' value={router.query.id} {...register('jobId')} />
        <label className='block'>
          <span className='block text-slate-200'>Subject</span>
          <input
            type='text'
            className='mt-1 block w-full rounded border border-slate-300 bg-white px-3 py-2 text-slate-900 invalid:border-pink-500 invalid:text-pink-600 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none'
            {...register('subject', { required: true })}
          />
          {errors.subject && (
            <span className='text-red-500'>This field is required</span>
          )}
        </label>
        <label className='block'>
          <span className='block text-slate-200'>Description</span>
          <textarea
            className='mt-1 block w-full rounded border border-slate-300 bg-white px-3 py-2 text-slate-900 invalid:border-pink-500 invalid:text-pink-600 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none'
            {...register('description', { required: true })}
          />
          {errors.description && (
            <span className='text-red-500'>This field is required</span>
          )}
        </label>

        <label className='block'>
          <span className='block text-slate-200'>Resume</span>
          <input
            type='file'
            accept='application/msword, application/pdf, image/*'
            className='mt-1 block w-full rounded border border-slate-300 bg-white px-3 py-2 text-slate-900 invalid:border-pink-500 invalid:text-pink-600 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none'
            {...register('file', { required: true })}
          />
          {errors.file && (
            <span className='text-red-500'>This field is required</span>
          )}
        </label>
      </div>
    </form>
  );
}
