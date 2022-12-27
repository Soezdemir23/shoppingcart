import { ShoppingCart } from "./eventsInterface";
//huh, so prop typing can go like this too
export default function ShoppingCartMenu(props: {
  shoppingCart: ShoppingCart[];
  popUpDrawer: boolean;
}) {
  const { shoppingCart, popUpDrawer } = props;

  return (
    <div
      className={
        (popUpDrawer === true ? "hidden" : "") +
        " bg-white absolute p-1 rounded-lg top-14 right-1 z-10 "
      }
    >
      <span className={ (shoppingCart.length > 0 ? "left-[14.5rem] ": "left-36 ")+ "h-4 w-4 block relative bottom-3 rotate-45 bg-white"}>
        {" "}
      </span>
      <h4 className="text-center">ShoppingCart:</h4>
      
      <div title="children" className="px-2 pb-2 border-b-4 border-b-blue-600">
      {shoppingCart.map((product) =>(
      <div key={product.id}title="child">
        <h5 title="Title">{product.name}</h5>
        <img className="w-20" src={product.image}alt="Event" title="Event Picture"></img>
        <input
          title="Input Text"
          type={"number"}
          min={1}
          max={product.maxTickets}
          value={product.numOfReservedTickets}
          placeholder="Enter the number of products"
        />
        <div>
          <button onClick={product.numOfReservedTickets++} className="bg-slate-500 text-white px-4 rounded-l-xl active:bg-slate-300 active:text-black hover:bg-emerald-400">
            +
          </button>
          <button className="bg-slate-500 text-white px-4 rounded-r-xl active:bg-slate-300 active:text-black hover:bg-rose-400">
            -
          </button>
        </div>
        <button className="relative right-1 m-1 px-1 rounded-xl bg-red-500 ">
          Remove
        </button>
      </div>
    
    ))
  }
    </div>
    
      <div className="flex justify-center">
        <button
          className="px-2 bg-blue-600 text-white rounded-l-full hover:bg-green-600"
          title="Checkout"
        >
          Checkout
        </button>
        <button
          className="px-2 bg-blue-600 text-white rounded-r-full hover:bg-red-600"
          title="Empty Cart"
        >
          Empty Cart
        </button>
      </div>
    </div>
  );
}
