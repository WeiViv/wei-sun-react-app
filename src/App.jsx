import Main from './components/Main';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useJsonQuery } from './utilities/fetch';


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <div className="container">
      <Main url={'https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php'}/>
    </div>
  </QueryClientProvider>
);

export default App;