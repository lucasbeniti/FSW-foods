import Image from "next/image";
import { CartContext, CartProduct } from "../_context/cart";
import { calculateProductTotalPrice, formatCurrency } from "../_helpers/price";
import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useContext } from "react";

interface CartItemProps {
  cartProduct: CartProduct;
}

const CartItem = ({ cartProduct }: CartItemProps) => {
  const {
    decreaseProductQuantity,
    increaseProductQuantity,
    removeProductFromCart,
  } = useContext(CartContext);
  const handleDecreaseQuantityClick = () =>
    decreaseProductQuantity(cartProduct.id);
  const handleIncreaseQuantityClick = () =>
    increaseProductQuantity(cartProduct.id);
  const handleRemoveProduct = () => removeProductFromCart(cartProduct.id);
  return (
    <div className="flex items-center justify-between">
      {/* Imagem e info */}
      <div className="flex items-center gap-4">
        <div className="relative size-20">
          <Image
            src={cartProduct.imageUrl}
            fill
            className="object-cover rounded-lg"
            alt={cartProduct.name}
          />
        </div>

        <div className="space-y-1">
          <h3 className="text-xs ">{cartProduct.name}</h3>
          <div className="flex items-center gap-1">
            <h4 className="text-sm font-semibold">
              {formatCurrency(
                calculateProductTotalPrice(cartProduct) * cartProduct.quantity,
              )}
            </h4>
            {cartProduct.discountPercentage > 0 && (
              <span className="text-xs text-muted-foreground line-through">
                {formatCurrency(
                  Number(cartProduct.price) * cartProduct.quantity,
                )}
              </span>
            )}
          </div>
          <div className="flex gap-3 items-center text-center">
            <Button
              size={"icon"}
              variant={"ghost"}
              className="border border-solid border-muted-foreground size-7"
              onClick={handleDecreaseQuantityClick}
            >
              <ChevronLeftIcon size={16} />
            </Button>
            <span className="w-4 text-sm">{cartProduct.quantity}</span>
            <Button
              size={"icon"}
              className="size-7"
              onClick={handleIncreaseQuantityClick}
            >
              <ChevronRightIcon size={16} />
            </Button>
          </div>
        </div>
      </div>
      {/* Botão deletar */}
      <Button
        size={"icon"}
        className="size-8 border border-solid border-muted-foreground"
        variant={"ghost"}
        onClick={handleRemoveProduct}
      >
        <TrashIcon size={16} />
      </Button>
    </div>
  );
};

export default CartItem;
