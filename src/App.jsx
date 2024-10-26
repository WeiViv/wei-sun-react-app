import Main from './components/Main';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <div className="container">
      <Main/>
    </div>
  </QueryClientProvider>
);

export default App;
