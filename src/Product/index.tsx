import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { EmbeddedClass, Event, ShoppingCart } from "../eventsInterface";
import Footer from "../Footer";
import Header from "../Header";
import SelectTickets from "./SelectTickets";
// most props need to be passed higher. get lifted higher than it is atm.
// why?
// shoppingCart needs to be handled at the App.tsx level, then sent down to the rest of the products pages. Otherwise it just doesn't work.
// so first let's go through the code and see what doesn't work or is confusing.
export default function Product(props: {
  fallbackTicketLimit: number;
  shoppingCart: ShoppingCart[];
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  feed: EmbeddedClass | undefined;
  onIncrementClick: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  onDecrementClick: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  onRemoveClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onHandleResetClick: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
}) {
  const {
    fallbackTicketLimit,
    shoppingCart,
    onSubmit,
    feed,
    onIncrementClick,
    onDecrementClick,
    onRemoveClick,
    onHandleResetClick,
  } = props;
  // so basically, when the user clicks at the product page, due to the empty shoppingCart array, the page breaks.
  // While the shoppingCart is empty, the product page should be rendered with the product's necessary information.
  const { id } = useParams();
  const [product, setProduct] = useState<Event | undefined>(undefined);
  // we should lift changes for this back up to the app.tsx
  const cartProduct = shoppingCart.find((prod) => prod.id === id);

  const maxTickets: number =
    product?.accessibility === undefined
      ? 99
      : product.accessibility.ticketLimit;

  const maximumTicketRef = useRef(0);
  // needs to be put higher compoent
  const [currentTickets, setCurrentTickets] = useState(0);
  // with the product we can
  useEffect(() => {
    if (maxTickets !== undefined) {
      setCurrentTickets(maximumTicketRef.current);
    }

    if (product === undefined) {
      const product = feed?.events.find((event) => event.id === id);
      setProduct(product);
    }
  }, [maxTickets, product, feed, id]);

  let teamOnePic = product?._embedded.attractions[0].images.filter(
    (img) => img.width === 2048 && img.ratio === "16_9"
  )[0].url;
  let teamTwoPic = product?._embedded.attractions[1].images.filter(
    (img) => img.width === 2048 && img.ratio === "16_9"
  )[0].url;

  function handleResetClick(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    onHandleResetClick(e);
  }

  return (
    <>
      <Header
        shoppingCart={shoppingCart}
        onIncrementClick={onIncrementClick}
        onDecrementClick={onDecrementClick}
        onRemoveClick={onRemoveClick}
      />
      <section className="pb-2 pt-14  lg:pt-20 xl:pt-28 ">
        <article>
          <h3 className="text-center">{product?.name}</h3>
          <div className="flex flex-col items-center gap-4">
            <img
              src={teamOnePic}
              alt={"This is team: " + product?._embedded.attractions[0].name}
            ></img>
            <div className="bg-rose-300 px-1 text-justify">
              <span className="text-center relative">vs</span>
            </div>
            <img
              src={teamTwoPic}
              alt={"This is team: " + product?._embedded.attractions[1].name}
            ></img>
          </div>
        </article>
        <article className="flex flex-col items-center">
          <h3 className="text-xl font-extrabold">
            {" "}
            {product?._embedded.venues[0].name}
          </h3>
          <p className="text-center">
            inside {product?._embedded.venues[0].name} the match is between the{" "}
            {product?._embedded.attractions[0].name} and the{" "}
            {product?._embedded.attractions[1].name}.
          </p>
          <h4>Overview of socials:</h4>
          <table className="auto">
            <thead>
              <tr className="border">
                <th className="bg-orange-400 px-2 py-0">
                  {product?._embedded.attractions[0].name}
                </th>
                <th className="bg-emerald-400 px-2 py-0">
                  {product?._embedded.attractions[1].name}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border">
                <td className="bg-orange-300 px-2 py-0">
                  <a
                    href={
                      product?._embedded.attractions[0].externalLinks
                        .homepage[0].url
                    }
                    target={"_blank"}
                    rel="noreferrer"
                  >
                    Homepage for {product?._embedded.attractions[0].name}
                  </a>
                </td>
                <td className="bg-emerald-300 px-2 py-0">
                  <a
                    href={
                      product?._embedded.attractions[1].externalLinks
                        .homepage[0].url
                    }
                    target={"_blank"}
                    rel="noreferrer"
                  >
                    Homepage for {product?._embedded.attractions[1].name}
                  </a>
                </td>
              </tr>
              <tr className="border">
                <td className="bg-orange-300 px-2 py-0">
                  <a
                    href={
                      product?._embedded.attractions[0].externalLinks
                        .facebook[0].url
                    }
                    target={"_blank"}
                    rel="noreferrer"
                  >
                    Facebook page for {product?._embedded.attractions[0].name}
                  </a>
                </td>
                <td className="bg-emerald-300 px-2 py-0">
                  <a
                    href={
                      product?._embedded.attractions[1].externalLinks
                        .facebook[0].url
                    }
                    target={"_blank"}
                    rel="noreferrer"
                  >
                    Facebook page for {product?._embedded.attractions[1].name}
                  </a>
                </td>
              </tr>
              <tr className="border">
                <td className="bg-orange-300 px-2 py-0">
                  <a
                    href={
                      product?._embedded.attractions[0].externalLinks.twitter[0]
                        .url
                    }
                    target={"_blank"}
                    rel="noreferrer"
                  >
                    Twitter for {product?._embedded.attractions[0].name}
                  </a>
                </td>
                <td className="bg-emerald-300 px-2 py-0">
                  <a
                    href={
                      product?._embedded.attractions[1].externalLinks.twitter[0]
                        .url
                    }
                    target={"_blank"}
                    rel="noreferrer"
                  >
                    Twitter for {product?._embedded.attractions[1].name}
                  </a>
                </td>
              </tr>
              <tr className="border">
                <td className="bg-orange-300 px-2 py-0">
                  <a
                    href={
                      product?._embedded.attractions[0].externalLinks
                        .instagram[0].url
                    }
                    target={"_blank"}
                    rel="noreferrer"
                  >
                    Instagram for {product?._embedded.attractions[0].name}
                  </a>
                </td>
                <td className="bg-emerald-300 px-2 py-0">
                  <a
                    href={
                      product?._embedded.attractions[1].externalLinks
                        .instagram[0].url
                    }
                    target={"_blank"}
                    rel="noreferrer"
                  >
                    Instagram for {product?._embedded.attractions[1].name}
                  </a>
                </td>
              </tr>
              <tr>
                <td className="bg-orange-300 px-2 py-0">
                  <a
                    href={
                      product?._embedded.attractions[0].externalLinks.wiki[0]
                        .url
                    }
                    target={"_blank"}
                    rel="noreferrer"
                  >
                    Wikipedia article for{" "}
                    {product?._embedded.attractions[0].name}
                  </a>
                </td>
                <td className="bg-emerald-300 px-2 py-0">
                  <a
                    href={
                      product?._embedded.attractions[1].externalLinks.wiki[0]
                        .url
                    }
                    target={"_blank"}
                    rel="noreferrer"
                  >
                    Wikipedia article for{" "}
                    {product?._embedded.attractions[1].name}
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </article>
        <article className="pt-4 flex flex-col items-center">
          {product?._embedded.venues[0].images === undefined ? (
            <p>currently we do not have a logo for the venue</p>
          ) : (
            <a
              className="cursor-pointer"
              href={product?._embedded.venues[0].url}
              target={"_blank"}
              rel="noreferrer"
            >
              <img
                src={product?._embedded.venues[0].images[0].url}
                alt="Stadium"
              ></img>
            </a>
          )}
        </article>
        <article className="pt-4 flex flex-col items-center">
          <h4 className="font-extrabold text-xl">Address</h4>
          <p>name: {product?._embedded.venues[0].name}</p>
          <p>Street: {product?._embedded.venues[0].address.line1}</p>
          <p>
            City and State : {product?._embedded.venues[0].city.name},{" "}
            {product?._embedded.venues[0].state.name}
          </p>
          <p>
            Please be <span className="text-red-600 underline">aware</span>: You
            may only buy max.{" "}
            <span>
              {/* when the cartProduct is not empty, show me the absolue value of  numOfResevedTickets - maxTickets or something. 
              Then check product being undefined, if it is, use ticketFallback, then the shoppingCart object is populated and pushed to the */}
              {cartProduct !== undefined
                ? Math.abs(
                    cartProduct.numOfReservedTickets - cartProduct.maxTickets
                  )
                : product?.accessibility === undefined
                ? fallbackTicketLimit
                : product?.accessibility.ticketLimit}
            </span>
            . Numbers of tickets change based on supply and demand.
          </p>
          <form
            className="flex gap-5"
            data-id={product?.id}
            onSubmit={(e) => {
              e.preventDefault();
              const select = e.currentTarget.elements.item(
                0
              ) as HTMLSelectElement;
              const option = select.options[select.selectedIndex];
              setCurrentTickets(currentTickets - parseInt(option.value));
              onSubmit!(e);
            }}
          >
            <select name="tickets" id="selection">
              <SelectTickets
                cartProduct={cartProduct}
                product={product}
                fallbackTicketLimit={fallbackTicketLimit}
              />
            </select>
            <button
              type={"submit"}
              className="bg-blue-600 text-white px-3 rounded-md active:bg-blue-300 active:text-black"
            >
              Buy
            </button>
            <button
              className="bg-blue-600 text-white px-3 rounded-md active:bg-blue-300 active:text-black"
              data-id={product?.id}
              onClick={(e) => {
                e.preventDefault();
                setTimeout(() => {
                  handleResetClick(e);
                }, 1000);
              }}
            >
              Clear Selection
            </button>
          </form>
        </article>
      </section>
      <Footer />
    </>
  );
}
