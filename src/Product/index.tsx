import { useParams } from "react-router-dom";
import { EmbeddedClass } from "../eventsInterface";
import Footer from "../Footer";
import Header from "../Header";

export default function Product({feed}: {feed:EmbeddedClass | undefined}) {
  const {id} = useParams();
  const product = feed?.events.find((prod) => prod.id === id)
  console.log(product)
  
  return (
    <>
      <Header />
        <section>
          <article>
            <h3>{product?.name}</h3>
          </article>
        </section>
      <Footer />
    </>
  );
}
