import useTelegram from "@/context/useTelegram";
import Image from "next/image";
import { useEffect } from "react";

export default function JobDetailPage() {
  const tgWebApp = useTelegram();

  useEffect(() => {
    console.log(tgWebApp);

  }, []);


  return <div className="container p-8 bg-slate-900 text-slate-100">
    <div className="flex flex-col gap-8">
      <div className="header-section flex flex-col items-center text-center gap-4">
        <div className="logo-wrapper">
          <Image src="/spotify.png" width={72} height={72} alt="Logo" />
        </div>
        <div className="headline">
          <h1 className="text-xl">Senior Software Engineer</h1>
        </div>

        <div className="">
          <h2 className="text-slate-400">Phnom Penh, Cambodia</h2>
          <p className="text-slate-400">$249/hr</p>
        </div>

        <div>
          <ul>
            <li>
              Full-time
            </li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="job-detail flex flex-col gap-2">
          <h3 >Job Highlights</h3>
          <p className="text-slate-400">Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.</p>
        </div>
        <div className="job-detail flex flex-col gap-2">
          <h3 >Job Highlights</h3>
          <p className="text-slate-400">Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.</p>
        </div>
        <div className="job-detail flex flex-col gap-2">
          <h3 >Job Highlights</h3>
          <p className="text-slate-400">Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.</p>
        </div>

        <div className="job-detail flex flex-col gap-2">
          <h3 >Job Highlights</h3>
          <p className="text-slate-400">Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.</p>
        </div>
        <div className="job-detail flex flex-col gap-2">
          <h3 >Job Highlights</h3>
          <p className="text-slate-400">Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.</p>
        </div>
        <div className="job-detail flex flex-col gap-2">
          <h3 >Job Highlights</h3>
          <p className="text-slate-400">Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.</p>
        </div>
      </div>
    </div>
  </div>;
}
