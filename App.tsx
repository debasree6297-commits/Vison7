import React, { Suspense, useState, useEffect } from 'react';
// @ts-ignore
import { Navigate, useLocation, Routes, Route, HashRouter } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { CharmProvider } from './contexts/CharmContext';
import LandingPage from './pages/LandingPage';
import SignInPage from './pages/SignInPage';
import ChatStudioPage from './pages/ChatStudioPage';
import ImageStudioPage from './pages/ImageStudioPage';
import HistoryStudioPage from './pages/HistoryStudioPage';
import SettingsPage from './pages/SettingsPage';
import AboutPage from './pages/AboutPage';
import AssetsHubPage from './pages/AssetsHubPage';
import ContactPage from './pages/ContactPage';
import Header from './components/Header';
import SplashScreen from './components/SplashScreen';
import CharmSystem from './components/CharmSystem';
import { AnimatePresence, motion as m } from 'framer-motion';

const motion = m as any;

// --- Route Guards ---

const ProtectedRoute = ({ children }: { children?: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  
  if (loading) {
    return null; // Splash screen handles the visual loading state
  }

  if (!user) {
    return <Navigate to="/signin" state={{ redirectTo: location.pathname }} replace />;
  }

  return <>{children}</>;
};

const PublicRoute = ({ children }: { children?: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
     return null; // Splash screen handles the visual loading state
  }

  if (user) {
    const from = location.state?.redirectTo || '/chat-studio';
    return <Navigate to={from} replace />;
  }

  return <>{children}</>;
};

const pageVariants = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -15 },
};

const PageWrapper = ({ children }: { children?: React.ReactNode }) => (
  <motion.div
    variants={pageVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] as const }}
    className="w-full"
  >
    {children}
  </motion.div>
);

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><LandingPage /></PageWrapper>} />
        
        {/* SignInPage Wrapped in PageWrapper for smooth transitions */}
        <Route path="/signin" element={
          <PublicRoute>
            <PageWrapper>
                <SignInPage />
            </PageWrapper>
          </PublicRoute>
        } />
        
        <Route path="/about" element={<PageWrapper><AboutPage /></PageWrapper>} />
        <Route path="/contact" element={<PageWrapper><ContactPage /></PageWrapper>} />
        
        <Route
          path="/chat-studio"
          element={<ProtectedRoute><PageWrapper><ChatStudioPage /></PageWrapper></ProtectedRoute>}
        />
        <Route
          path="/history-studio"
          element={<ProtectedRoute><PageWrapper><HistoryStudioPage /></PageWrapper></ProtectedRoute>}
        />
        <Route
          path="/image-studio"
          element={<ProtectedRoute><PageWrapper><ImageStudioPage /></PageWrapper></ProtectedRoute>}
        />
        <Route
          path="/assets-hub"
          element={<ProtectedRoute><PageWrapper><AssetsHubPage /></PageWrapper></ProtectedRoute>}
        />
        <Route
          path="/settings"
          element={<ProtectedRoute><PageWrapper><SettingsPage /></PageWrapper></ProtectedRoute>}
        />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
};

// MainLayout handles the global splash screen logic dependent on Auth State and Initial Load
const MainLayout = () => {
  const { loading } = useAuth();
  const [minSplashFinished, setMinSplashFinished] = useState(false);

  useEffect(() => {
    // Keep splash screen visible for at least 2 seconds for branding, 
    // but don't show it on every route change anymore to improve UX.
    const timer = setTimeout(() => {
      setMinSplashFinished(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Show splash if auth is still loading OR if the minimum splash time hasn't passed.
  // This prevents the "white flash" or blank screen when routes return null during loading.
  const showSplash = loading || !minSplashFinished;

  return (
    <div className="bg-default-bg-primary dark:bg-space-bg-primary text-default-text-primary dark:text-space-text-primary min-h-screen transition-colors duration-400 relative overflow-x-hidden">
      <SplashScreen isVisible={showSplash} />
      <Header />
      <CharmSystem /> {/* Global Charm System Modals */}
      <Suspense fallback={null}>
        <AnimatedRoutes />
      </Suspense>
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CharmProvider>
          <HashRouter>
            <MainLayout />
          </HashRouter>
        </CharmProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;