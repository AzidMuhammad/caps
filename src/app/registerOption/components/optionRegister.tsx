'use client'

import { useRouter } from 'next/navigation'
import Image from "next/image"

export default function RegisterOption() {
  const router = useRouter();

  return (
    <div className="w-full lg:grid bg-[#3676e0] lg:min-h-[600px] xl:min-h-[729px] min-h-screen">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center -mt-6">
            <img src="images/logo/logo-white.png" alt="" className="mx-auto mb-4" />
          </div>
          <div className="grid -mt-4">
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <button 
            className="bg-gradient-to-br relative group/btn from-neutral-100 to-neutral-200 block w-full text-[#3676e0] rounded-xl h-10 font-medium shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            onClick={() => router.push('/registerAdmin')}
            >
            Register Sebagai Admin
            <BottomGradient />
            </button>
            </div>
            <div className="grid gap-3">
            <button 
            className="mt-4 mb-4 bg-gradient-to-br relative group/btn from-neutral-100 to-neutral-200 block w-full text-[#3676e0] rounded-xl h-10 font-medium shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            onClick={() => router.push('/registerWorker')}
            >
            Register Sebagai Worker
            <BottomGradient />
            </button>
            </div>
            <div className="bg-gradient-to-r from-transparent via-neutral-200 to-transparent my-8 h-[1px] w-full" />
                <p className="text-neutral-200 text-sm text-center">have an account? <a className="text-white hover:underline ml-1 whitespace-nowrap font-semibold cursor-pointer" onClick={() => router.push('/loginOption')}>Login here</a></p>
          </div>
        </div>
      </div>
      <div className="bg-muted lg:block -mt-10">
        <Image
          src="/images/carwash/bg2.png"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-contain"
        />
      </div>
    </div>
  )
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-neutral-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-gray-500 to-transparent" />
    </>
  );
};