import { useContext } from "react";
import { CartContext } from "../_context/cart";
import CartItem from "./cart-item";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { formatCurrency } from "../_helpers/price";
import { Separator } from "./ui/separator";

const Cart = () => {
  const { products, subtotalPrice, totalPrice, totalDiscount } =
    useContext(CartContext);
  return (
    <div className="pt-5">
      <div className="space-y-4">
        {products.map((product) => (
          <CartItem cartProduct={product} key={product.id} />
        ))}
      </div>

      <div className="mt-6 space-y-6">
        <Card>
          <CardContent className="p-5 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{formatCurrency(subtotalPrice)}</span>
            </div>
            <Separator />
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Entrega</span>
              <span className="text-danger">
                {Number(products[0].restaurant.deliveryFee) === 0 ? (
                  <span className="uppercase text-primary">Grátis</span>
                ) : (
                  formatCurrency(Number(products[0].restaurant.deliveryFee))
                )}
              </span>
            </div>
            <Separator />
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Descontos</span>
              <span>- {formatCurrency(totalDiscount)}</span>
            </div>
            <Separator />
            <div className="flex items-center justify-between text-xs font-semibold">
              <span>Total</span>
              <span>{formatCurrency(totalPrice)}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Button className="w-full mt-6">
        <span className="font-semibold text-md">Finalizar Pedido</span>
      </Button>
    </div>
  );
};

export default Cart;
