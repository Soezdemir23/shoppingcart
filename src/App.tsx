import "./App.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import Product from "./Product";
import ShoppingPage from "./ShoppingPage";
import React, { useEffect, useState } from "react";
import { consumerKey } from "./env";
import { EmbeddedClass, ValueClass} from "./eventsInterface";

function App() {
  const [feed, setFeed] = useState<EmbeddedClass | undefined>(undefined);
  const [shoppingCart, setShoppingCart] = useState(null);

  // I SWEAR last time I made a better looking async await utilization.
  // Insane
  useEffect(() => {
    fetchFeed().then((events) => {
      const res: EmbeddedClass | undefined = events;
      setFeed(res);
    });
  }, []);

  async function fetchFeed() {
    try {
      const response = await fetch(
        "https://app.ticketmaster.com/discovery/v2/events.json?apikey=" +
          consumerKey,
        { mode: "cors" }
      );
      const data: Promise<ValueClass> = await response.json();
      return (await data)._embedded;
    } catch (error) {
      console.error("API call unsuccesful or another error: " + error);
    }
  }

  const handleBuySubmission = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    const form = e.target as HTMLFormElement;
    const select = form.elements.namedItem("selection") as HTMLSelectElement;
    console.log(typeof(select.value));
    
    
      };

  // we buy
  const handleBuyClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log(e.currentTarget.dataset.key)
  }
  return (
    <BrowserRouter>
      <Routes>
        {/*Homepage, where the stuff is being presented*/}
        <Route path="/" element={<HomePage feed={feed} onClick={handleBuyClick}/>} />
        {/*Page for items. Try to make a switch out of it.*/}
        <Route
          path="/products/:id"
          element={<Product feed={feed} onSubmit={handleBuySubmission} />}
        />
        {/*shopping thing */}
        <Route
          path="/shopping-cart"
          element={<ShoppingPage onClick={handleBuyClick} />}
        />
        {/*Thank people for buying the stuff */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
