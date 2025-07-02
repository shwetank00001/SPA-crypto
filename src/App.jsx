import Homepage from "./Components/Homepage"
import CryptoConverter from "./Components/CryptoConverter";
import { Routes, Route } from "react-router";
import SingleDetail from "./Components/SingleDetail";

import React, {Suspense} from 'react'

const LazyHomepage = React.lazy(() => import('./Components/Homepage'))

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Suspense fallback={<h1>Please wait while we fetch you your data</h1>}><LazyHomepage /></Suspense>} />
        <Route path="/coin/:name" element={<SingleDetail />} />
        <Route path="/crytoconverter" element={<CryptoConverter />} />
      </Routes>
    </>
  )
}

export default App
