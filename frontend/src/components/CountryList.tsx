import { gql, useQuery } from "@apollo/client";
import CountryCard from "./CountryCard";

interface Country {
  code: string;
  name: string;
  emoji: string;
}

const GET_COUNTRIES = gql`
  query {
    countries {
      code
      name
      emoji
    }
  }
`;

export default function CountryList() {
  const { data, loading, error } = useQuery(GET_COUNTRIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading countries 😢</p>;

  return (
    <div className="w-full p-8">
      <h1 className="text-2xl font-bold mb-8 text-center">
        🌍 List of Countries
      </h1>
      <div className="flex flex-wrap gap-4 justify-center">
        {data.countries.map((country: Country) => (
          <CountryCard key={country.code} country={country} />
        ))}
      </div>
    </div>
  );
}
