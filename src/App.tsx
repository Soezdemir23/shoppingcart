import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import Product from "./Product";
import ShoppingPage from "./ShoppingPage";
import React, { useEffect, useState } from "react";
import { consumerKey } from "./env";
import { EmbeddedClass, ShoppingCart, ValueClass } from "./eventsInterface";

function App() {
  const [feed, setFeed] = useState<EmbeddedClass | undefined>(undefined);
  const [shoppingCart, setShoppingCart] = useState<ShoppingCart[]>([]);

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

  const handleBuySubmission = (e: React.FormEvent<HTMLFormElement>) => {
    const form = e.target as HTMLFormElement;
    const select = form.elements.namedItem("selection") as HTMLSelectElement;
    console.log(typeof select.value);
  };

  // we buy one ticket by clicking here, then we need to create the first shoppingList object here or
  const handleBuyClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
   
    let product = feed?.events.filter(
      (event) => event.id === e.currentTarget.dataset.key
    )[0];
    // does that product already exist in the state shoppingCart?
    // if it does, then check if the number of tickets is inequal to the currently reserved tickets
    //  if it is equal, then the buy one button needs to be shaking and be red, "Max. Tickets reached".
    //  if not, then increment the currentTickets property by one each time the user clicks
    // if not, create a new object that has
    //  name of the event
    //  id of the event
    //  max Tickets or 99 Tickets as max Tickets
    //  currentTickets at 1
    // set the update into the shoppingcart state array

    // new entry
    if (
      shoppingCart?.filter(
        (productInCart) => productInCart.id === product?.id
      )[0] === undefined
    ) {
      const name = product?.name;
      const id = product?.id;
      let maxTickets: number = 0;
      if (product?.ticketLimit !== undefined) {
        const regex = /\d+/;
        const matches = product.ticketLimit.info?.match(regex);
        let result = "";
        matches?.forEach((res) => (result += res));
        maxTickets = parseInt(result);
      } else {
        maxTickets = 99;
      }
      let object: ShoppingCart = {
        name: name,
        id: id,
        maxTickets: maxTickets,
        numOfReservedTickets: 1,
        maxReached: false
      };
      setShoppingCart([...shoppingCart, object])
    } else {
      // go through the products, check for the 
      setShoppingCart(shoppingCart.map((prod) => {
       if(prod.id === product?.id) {

        if (prod.maxReached === false) {
          prod.numOfReservedTickets +=1;
        }
        if (prod.numOfReservedTickets === prod.maxTickets) {
          prod.maxReached = true;
        }
        return prod;
       }
       return prod;
      }))
    }
    // first of all, create properties made of: name of event, id and if available, max. Tickets, IF the
  };

  return (
    <BrowserRouter>
      <Routes>
        {/*Homepage, where the stuff is being presented*/}
        <Route
          path="/"
          element={<HomePage feed={feed} onClick={handleBuyClick} />}
        />
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
