import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { YoutubeApiContext } from "../../context/YoutubeProvider";

function withAllContexts(children, youtube) {
  const queryClient = createTestQueryClient();

  return (
    <YoutubeApiContext.Provider value={{ youtube }}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </YoutubeApiContext.Provider>
  );
}

function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: 0,
      },
    },
    logger: {
      log: console.log,
      warn: console.warn,
      error: () => {},
    },
  });
}

export { withAllContexts };
