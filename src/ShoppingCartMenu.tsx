import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "./eventsInterface";
//huh, so prop typing can go like this too
export default function ShoppingCartMenu(props: {
  shoppingCart: ShoppingCart[];
  popUpDrawer: boolean;
  onIncrementClick: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  onDecrementClick: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  onRemoveClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onOutsideClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}) {
  const {
    shoppingCart,
    popUpDrawer,
    onIncrementClick,
    onDecrementClick,
    onRemoveClick,
  } = props;
  const menuRef = useRef<HTMLDivElement>(null);

  const incrementClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    onIncrementClick(e);
  };

  const decrementClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    onDecrementClick(e);
  };
  return (
    <div
      id="popupmenu"
      ref={menuRef}
      className={
        (popUpDrawer === true ? "hidden" : "") +
        " max-h-[35rem] bg-white p-1 rounded-lg top-14 right-1 z-10 fixed scroll overflow-auto border-2 md:top-20 lg:w-[30rem]"
      }
    >
      <span
        className={
          (shoppingCart.length > 0 ? "left-[20rem] " : "left-[20rem] ") +
          " z-10 h-4 w-4 block top-[3rem] border-l-2 border-t-2 fixed rotate-45 bg-white sm:left-[45.5rem] md:w-8 md:h-8 md:left-[60.5rem] md:top-16  lg:left-[86rem]"
        }
      >
        {" "}
      </span>
      <h4 className="text-center lg:text-3xl">ShoppingCart:</h4>

      <div title="children" className="px-2 pb-2 border-b-4 ">
        {shoppingCart.length > 0 ? (
          shoppingCart.map((product) => (
            <div key={product.id} title="child" data-id={product.id}>
              <h5 title="Title" className="lg:text-2xl">
                {product.name}
              </h5>
              <img
                className="w-20 lg:w-40"
                src={product.image}
                alt="Event"
                title="Event Picture"
              ></img>
              <input
                className="lg:relative lg:left-52 lg:bottom-28 "
                title="Input Numbers"
                type={"number"}
                min={1}
                max={product.maxTickets}
                value={product.numOfReservedTickets}
                placeholder="Enter the number of products"
              />
              <div className="lg:relative lg:left-52 lg:bottom-20">
                <button
                  data-id={product.id}
                  onClick={(e) => incrementClick(e)}
                  className="bg-slate-500 text-white px-4 rounded-l-xl active:bg-slate-300 active:text-black hover:bg-emerald-400"
                >
                  +
                </button>
                <button
                  data-id={product.id}
                  onClick={(e) => decrementClick(e)}
                  className="bg-slate-500 text-white px-4 rounded-r-xl active:bg-slate-300 active:text-black hover:bg-rose-400"
                >
                  -
                </button>
              </div>
              <button
                data-id={product.id}
                onClick={(e) => onRemoveClick(e)}
                className="relative right-1 m-1 px-1 rounded-xl bg-red-500 "
              >
                Remove
              </button>
            </div>
          ))
        ) : (
          <p>Your shopping cart is empty</p>
        )}
      </div>

      <div className="flex justify-center">
        <Link to={"/shopping-cart"}>
          <button
            className="px-2 bg-blue-600 text-white rounded-l-full hover:bg-green-600"
            title="Checkout"
          >
            Checkout
          </button>
        </Link>
        <button
          onClick={onRemoveClick}
          className="px-2 bg-blue-600 text-white rounded-r-full hover:bg-red-600"
          title="Empty Cart"
        >
          Empty Cart
        </button>
      </div>
    </div>
  );
}
