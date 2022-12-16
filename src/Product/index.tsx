import { useParams } from "react-router-dom";
import { EmbeddedClass } from "../eventsInterface";
import Footer from "../Footer";
import Header from "../Header";

export default function Product({ feed }: { feed: EmbeddedClass | undefined }) {
  const { id } = useParams();
  const product = feed?.events.find((prod) => prod.id === id);
  console.log(product);

  return (
    <>
      <Header />
      <section>
        <article>
          <h3 className="text-center">{product?.name}</h3>
          <div className="flex flex-col items-center gap-4">
            <img
              src={product?._embedded.attractions[0].images[0].url}
              alt={"This is team: " + product?._embedded.attractions[0].name}
            ></img>
            <div className="bg-rose-300 px-1 text-justify">
              <span className="text-center relative">vs</span>
            </div>
            <img
              src={product?._embedded.attractions[1].images[0].url}
              alt={"This is team: " + product?._embedded.attractions[1].name}
            ></img>
          </div>
        </article>
        <article className="flex flex-col items-center">
          <h3> {product?._embedded.venues[0].name}</h3>
          <p>inside the [glorious] {product?._embedded.venues[0].name} the match is between the [magnamious] {product?._embedded.attractions[0].name} and the [courageous] 
          {product?._embedded.attractions[1].name}.</p>
          <h4>Overview of socials:</h4>
          <table className="auto">
            <thead>
            <tr className="border">
              <th className="bg-orange-400 px-2 py-0">{product?._embedded.attractions[0].name}</th>
              <th className="bg-emerald-400 px-2 py-0">{product?._embedded.attractions[1].name}</th>
            </tr>
            </thead>
            <tbody>
            <tr className="border">
              <td className="bg-orange-300 px-2 py-0"><a href={product?._embedded.attractions[0].externalLinks.homepage[0].url} target={"_blank"} rel="noreferrer">Homepage for {product?._embedded.attractions[0].name}</a></td>
              <td className="bg-emerald-300 px-2 py-0"><a href={product?._embedded.attractions[1].externalLinks.homepage[0].url} target={"_blank"} rel="noreferrer">Homepage for {product?._embedded.attractions[1].name}</a></td>
            </tr>
            <tr className="border">
            <td className="bg-orange-300 px-2 py-0"><a href={product?._embedded.attractions[0].externalLinks.facebook[0].url} target={"_blank"} rel="noreferrer">Facebook page for {product?._embedded.attractions[0].name}</a></td>
            <td className="bg-emerald-300 px-2 py-0"><a href={product?._embedded.attractions[1].externalLinks.facebook[0].url} target={"_blank"} rel="noreferrer">Facebook page for {product?._embedded.attractions[1].name}</a></td>
            </tr>
            <tr className="border">
            <td className="bg-orange-300 px-2 py-0"><a href={product?._embedded.attractions[0].externalLinks.twitter[0].url} target={"_blank"} rel="noreferrer">Twitter for {product?._embedded.attractions[0].name}</a></td>
            <td className="bg-emerald-300 px-2 py-0"><a href={product?._embedded.attractions[1].externalLinks.twitter[0].url} target={"_blank"} rel="noreferrer">Twitter for {product?._embedded.attractions[1].name}</a></td>
            </tr>
            <tr className="border">
            <td className="bg-orange-300 px-2 py-0"><a href={product?._embedded.attractions[0].externalLinks.instagram[0].url} target={"_blank"} rel="noreferrer">Instagram for {product?._embedded.attractions[0].name}</a></td>
            <td className="bg-emerald-300 px-2 py-0"><a href={product?._embedded.attractions[1].externalLinks.instagram[0].url} target={"_blank"} rel="noreferrer">Instagram for {product?._embedded.attractions[1].name}</a></td>
            </tr>
            <tr>
            <td className="bg-orange-300 px-2 py-0"><a href={product?._embedded.attractions[0].externalLinks.wiki[0].url} target={"_blank"} rel="noreferrer">Wikipedia article for {product?._embedded.attractions[0].name}</a></td>
            <td className="bg-emerald-300 px-2 py-0"><a href={product?._embedded.attractions[1].externalLinks.wiki[0].url} target={"_blank"} rel="noreferrer">Wikipedia article for {product?._embedded.attractions[1].name}</a></td>
            </tr>
            </tbody>
          </table>
          <img src={product?._embedded.venues[0].images[0].url} alt="Stadium"></img>
          <p>Street: {product?._embedded.venues[0].address.line1}</p>
          <p>City and State : {product?._embedded.venues[0].city.name}, {product?._embedded.venues[0].state.name}</p>

        </article>

      </section>
      <Footer />
    </>
  );
}
