import React from 'react';
import './About.css';

const About: React.FC = () => {
  return (
    <div className="about">
      <div className="about-container">
        <h1>About MyApp</h1>
        
        <section className="about-content">
          <div className="about-text">
            <h2>Our Mission</h2>
            <p>
              We're building amazing web applications using modern technologies 
              and best practices. This React application demonstrates a clean, 
              scalable architecture with TypeScript, modern CSS, and excellent 
              developer experience.
            </p>
            
            <h2>Technology Stack</h2>
            <ul className="tech-list">
              <li><strong>React 18</strong> - Modern React with hooks and functional components</li>
              <li><strong>TypeScript</strong> - Type-safe JavaScript for better development</li>
              <li><strong>Vite</strong> - Next-generation frontend tooling</li>
              <li><strong>React Router</strong> - Declarative routing for React</li>
              <li><strong>CSS Modules</strong> - Scoped and maintainable styles</li>
            </ul>
            
            <h2>Features</h2>
            <ul className="features-list">
              <li>⚡ Lightning fast development with Vite HMR</li>
              <li>🔷 Full TypeScript support with strict mode</li>
              <li>🛣️ Client-side routing with React Router</li>
              <li>🎨 Modern, responsive design</li>
              <li>🧪 Component-based architecture</li>
              <li>🪝 Custom React hooks for reusable logic</li>
              <li>📱 Mobile-first responsive design</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About; 