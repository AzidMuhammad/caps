'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Input } from '@/app/loginWorker/components/ui/input';
import { Label } from '@/app/loginWorker/components/ui/label';
import { Eye, EyeOff } from 'lucide-react';

export default function LoginFormWorker() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await fetch('/api/login/worker/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({email, username, password }),
      });

      const data = await result.json();

      if (result.status === 200) {
        router.push('/dashboard');
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="w-full lg:grid bg-[#3676e0] lg:min-h-[600px] xl:min-h-[729px] min-h-screen">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center -mt-14">
            <img src="images/logo/logo-white.png" alt="Logo" className="mx-auto mb-4" />
          </div>
          <div className="grid gap-7 -mt-14">
            <form onSubmit={handleSubmit}>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  className='placeholder-neutral-400'
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  required
                />
              </div>
              <div className="grid gap-3 mt-4">
                <Label htmlFor="text">Username</Label>
                <Input
                  className='placeholder-neutral-400'
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                  required
                />
              </div>
              <div className="grid gap-3 mt-4">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <div className="relative">
                  <Input
                    className='placeholder-neutral-400'
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
              <button
                className="mt-4 mb-10 bg-gradient-to-br relative group/btn from-neutral-100 to-neutral-200 block w-full text-[#3676e0] rounded-xl h-10 font-medium shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                type="submit"
              >
                Log In &rarr;
                <BottomGradient />
              </button>
            </form>
            {error && <p className="text-red-500">{error}</p>}
          </div>
        </div>
      </div>
      <div className="bg-muted lg:block -mt-28">
        <Image
          src="/images/carwash/bg2.png"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-contain"
        />
      </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-neutral-300 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
    </>
  );
};
