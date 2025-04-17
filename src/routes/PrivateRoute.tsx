import { useRequireAuth } from '@_hooks/useAuth';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const isLoggedIn = useRequireAuth();

  if (!isLoggedIn) return null;

  return <>{children}</>;
};

export default PrivateRoute;
