import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AllProps, ShoppingCart } from "./eventsInterface";
import ShoppingCartMenu from "./ShoppingCartMenu";

import ShoppinCartImage from "./shopping_cart.svg";
/* the header is to be divided into two ways:
 * Big:
    Two header sections: 
    1. country and most used links
        a) Language ,Chat
        b) Newsletter Musicals Giftcards VIP Tickets Faq
    2. Ticketmaster main header
        a) Logo, Concerts, Sports, Culture, Free Events, etc.
        b) Searchbar and Profile
 * mobile: 
 *  Two header sections:
 *   1. Language and chat
 *   2. Menu button with the logo and a searchbar downunders
 * 
 * We are not going to follow it through, because we are only focusing on the shopping cart
 * So we will do the following:
 *  + keep up the ordering
 *  + Give it dummy links or remove some features.
 */
export default function Header(props: {
  shoppingCart: ShoppingCart[];
  onIncrementClick: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  onDecrementClick: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  onRemoveClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}) {
  const { shoppingCart, onIncrementClick, onDecrementClick, onRemoveClick } =
    props;

  const [drawer, setDrawer] = useState(false);
  const [hidePopUpMenu, setHidePopUpMenu] = useState(true);
  const drawerRef = useRef("hidden");
  const numberOfItemsRef = useRef(0);
  let sum = 0;
  shoppingCart.forEach((prod) => (sum += prod.numOfReservedTickets));
  numberOfItemsRef.current = sum;

  const drawerToggle = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setDrawer(!drawer);
  };
  //move the condition outside so it always tests for that thing.
  // Boom!
  if (drawer === false) {
    drawerRef.current = "hidden";
  } else {
    drawerRef.current = "";
  }

  const onOutsideClick = () => {};

  return (
    <header className="bg-blue-500 flex">
      {/*on click toggle the view of the drawer*/}
      <div className="flex content-evenly gap-14 md:gap-56 lg:gap-44">
        <button
          onClick={drawerToggle}
          className="h-10 bg-blue-700 px-3 text-white text-lg hover:bg-blue-200 hover:text-black md:h-12 md:w-12 lg:hidden "
        >
          |||
        </button>
        <h1 className="text-4xl font-sans text-gray-200 md:text-5xl lg:text-6xl xl:text-8xl xl:relative xl:left-[29rem] 2xl:left-[65rem]">
          Ticket<span className="text-gray-300">M</span>aster
        </h1>
        <nav className="hidden lg:block xl:hidden">
          <ul className="flex gap-5 relative top-3 ">
            <li className=" text-3xl text-white cursor-pointer active:text-orange-400">
              <Link to="/shoppingcart" onClick={drawerToggle}>
                Home
              </Link>
            </li>
            <li className="text-3xl text-white cursor-pointer active:text-orange-400">
              <Link to="/shoppingcart/products" onClick={drawerToggle}>
                Products
              </Link>
            </li>
            <li className="text-3xl text-white cursor-pointer active:text-orange-400">
              <Link to="/shoppingcart/shopping-cart" onClick={drawerToggle}>
                Shopping Cart
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      {/* unhide this after you manage to finish the header */}
      <nav
        className={
          "absolute z-10 h-full right-50 w-80 bg-white flex flex-col items-center justify-center align gap-4 " +
          drawerRef.current
        }
      >
        <span
          className="absolute hover:cursor-pointer text-4xl w-5 text-center inset-0 left-2"
          onClick={drawerToggle}
        >
          x
        </span>
        <h5 className="relative bottom-2 pt-5 px-14 border-b-2 border-black">
          Menu
        </h5>

        <ul className="relative bottom-2 flex flex-col items-center gap-10 pt-5">
          <li className="px-14 border-b-2 border-b-gray-400 cursor-pointer hover:border-b-blue-400">
            <Link to="/shoppingcart" onClick={drawerToggle}>
              Home
            </Link>
          </li>
          <li className="px-12 border-b-2 border-b-gray-400 cursor-pointer hover:border-b-blue-400">
            <Link to="/shoppingcart/products" onClick={drawerToggle}>
              Products
            </Link>
          </li>
          <li className="px-7 border-b-2 border-b-gray-400 cursor-pointer hover:border-b-blue-400">
            <Link to="/shoppingcart/shopping-cart" onClick={drawerToggle}>
              Shopping Cart
            </Link>
          </li>
        </ul>
      </nav>
      <span
        onClick={(e: React.MouseEvent<Element, MouseEvent>) => {
          setHidePopUpMenu(!hidePopUpMenu);
        }}
        className="fixed right-1 top-1 hover:cursor-pointer"
      >
        <img
          className="w-14 lg:w-20 "
          src={ShoppinCartImage}
          alt="shoppingcart"
        ></img>
        <span className="relative bottom-9 left-6 bg-red-600 text-white rounded-full px-1 md:bottom-12 md:left-12 lg:text-2xl lg:left-7">
          {numberOfItemsRef.current}
        </span>
      </span>
      <ShoppingCartMenu
        shoppingCart={shoppingCart}
        popUpDrawer={hidePopUpMenu}
        onIncrementClick={onIncrementClick}
        onDecrementClick={onDecrementClick}
        onRemoveClick={(e) => onRemoveClick(e)}
        onOutsideClick={onOutsideClick}
      />
    </header>
  );
}
