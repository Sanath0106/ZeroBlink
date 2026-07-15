import { Link } from 'react-router-dom';

const Hero = () => (
  <section id="home" className="hero">
    <div className="hero__wordmark" aria-hidden="true">SILENT</div>
    <div className="hero__content">
      <p className="hero__eyebrow">Independent CTF collective / 2025</p>
      <h1>ZER<span className="text-accent blink">0</span>BLINK</h1>
      <p className="hero__tagline">Quiet presence. Precise execution.</p>
      <Link to="/archives" className="button-primary">
        Explore archives <span aria-hidden="true">↗</span>
      </Link>
    </div>
  </section>
);

export default Hero;
