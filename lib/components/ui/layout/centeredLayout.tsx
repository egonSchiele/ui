export function CenteredLayout({ children }: { children?: React.ReactNode }) {
  return (
    <div className="bg-white px-6 py-32 lg:px-8">
      <div className="mx-auto max-w-3xl text-base/7 text-primary/90">
        {children}
      </div>
    </div>
  );
}
