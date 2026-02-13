import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFound from './components/ui/NotFound.tsx';
import UserRoutes from './routes/UserRoutes.tsx';
import ServiceProviderRoutes from './routes/ServiceProviderRoutes.tsx';
import { Toaster } from 'react-hot-toast';
import AdminRoutes from './routes/AdminRoutes.tsx';
function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <BrowserRouter>
        <Routes>
          {/* <Route path="/sample" element={<Sample />} /> */}
          {UserRoutes()}
          {ServiceProviderRoutes()}
          {AdminRoutes()}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
