import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
      <main>
        <h1>WHOOPS! Wrong page :^)</h1>
        <Link to="/shoppingcart/">Turn back here</Link>
      </main>
    </>
  );
}
