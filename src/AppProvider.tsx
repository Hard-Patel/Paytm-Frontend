import { QueryClient, QueryClientProvider } from "react-query";

function AppProvider(children: any) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export default AppProvider;
