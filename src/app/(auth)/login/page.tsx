'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { z } from 'zod';
import { Shield, Eye, EyeOff, AlertCircle, Loader2, Lock, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  rememberMe: z.boolean(),
});

type LoginFormData = z.infer<typeof loginSchema>;
type FieldErrors = Partial<Record<keyof LoginFormData, string>>;

function validateForm(data: unknown): { success: true; data: LoginFormData } | { success: false; errors: FieldErrors } {
  const result = loginSchema.safeParse(data);
  if (result.success) return { success: true, data: result.data };
  const errors: FieldErrors = {};
  for (const issue of result.error.issues) {
    const field = issue.path[0] as keyof LoginFormData;
    if (field && !errors[field]) errors[field] = issue.message;
  }
  return { success: false, errors };
}

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);
    setFieldErrors({});

    const validation = validateForm({ email, password, rememberMe });
    if (!validation.success) {
      setFieldErrors(validation.errors);
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Replace with real API call (e.g. POST /api/auth/login)
      await new Promise((resolve) => setTimeout(resolve, 1200));
      router.push('/overview');
    } catch {
      setServerError('Invalid credentials. Please check your email and password.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4 py-12">
      {/* Ambient glow decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center justify-center mb-6 group" aria-label="Go to homepage">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500/20 rounded-xl blur-xl group-hover:bg-blue-500/30 transition-all duration-300" />
              <div className="relative h-14 w-14 rounded-xl bg-slate-900 border border-slate-700/50 flex items-center justify-center shadow-lg">
                <Shield className="h-7 w-7 text-blue-400" />
              </div>
            </div>
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

          <form onSubmit={handleSubmit} className="space-y-5" noValidate aria-label="Sign in form">
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
                  placeholder="admin@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-invalid={!!fieldErrors.email}
                  aria-describedby={fieldErrors.email ? 'email-error' : undefined}
                  className={cn('pl-10', fieldErrors.email && 'border-red-500/70 focus-visible:ring-red-500/50')}
                  data-testid="login-email-input"
                />
              </div>
              {fieldErrors.email && (
                <p id="email-error" role="alert" className="flex items-center gap-1.5 text-xs text-red-400" data-testid="email-error">
                  <AlertCircle className="h-3 w-3 shrink-0" aria-hidden="true" />
                  {fieldErrors.email}
                </p>
              )}
            </div>

            {/* Password */}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  aria-invalid={!!fieldErrors.password}
                  aria-describedby={fieldErrors.password ? 'password-error' : undefined}
                  className={cn('pl-10 pr-10', fieldErrors.password && 'border-red-500/70 focus-visible:ring-red-500/50')}
                  data-testid="login-password-input"
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
              {fieldErrors.password && (
                <p id="password-error" role="alert" className="flex items-center gap-1.5 text-xs text-red-400" data-testid="password-error">
                  <AlertCircle className="h-3 w-3 shrink-0" aria-hidden="true" />
                  {fieldErrors.password}
                </p>
              )}
            </div>

            {/* Remember me */}
            <div className="flex items-center gap-2.5">
              <input
                id="rememberMe"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded border-slate-600 bg-slate-800 text-blue-500 focus:ring-blue-500/50 focus:ring-offset-slate-900 cursor-pointer accent-blue-500"
              />
              <label htmlFor="rememberMe" className="text-sm text-slate-400 cursor-pointer select-none">
                Remember me for 30 days
              </label>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full h-11 text-sm font-semibold"
              disabled={isLoading}
              data-testid="login-submit-button"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                  Signing in…
                </>
              ) : (
                'Sign in'
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-700/50" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-3 text-xs text-slate-500 bg-slate-900">New to CIDR?</span>
            </div>
          </div>

          {/* Register CTA */}
          <Link href="/register">
            <Button variant="outline" className="w-full h-11 text-sm">
              Create an account
            </Button>
          </Link>
        </div>

        <p className="text-center text-xs text-slate-600 mt-6">
          © {new Date().getFullYear()} CIDR Security. All rights reserved.
        </p>
      </div>
    </div>
  );
}
