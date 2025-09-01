import { useEffect, useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useCitySearch = () => {
  const [cities, setCities] = useState<string[]>([]);
  const [filteredCities, setFilteredCities] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch(`${API_BASE_URL}/api/restaurant/cities/all`)
      .then((res) => res.json())
      .then((data) => {
        setCities(data.cities || []);
        setFilteredCities(data.cities || []);
        setLoading(false);
      })
      .catch((_error) => {
        setError("Failed to fetch cities");
        setLoading(false);
      });
  }, []);

  const filterCities = (input: string) => {
    if (!input) {
      setFilteredCities(cities);
      return;
    }
    setFilteredCities(
      cities.filter((city) => city.toLowerCase().includes(input.toLowerCase()))
    );
  };

  return { cities, filteredCities, filterCities, loading, error };
};
