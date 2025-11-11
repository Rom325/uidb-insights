import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        <div
          style={{
            width: "100%",
            height: "100%",
            paddingTop: 6,
            paddingBottom: 6,
            justifyContent: "center",
            alignItems: "center",
            display: "inline-flex",
          }}
        >
          <div
            style={{
              color: "var(--Primary-web-unifi-color-ublue-06, #006FFF)",
              fontSize: 14,
              fontFamily: "UI Sans_v7",
              fontWeight: "400",
              lineHeight: 20,
              wordWrap: "break-word",
            }}
          >
            Click on the Vite and React logos to learn more
          </div>
        </div>
      </p>
    </>
  );
}

export default App;
