import { useNavigate } from "react-router-dom";

interface Country {
  code: string;
  name: string;
  emoji: string;
}

interface CountryCardProps {
  country: Country;
}

export default function CountryCard({ country }: CountryCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/country/${country.code}`);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-base-100 w-96 shadow-md border border-gray-300 hover:shadow-md transition-shadow duration-300 hover:bg-gray-50 hover:cursor-pointer p-8"
    >
      <div className="flex justify-center items-center p-8 text-6xl">
        {country.emoji}
      </div>
      <div className="card-body p-4">
        <h2 className="card-title font-bold text-center">{country.name}</h2>
      </div>
    </div>
  );
}
