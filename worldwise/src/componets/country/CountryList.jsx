import styles from "./CountryList.module.css";
import Spinner from "./../spinner/Spinner";
import Message from "./../Message";
import CountryItem from "./CountryItem";
import { useCities } from "../../context/CitiesProvider";

function CountryList() {
  const { cities, isLoading } = useCities();

  if (isLoading) {
    return <Spinner />;
  }

  if (!cities.length) {
    return (
      <Message message="Add your first city by cliking on a city on the map" />
    );
  }

  const coutries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country)) {
      return [...arr, { country: city.country, emoji: city.emoji }];
    } else {
      return arr;
    }
  }, []);

  return (
    <ul className={styles.countryList}>
      {coutries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
}

export default CountryList;
