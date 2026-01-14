interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
      <main className="flex flex-col h-screen w-screen bg-muted">
        {children}
      </main>
  );
};

export default Layout;
