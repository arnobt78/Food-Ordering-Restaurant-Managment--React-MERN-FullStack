import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Search, Filter, Star, DollarSign, Clock } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import CityDropdown from "./CityDropdown";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Slider } from "./ui/slider";
import { Checkbox } from "./ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const formSchema = z.object({
  city: z.string().optional(),
  searchQuery: z.string().optional(),
  priceRange: z.array(z.number()).optional(),
  rating: z.number().optional(),
  deliveryTime: z.number().optional(),
  cuisines: z.array(z.string()).optional(),
  sortBy: z.string().optional(),
  openNow: z.boolean().optional(),
  freeDelivery: z.boolean().optional(),
  vegetarian: z.boolean().optional(),
  vegan: z.boolean().optional(),
  glutenFree: z.boolean().optional(),
});

export type AdvancedSearchForm = z.infer<typeof formSchema>;

type Props = {
  onSubmit: (formData: AdvancedSearchForm) => void;
  placeHolder: string;
  onReset?: () => void;
  searchQuery?: string;
  city?: string;
  isAdvanced?: boolean;
  onToggleAdvanced?: () => void;
};

const AdvancedSearchBar = ({
  onSubmit,
  onReset,
  placeHolder,
  searchQuery,
  city,
  isAdvanced = false,
  onToggleAdvanced,
}: Props) => {
  const [selectedCity, setSelectedCity] = useState(city || "");
  const [showAdvanced, setShowAdvanced] = useState(isAdvanced);

  const form = useForm<AdvancedSearchForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      searchQuery,
      city: city || "",
      priceRange: [0, 100],
      rating: 0,
      deliveryTime: 60,
      cuisines: [],
      sortBy: "bestMatch",
      openNow: false,
      freeDelivery: false,
      vegetarian: false,
      vegan: false,
      glutenFree: false,
    },
  });

  useEffect(() => {
    form.reset({
      searchQuery,
      city: selectedCity,
      priceRange: [0, 100],
      rating: 0,
      deliveryTime: 60,
      cuisines: [],
      sortBy: "bestMatch",
      openNow: false,
      freeDelivery: false,
      vegetarian: false,
      vegan: false,
      glutenFree: false,
    });
  }, [form, searchQuery, selectedCity]);

  const handleReset = () => {
    form.reset({
      searchQuery: "",
      city: "",
      priceRange: [0, 100],
      rating: 0,
      deliveryTime: 60,
      cuisines: [],
      sortBy: "bestMatch",
      openNow: false,
      freeDelivery: false,
      vegetarian: false,
      vegan: false,
      glutenFree: false,
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

  const toggleAdvanced = () => {
    setShowAdvanced(!showAdvanced);
    if (onToggleAdvanced) {
      onToggleAdvanced();
    }
  };

  const cuisineOptions = [
    "Italian",
    "Chinese",
    "Mexican",
    "Indian",
    "Japanese",
    "Thai",
    "American",
    "Mediterranean",
    "French",
    "Greek",
    "Korean",
    "Vietnamese",
  ];

  const sortOptions = [
    { value: "bestMatch", label: "Best Match" },
    { value: "rating", label: "Highest Rated" },
    { value: "deliveryTime", label: "Fastest Delivery" },
    { value: "priceLow", label: "Price: Low to High" },
    { value: "priceHigh", label: "Price: High to Low" },
    { value: "distance", label: "Nearest First" },
  ];

  return (
    <div className="space-y-4">
      {/* Basic Search */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5 text-orange-500" />
                Find Your Perfect Meal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 justify-between flex-row border-2 rounded-full p-3">
                <Search
                  strokeWidth={2.5}
                  size={30}
                  className="ml-1 text-orange-500 hidden md:block"
                />
                <div className="flex flex-1 items-center gap-2">
                  <CityDropdown
                    value={selectedCity}
                    onChange={handleCityChange}
                  />
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
              </div>

              <div className="flex items-center justify-between mt-4">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={toggleAdvanced}
                  className="flex items-center gap-2 text-orange-500"
                >
                  <Filter className="h-4 w-4" />
                  {showAdvanced ? "Hide Advanced Filters" : "Advanced Filters"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Advanced Filters */}
          {showAdvanced && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5 text-blue-500" />
                  Advanced Filters
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Price Range */}
                  <div className="space-y-3">
                    <FormLabel className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      Price Range
                    </FormLabel>
                    <FormField
                      control={form.control}
                      name="priceRange"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Slider
                              {...field}
                              min={0}
                              max={100}
                              step={5}
                              className="w-full"
                              onValueChange={field.onChange}
                            />
                          </FormControl>
                          <div className="flex justify-between text-sm text-gray-600">
                            <span>${field.value?.[0] || 0}</span>
                            <span>${field.value?.[1] || 100}</span>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Rating */}
                  <div className="space-y-3">
                    <FormLabel className="flex items-center gap-2">
                      <Star className="h-4 w-4" />
                      Minimum Rating
                    </FormLabel>
                    <FormField
                      control={form.control}
                      name="rating"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Select
                              onValueChange={(value) =>
                                field.onChange(Number(value))
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select rating" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="0">Any Rating</SelectItem>
                                <SelectItem value="3">3+ Stars</SelectItem>
                                <SelectItem value="4">4+ Stars</SelectItem>
                                <SelectItem value="4.5">4.5+ Stars</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Delivery Time */}
                  <div className="space-y-3">
                    <FormLabel className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Max Delivery Time
                    </FormLabel>
                    <FormField
                      control={form.control}
                      name="deliveryTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Select
                              onValueChange={(value) =>
                                field.onChange(Number(value))
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select time" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="30">30 minutes</SelectItem>
                                <SelectItem value="45">45 minutes</SelectItem>
                                <SelectItem value="60">60 minutes</SelectItem>
                                <SelectItem value="90">90 minutes</SelectItem>
                                <SelectItem value="120">2 hours</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Sort By */}
                  <div className="space-y-3">
                    <FormLabel>Sort By</FormLabel>
                    <FormField
                      control={form.control}
                      name="sortBy"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Select onValueChange={field.onChange}>
                              <SelectTrigger>
                                <SelectValue placeholder="Sort by" />
                              </SelectTrigger>
                              <SelectContent>
                                {sortOptions.map((option) => (
                                  <SelectItem
                                    key={option.value}
                                    value={option.value}
                                  >
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Cuisines */}
                  <div className="space-y-3">
                    <FormLabel>Cuisines</FormLabel>
                    <div className="grid grid-cols-2 gap-2">
                      {cuisineOptions.slice(0, 8).map((cuisine) => (
                        <FormField
                          key={cuisine}
                          control={form.control}
                          name="cuisines"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(cuisine)}
                                  onCheckedChange={(checked) => {
                                    const currentCuisines = field.value || [];
                                    if (checked) {
                                      field.onChange([
                                        ...currentCuisines,
                                        cuisine,
                                      ]);
                                    } else {
                                      field.onChange(
                                        currentCuisines.filter(
                                          (c) => c !== cuisine
                                        )
                                      );
                                    }
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal">
                                {cuisine}
                              </FormLabel>
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Dietary Preferences */}
                  <div className="space-y-3">
                    <FormLabel>Dietary Preferences</FormLabel>
                    <div className="space-y-2">
                      <FormField
                        control={form.control}
                        name="vegetarian"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal">
                              Vegetarian Options
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="vegan"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal">
                              Vegan Options
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="glutenFree"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal">
                              Gluten-Free Options
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Additional Filters */}
                  <div className="space-y-3">
                    <FormLabel>Additional Filters</FormLabel>
                    <div className="space-y-2">
                      <FormField
                        control={form.control}
                        name="openNow"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal">
                              Open Now
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="freeDelivery"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal">
                              Free Delivery
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>

                {/* Active Filters Display */}
                <div className="mt-6">
                  <FormLabel>Active Filters:</FormLabel>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {form.watch("rating") && form.watch("rating")! > 0 && (
                      <Badge
                        variant="secondary"
                        className="bg-orange-100 text-orange-800"
                      >
                        {form.watch("rating")}+ Stars
                      </Badge>
                    )}
                    {form.watch("deliveryTime") &&
                      form.watch("deliveryTime")! < 60 && (
                        <Badge
                          variant="secondary"
                          className="bg-blue-100 text-blue-800"
                        >
                          &lt; {form.watch("deliveryTime")} min delivery
                        </Badge>
                      )}
                    {form.watch("cuisines")?.map((cuisine) => (
                      <Badge
                        key={cuisine}
                        variant="secondary"
                        className="bg-green-100 text-green-800"
                      >
                        {cuisine}
                      </Badge>
                    ))}
                    {form.watch("vegetarian") && (
                      <Badge
                        variant="secondary"
                        className="bg-purple-100 text-purple-800"
                      >
                        Vegetarian
                      </Badge>
                    )}
                    {form.watch("vegan") && (
                      <Badge
                        variant="secondary"
                        className="bg-purple-100 text-purple-800"
                      >
                        Vegan
                      </Badge>
                    )}
                    {form.watch("glutenFree") && (
                      <Badge
                        variant="secondary"
                        className="bg-purple-100 text-purple-800"
                      >
                        Gluten-Free
                      </Badge>
                    )}
                    {form.watch("openNow") && (
                      <Badge
                        variant="secondary"
                        className="bg-green-100 text-green-800"
                      >
                        Open Now
                      </Badge>
                    )}
                    {form.watch("freeDelivery") && (
                      <Badge
                        variant="secondary"
                        className="bg-green-100 text-green-800"
                      >
                        Free Delivery
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </form>
      </Form>
    </div>
  );
};

export default AdvancedSearchBar;
