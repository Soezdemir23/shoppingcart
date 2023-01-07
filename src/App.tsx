import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import Product from "./Product";
import ShoppingPage from "./ShoppingPage";
import React, { SetStateAction, useEffect, useState } from "react";
import { consumerKey } from "./env";
import { EmbeddedClass, ShoppingCart, ValueClass } from "./eventsInterface";
import NotFound from "./NotFound";

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
      console.error(
        "Please make sure whether you have internet access or not" + error
      );
    }
  }

  const handleBuySubmission = (e: React.FormEvent<HTMLFormElement>) => {
    const select = e.currentTarget.elements.item(0) as HTMLSelectElement;
    const value = select.options[select.selectedIndex];
    console.log(value.value);
    if (value.value !== "check") {
      const product = shoppingCart.filter(
        (product) => product.id === e.currentTarget.dataset.id
      )[0];
      // product exists, truthy value, filter away the stuff and the n put
      if (product) {
        product.numOfReservedTickets = parseInt(value.value);
        setShoppingCart([
          ...shoppingCart.filter(
            (product) => product.id !== e.currentTarget.dataset.id
          ),
          product,
        ]);
        // product doesn't exist inside the shoppingCart array state
      } else {
        let newProduct = feed?.events.filter(
          (event) => event.id === e.currentTarget.dataset.id
        )[0];

        const name = newProduct?.name;
        const id = newProduct?.id;
        let maxTickets: number = 0;
        let cartImage = newProduct?.images.filter(
          (image) => image.width < 400
        )[0].url;
        if (newProduct?.ticketLimit !== undefined) {
          const regex = /\d+/;
          const matches = newProduct.ticketLimit.info?.match(regex);
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
          numOfReservedTickets: parseInt(value.value),
          maxReached: false,
          image: cartImage,
        };
        if (object.maxTickets === object.numOfReservedTickets)
          object.maxReached = true;
        setShoppingCart([...shoppingCart, object]);
      }
    }
    console.log(value, e.currentTarget.dataset.id);
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
      let cartImage = product?.images.filter((image) => image.width < 400)[0]
        .url;
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
        maxReached: false,
        image: cartImage,
      };
      setShoppingCart([...shoppingCart, object]);
    } else {
      // go through the products, check for the
      setShoppingCart(
        shoppingCart.map((prod) => {
          if (prod.id === product?.id) {
            if (prod.maxReached === false) {
              prod.numOfReservedTickets += 1;
            }
            if (prod.numOfReservedTickets === prod.maxTickets) {
              prod.maxReached = true;
            }
            return prod;
          }
          return prod;
        })
      );
    }

    // first of all, create properties made of: name of event, id and if available, max. Tickets, IF the
  };

  const OnIncrementClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setShoppingCart(
      shoppingCart.map((product) => {
        if (product.id === e.currentTarget.dataset.id) {
          console.log(product);
          if (product.maxReached === true) {
            console.log("Increment: maxReached");
            return product;
          } else if (product.maxTickets === product.numOfReservedTickets) {
            console.log("Increment: maxTickets");

            product.maxReached = true;
            return product;
          }
          product.numOfReservedTickets++;
        }
        return product;
      })
    );
  };

  const onDecrementClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setShoppingCart(
      shoppingCart.map((product) => {
        if (product.id === e.currentTarget.dataset.id) {
          console.log(product);
          if (product.maxReached === true) {
            console.log("product maxReached");
            product.maxReached = false;
            return product;
          }
          if (product.numOfReservedTickets === 1) {
            console.log("numberOfReserved");

            return product;
          }
          product.numOfReservedTickets--;
        }
        return product;
      })
    );
  };

  const onRemoveClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (e.currentTarget.textContent === "Remove") {
      setShoppingCart(
        shoppingCart.filter(
          (product) => product.id !== e.currentTarget.dataset.id
        )
      );
    } else {
      setShoppingCart([]);
    }
  };

  function handleResetClick(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    let button = e.target as HTMLButtonElement;
    let id = button.dataset.id;
    console.log("removing the number of tickets", id); // WHYYYYYY?!
    let resetProduct = shoppingCart.find((product) => product.id === id);
    if (resetProduct) {
      resetProduct.numOfReservedTickets = 0;
      resetProduct.maxReached = false;
      let array = [
        ...shoppingCart.filter((product) => product.id !== id),
        resetProduct,
      ];
      if (shoppingCart !== undefined)
        setShoppingCart(array as SetStateAction<ShoppingCart[]>);
    } else {
      console.log("doesn't exist");
    }
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFound />} />
        {/*Homepage, where the stuff is being presented*/}
        <Route
          path="/"
          element={
            <HomePage
              feed={feed}
              onClick={handleBuyClick}
              shoppingCart={shoppingCart}
              onIncrementClick={OnIncrementClick}
              onDecrementClick={onDecrementClick}
              onRemoveClick={onRemoveClick}
            />
          }
        />
        {/*Page for items. Try to make a switch out of it.*/}
        <Route
          path="/products/:id"
          element={
            <Product
              feed={feed}
              onSubmit={handleBuySubmission}
              shoppingCart={shoppingCart}
              onDecrementClick={onDecrementClick}
              onIncrementClick={OnIncrementClick}
              onRemoveClick={onRemoveClick}
              onHandleResetClick={handleResetClick}
            />
          }
        />
        {/*shopping thing */}
        <Route
          path="/shopping-cart"
          element={
            <ShoppingPage
              onIncrementClick={OnIncrementClick}
              onDecrementClick={onDecrementClick}
              shoppingCart={shoppingCart}
              onRemoveClick={onRemoveClick}
            />
          }
        />
        {/*Thank people for buying the stuff */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
