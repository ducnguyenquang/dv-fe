declare module "react-query/types/react/QueryClientProvider" {
  interface QueryClientProviderProps {
    children?: ReactNode;
    client: QueryClient;
    contextSharing?: boolean;
  }
}