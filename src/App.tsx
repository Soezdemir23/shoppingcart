import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import Product from "./Product";
import ShoppingPage from "./ShoppingPage";
import React, { useEffect, useState } from "react";
import { consumerKey } from "./env";
import { EmbeddedClass, ShoppingCart, ValueClass } from "./eventsInterface";
import NotFound from "./NotFound";

function App() {
  const [feed, setFeed] = useState<EmbeddedClass | undefined>(undefined);
  const [shoppingCart, setShoppingCart] = useState<ShoppingCart[]>([]);
  // in some products the accessibility with property ticketLimit is undefined, so I set a fallback value
  const fallbackTicketLimit = 23;
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
        "https://app.ticketmaster.com/discovery/v2/events?apikey=" +
          consumerKey +
          "&keyword=baseball&locale=*",
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
  // need to fix this too due to api breaking changes
  const handleBuySubmission = (e: React.FormEvent<HTMLFormElement>) => {
    const select = e.currentTarget.elements.item(0) as HTMLSelectElement;
    const value = select.options[select.selectedIndex];
    if (value.value !== "select Tickets") {
      const product = shoppingCart.filter(
        (product) => product.id === e.currentTarget.dataset.id
      )[0];
      // product exists, truthy value, filter away the stuff and the n put
      if (product) {
        if (
          product.numOfReservedTickets + parseInt(value.value) >
          product.maxTickets!
        ) {
          product.maxReached = true;
          product.numOfReservedTickets = product.maxTickets!;
        } else {
          product.numOfReservedTickets += parseInt(value.value);
        }
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
        if (newProduct === undefined)
          throw new Error("newProduct is undefined");
        let cartImage = newProduct?.images.filter(
          (image) => image.width < 400
        )[0].url;

        let object: ShoppingCart = {
          name: newProduct.name,
          id: newProduct.id,
          maxTickets:
            newProduct.accessibility === undefined
              ? fallbackTicketLimit
              : newProduct.accessibility.ticketLimit,
          numOfReservedTickets: parseInt(value.value),
          maxReached: false,
          image: cartImage,
        };
        if (object.maxTickets === object.numOfReservedTickets)
          object.maxReached = true;
        setShoppingCart([...shoppingCart, object]);
      }
    }
  };

  // we buy one ticket by clicking here, then we need to create the first shoppingList object here or
  const handleBuyClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    let product = feed?.events.filter(
      (event) => event.id === e.currentTarget.dataset.key
    )[0];
    if (
      shoppingCart?.filter(
        (productInCart) => productInCart.id === product?.id
      )[0] === undefined
    ) {
      let cartImage = product?.images.sort(
        (a, b) => a.height - b.height && a.width - b.width
      )[product.images.length - 1].url;

      let object: ShoppingCart = {
        name: product!.name,
        id: product!.id,
        maxTickets:
          product?.accessibility === undefined
            ? fallbackTicketLimit
            : product?.accessibility.ticketLimit,
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
          if (product.maxReached === true) {
            return product;
          } else if (product.maxTickets === product.numOfReservedTickets) {
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
          if (product.maxReached === true) {
            product.maxReached = false;
            return product;
          }
          if (product.numOfReservedTickets === 1) {
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
    if (
      e.currentTarget.textContent === "Remove" ||
      e.currentTarget.title === "remove-shoppingpage"
    ) {
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
    setShoppingCart(shoppingCart.filter((product) => product.id !== id));
  }
  return (
    <BrowserRouter basename="/shoppingcart">
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
              fallbackTicketLimit={fallbackTicketLimit}
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
