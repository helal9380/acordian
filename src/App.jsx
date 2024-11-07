/** @format */

import { useState } from "react";
import "./App.css";
import Acordian from "./components/Acordian";

function App() {
  const [active, setActive] = useState(0);

  return (
    <>
      <Acordian
        title={"Paid Course"}
        isActive={active === 0}
        onActive={() => setActive(0)}
        description={
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum eius nesciunt libero necessitatibus velit quidem architecto hic illum et explicabo facere nihil repudiandae magni nam sit amet natus, repellat pariatur?"
        }
      />
      <Acordian
        title={"Free Course"}
        isActive={active === 1}
        onActive={() => setActive(1)}
        description={
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum eius nesciunt libero necessitatibus"
        }
      />
    </>
  );
}

export default App;
