import AppHeader from './Header';

type AppLayoutProps = {
  children: React.ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <main>
      <AppHeader />
      {children}
    </main>
  );
}
