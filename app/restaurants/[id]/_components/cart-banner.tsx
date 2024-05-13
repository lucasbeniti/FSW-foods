"use client";

import Cart from "@/app/_components/cart";
import { Button } from "@/app/_components/ui/button";
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Sheet,
} from "@/app/_components/ui/sheet";
import { CartContext } from "@/app/_context/cart";
import { formatCurrency } from "@/app/_helpers/price";
import { Restaurant } from "@prisma/client";
import { useContext } from "react";

interface CartBannerProps {
  restaurant: Pick<Restaurant, "id">;
}

const CartBanner = ({ restaurant }: CartBannerProps) => {
  const { products, subtotalPrice, totalQuantity } = useContext(CartContext);
  const restaurantHasProductsOnCart = products.some(
    (product) => (product.restaurantId = restaurant.id),
  );
  if (!restaurantHasProductsOnCart) {
    return null;
  }
  return (
    <div className="fixed z-50 bg-white bottom-0 left-0 p-5 pt-3 w-full border-t border-solid border-muted">
      <div className="flex justify-between items-center">
        <div>
          <span className="text-xs text-muted-foreground">
            Total sem entrega
          </span>
          <h3 className="font-semibold">
            {formatCurrency(subtotalPrice)}{" "}
            <span className="text-muted-foreground text-xs">
              / {totalQuantity} {totalQuantity > 1 ? "itens" : "item"}
            </span>
          </h3>
        </div>

        <Sheet>
          <SheetTrigger>
            <Button className="text-sm">Ver sacola</Button>
          </SheetTrigger>
          <SheetContent className="w-[90vw]">
            <SheetHeader className="text-left">
              <SheetTitle>Sacola</SheetTitle>
            </SheetHeader>
            <Cart />
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default CartBanner;
