import Homepage from "./Components/Homepage"
import CryptoConverter from "./Components/CryptoConverter";
import { Routes, Route } from "react-router";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/crytoconverter" element={<CryptoConverter />} />
      </Routes>
    </>
  )
}

export default App
