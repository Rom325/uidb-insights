import { Outlet } from "react-router-dom";
import Logo from "./Logo";
import "./App.css";

function App() {
  return (
    <main className="layout">
      <div className="top-bar">
        <div className="top-bar__left">
          <a
            href="https://ui.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="visit Ubiquiti"
            className="logo-link"
          >
            <Logo />
          </a>
          <span className="top-bar__text">Devices</span>
        </div>
        <div className="tob-bar__right">
          <span className="top-bar__text">Author/Developer Name</span>
        </div>
      </div>
      <div className="content">
        <Outlet />
      </div>
    </main>
  );
}

export default App;
