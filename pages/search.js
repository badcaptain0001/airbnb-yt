import { useRouter } from "next/dist/client/router";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { format } from "date-fns";
import InfoCard from "../components/InfoCard";
import Map from "../components/Map";
function Search({ searchResult }) {
  const router = useRouter();

  console.log(searchResult);

  const { location, startDate, endDate, noOfGuests } = router.query;
  const formattedStartDate = format(new Date(startDate), "dd MMMM yy");
  const formattedEndDate = format(new Date(endDate), "dd MMMM yy");
  const range = `${formattedStartDate} - ${formattedEndDate}`;
  return (
    <div>
      <Header placeholder={`${location} | ${range} | ${noOfGuests} guests`} />
      <main className="flex">
        <section className="flex-grow pt-14 px-6">
          <p className="text-xs">
            300+ stays -{range} for {noOfGuests} guests
          </p>
          <h1 className="text-3xl mt-2 mb-6 font-semibold"> {location}</h1>
          <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
            <p className="button">Cancellation Flexibility</p>
            <p className="button">Type of place</p>
            <p className="button">Prices</p>
            <p className="button">Rooms and Beds</p>
            <p className="button">More filters</p>
          </div>
          <div className="flex flex-col">
            {searchResult.map(
              ({ img, location, description, star, price, total, title }) => (
                <InfoCard
                  key={img}
                  img={img}
                  location={location}
                  description={description}
                  price={price}
                  total={total}
                  star={star}
                  title={title}
                />
              )
            )}
          </div>
        </section>
        <section className="hidden md:inline-flex xl:min-w-[600px]">
          <Map searchResult={searchResult} />
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Search;

export async function getServerSideProps() {
  const searchResult = await fetch("https://links.papareact.com/isz").then(
    (res) => res.json()
  );
  return {
    props: {
      searchResult,
    },
  };
}
