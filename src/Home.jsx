import React from "react";
import { FaSearch } from "react-icons/fa";
import "./Home.css";  // Import the CSS file

const Home = () => {
  return (
    <div className="container"> 
      <header className="header">
        <h1>Shrakti</h1>
        <nav className="nav">
          <ul>
            <li>Find Talent</li>
            <li>Find Work</li>
            <li>Why Shrakti</li>
            <li>Enterprise</li>
            <li>Pricing</li>
          </ul>
        </nav>
        <div className="auth-buttons">
          <button className="login">Log in</button>
          <button className="signup">Sign up</button>
        </div>
      </header>

      <main className="main">
        <h2>We connect people to bring projects to life</h2>
        <p>Find high-quality talent or open jobs with the help of AI tools that keep you in control.</p>

        <div className="search-box">
          <input type="text" placeholder="Ask AI anything..." />
          <FaSearch className="search-icon" />
        </div>
      </main>

      <footer className="footer">
        <p>Trusted by:</p>
        <span>Microsoft</span>
        <span>Airbnb</span>
        <span>Bissell</span>
      </footer>
    </div>
  );
};

export default Home;
