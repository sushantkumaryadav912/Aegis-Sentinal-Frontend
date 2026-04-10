'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, AlertCircle, Loader2, Lock, Mail, Github } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { loginUser } from '@/lib/auth-client';

// Schema
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  rememberMe: z.boolean(),
});

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const getOAuthStartUrl = (provider: 'google' | 'github') => {
    const apiBase =
      process.env.NEXT_PUBLIC_API_URL?.trim() ||
      process.env.NEXT_PUBLIC_BACKEND_URL?.trim();

    if (!apiBase) return null;

    return `${apiBase.replace(/\/$/, '')}/api/cidr/auth/${provider}`;
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (data: any) => {
    try {
      await loginUser(data);
      router.replace('/overview');
    } catch {
      setServerError('Invalid credentials');
    }
  };

  const handleOAuthLogin = (provider: 'github' | 'google') => {
    const url = getOAuthStartUrl(provider);
    if (!url) return setServerError('OAuth config missing');
    window.location.assign(url);
  };

  useEffect(() => {
    const error = new URLSearchParams(window.location.search).get('error');
    if (error) setServerError(error);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden bg-[#020617]">

      {/* Grid */}
      <div className="absolute inset-0 bg-grid-pattern bg-grid-size" />

      {/* Glow */}
      <div className="absolute -top-40 -right-40 w-[32rem] h-[32rem] bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute -bottom-40 -left-40 w-[32rem] h-[32rem] bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />

      <div className="relative w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <Image src="/logo.png" alt="logo" width={64} height={64} className="mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-white">Welcome back</h1>
          <p className="text-slate-400 text-sm">Sign in to your CIDR dashboard</p>
        </div>

        {/* Card */}
        <div className="group p-px rounded-2xl bg-gradient-to-r from-blue-500/30 via-cyan-400/30 to-blue-500/30">

          <div className="bg-slate-900/90 backdrop-blur-xl rounded-2xl p-8 border border-slate-800 shadow-2xl">

            {serverError && (
              <div className="mb-4 text-red-400 text-sm flex items-center gap-2">
                <AlertCircle size={16} /> {serverError}
              </div>
            )}

            {/* OAuth Buttons */}
            <div className="grid grid-cols-2 gap-3 mb-6">

              {/* GitHub */}
              <Button
                variant="outline"
                onClick={() => handleOAuthLogin('github')}
                className="transition-all border-slate-700 text-slate-300 hover:bg-black hover:text-white hover:border-black"
              >
                <Github className="mr-2 h-4 w-4" />
                Github
              </Button>

              {/* Google */}
              <Button
                variant="outline"
                onClick={() => handleOAuthLogin('google')}
                className="transition-all border-slate-700 text-slate-300 hover:bg-white hover:text-black hover:border-white"
              >
                <FcGoogle className="mr-2 h-5 w-5" />
                Google
              </Button>

            </div>

            <div className="text-center text-xs text-slate-500 mb-4">OR CONTINUE</div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

              {/* Email */}
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                <Input className="pl-10" placeholder="Email" {...register('email')} />
                {errors.email && <p className="text-red-400 text-xs">{String(errors.email.message)}</p>}
              </div>

              {/* Password */}
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                <Input
                  type={showPassword ? 'text' : 'password'}
                  className="pl-10 pr-10"
                  placeholder="Password"
                  {...register('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-400"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {/* Remember */}
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <input type="checkbox" {...register('rememberMe')} />
                Remember me
              </div>

              {/* Submit */}
              <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-500">
                {isSubmitting ? <Loader2 className="animate-spin" /> : 'Sign in'}
              </Button>

            </form>

            <p className="text-center text-sm text-slate-400 mt-6">
              Don’t have an account?{' '}
              <Link href="/register" className="text-blue-400">
                Create one
              </Link>
            </p>

          </div>
        </div>

        <p className="text-center text-xs text-slate-600 mt-6">
          © {new Date().getFullYear()} CIDR
        </p>
      </div>
    </div>
  );
}