import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Team from './components/Team';
import Contact from './components/Contact';

const Writeups = lazy(() => import('./components/Writeups'));
const NotFound = lazy(() => import('./components/NotFound'));

function App() {
  return (
    <Router>
      <div className="app-shell">
        <div className="scanlines" aria-hidden="true"></div>
        <Navbar />
        
        <Suspense fallback={<main className="route-loader" aria-live="polite">Loading secure channel...</main>}>
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <Team />
              <Contact />
            </>
          } />
          <Route path="/archives" element={<Writeups />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </Suspense>

        <footer className="site-footer">
          <span>&copy; {new Date().getFullYear()} ZER0BLINK</span>
          <span>SECURE CHANNEL / OPEN</span>
        </footer>
      </div>
    </Router>
  );
}

export default App;
