import React from "react";
import { ShoppingCart } from "../eventsInterface";
import Footer from "../Footer";
import Header from "../Header";
import removeimage from "../delete.svg";

export default function ShoppingPage(props: {
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
    
  return (
    <>
      <Header
        shoppingCart={shoppingCart}
        onIncrementClick={onIncrementClick}
        onDecrementClick={onDecrementClick}
        onRemoveClick={(e) => onRemoveClick(e)}
      />
      <h1 className="text-center">Overview of reserved products</h1>
      <section className="flex items-center justify-center">
        {shoppingCart.length > 0 ? (
          shoppingCart.map((product) => (
            <div key={product.id} data-id={product.id}>
              <div>
                <img src={product.image} alt="product"></img>
                <p>{product.name}</p>
              </div>
              <div>
                <input
                title="Input Numbers"
                  type="number"
                  className="focus:outline-0"
                  min={1}
                  max={product.maxTickets}
                />
                <button className="bg-slate-200 px-2 border-2 border-gray-100 rounded-xl">
                  +
                </button>
                <button className="bg-slate-200 px-2 border-2 border-gray-100 rounded-xl">
                  -
                </button>
                <button className="bg-slate-200 px-2 border-2 border-gray-100 rounded-xl relative top-1">
                  <img
                    className="h-5 filter"
                    src={removeimage}
                    alt="remove product"
                  />
                </button>
              </div>
            </div>
          ))
        ) : (
          <h4>Your shopping Cart is empty</h4>
        )}
      </section>
      <Footer />
    </>
  );
}
