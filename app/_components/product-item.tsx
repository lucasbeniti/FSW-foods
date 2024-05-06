import { Prisma } from "@prisma/client";
import Image from "next/image";
import { calculateProductTotalPrice, formatCurrency } from "../_helpers/price";
import { ArrowDownIcon } from "lucide-react";

interface ProductItemProps {
    product: Prisma.ProductGetPayload<{
        include: {
            restaurant: {
                select: {
                    name: true
                }
            }
        }
    }>
}

const ProductItem = ({ product }: ProductItemProps) => {
    return (
        <div className="space-y-2 min-w-[150px] w-[150px]">
            <div className="h-[150px] w-full relative">
                <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover rounded-lg shadow-md"
                />
                {product.discountPercentage && (
                    <div className="absolute top-2 left-2 gap-[2px] bg-primary px-2 py-[2px] rounded-full text-white flex items-center">
                        <ArrowDownIcon size={12} />
                        <span className="text-xs font-semibold">{product.discountPercentage}%</span>
                    </div>
                )}
            </div>

            <div>
                <h2 className="text-sm truncate">{product.name}</h2>
                <div className="flex gap-1 items-center">
                    <h3 className="font-semibold">
                        {formatCurrency(calculateProductTotalPrice(product))}
                    </h3>
                    {product.discountPercentage > 0 && (
                        <span className="line-through text-muted-foreground text-xs">
                            {formatCurrency(Number(product.price))}
                        </span>
                    )}
                </div>

                <span className="text-muted-foreground text-xs truncate block">
                    {product.restaurant.name}
                </span>
            </div>
        </div>
    );
}


export default ProductItem;