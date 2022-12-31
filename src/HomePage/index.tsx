import { Link } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";
import { AllProps, EmbeddedClass, ShoppingCart } from "../eventsInterface";
export default function HomePage(
  props: {
    feed: EmbeddedClass | undefined;
    onClick: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void);
    shoppingCart: ShoppingCart[],
    onIncrementClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    onDecrementClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  }
  ) {
    const{feed,onClick,onDecrementClick,onIncrementClick,shoppingCart} = props

  const handleBuyClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>)  => {

    onClick!(e);
  }
  return (
    <div className="flex flex-col">
      <Header  shoppingCart={shoppingCart} onIncrementClick={onIncrementClick} onDecrementClick={onDecrementClick} />
      <main>
        <h3 className="bg-emerald-500 text-center pt-5 text-2xl text-rose-900">
          Currently available events
        </h3>
        <section className="flex flex-col gap-4">
          {feed?.events.map((event) => (
            <article
              className="py-3 px-3 flex flex-col justify-center content-center border-2"
              key={event.id}
            >
              {/* title card */}
              <div className="flex flex-col justify-center content-center">
                <h6 className="text-center">{event.name}</h6>
                <img
                  className="center"
                  src={event.images.filter(img => img.width === 2048 && img.ratio === "16_9")[0].url }
                  alt="event"
                ></img>
              </div>
              <div className="flex justify-between">
                {/* 
                if the shoppingCart id or content is undefined, or returns nothing, then 
                    
                */}
                {shoppingCart.find((object) => object.id === event.id) === undefined || false?
                <button data-key={event.id} onClick={handleBuyClick} className="px-2 py-1 bg-blue-600 text-white rounded-md active:bg-blue-200 active:text-black">
                  Buy 1 ticket immediately
                </button>
                : 
                shoppingCart.find((object) => object.id === event.id)?.maxReached === true ?
                <button data-key={event.id} onClick={handleBuyClick} className="px-2 py-1 bg-red-600 text-white rounded-md active:bg-red-500 active:text-black animate-bounce">
                  Max. Ticket reached
                </button>
                  :<button data-key={event.id} onClick={handleBuyClick} className="px-2 py-1 bg-blue-600 text-white rounded-md active:bg-blue-200 active:text-black">
                  Buy 1 ticket immediately
                </button>
                }
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
