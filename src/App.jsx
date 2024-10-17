import Banner from './components/Banner';
import TermPage from './components/TermPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useJsonQuery } from './utilities/fetch';

const Main = () => {
  const [data, isLoading, error] = useJsonQuery('https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php');

  if (error) {return <h1>Error loading courses data: {`${error}`}</h1>};
  if (isLoading) {return <h1>Loading courses data...</h1>};
  if (!data) {return <h1>No course data found</h1>};

  return (
    <div>
      <br/>
      <Banner title={data.title}></Banner>
      <br/>
      <TermPage courses={data.courses}></TermPage>
    </div>
  );
}

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <div className="container">
      <Main />
    </div>
  </QueryClientProvider>
);

export default App;