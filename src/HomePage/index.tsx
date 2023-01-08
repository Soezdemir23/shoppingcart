import { Link } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";
import { EmbeddedClass, ShoppingCart } from "../eventsInterface";
export default function HomePage(props: {
  feed: EmbeddedClass | undefined;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  shoppingCart: ShoppingCart[];
  onIncrementClick: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  onDecrementClick: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  onRemoveClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}) {
  const {
    feed,
    onClick,
    onDecrementClick,
    onIncrementClick,
    shoppingCart,
    onRemoveClick,
  } = props;

  const handleBuyClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    onClick!(e);
  };
  return (
    <div className="flex flex-col">
      <Header
        shoppingCart={shoppingCart}
        onIncrementClick={onIncrementClick}
        onDecrementClick={onDecrementClick}
        onRemoveClick={(e) => onRemoveClick(e)}
      />
      <main className="pb-20">
        <nav className="hidden xl:py-4 xl:bg-blue-600 xl:flex xl:justify-center">
          <ul className="flex gap-5 relative top-3">
            <li className=" text-5xl text-white cursor-pointer active:text-orange-400">
              <Link to="/">Home</Link>
            </li>
            {/*<li className="text-5xl text-white cursor-pointer active:text-orange-400">
              <Link to="/products">Products</Link>
  </li>*/}
            <li className="text-5xl text-white cursor-pointer active:text-orange-400">
              <Link to="/shopping-cart">Shopping Cart</Link>
            </li>
          </ul>
        </nav>
        <section className="flex flex-col gap-4 xl:grid xl:grid-cols-2">
          {feed?.events.map((event) => (
            <article
              className="py-3 px-3 flex flex-col justify-center content-center border-2 "
              key={event.id}
            >
              {/* title card */}
              <div className="flex flex-col justify-center content-center">
                <h6 className="text-center">{event.name}</h6>
                <img
                  className="center"
                  src={
                    event.images.filter(
                      (img) => img.width === 2048 && img.ratio === "16_9"
                    )[0].url
                  }
                  alt="event"
                ></img>
              </div>
              <div className="flex justify-between">
                {/* 
                if the shoppingCart id or content is undefined, or returns nothing, then 
                    
                */}
                {shoppingCart.find((object) => object.id === event.id) ===
                  undefined || false ? (
                  <button
                    data-key={event.id}
                    onClick={handleBuyClick}
                    className="px-2 py-1 bg-blue-600 text-white rounded-md active:bg-blue-200 active:text-black"
                  >
                    Buy 1 ticket immediately
                  </button>
                ) : shoppingCart.find((object) => object.id === event.id)
                    ?.maxReached === true ? (
                  <button
                    data-key={event.id}
                    onClick={handleBuyClick}
                    className="px-2 py-1 bg-red-600 text-white rounded-md active:bg-red-500 active:text-black animate-bounce"
                  >
                    Max. Ticket reached
                  </button>
                ) : (
                  <button
                    data-key={event.id}
                    onClick={handleBuyClick}
                    className="px-2 py-1 bg-blue-600 text-white rounded-md active:bg-blue-200 active:text-black"
                  >
                    Buy 1 ticket immediately
                  </button>
                )}
                <Link to={`/products/${event.id}`}>
                  <button className="px-2 py-1 bg-blue-600 text-white rounded-md">
                    Details
                  </button>
                </Link>
              </div>
            </article>
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
}
