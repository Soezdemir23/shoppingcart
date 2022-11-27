import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { consumerKey } from "./env";
import { Event } from "./eventsInterface";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import Product from "./Product";
import ShoppingPage from "./ShoppingPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/*Homepage, where the stuff is being presented*/}
        <Route path="/" element={<HomePage />} />
        {/*Page for items. Try to make a switch out of it.*/}
        <Route path="/product" element={<Product />} />
        {/*shopping thing */}
        <Route path="/shoppingpage" element={<ShoppingPage />} />
        {/*Thank people for buying the stuff */}
      </Routes>
    </BrowserRouter>
  )
}

export default App;
