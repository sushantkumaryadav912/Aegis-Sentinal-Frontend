import Header from '@/components/layout/header';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20 bg-slate-950">{children}</main>
    </div>
  );
}