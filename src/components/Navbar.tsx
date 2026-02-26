import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Copy, Check } from 'lucide-react';

const CONTRACT_ADDRESS = '8nymjUz6CM7Tpe948YhpYjr6wwizNnNkSFVH39Depump';
const TWITTER_URL = 'https://x.com/HappyMeter17669';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(CONTRACT_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const links = [
    { to: '/', label: 'Dashboard' },
    { to: '/rankings', label: 'Rankings' },
    { to: '/about', label: 'About' },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <NavLink to="/" className="navbar-logo">
          <img src="/favicon.jpg" alt="HappyMeter" className="logo-img" />
          <span>Happy<strong>Meter</strong></span>
        </NavLink>

        <ul className="navbar-links">
          {links.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="navbar-actions">
          <button className="nav-copy-ca" onClick={handleCopy} title={CONTRACT_ADDRESS}>
            {copied ? <Check size={13} /> : <Copy size={13} />}
            <span className="ca-label">CA</span>
            <span className="ca-address">{CONTRACT_ADDRESS.slice(0, 4)}…{CONTRACT_ADDRESS.slice(-4)}</span>
            <span className="ca-copied-text">{copied ? 'Copied!' : ''}</span>
          </button>

          <a
            href={TWITTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-twitter"
            aria-label="Twitter / X"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            <span>Twitter</span>
          </a>
        </div>

        <button className="nav-hamburger" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="navbar-mobile">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </NavLink>
          ))}
          <div className="navbar-mobile-actions">
            <button className="nav-copy-ca" onClick={handleCopy} title={CONTRACT_ADDRESS}>
              {copied ? <Check size={13} /> : <Copy size={13} />}
              <span className="ca-label">CA</span>
              <span className="ca-address">{CONTRACT_ADDRESS.slice(0, 4)}…{CONTRACT_ADDRESS.slice(-4)}</span>
              {copied && <span className="ca-copied-text">Copied!</span>}
            </button>
            <a
              href={TWITTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-twitter"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              Twitter
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
