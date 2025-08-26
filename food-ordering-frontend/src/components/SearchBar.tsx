import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import CityDropdown from "./CityDropdown";

const formSchema = z.object({
  city: z.string().optional(),
  searchQuery: z.string().optional(),
});

export type SearchForm = z.infer<typeof formSchema>;

type Props = {
  onSubmit: (formData: SearchForm) => void;
  placeHolder: string;
  onReset?: () => void;
  searchQuery?: string;
  city?: string;
};

const SearchBar = ({
  onSubmit,
  onReset,
  placeHolder,
  searchQuery,
  city,
}: Props) => {
  const [selectedCity, setSelectedCity] = useState(city || "");
  const form = useForm<SearchForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      searchQuery,
      city: city || "",
    },
  });

  useEffect(() => {
    form.reset({ searchQuery, city: selectedCity });
  }, [form, searchQuery, selectedCity]);

  const handleReset = () => {
    form.reset({
      searchQuery: "",
      city: "",
    });
    setSelectedCity("");
    if (onReset) {
      onReset();
    }
  };

  const handleCityChange = (cityVal: string) => {
    setSelectedCity(cityVal);
    form.setValue("city", cityVal);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`flex items-center gap-3 justify-between flex-row border-2 rounded-full p-3 ${
          form.formState.errors.searchQuery && "border-red-500"
        }`}
      >
        <Search
          strokeWidth={2.5}
          size={30}
          className="ml-1 text-orange-500 hidden md:block"
        />
        <div className="flex flex-1 items-center gap-2">
          <CityDropdown value={selectedCity} onChange={handleCityChange} />
          <FormField
            control={form.control}
            name="searchQuery"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input
                    {...field}
                    className="border-none shadow-none text-xl focus-visible:ring-0"
                    placeholder={placeHolder}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <Button
          onClick={handleReset}
          type="button"
          variant="outline"
          className="rounded-full"
        >
          Reset
        </Button>
        <Button type="submit" className="rounded-full bg-orange-500">
          Search
        </Button>
      </form>
    </Form>
  );
};

export default SearchBar;
