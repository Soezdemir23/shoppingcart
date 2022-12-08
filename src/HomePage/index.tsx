import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { consumerKey } from "../env";
import { EmbeddedClass, Event, ValueClass } from "../eventsInterface";
import Footer from "../Footer";
import Header from "../Header";

export default function HomePage() {
  const [feed, setFeed] = useState<EmbeddedClass | undefined>(undefined);

  // I SWEAR last time I made a better looking async await utilization.
  // Insane
  useEffect(() => {
    fetchFeed().then((events) => {
      const res: EmbeddedClass | undefined = events;
      setFeed(res);
    });
  }, []);

  async function fetchFeed() {
    try {
      const response = await fetch(
        "https://app.ticketmaster.com/discovery/v2/events.json?apikey="+consumerKey,
        { mode: "cors" }
      );
      const data: Promise<ValueClass> = await response.json();
      return (await data)._embedded;
    } catch (error) {
      console.error("API call unsuccesful or another error: " + error);
    }
  }

  return (
    <div className="flex flex-col">
      <Header />
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
                  src={event.images[4].url}
                  alt="event"
                ></img>
              </div>
              <div className="flex justify-between">
                <button className="px-2 py-1 bg-blue-600 text-white rounded-md active:bg-blue-200 active:text-black">
                  Buy 1 ticket immediately
                </button>
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
