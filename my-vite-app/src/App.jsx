import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import CustomerRewards from "./components/customerRewards";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <h1>Retailer Rewards Program</h1>
        <CustomerRewards />
      </div>
    </>
  );
}

export default App;
