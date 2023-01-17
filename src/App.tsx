import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Test from '@/components/Test';
import Bear from '@/components/Bear';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<Test />} />
          <Route path={'/bear'} element={<Bear />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
