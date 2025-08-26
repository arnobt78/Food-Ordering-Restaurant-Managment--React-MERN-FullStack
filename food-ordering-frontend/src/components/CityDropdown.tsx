import { useEffect, useRef, useState } from "react";
import { useCitySearch } from "@/api/CityApi";

interface CityDropdownProps {
  value: string;
  onChange: (city: string) => void;
}

const CityDropdown = ({ value, onChange }: CityDropdownProps) => {
  const { filteredCities, filterCities, loading, error } = useCitySearch();
  const [inputValue, setInputValue] = useState(value || "");
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setInputValue(value || "");
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
    filterCities(val);
    // Only show dropdown if at least 2 characters are typed
    setShowDropdown(val.length >= 2);
    onChange(val);
  };

  const handleSelect = (city: string) => {
    setInputValue(city);
    setShowDropdown(false);
    onChange(city);
  };

  return (
    <div className="relative w-full">
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => {
          // Only show dropdown if input has at least 2 characters
          if (inputValue.length >= 2) setShowDropdown(true);
        }}
        onBlur={() => setTimeout(() => setShowDropdown(false), 100)}
        placeholder="Type or select a city"
        className="w-full px-2 py-1 focus:outline-none focus:ring-0 focus:border-orange-500 text-gray-700"
      />
      {showDropdown && (
        <ul className="absolute z-10 bg-white border w-full max-h-48 overflow-y-auto mt-1 rounded shadow">
          {filteredCities.length > 0 ? (
            filteredCities.map((city) => (
              <li
                key={city}
                className="px-3 py-2 text-gray-700 hover:bg-orange-100 cursor-pointer"
                onMouseDown={() => handleSelect(city)}
              >
                {city}
              </li>
            ))
          ) : (
            <li className="px-3 py-2 text-gray-500">No city found</li>
          )}
        </ul>
      )}
      {loading && (
        <div className="absolute mt-1 text-xs text-gray-500">
          Loading cities...
        </div>
      )}
      {error && (
        <div className="absolute mt-1 text-xs text-red-500">{error}</div>
      )}
    </div>
  );
};

export default CityDropdown;
