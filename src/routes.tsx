import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Turmas from './pages/Turmas';

const routes = () => {
   return(
        <BrowserRouter>
        {/* <NavBar /> */}

        <Routes>
           <Route path="/"  element={<Turmas />} />
           <Route
              path="*"
              element={
              <main style={{ padding: "1rem" }}>
                 <p>Oops.. there's nothing here!</p>
              </main>
              }
           />
        </Routes>
        </BrowserRouter>
   )
}

export default routes;