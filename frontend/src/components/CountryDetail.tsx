import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

const GET_COUNTRY = gql`
  query GetCountry($code: String!) {
    country(code: $code) {
      code
      name
      emoji
      continent {
        name
      }
    }
  }
`;

export default function CountryDetail() {
  const { code } = useParams<{ code: string }>();
  const { data, loading, error } = useQuery(GET_COUNTRY, {
    variables: { code },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading country 😢</p>;
  if (!data?.country) return <p>Country not found</p>;

  const { name, emoji, continent } = data.country;

  return (
    <div className="mx-auto p-4 flex flex-col items-center gap-4 mt-12">
      <h1 className="text-7xl">{emoji}</h1>
      <p>
        <span className="font-bold">Name :</span> {name} ({code})
      </p>
      <p>
        <span className="font-bold">Continent :</span>{" "}
        {continent?.name || "N/A"}
      </p>
    </div>
  );
}
