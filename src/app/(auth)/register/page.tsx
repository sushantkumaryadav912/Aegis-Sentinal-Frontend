'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { z } from 'zod';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, AlertCircle, Loader2, Lock, Mail, User, CheckCircle2, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { registerUser } from '@/lib/auth-client';
import { cn } from '@/lib/utils';

// Zod Validation Schema matching previous standards
const passwordRules = z
  .string()
  .min(12, 'At least 12 characters')
  .max(128, 'Password cannot exceed 128 characters')
  .regex(/[A-Z]/, 'One uppercase letter')
  .regex(/[a-z]/, 'One lowercase letter')
  .regex(/[0-9]/, 'One number')
  .regex(/[^A-Za-z0-9]/, 'One special character')
  .regex(/^\S+$/, 'No spaces allowed');

const registerSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(3, 'Full name must be at least 3 characters')
      .max(80, 'Name is too long')
      .regex(/^[A-Za-z][A-Za-z\s'-]+$/, 'Enter a valid full name'),
    email: z
      .string()
      .trim()
      .email('Please enter a valid email address')
      .max(254, 'Email is too long')
      .transform((value) => value.toLowerCase()),
    password: passwordRules,
    confirmPassword: z.string(),
    acceptTerms: z.boolean().refine((val) => val === true, {
      message: 'You must accept the terms to continue',
    }),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

const passwordStrengthChecks = [
  { label: '12+ characters', regex: /.{12,}/ },
  { label: 'Uppercase letter', regex: /[A-Z]/ },
  { label: 'Lowercase letter', regex: /[a-z]/ },
  { label: 'Number', regex: /[0-9]/ },
  { label: 'Special character', regex: /[^A-Za-z0-9]/ },
];

function PasswordStrength({ password }: { password?: string }) {
  if (!password) return null;
  const passed = passwordStrengthChecks.filter((c) => c.regex.test(password)).length;
  const strength = passed <= 1 ? 'Weak' : passed <= 2 ? 'Fair' : passed <= 3 ? 'Good' : 'Strong';
  const color = passed <= 1 ? 'bg-red-500' : passed <= 2 ? 'bg-amber-500' : passed <= 3 ? 'bg-blue-400' : 'bg-emerald-500';
  
  return (
    <div className="mt-2 space-y-2">
      <div className="flex gap-1">
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className={cn('h-1 flex-1 rounded-full transition-colors duration-300', i < passed ? color : 'bg-slate-700')} />
        ))}
      </div>
      <div className="flex flex-wrap gap-x-3 gap-y-1">
        {passwordStrengthChecks.map((c) => (
          <span key={c.label} className={cn('flex items-center gap-1 text-xs transition-colors', c.regex.test(password) ? 'text-emerald-400' : 'text-slate-500')}>
            <CheckCircle2 className="h-3 w-3" aria-hidden="true" />
            {c.label}
          </span>
        ))}
      </div>
      <p className={cn('text-xs font-medium', color.replace('bg-', 'text-').replace('-500', '-400').replace('-400', '-400'))}>
        Password strength: {strength}
      </p>
    </div>
  );
}

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const getOAuthStartUrl = (provider: 'google' | 'github'): string | null => {
    const apiBase =
      process.env.NEXT_PUBLIC_API_URL?.trim() ||
      process.env.NEXT_PUBLIC_BACKEND_URL?.trim();

    if (!apiBase) {
      return null;
    }

    return `${apiBase.replace(/\/$/, '')}/api/cidr/auth/${provider}`;
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false, // Must explicitly check this to trigger validation true literally
    },
  });

  // Watch password field to feed the strength indicator without full re-renders
  const currentPassword = useWatch({
    control,
    name: 'password',
  });

  const onSubmit = async (data: RegisterFormData) => {
    setServerError(null);
    try {
      await registerUser({
        fullName: data.fullName,
        email: data.email,
        password: data.password,
      });
      router.replace('/overview');
    } catch (error) {
      setServerError(error instanceof Error ? error.message : 'Registration failed. An account with this email may already exist.');
    }
  };

  const handleOAuthSignup = (provider: 'github' | 'google') => {
    const oauthUrl = getOAuthStartUrl(provider);
    if (!oauthUrl) {
      setServerError('Missing NEXT_PUBLIC_API_URL or NEXT_PUBLIC_BACKEND_URL for OAuth.');
      return;
    }

    window.location.assign(oauthUrl);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden bg-linear-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Ambient glow decoration */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 right-0 w-150 h-150 bg-blue-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-150 h-150 bg-cyan-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative w-full max-w-md my-8">
        {/* Logo Section */}
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
          <h1 className="text-3xl font-bold text-slate-100 tracking-tight">Create your account</h1>
          <p className="mt-2 text-slate-400">Get started with CIDR cloud security</p>
        </div>

        {/* Form panel container */}
        <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700/50 rounded-2xl shadow-2xl shadow-slate-950 p-8 sm:p-10">
          
          {serverError && (
            <div role="alert" className="mb-6 flex items-start gap-3 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-lg text-sm text-red-400">
              <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" aria-hidden="true" />
              <span>{serverError}</span>
            </div>
          )}

          {/* Social Auth Providers */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => handleOAuthSignup('github')}
              className="w-full text-slate-300 bg-slate-950/50 border-slate-700 hover:bg-slate-800 hover:text-white transition-colors"
              disabled={isSubmitting}
            >
              <Github className="mr-2 h-4 w-4" /> Github
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => handleOAuthSignup('google')}
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
              <span className="bg-slate-900 px-2 text-slate-500 font-medium">Or register with email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate data-testid="register-form">
            
            {/* Full Name */}
            <div className="space-y-1.5">
              <label htmlFor="fullName" className="block text-sm font-medium text-slate-300">
                Full name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 pointer-events-none" aria-hidden="true" />
                <Input
                  id="fullName"
                  type="text"
                  autoComplete="name"
                  placeholder="Jane Smith"
                  aria-invalid={!!errors.fullName}
                  aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                  className={cn('pl-10', errors.fullName && 'border-red-500/70 focus-visible:ring-red-500/50')}
                  {...register('fullName')}
                />
              </div>
              {errors.fullName && (
                <p id="fullName-error" role="alert" className="flex items-center gap-1.5 text-xs text-red-400">
                  <AlertCircle className="h-3 w-3 shrink-0" aria-hidden="true" />
                  {errors.fullName.message}
                </p>
              )}
            </div>

            {/* Email */}
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
                  placeholder="you@company.com"
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

            {/* Password */}
            <div className="space-y-1.5">
              <label htmlFor="password" className="block text-sm font-medium text-slate-300">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 pointer-events-none" aria-hidden="true" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  placeholder="Create a strong password"
                  aria-invalid={!!errors.password}
                  aria-describedby={errors.password ? 'password-error' : 'password-strength'}
                  className={cn('pl-10 pr-10', errors.password && 'border-red-500/70 focus-visible:ring-red-500/50')}
                  {...register('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" aria-hidden="true" /> : <Eye className="h-4 w-4" aria-hidden="true" />}
                </button>
              </div>
              {errors.password ? (
                <p id="password-error" role="alert" className="flex items-center gap-1.5 text-xs text-red-400">
                  <AlertCircle className="h-3 w-3 shrink-0" aria-hidden="true" />
                  {errors.password.message}
                </p>
              ) : (
                <div id="password-strength">
                  <PasswordStrength password={currentPassword} />
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-1.5">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-300">
                Confirm password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 pointer-events-none" aria-hidden="true" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  placeholder="Repeat your password"
                  aria-invalid={!!errors.confirmPassword}
                  className={cn('pl-10 pr-10', errors.confirmPassword && 'border-red-500/70 focus-visible:ring-red-500/50')}
                  {...register('confirmPassword')}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                  aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" aria-hidden="true" /> : <Eye className="h-4 w-4" aria-hidden="true" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p id="confirmPassword-error" role="alert" className="flex items-center gap-1.5 text-xs text-red-400">
                  <AlertCircle className="h-3 w-3 shrink-0" aria-hidden="true" />
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Terms of Service Checkbox */}
            <div className="space-y-1.5">
              <div className="flex items-start gap-2.5">
                <input
                  id="acceptTerms"
                  type="checkbox"
                  className="h-4 w-4 mt-0.5 rounded border-slate-600 bg-slate-800 text-blue-500 focus:ring-blue-500/50 focus:ring-offset-slate-900 cursor-pointer accent-blue-500 shrink-0"
                  {...register('acceptTerms')}
                />
                <label htmlFor="acceptTerms" className="text-sm text-slate-400 cursor-pointer leading-relaxed">
                  I agree to the{' '}
                  <Link href="/terms" className="text-blue-400 hover:text-blue-300 transition-colors">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="text-blue-400 hover:text-blue-300 transition-colors">
                    Privacy Policy
                  </Link>
                </label>
              </div>
              {errors.acceptTerms && (
                <p id="terms-error" role="alert" className="flex items-center gap-1.5 text-xs text-red-400">
                  <AlertCircle className="h-3 w-3 shrink-0" aria-hidden="true" />
                  {errors.acceptTerms.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full h-11 text-sm font-semibold mt-4"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                  Creating account…
                </>
              ) : (
                'Create account'
              )}
            </Button>
          </form>

          {/* Login Redirect */}
          <div className="mt-8 text-center text-sm text-slate-400 border-t border-slate-800/60 pt-6">
            Already have an account?{' '}
            <Link href="/login" className="font-semibold text-blue-400 hover:text-blue-300 transition-colors">
              Sign in instead
            </Link>
          </div>
        </div>
        
        <p className="text-center text-xs text-slate-600 mt-6 pb-8">
          © {new Date().getFullYear()} CIDR Security. All rights reserved.
        </p>
      </div>
    </div>
  );
}
