import { db } from "../_lib/prisma";
import RestaurantItem from "./restaurant-item";

const RestaurantList = async () => {
  const restaurants = await db.restaurant.findMany({ take: 10 });
  return (
    <div className="flex overflow-x-scroll [&::-webkit-scrollbar]:hidden px-5 gap-4">
      {restaurants.map((restaurant) => (
        <RestaurantItem restaurant={restaurant} key={restaurant.id} />
      ))}
    </div>
  );
}

export default RestaurantList;