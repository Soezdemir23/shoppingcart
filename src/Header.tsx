import { useState } from "react";
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
  const [drawer, setDrawer] = useState(false)
  let drawerClasses = "";
  const drawerToggle = () => {
    setDrawer(!drawer)

  }
  return (
    <header className="bg-blue-500 flex">
      {/*on click toggle the view of the drawer*/}
      <button onClick={drawerToggle} className="bg-blue-700 px-2 text-white text-lg hover:bg-blue-200 hover:text-black">
        |||
      </button>
      <h1 className="text-7xl font-jelee">TicketMaster</h1>
      <nav className={"relative"}>
        <h5>Menu</h5>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>
            <Link to="/shopping-cart">Shopping Cart</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
