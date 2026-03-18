'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { z } from 'zod';
import {
    Shield, Eye, EyeOff, AlertCircle, Loader2,
    Lock, Mail, User, CheckCircle2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const passwordRules = z
    .string()
    .min(8, 'At least 8 characters')
    .regex(/[A-Z]/, 'One uppercase letter')
    .regex(/[0-9]/, 'One number')
    .regex(/[^A-Za-z0-9]/, 'One special character');

const registerSchema = z
    .object({
        fullName: z.string().min(2, 'Full name must be at least 2 characters').max(80, 'Name is too long'),
        email: z.string().email('Please enter a valid email address'),
        password: passwordRules,
        confirmPassword: z.string(),
        acceptTerms: z.literal(true, { error: 'You must accept the terms to continue' }),
    })
    .refine((d) => d.password === d.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    });

type RegisterFormData = z.infer<typeof registerSchema>;
type FieldErrors = Partial<Record<keyof RegisterFormData, string>>;

function validateForm(data: unknown): { success: true; data: RegisterFormData } | { success: false; errors: FieldErrors } {
    const result = registerSchema.safeParse(data);
    if (result.success) return { success: true, data: result.data };
    const errors: FieldErrors = {};
    for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof RegisterFormData;
        if (field && !errors[field]) errors[field] = issue.message;
    }
    return { success: false, errors };
}

const passwordStrengthChecks = [
    { label: '8+ characters', regex: /.{8,}/ },
    { label: 'Uppercase letter', regex: /[A-Z]/ },
    { label: 'Number', regex: /[0-9]/ },
    { label: 'Special character', regex: /[^A-Za-z0-9]/ },
];

function PasswordStrength({ password }: { password: string }) {
    const passed = passwordStrengthChecks.filter((c) => c.regex.test(password)).length;
    if (!password) return null;
    const strength = passed <= 1 ? 'Weak' : passed <= 2 ? 'Fair' : passed <= 3 ? 'Good' : 'Strong';
    const color = passed <= 1 ? 'bg-red-500' : passed <= 2 ? 'bg-amber-500' : passed <= 3 ? 'bg-blue-400' : 'bg-emerald-500';
    return (
        <div className="mt-2 space-y-2">
            <div className="flex gap-1">
                {[0, 1, 2, 3].map((i) => (
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
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
    const [serverError, setServerError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setServerError(null);
        setFieldErrors({});

        const validation = validateForm({ fullName, email, password, confirmPassword, acceptTerms: acceptTerms || undefined });
        if (!validation.success) {
            setFieldErrors(validation.errors);
            return;
        }

        setIsLoading(true);
        try {
            // TODO: Replace with real API call (e.g. POST /api/auth/register)
            await new Promise((resolve) => setTimeout(resolve, 1400));
            router.push('/overview');
        } catch {
            setServerError('Registration failed. An account with this email may already exist.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4 py-12">
            {/* Ambient glow */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
                <div className="absolute -top-60 -right-40 w-125 h-125 bg-blue-500/5 rounded-full blur-3xl" />
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
                    <h1 className="text-3xl font-bold text-slate-100 tracking-tight">Create your account</h1>
                    <p className="mt-2 text-slate-400">Get started with CIDR cloud security</p>
                </div>

                {/* Form card */}
                <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-2xl shadow-2xl shadow-slate-950/50 p-8">
                    {serverError && (
                        <div role="alert" className="mb-6 flex items-start gap-3 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-lg text-sm text-red-400">
                            <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" aria-hidden="true" />
                            <span>{serverError}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5" noValidate aria-label="Create account form">
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
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    aria-invalid={!!fieldErrors.fullName}
                                    aria-describedby={fieldErrors.fullName ? 'fullName-error' : undefined}
                                    className={cn('pl-10', fieldErrors.fullName && 'border-red-500/70 focus-visible:ring-red-500/50')}
                                    data-testid="register-name-input"
                                />
                            </div>
                            {fieldErrors.fullName && (
                                <p id="fullName-error" role="alert" className="flex items-center gap-1.5 text-xs text-red-400" data-testid="fullName-error">
                                    <AlertCircle className="h-3 w-3 shrink-0" aria-hidden="true" />
                                    {fieldErrors.fullName}
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
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    aria-invalid={!!fieldErrors.email}
                                    aria-describedby={fieldErrors.email ? 'email-error' : undefined}
                                    className={cn('pl-10', fieldErrors.email && 'border-red-500/70 focus-visible:ring-red-500/50')}
                                    data-testid="register-email-input"
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
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    aria-invalid={!!fieldErrors.password}
                                    aria-describedby={fieldErrors.password ? 'password-error' : 'password-strength'}
                                    className={cn('pl-10 pr-10', fieldErrors.password && 'border-red-500/70 focus-visible:ring-red-500/50')}
                                    data-testid="register-password-input"
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
                            {fieldErrors.password ? (
                                <p id="password-error" role="alert" className="flex items-center gap-1.5 text-xs text-red-400" data-testid="password-error">
                                    <AlertCircle className="h-3 w-3 shrink-0" aria-hidden="true" />
                                    {fieldErrors.password}
                                </p>
                            ) : (
                                <div id="password-strength">
                                    <PasswordStrength password={password} />
                                </div>
                            )}
                        </div>

                        {/* Confirm password */}
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
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    aria-invalid={!!fieldErrors.confirmPassword}
                                    aria-describedby={fieldErrors.confirmPassword ? 'confirmPassword-error' : undefined}
                                    className={cn('pl-10 pr-10', fieldErrors.confirmPassword && 'border-red-500/70 focus-visible:ring-red-500/50')}
                                    data-testid="register-confirm-password-input"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword((v) => !v)}
                                    aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                                >
                                    {showConfirmPassword ? <EyeOff className="h-4 w-4" aria-hidden="true" /> : <Eye className="h-4 w-4" aria-hidden="true" />}
                                </button>
                            </div>
                            {fieldErrors.confirmPassword && (
                                <p id="confirmPassword-error" role="alert" className="flex items-center gap-1.5 text-xs text-red-400" data-testid="confirmPassword-error">
                                    <AlertCircle className="h-3 w-3 shrink-0" aria-hidden="true" />
                                    {fieldErrors.confirmPassword}
                                </p>
                            )}
                        </div>

                        {/* Terms */}
                        <div className="space-y-1.5">
                            <div className="flex items-start gap-2.5">
                                <input
                                    id="acceptTerms"
                                    type="checkbox"
                                    checked={acceptTerms}
                                    onChange={(e) => setAcceptTerms(e.target.checked)}
                                    aria-describedby={fieldErrors.acceptTerms ? 'terms-error' : undefined}
                                    className="h-4 w-4 mt-0.5 rounded border-slate-600 bg-slate-800 text-blue-500 focus:ring-blue-500/50 focus:ring-offset-slate-900 cursor-pointer accent-blue-500 shrink-0"
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
                            {fieldErrors.acceptTerms && (
                                <p id="terms-error" role="alert" className="flex items-center gap-1.5 text-xs text-red-400" data-testid="terms-error">
                                    <AlertCircle className="h-3 w-3 shrink-0" aria-hidden="true" />
                                    {fieldErrors.acceptTerms}
                                </p>
                            )}
                        </div>

                        {/* Submit */}
                        <Button
                            type="submit"
                            className="w-full h-11 text-sm font-semibold"
                            disabled={isLoading}
                            data-testid="register-submit-button"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                                    Creating account…
                                </>
                            ) : (
                                'Create account'
                            )}
                        </Button>
                    </form>

                    {/* Divider */}
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-700/50" />
                        </div>
                        <div className="relative flex justify-center">
                            <span className="px-3 text-xs text-slate-500 bg-slate-900">Already have an account?</span>
                        </div>
                    </div>

                    <Link href="/login">
                        <Button variant="outline" className="w-full h-11 text-sm">
                            Sign in instead
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
