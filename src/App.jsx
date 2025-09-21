import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import Navbar from './components/Navbar';
import PSAGFooter from "./components/PSAGFooter";
import Spinner from './components/Spinner';
import Donate from './pages/Donate';

const Home = lazy(() => import('./pages/Home'));
const AboutUs = lazy(() => import('./pages/AboutUs'));
const Athletes = lazy(() => import('./pages/Athletes'));
const Sports = lazy(() => import('./pages/Sports'));
const Events = lazy(() => import('./pages/Events'));
const News = lazy(() => import('./pages/News'));
const Gallery = lazy(() => import('./pages/Gallery'));
const ContactUs = lazy(() => import('./pages/ContactUs'));
const SendEmail = lazy(() => import('./pages/SendEmail'));
const AthleteProfile = lazy(() => import('./pages/AthleteProfile'));
const PlayerRegistration = lazy(() => import('./pages/PlayerRegistration'));
const PlayerRegistrationSuccess = lazy(() => import('./pages/PlayerRegistrationSuccess'));
const PlayerManagement = lazy(() => import('./pages/PlayerManagement'));
const IdCardSearch = lazy(() => import('./pages/IdCardSearch'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const UserRegistration = lazy(() => import('./pages/UserRegistration'));
const Login = lazy(() => import('./pages/Login'));

// ErrorBoundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    // You can log error to an error reporting service here
    // console.error(error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--bg)]">
          <h1 className="text-3xl font-bold text-[var(--primary)] mb-4">Something went wrong.</h1>
          <p className="text-lg text-[var(--accent)] mb-2">An unexpected error occurred. Please try refreshing the page.</p>
          <button onClick={() => window.location.reload()} className="mt-4 px-6 py-2 bg-[var(--primary)] text-white rounded-full font-semibold hover:bg-[var(--accent)] transition">Reload</button>
        </div>
      );
    }
    return this.props.children;
  }
}

function Placeholder({ title }) {
  return (
    <main className="container mx-auto px-2 py-12">
      <h1 className="text-3xl font-bold text-primary-600 mb-4">{title}</h1>
      <p className="text-gray-600">Content coming soon...</p>
    </main>
  );
}

// ScrollToTop component
function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <LanguageProvider>
      <Router>
        <ScrollToTop />
        <Navbar />
        <ErrorBoundary>
          <Suspense fallback={<Spinner isLoading={true} />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/athletes" element={<Athletes />} />
              <Route path="/athlete/:id" element={<AthleteProfile />} />
              <Route path="/sports" element={<Sports />} />
              <Route path="/events" element={<Events />} />
              <Route path="/news" element={<News />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/send-email" element={<SendEmail />} />
              <Route path="/register" element={<PlayerRegistration />} />
              <Route path="/register/success" element={<PlayerRegistrationSuccess />} />
              <Route path="/user/register" element={<UserRegistration />} />
              <Route path="/players" element={<PlayerManagement />} />
              <Route path="/idcard" element={<IdCardSearch />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/donate" element={<Donate />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
        <PSAGFooter />
      </Router>
    </LanguageProvider>
  );
} 