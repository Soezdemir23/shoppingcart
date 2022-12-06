import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
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
export default function Header() {
  const [drawer, setDrawer] = useState(false);
  const drawerRef = useRef("hidden");

  const drawerToggle = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setDrawer(!drawer);
  };
  //move the condition outside so it always tests for that thing.
  // Boom!
  if (drawer === false) {
    drawerRef.current= "hidden"
  } else {
    drawerRef.current = ""
  }
  
  return (
    <header className="bg-blue-500 flex">
      {/*on click toggle the view of the drawer*/}
      <div className="flex content-evenly gap-14">
        <button
          onClick={drawerToggle}
          className="h-10 bg-blue-700 px-3 text-white text-lg hover:bg-blue-200 hover:text-black"
        >
          |||
        </button>
        <h1 className="text-4xl font-sans text-gray-200">
          Ticket<span className="text-gray-300">M</span>aster
        </h1>
      </div>
      {/* unhide this after you manage to finish the header */}
      <nav className={"absolute z-10 right-50 w-80 bg-white flex flex-col items-center gap-4 " + drawerRef.current}>
        <span className="relative right-36 hover:cursor-pointer text-xl w-5 text-center" onClick={drawerToggle}>x</span>
        <h5 className="pt-5 px-14 border-b-2 border-black">Menu</h5>
        
        <ul  className="flex flex-col items-center gap-10 pt-5">
          <li  className="px-14 border-b-2 border-b-gray-400">
            <Link to="/" onClick={drawerToggle}>Home</Link>
          </li>
          <li className="px-12 border-b-2 border-b-gray-400">
            <Link to="/products" onClick={drawerToggle}>Products</Link>
          </li>
          <li className="px-7 border-b-2 border-b-gray-400">
            <Link to="/shopping-cart" onClick={drawerToggle}>Shopping Cart</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
