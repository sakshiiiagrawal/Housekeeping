import React from 'react';
import { useCounter } from '../hooks/useCounter';
import './Home.css';

const Home: React.FC = () => {
  const { count, increment, decrement, reset } = useCounter(0);

  return (
    <div className="home">
      <div className="hero-section">
        <h1>Welcome to MyApp</h1>
        <p>A modern React application built with TypeScript and Vite</p>
      </div>
      
      <div className="features-section">
        <h2>Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>⚡ Fast Development</h3>
            <p>Built with Vite for lightning-fast hot module replacement</p>
          </div>
          <div className="feature-card">
            <h3>🔷 TypeScript</h3>
            <p>Type-safe development with excellent tooling support</p>
          </div>
          <div className="feature-card">
            <h3>🛣️ Routing</h3>
            <p>React Router for seamless navigation between pages</p>
          </div>
          <div className="feature-card">
            <h3>🎨 Modern CSS</h3>
            <p>Clean, responsive design with CSS Grid and Flexbox</p>
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h2>Interactive Demo</h2>
        <div className="counter-demo">
          <p>Count: <span className="count-value">{count}</span></p>
          <div className="counter-buttons">
            <button onClick={increment} className="btn btn-primary">
              Increment
            </button>
            <button onClick={decrement} className="btn btn-secondary">
              Decrement
            </button>
            <button onClick={reset} className="btn btn-outline">
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 