'use client';

import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export function TableSkeleton({ rows = 6 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} className="h-14 w-full rounded-xl bg-slate-900/60" />
      ))}
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="space-y-3 p-4 rounded-xl border border-slate-900 bg-slate-950/40">
      <Skeleton className="h-4 w-1/3 bg-slate-900" />
      <Skeleton className="h-8 w-2/3 bg-slate-900" />
      <Skeleton className="h-3 w-1/2 bg-slate-900/60" />
    </div>
  );
}

/**
 * Skeleton for Atlas Executive Dashboard / Overview Page
 */
export function OverviewSkeleton() {
  return (
    <div className="space-y-8 animate-in fade-in duration-300" data-testid="overview-skeleton">
      {/* Header Skeleton */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-900 pb-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-36 rounded-full bg-slate-900" />
            <Skeleton className="h-5 w-28 rounded-full bg-slate-900" />
          </div>
          <Skeleton className="h-9 w-64 bg-slate-900" />
          <Skeleton className="h-4 w-96 max-w-full bg-slate-900/70" />
        </div>
        <div className="flex items-center gap-4 bg-slate-950/60 border border-slate-900 rounded-2xl p-3.5 shrink-0">
          <Skeleton className="w-12 h-12 rounded-full bg-slate-900" />
          <div className="space-y-1.5">
            <Skeleton className="h-3 w-28 bg-slate-900" />
            <Skeleton className="h-4 w-32 bg-slate-900" />
            <Skeleton className="h-3 w-40 bg-slate-900/60" />
          </div>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="border-slate-900 bg-slate-950/50 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <Skeleton className="h-3.5 w-24 bg-slate-900" />
              <Skeleton className="h-5 w-5 rounded-md bg-slate-900" />
            </div>
            <Skeleton className="h-8 w-16 bg-slate-800" />
            <Skeleton className="h-3 w-32 bg-slate-900/60" />
          </Card>
        ))}
      </div>

      {/* Middle Section: Threat Distribution & Cloud Infra */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-slate-900 bg-slate-950/50 p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-900 pb-3">
            <div className="space-y-1">
              <Skeleton className="h-4 w-44 bg-slate-900" />
              <Skeleton className="h-3 w-64 bg-slate-900/60" />
            </div>
            <Skeleton className="h-6 w-20 rounded-full bg-slate-900" />
          </div>
          <div className="grid grid-cols-3 gap-4 pt-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-4 rounded-xl bg-slate-900/30 border border-slate-900/60 space-y-2">
                <Skeleton className="h-3 w-16 bg-slate-900" />
                <Skeleton className="h-7 w-12 bg-slate-800" />
                <Skeleton className="h-2 w-full rounded-full bg-slate-900" />
              </div>
            ))}
          </div>
        </Card>

        <Card className="border-slate-900 bg-slate-950/50 p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-900 pb-3">
            <Skeleton className="h-4 w-36 bg-slate-900" />
            <Skeleton className="h-4 w-4 rounded-full bg-slate-900" />
          </div>
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/20 border border-slate-900/40">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4 rounded-full bg-slate-900" />
                  <Skeleton className="h-3 w-20 bg-slate-900" />
                </div>
                <Skeleton className="h-3 w-12 bg-slate-900" />
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent Alerts List Skeleton */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-44 bg-slate-900" />
          <Skeleton className="h-8 w-24 rounded-lg bg-slate-900" />
        </div>
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="p-4 rounded-2xl border border-slate-900 bg-slate-950/40 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 flex-1">
                <Skeleton className="h-6 w-16 rounded-md bg-slate-900" />
                <Skeleton className="h-6 w-12 rounded-md bg-slate-900" />
                <div className="space-y-1.5 flex-1 max-w-md">
                  <Skeleton className="h-4 w-3/4 bg-slate-900" />
                  <Skeleton className="h-3 w-1/2 bg-slate-900/60" />
                </div>
              </div>
              <Skeleton className="h-8 w-20 rounded-lg bg-slate-900 shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Skeleton for Sentinel Core Alerts Page
 */
export function AlertsSkeleton() {
  return (
    <div className="space-y-6 animate-in fade-in duration-300" data-testid="alerts-skeleton">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-900 pb-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-48 rounded-full bg-slate-900" />
            <Skeleton className="h-5 w-32 rounded-full bg-slate-900" />
          </div>
          <Skeleton className="h-9 w-72 bg-slate-900" />
          <Skeleton className="h-4 w-96 max-w-full bg-slate-900/70" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-10 w-28 rounded-xl bg-slate-900" />
          <Skeleton className="h-10 w-32 rounded-xl bg-slate-900" />
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="p-4 rounded-xl border border-slate-900 bg-slate-950/40 space-y-2">
            <Skeleton className="h-3 w-20 bg-slate-900" />
            <Skeleton className="h-7 w-12 bg-slate-800" />
          </div>
        ))}
      </div>

      {/* Tabs & Search Filter Bar */}
      <div className="flex flex-col lg:flex-row gap-4 justify-between items-stretch lg:items-center">
        <div className="flex gap-2 p-1 rounded-xl bg-slate-950 border border-slate-900 w-fit">
          <Skeleton className="h-9 w-28 rounded-lg bg-slate-900" />
          <Skeleton className="h-9 w-28 rounded-lg bg-slate-900/60" />
          <Skeleton className="h-9 w-28 rounded-lg bg-slate-900/60" />
        </div>
        <div className="flex gap-2.5">
          <Skeleton className="h-10 w-64 rounded-xl bg-slate-900" />
          <Skeleton className="h-10 w-32 rounded-xl bg-slate-900" />
          <Skeleton className="h-10 w-32 rounded-xl bg-slate-900" />
        </div>
      </div>

      {/* Table Skeleton */}
      <div className="border border-slate-900 rounded-2xl overflow-hidden bg-slate-950/40 p-4 space-y-3">
        <div className="flex items-center justify-between border-b border-slate-900 pb-3">
          <Skeleton className="h-4 w-24 bg-slate-900" />
          <Skeleton className="h-4 w-20 bg-slate-900" />
          <Skeleton className="h-4 w-40 bg-slate-900" />
          <Skeleton className="h-4 w-28 bg-slate-900" />
          <Skeleton className="h-4 w-20 bg-slate-900" />
        </div>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="flex items-center justify-between py-3 border-b border-slate-900/40 gap-4">
            <Skeleton className="h-6 w-16 rounded-md bg-slate-900" />
            <Skeleton className="h-6 w-12 rounded-md bg-slate-900" />
            <div className="space-y-1 flex-1">
              <Skeleton className="h-4 w-64 bg-slate-900" />
              <Skeleton className="h-3 w-40 bg-slate-900/60" />
            </div>
            <Skeleton className="h-5 w-24 rounded bg-slate-900" />
            <Skeleton className="h-5 w-20 bg-slate-900" />
            <Skeleton className="h-8 w-20 rounded-lg bg-slate-900" />
          </div>
        ))}
      </div>

      {/* Pagination Skeleton */}
      <div className="flex items-center justify-between pt-2">
        <Skeleton className="h-4 w-36 bg-slate-900" />
        <div className="flex gap-2">
          <Skeleton className="h-9 w-20 rounded-lg bg-slate-900" />
          <Skeleton className="h-9 w-20 rounded-lg bg-slate-900" />
        </div>
      </div>
    </div>
  );
}

/**
 * Skeleton for Alert Deep-Dive / Details Page
 */
export function AlertDetailSkeleton() {
  return (
    <div className="space-y-8 animate-in fade-in duration-300" data-testid="alert-detail-skeleton">
      <div className="flex items-center gap-3">
        <Skeleton className="h-9 w-24 rounded-lg bg-slate-900" />
        <Skeleton className="h-6 w-32 rounded-full bg-slate-900" />
      </div>

      <div className="flex flex-col lg:flex-row justify-between gap-4 border-b border-slate-900 pb-6">
        <div className="space-y-2">
          <Skeleton className="h-8 w-96 max-w-full bg-slate-900" />
          <Skeleton className="h-4 w-80 bg-slate-900/70" />
        </div>
        <div className="flex gap-3">
          <Skeleton className="h-10 w-28 rounded-xl bg-slate-900" />
          <Skeleton className="h-10 w-36 rounded-xl bg-slate-900" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-slate-900 bg-slate-950/50 p-6 space-y-4">
            <Skeleton className="h-5 w-40 bg-slate-900" />
            <Skeleton className="h-16 w-full bg-slate-900/50 rounded-lg" />
            <div className="grid grid-cols-2 gap-4 pt-2">
              <Skeleton className="h-12 w-full bg-slate-900/30 rounded-lg" />
              <Skeleton className="h-12 w-full bg-slate-900/30 rounded-lg" />
            </div>
          </Card>

          <Card className="border-slate-900 bg-slate-950/50 p-6 space-y-4">
            <Skeleton className="h-5 w-48 bg-slate-900" />
            <div className="space-y-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex justify-between items-center p-3 rounded-lg bg-slate-900/40">
                  <Skeleton className="h-4 w-32 bg-slate-900" />
                  <Skeleton className="h-4 w-16 bg-slate-900" />
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-slate-900 bg-slate-950/50 p-6 space-y-4">
            <Skeleton className="h-5 w-36 bg-slate-900" />
            <div className="space-y-3">
              <Skeleton className="h-4 w-full bg-slate-900/60" />
              <Skeleton className="h-4 w-5/6 bg-slate-900/60" />
              <Skeleton className="h-10 w-full rounded-xl bg-slate-900" />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

/**
 * Skeleton for Security Telemetry Logs Page
 */
export function LogsSkeleton() {
  return (
    <div className="space-y-6 animate-in fade-in duration-300" data-testid="logs-skeleton">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-900 pb-6">
        <div className="space-y-2">
          <Skeleton className="h-5 w-44 rounded-full bg-slate-900" />
          <Skeleton className="h-9 w-64 bg-slate-900" />
          <Skeleton className="h-4 w-80 bg-slate-900/70" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-10 w-24 rounded-xl bg-slate-900" />
          <Skeleton className="h-10 w-28 rounded-xl bg-slate-900" />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <Skeleton className="h-11 flex-1 rounded-xl bg-slate-900" />
        <Skeleton className="h-11 w-44 rounded-xl bg-slate-900" />
        <Skeleton className="h-11 w-44 rounded-xl bg-slate-900" />
      </div>

      <div className="border border-slate-900 rounded-2xl overflow-hidden bg-slate-950/60 p-4 space-y-3">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
          <div key={i} className="flex items-center justify-between py-2.5 border-b border-slate-900/30 gap-4">
            <Skeleton className="h-4 w-28 bg-slate-900 font-mono" />
            <Skeleton className="h-5 w-20 rounded bg-slate-900" />
            <Skeleton className="h-4 w-48 bg-slate-900" />
            <Skeleton className="h-4 w-32 bg-slate-900 font-mono" />
            <Skeleton className="h-4 w-24 bg-slate-900" />
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Skeleton for Forge SOAR Workflows Page
 */
export function WorkflowsSkeleton() {
  return (
    <div className="space-y-6 animate-in fade-in duration-300" data-testid="workflows-skeleton">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-900 pb-6">
        <div className="space-y-2">
          <Skeleton className="h-5 w-48 rounded-full bg-slate-900" />
          <Skeleton className="h-9 w-72 bg-slate-900" />
          <Skeleton className="h-4 w-96 bg-slate-900/70" />
        </div>
        <Skeleton className="h-10 w-36 rounded-xl bg-slate-900" />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="p-4 rounded-xl border border-slate-900 bg-slate-950/40 space-y-2">
            <Skeleton className="h-3 w-24 bg-slate-900" />
            <Skeleton className="h-7 w-16 bg-slate-800" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="border-slate-900 bg-slate-950/50 p-5 space-y-4">
            <div className="flex justify-between items-start">
              <Skeleton className="h-5 w-36 bg-slate-900" />
              <Skeleton className="h-5 w-16 rounded-full bg-slate-900" />
            </div>
            <Skeleton className="h-10 w-full bg-slate-900/60" />
            <div className="flex gap-2">
              <Skeleton className="h-5 w-20 rounded bg-slate-900" />
              <Skeleton className="h-5 w-20 rounded bg-slate-900" />
            </div>
            <Skeleton className="h-9 w-full rounded-xl bg-slate-900 mt-2" />
          </Card>
        ))}
      </div>
    </div>
  );
}

/**
 * Skeleton for Prism Attack Graph Page
 */
export function PrismSkeleton() {
  return (
    <div className="space-y-6 animate-in fade-in duration-300" data-testid="prism-skeleton">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-900 pb-6">
        <div className="space-y-2">
          <Skeleton className="h-5 w-44 rounded-full bg-slate-900" />
          <Skeleton className="h-9 w-64 bg-slate-900" />
          <Skeleton className="h-4 w-80 bg-slate-900/70" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-10 w-32 rounded-xl bg-slate-900" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-slate-900 bg-slate-950/50 h-[500px] flex items-center justify-center p-6 relative overflow-hidden">
          <div className="space-y-4 text-center">
            <Skeleton className="h-12 w-12 rounded-full bg-slate-900 mx-auto" />
            <Skeleton className="h-4 w-48 bg-slate-900 mx-auto" />
            <Skeleton className="h-3 w-36 bg-slate-900/60 mx-auto" />
          </div>
        </Card>

        <Card className="border-slate-900 bg-slate-950/50 p-6 space-y-4">
          <Skeleton className="h-5 w-40 bg-slate-900" />
          <div className="space-y-3 pt-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="p-3 rounded-lg bg-slate-900/40 space-y-2">
                <Skeleton className="h-4 w-32 bg-slate-900" />
                <Skeleton className="h-3 w-full bg-slate-900/60" />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

/**
 * Skeleton for Oracle Copilot AI Page
 */
export function OracleSkeleton() {
  return (
    <div className="space-y-6 animate-in fade-in duration-300" data-testid="oracle-skeleton">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-900 pb-6">
        <div className="space-y-2">
          <Skeleton className="h-5 w-44 rounded-full bg-slate-900" />
          <Skeleton className="h-9 w-64 bg-slate-900" />
          <Skeleton className="h-4 w-80 bg-slate-900/70" />
        </div>
        <Skeleton className="h-8 w-44 rounded-full bg-slate-900" />
      </div>

      <Card className="border-slate-900 bg-slate-950/60 p-6 space-y-6 h-[540px] flex flex-col justify-between">
        <div className="space-y-4">
          <div className="flex gap-3 items-start">
            <Skeleton className="h-9 w-9 rounded-full bg-slate-900 shrink-0" />
            <div className="space-y-2 max-w-lg">
              <Skeleton className="h-16 w-80 rounded-2xl bg-slate-900" />
            </div>
          </div>
          <div className="flex gap-3 items-start justify-end">
            <div className="space-y-2 max-w-lg">
              <Skeleton className="h-12 w-64 rounded-2xl bg-slate-800" />
            </div>
            <Skeleton className="h-9 w-9 rounded-full bg-slate-900 shrink-0" />
          </div>
        </div>

        <div className="space-y-3 pt-4 border-t border-slate-900">
          <div className="flex gap-2">
            <Skeleton className="h-7 w-28 rounded-full bg-slate-900" />
            <Skeleton className="h-7 w-36 rounded-full bg-slate-900" />
            <Skeleton className="h-7 w-32 rounded-full bg-slate-900" />
          </div>
          <Skeleton className="h-12 w-full rounded-xl bg-slate-900" />
        </div>
      </Card>
    </div>
  );
}

/**
 * Skeleton for Settings Page
 */
export function SettingsSkeleton() {
  return (
    <div className="space-y-6 animate-in fade-in duration-300" data-testid="settings-skeleton">
      <div className="border-b border-slate-900 pb-6 space-y-2">
        <Skeleton className="h-9 w-48 bg-slate-900" />
        <Skeleton className="h-4 w-72 bg-slate-900/70" />
      </div>

      <div className="flex gap-2 border-b border-slate-900 pb-3">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-9 w-28 rounded-lg bg-slate-900" />
        ))}
      </div>

      <Card className="border-slate-900 bg-slate-950/50 p-6 space-y-6 max-w-3xl">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="space-y-2 border-b border-slate-900/60 pb-4">
            <Skeleton className="h-4 w-36 bg-slate-900" />
            <Skeleton className="h-10 w-full rounded-xl bg-slate-900/60" />
          </div>
        ))}
        <Skeleton className="h-10 w-32 rounded-xl bg-slate-800" />
      </Card>
    </div>
  );
}

/**
 * Generic High-Fidelity Page Skeleton Fallback
 */
export function GenericPageSkeleton() {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="border-b border-slate-900 pb-6 space-y-2">
        <Skeleton className="h-5 w-36 rounded-full bg-slate-900" />
        <Skeleton className="h-9 w-60 bg-slate-900" />
        <Skeleton className="h-4 w-80 bg-slate-900/70" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="border-slate-900 bg-slate-950/50 p-5 space-y-3">
            <Skeleton className="h-4 w-28 bg-slate-900" />
            <Skeleton className="h-8 w-20 bg-slate-800" />
            <Skeleton className="h-3 w-40 bg-slate-900/60" />
          </Card>
        ))}
      </div>

      <Card className="border-slate-900 bg-slate-950/50 p-6 space-y-4">
        <Skeleton className="h-5 w-44 bg-slate-900" />
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-12 w-full rounded-xl bg-slate-900/60" />
          ))}
        </div>
      </Card>
    </div>
  );
}
