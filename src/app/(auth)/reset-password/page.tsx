'use client';

import { useState } from 'react';
import Link from 'next/link';
import { z } from 'zod';
import {
    Shield, AlertCircle, Loader2, Mail, ArrowLeft, CheckCircle2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

// ── Step 1: request reset ──────────────────────────────────────────────────

const requestSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
});

type RequestFormData = z.infer<typeof requestSchema>;
type RequestErrors = Partial<Record<keyof RequestFormData, string>>;

function validateRequest(data: unknown): { success: true; data: RequestFormData } | { success: false; errors: RequestErrors } {
    const result = requestSchema.safeParse(data);
    if (result.success) return { success: true, data: result.data };
    const errors: RequestErrors = {};
    for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof RequestFormData;
        if (field && !errors[field]) errors[field] = issue.message;
    }
    return { success: false, errors };
}

// ── Step 2: enter new password ─────────────────────────────────────────────

// (For a full implementation, the reset token would come from the URL search params.)

// ── Components ─────────────────────────────────────────────────────────────

function RequestResetForm({ onSuccess }: { onSuccess: (email: string) => void }) {
    const [email, setEmail] = useState('');
    const [fieldErrors, setFieldErrors] = useState<RequestErrors>({});
    const [serverError, setServerError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setServerError(null);
        setFieldErrors({});

        const validation = validateRequest({ email });
        if (!validation.success) {
            setFieldErrors(validation.errors);
            return;
        }

        setIsLoading(true);
        try {
            // TODO: Replace with real API call (e.g. POST /api/auth/reset-password)
            await new Promise((resolve) => setTimeout(resolve, 1200));
            onSuccess(email);
        } catch {
            setServerError('Something went wrong. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="text-center mb-8">
                <Link href="/" className="inline-flex items-center justify-center mb-6 group" aria-label="Go to homepage">
                    <div className="relative">
                        <div className="absolute inset-0 bg-blue-500/20 rounded-xl blur-xl group-hover:bg-blue-500/30 transition-all duration-300" />
                        <div className="relative h-14 w-14 rounded-xl bg-slate-900 border border-slate-700/50 flex items-center justify-center shadow-lg">
                            <Shield className="h-7 w-7 text-blue-400" />
                        </div>
                    </div>
                </Link>
                <h1 className="text-3xl font-bold text-slate-100 tracking-tight">Forgot your password?</h1>
                <p className="mt-2 text-slate-400 max-w-sm mx-auto">
                    Enter your email and we&apos;ll send you a secure link to reset it.
                </p>
            </div>

            <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-2xl shadow-2xl shadow-slate-950/50 p-8">
                {serverError && (
                    <div role="alert" className="mb-6 flex items-start gap-3 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-lg text-sm text-red-400">
                        <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" aria-hidden="true" />
                        <span>{serverError}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5" noValidate aria-label="Password reset form">
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
                                data-testid="reset-email-input"
                            />
                        </div>
                        {fieldErrors.email && (
                            <p id="email-error" role="alert" className="flex items-center gap-1.5 text-xs text-red-400" data-testid="email-error">
                                <AlertCircle className="h-3 w-3 shrink-0" aria-hidden="true" />
                                {fieldErrors.email}
                            </p>
                        )}
                    </div>

                    <Button
                        type="submit"
                        className="w-full h-11 text-sm font-semibold"
                        disabled={isLoading}
                        data-testid="reset-submit-button"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                                Sending reset link…
                            </>
                        ) : (
                            'Send reset link'
                        )}
                    </Button>
                </form>

                {/* Back to login */}
                <div className="mt-6 text-center">
                    <Link
                        href="/login"
                        className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-200 transition-colors"
                        data-testid="back-to-login"
                    >
                        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                        Back to sign in
                    </Link>
                </div>
            </div>
        </>
    );
}

function EmailSentConfirmation({ email, onResend }: { email: string; onResend: () => void }) {
    const [resending, setResending] = useState(false);
    const [resent, setResent] = useState(false);

    const handleResend = async () => {
        setResending(true);
        setResent(false);
        try {
            // TODO: Replace with real resend API call
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setResent(true);
        } finally {
            setResending(false);
        }
    };

    return (
        <>
            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center mb-6">
                    <div className="relative">
                        <div className="absolute inset-0 bg-emerald-500/20 rounded-xl blur-xl" />
                        <div className="relative h-14 w-14 rounded-xl bg-slate-900 border border-slate-700/50 flex items-center justify-center shadow-lg">
                            <CheckCircle2 className="h-7 w-7 text-emerald-400" />
                        </div>
                    </div>
                </div>
                <h1 className="text-3xl font-bold text-slate-100 tracking-tight">Check your email</h1>
                <p className="mt-2 text-slate-400 max-w-sm mx-auto">
                    We sent a password reset link to{' '}
                    <span className="font-medium text-slate-300">{email}</span>. It expires in 30 minutes.
                </p>
            </div>

            <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-2xl shadow-2xl shadow-slate-950/50 p-8 space-y-4">
                {/* Hint */}
                <div className="flex items-start gap-3 px-4 py-3 bg-blue-500/10 border border-blue-500/20 rounded-lg text-sm text-blue-300">
                    <Mail className="h-4 w-4 mt-0.5 shrink-0" aria-hidden="true" />
                    <p>
                        Didn&apos;t receive the email? Check your spam folder, or{' '}
                        <button
                            type="button"
                            onClick={handleResend}
                            disabled={resending}
                            className="underline underline-offset-2 text-blue-400 hover:text-blue-300 transition-colors disabled:opacity-60"
                        >
                            {resending ? 'Resending…' : 'click to resend'}
                        </button>
                        .
                    </p>
                </div>

                {resent && (
                    <div role="status" className="flex items-center gap-2 px-4 py-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-sm text-emerald-400">
                        <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
                        Reset link resent successfully.
                    </div>
                )}

                <Link href="/login">
                    <Button variant="outline" className="w-full h-11 text-sm">
                        <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
                        Back to sign in
                    </Button>
                </Link>
            </div>
        </>
    );
}

// ── Page ───────────────────────────────────────────────────────────────────

export default function ResetPasswordPage() {
    const [sentTo, setSentTo] = useState<string | null>(null);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4 py-12">
            {/* Ambient glow */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
            </div>

            <div className="relative w-full max-w-md">
                {sentTo ? (
                    <EmailSentConfirmation email={sentTo} onResend={() => setSentTo(null)} />
                ) : (
                    <RequestResetForm onSuccess={(email) => setSentTo(email)} />
                )}

                <p className="text-center text-xs text-slate-600 mt-6">
                    © {new Date().getFullYear()} Aegis Sentinel. All rights reserved.
                </p>
            </div>
        </div>
    );
}
