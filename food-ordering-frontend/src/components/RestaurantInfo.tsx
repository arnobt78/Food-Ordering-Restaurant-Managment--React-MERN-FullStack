import { Restaurant } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Dot } from "lucide-react";

function chunkArray<T>(arr: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

type Props = {
  restaurant: Restaurant;
};

const RestaurantInfo = ({ restaurant }: Props) => {
  return (
    <Card className="border-sla">
      <CardHeader>
        <CardTitle className="text-3xl font-bold tracking-tight">
          {restaurant.restaurantName}
        </CardTitle>
        <CardDescription>
          {restaurant.city}, {restaurant.country}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-1">
        {chunkArray(restaurant.cuisines, 10).map((row, rowIdx) => (
          <div className="flex flex-wrap gap-x-2" key={rowIdx}>
            {row.map((item, index) => (
              <span className="flex items-center" key={item + index}>
                <span>{item}</span>
                {index < row.length - 1 && <Dot />}
              </span>
            ))}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default RestaurantInfo;
