import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "./eventsInterface";
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
    <header className="bg-blue-500 fixed min-w-full min-h-min flex flex-col z-10">
      <div className="w-full flex">
        {/*on click toggle the view of the drawer*/}
        <div className="flex content-evenly min-h-min gap-14 md:hidden">
          <button
            className="min-h-full w-12 bg-blue-700 px-3 text-white text-lg hover:bg-blue-200 hover:text-black md:h-12 md:w-12 lg:hidden"
            onClick={drawerToggle}
          >
            |||
          </button>
        </div>
        <div className="grow flex justify-center items-center md:justify-between md:pl-3">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl lg:grow lg:text-center lg:ml-20 ">
            Ticket<span className="text-gray-300">M</span>aster
          </h1>
          <nav className="hidden md:block md:justify-center md:content-center xl:hidden">
            <ul className="flex gap-8 justify-center content-center">
              <li className=" text-3xl text-white cursor-pointer hover:text-orange-300 active:text-orange-400">
                <Link to="/" onClick={drawerToggle}>
                  Home
                </Link>
              </li>
              <li className="text-3xl text-white cursor-pointer hover:text-orange-300 active:text-orange-400">
                <Link to="/shopping-cart" onClick={drawerToggle}>
                  Shopping Cart
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        {/* unhide this after you manage to finish the header */}
        <nav
          className={
            "absolute z-20 h-screen w-screen bg-white flex flex-col items-center justify-center align gap-4 " +
            drawerRef.current
          }
        >
          <span
            className="absolute hover:cursor-pointer text-4xl w-5 text-center inset-0 left-2"
            onClick={drawerToggle}
          >
            x
          </span>
          <h5 className="relative bottom-2 pt-5 px-14 border-b-2 border-black text-2xl font-bold">
            Menu
          </h5>

          <ul className="relative bottom-2 flex flex-col items-center gap-10 pt-5">
            <li className="px-14 border-b-2 border-b-gray-400 cursor-pointer hover:border-b-blue-400 text-2xl">
              <Link to="/" onClick={drawerToggle}>
                Home
              </Link>
            </li>
            <li className="px-7 border-b-2 border-b-gray-400 cursor-pointer hover:border-b-blue-400 text-2xl">
              <Link to="/shopping-cart" onClick={drawerToggle}>
                Shopping Cart
              </Link>
            </li>
          </ul>
        </nav>
        <div className="pr-2 flex content-center justify-center md:px-8">
          <span
            onClick={(e: React.MouseEvent<Element, MouseEvent>) => {
              setHidePopUpMenu(!hidePopUpMenu);
            }}
            className="hover:cursor-pointer flex justify-center content-center"
          >
            <img
              className="w-14 lg:w-20 "
              src={ShoppinCartImage}
              alt="shoppingcart"
            ></img>
            <span className=" bg-red-700 px-2  text-white rounded-full absolute flex justify-center content-center top-1/4 lg:text-2xl lg:px-2">
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
        </div>
      </div>
      <div className="hidden justify-center content-center xl:flex ">
        <nav className="">
          <ul className="flex gap-8 justify-center content-center">
            <li className=" text-3xl text-white cursor-pointer hover:text-orange-300 active:text-orange-400">
              <Link to="/" onClick={drawerToggle}>
                Home
              </Link>
            </li>
            <li className="text-3xl text-white cursor-pointer hover:text-orange-300 active:text-orange-400">
              <Link to="/shopping-cart" onClick={drawerToggle}>
                Shopping Cart
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
