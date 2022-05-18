import StarShip from "../Components/StarShip";
import Space from "../Components/Space";

import style from "./App.module.sass";

function App() {
  return (
    <>
      <Space color='black'>
        <StarShip />
      </Space>
    </>
  );
}

export default App;
