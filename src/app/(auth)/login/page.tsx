'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, AlertCircle, Loader2, Lock, Mail, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { loginUser } from '@/lib/auth-client';
import { cn } from '@/lib/utils';

// Zod Validation Schema
const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .max(254, 'Email is too long')
    .transform((value) => value.toLowerCase()),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(128, 'Password cannot exceed 128 characters')
    .regex(/^\S+$/, 'Password cannot contain spaces'),
  rememberMe: z.boolean(),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  
  // React Hook Form Setup
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setServerError(null);
    try {
      await loginUser({
        email: data.email,
        password: data.password,
        rememberMe: data.rememberMe,
      });
      router.replace('/overview');
    } catch (error) {
      setServerError(error instanceof Error ? error.message : 'Invalid credentials. Please check your email and password.');
    }
  };

  const handleOAuthLogin = async (provider: 'github' | 'google') => {
    setServerError(`${provider[0].toUpperCase()}${provider.slice(1)} OAuth is not configured yet.`);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4 py-12">
      {/* Ambient glow decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center justify-center mb-6 group" aria-label="Go to homepage">
            <Image 
              src="/logo.png" 
              alt="CIDR Logo" 
              width={64} 
              height={64} 
              className="h-16 w-16 object-contain group-hover:scale-105 group-hover:opacity-80 transition-all duration-300"
              priority
            />
          </Link>
          <h1 className="text-3xl font-bold text-slate-100 tracking-tight">Welcome back</h1>
          <p className="mt-2 text-slate-400">Sign in to your CIDR security dashboard</p>
        </div>

        {/* Form card */}
        <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-2xl shadow-2xl shadow-slate-950/50 p-8">
          
          {/* Server-level error */}
          {serverError && (
            <div role="alert" className="mb-6 flex items-start gap-3 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-lg text-sm text-red-400">
              <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" aria-hidden="true" />
              <span>{serverError}</span>
            </div>
          )}

          {/* OAuth Providers */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => handleOAuthLogin('github')}
              className="w-full text-slate-300 bg-slate-950/50 border-slate-700 hover:bg-slate-800 hover:text-white transition-colors"
              disabled={isSubmitting}
            >
              <Github className="mr-2 h-4 w-4" /> Github
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => handleOAuthLogin('google')}
              className="w-full text-slate-300 bg-slate-950/50 border-slate-700 hover:bg-slate-800 hover:text-white transition-colors"
              disabled={isSubmitting}
            >
              <svg className="mr-2 h-4 w-4" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.99 13.9v-3.72h9.36c.14.63.25 1.22.25 2.05 0 5.71-3.83 9.66-9.58 9.66-5.59 0-10.12-4.54-10.12-10.13S6.4 1.63 12 1.63c2.78 0 5.16 1.01 7 2.76l-2.73 2.72c-1.12-1.05-2.82-2.02-4.26-2.02-3.69 0-6.68 3.12-6.68 7.04s2.99 7.04 6.7 7.04c4.35 0 6.02-2.95 6.32-4.57H12v-.7z" />
              </svg>
              Google
            </Button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-700/50" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-slate-900 px-2 text-slate-500 font-medium">Or continue with</span>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate aria-label="Sign in form">
            
            {/* Email Field */}
            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-sm font-medium text-slate-300">
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 pointer-events-none" aria-hidden="true" />
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="admin@company.com"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  className={cn('pl-10', errors.email && 'border-red-500/70 focus-visible:ring-red-500/50')}
                  {...register('email')}
                />
              </div>
              {errors.email && (
                <p id="email-error" role="alert" className="flex items-center gap-1.5 text-xs text-red-400">
                  <AlertCircle className="h-3 w-3 shrink-0" aria-hidden="true" />
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-slate-300">
                  Password
                </label>
                <Link href="/reset-password" className="text-xs text-blue-400 hover:text-blue-300 transition-colors">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 pointer-events-none" aria-hidden="true" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  aria-invalid={!!errors.password}
                  aria-describedby={errors.password ? 'password-error' : undefined}
                  className={cn('pl-10 pr-10', errors.password && 'border-red-500/70 focus-visible:ring-red-500/50')}
                  {...register('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" aria-hidden="true" /> : <Eye className="h-4 w-4" aria-hidden="true" />}
                </button>
              </div>
              {errors.password && (
                <p id="password-error" role="alert" className="flex items-center gap-1.5 text-xs text-red-400">
                  <AlertCircle className="h-3 w-3 shrink-0" aria-hidden="true" />
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Remember me Filter */}
            <div className="flex items-center gap-2.5">
              <input
                id="rememberMe"
                type="checkbox"
                className="h-4 w-4 rounded border-slate-600 bg-slate-800 text-blue-500 focus:ring-blue-500/50 focus:ring-offset-slate-900 cursor-pointer accent-blue-500"
                {...register('rememberMe')}
              />
              <label htmlFor="rememberMe" className="text-sm text-slate-400 cursor-pointer select-none tracking-wide">
                Remember me for 7 days
              </label>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-11 text-sm font-semibold"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                  Signing in…
                </>
              ) : (
                'Sign in'
              )}
            </Button>
          </form>

          {/* Registration Redirect */}
          <div className="mt-8 text-center text-sm text-slate-400">
            Don't have an account?{' '}
            <Link href="/register" className="font-semibold text-blue-400 hover:text-blue-300 transition-colors">
              Create one now
            </Link>
          </div>
        </div>

        <p className="text-center text-xs text-slate-600 mt-6">
          © {new Date().getFullYear()} CIDR Security. All rights reserved.
        </p>
      </div>
    </div>
  );
}
