import { gql, useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Continent {
  code: string;
  name: string;
}

const GET_CONTINENTS = gql`
  query {
    continents {
      name
    }
  }
`;

const ADD_COUNTRY = gql`
  mutation AddCountry($data: NewCountryInput!) {
    addCountry(data: $data) {
      code
      name
      emoji
      continent {
        name
      }
    }
  }
`;

export default function CountryForm() {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [emoji, setEmoji] = useState("");
  const [continentCode, setContinentCode] = useState("");

  const { data: continentData, loading: loadingContinents } =
    useQuery(GET_CONTINENTS);
  const navigate = useNavigate();

  const [addCountry, { loading, error }] = useMutation(ADD_COUNTRY, {
    update(cache, { data: { addCountry } }) {
      cache.modify({
        fields: {
          countries(existing = []) {
            return [...existing, addCountry];
          },
        },
      });
    },
    onCompleted: () => {
      navigate("/");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !code || !emoji) return;

    addCountry({
      variables: {
        data: {
          name,
          code,
          emoji,
          continent: continentCode || null,
        },
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-8 gap-4 flex flex-col items-center justify-center"
    >
      <h1 className="text-2xl font-bold mb-8 text-center">Add a New Country</h1>
      <input
        type="text"
        placeholder="Country Code (e.g. FR)"
        value={code}
        onChange={(e) => setCode(e.target.value.toUpperCase())}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="text"
        placeholder="Emoji (e.g. 🇫🇷)"
        value={emoji}
        onChange={(e) => setEmoji(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />

      <select
        value={continentCode}
        onChange={(e) => setContinentCode(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      >
        <option value="">-- Select a Continent (optional) --</option>
        {!loadingContinents &&
          continentData?.continents.map((c: Continent) => (
            <option key={c.code} value={c.code}>
              {c.name}
            </option>
          ))}
      </select>

      <button
        type="submit"
        className="bg-red-400 text-white px-4 py-2 rounded hover:bg-red-500 hover:ring-2 hover:ring-red-500 hover:ring-offset-2"
        disabled={loading}
      >
        {loading ? "Adding..." : "Add Country"}
      </button>

      {error && (
        <p className="text-red-600">Error adding country: {error.message}</p>
      )}
    </form>
  );
}
