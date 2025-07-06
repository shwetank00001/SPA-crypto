import Homepage from "./Components/Homepage"
import CryptoConverter from "./Components/CryptoConverter";
import { Routes, Route, Link } from "react-router";
import SingleDetail from "./Components/SingleDetail";
import AllCryptos from "./Components/AllCryptos";
import { Button } from "@/Components/ui/button"
import { ErrorBoundary, useErrorBoundary } from 'react-error-boundary'

import React, {Suspense} from 'react'

const LazyHomepage = React.lazy(() => import('./Components/Homepage'))
const LazyAllCryptos = React.lazy(() => import('./Components/AllCryptos'));

import { ShimmerTable } from "react-shimmer-effects";


function App() {

  function ShowError({error}){
    const {resetBoundary} = useErrorBoundary();

    return (
      <div className='p-10'>
        <h1 className='text-4xl text-red-500 mt-10 mb-10'>Something Went Wrong!!!!</h1>
        <p className='mt-10 mb-10'>The detailed error:- {error.message}</p>
        <Button><Link to={'/'}>Go back to the homepage</Link></Button>
      </div>
    )
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Suspense fallback={<h1>Please wait while we fetch you your data</h1>}><LazyHomepage /></Suspense>} />
        <Route path="/coin/:name" element={<ErrorBoundary fallbackRender={ShowError}><SingleDetail /></ErrorBoundary>} />
        <Route path="/crytoconverter" element={<CryptoConverter />} />
        <Route path="/all" element={<Suspense fallback={<ShimmerTable row={10} col={1} /> }><LazyAllCryptos /></Suspense>} />
      </Routes>
    </>
  )
}

export default App
