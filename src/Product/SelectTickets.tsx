import { ReactNode } from "react";
import { Event, ShoppingCart } from "../eventsInterface";
// the required variables are either ticketlimit from the event or the number of tickets left in the shoppingCartObject
export default function SelectTickets(selectTicketsProps: {
  cartProduct: ShoppingCart | undefined;
  product: Event | undefined;
  fallbackTicketLimit: number;
}) {
  const { cartProduct, product, fallbackTicketLimit } = selectTicketsProps;
  const ticketLimit =
    product?.accessibility === undefined
      ? fallbackTicketLimit
      : product?.accessibility.ticketLimit;

  const optionTickets: ReactNode[] = [];
  optionTickets.push(
    <option key={0} value={0}>
      select Tickets
    </option>
  );
  if (cartProduct === undefined) {
    if (product === undefined) {
      return <option>Neither Product or cartProduct is avaialable</option>;
    } else {
      for (let i = 1; i <= ticketLimit; i++) {
        optionTickets.push(
          <option key={i} value={i}>
            {i} Tickets
          </option>
        );
      }
      return <>{optionTickets}</>;
    }
  } else {
    if (cartProduct.maxTickets === undefined)
      throw new Error("maxTickets is undefined: SelctTickets component");
    else if (cartProduct.maxReached === true) {
      return <option>Max Tickets reached</option>;
    }
    for (
      let i = 1;
      i <= cartProduct.maxTickets - cartProduct.numOfReservedTickets;
      i++
    ) {
      optionTickets.push(
        <option key={i} value={i}>
          {i} Tickets
        </option>
      );
    }
    return <>{optionTickets}</>;
  }
}
