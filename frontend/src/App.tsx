import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';
import { useTheme } from './hooks/useTheme';
import ThemeTransitionOverlay from './components/common/ThemeTransitionOverlay';
import { Analytics } from '@vercel/analytics/react';

function App() {
  const { theme, isTransitioning } = useTheme();

  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <AppRoutes />
        <ThemeTransitionOverlay isVisible={isTransitioning} theme={theme} />
        <Analytics />
      </div>
    </BrowserRouter>
  );
}

export default App;
