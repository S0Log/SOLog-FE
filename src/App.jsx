import React from "react";
import { RouterProvider } from 'react-router-dom'

import mainRouter from "./routers/main-router"

function App() {
    return (
      <>
        <RouterProvider router={mainRouter} future={{ v7_startTransition: true }}/>
      </>
    )
  }
  

export default App
