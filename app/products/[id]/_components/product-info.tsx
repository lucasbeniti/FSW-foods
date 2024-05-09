"use client";
import DiscountBadge from "@/app/_components/discount-badge";
import ProductList from "@/app/_components/product-list";
import { Button } from "@/app/_components/ui/button";
import { Card } from "@/app/_components/ui/card";
import { calculateProductTotalPrice, formatCurrency } from "@/app/_helpers/price";
import { Prisma } from "@prisma/client";
import { BikeIcon, ChevronLeftIcon, ChevronRightIcon, TimerIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ProductInfoProps {
    product: Prisma.ProductGetPayload<{
        include: {
            restaurant: true
        }
    }>;
    complementaryProducts: Prisma.ProductGetPayload<{
        include: {
            restaurant: true
        }
    }>[];
}
const ProductInfo = ({ product, complementaryProducts }: ProductInfoProps) => {
    const [quantity, setQuantity] = useState(1);
    const handleIncreaseQuantityClick = () => setQuantity(current => current + 1);
    const handleDecreaseQuantityClick = () => setQuantity((current) => {
        if (current === 1) return 1;
        return current - 1
    });

    return (
        <div className="py-5">
            <div className="flex items-center gap-[0.375rem] px-5">
                <div className="relative h-6 w-6">
                    <Image
                        src={product.restaurant.imageUrl}
                        alt={product.restaurant.name}
                        fill
                        className="rounded-full object-cover"
                    />
                </div>
                <span className="text-sm font-semibold text-muted-foreground">{product.restaurant.name}</span>
            </div>

            {/* Nome do produto */}
            <h1 className="font-semibold text-xl mb-2 mt-1 px-5">{product.name}</h1>

            {/* Preço do produto e quantidade */}
            <div className="flex justify-between px-5">
                <div>
                    <div className="flex items-center gap-2">
                        <h2 className="font-semibold text-xl">{formatCurrency(calculateProductTotalPrice(product))}</h2>
                        {product.discountPercentage > 0 && (
                            <DiscountBadge product={product} />
                        )}
                    </div>
                    {product.discountPercentage > 0 && (
                        <p className="text-muted-foreground text-sm">De: {formatCurrency(Number(product.price))}</p>
                    )}
                </div>
                <div className="flex gap-3 items-center text-center">
                    <Button size={"icon"} variant={"ghost"} className="border border-solid border-muted-foreground" onClick={handleDecreaseQuantityClick}>
                        <ChevronLeftIcon />
                    </Button>
                    <span className="w-4">{quantity}</span>
                    <Button size={"icon"} onClick={handleIncreaseQuantityClick}>
                        <ChevronRightIcon />
                    </Button>
                </div>
            </div>

            {/* Dados da entrega */}
            <div className="px-5">
                <Card className="flex justify-around py-3 mt-6">
                    {/* custo */}
                    <div className="flex flex-col items-center">
                        <div className="flex items-center gap-1 text-muted-foreground">
                            <span className="text-xs">Entrega</span>
                            <BikeIcon size={14} />
                        </div>
                        <p className="text-xs font-semibold">
                            {Number(product.restaurant.deliveryFee) > 0 ? formatCurrency(Number(product.restaurant.deliveryFee)) : 'Grátis'}
                        </p>
                    </div>
                    {/* tempo */}
                    <div className="flex flex-col items-center">
                        <div className="flex items-center gap-1 text-muted-foreground">
                            <span className="text-xs">Tempo</span>
                            <TimerIcon size={14} />
                        </div>
                        <p className="text-xs font-semibold">
                            {Number(product.restaurant.deliveryFee) > 0 ? formatCurrency(Number(product.restaurant.deliveryFee)) : 'Grátis'}
                        </p>
                    </div>
                </Card>
            </div>

            <div className="mt-6 space-y-3 px-5">
                <h3 className="font-semibold">Sobre</h3>
                <p className="text-muted-foreground text-sm">{product.description}</p>
            </div>

            <div className="mt-6">
                <h3 className="font-semibold px-5">Sucos</h3>
                <ProductList products={complementaryProducts} />
            </div>

            <div className="px-5 mt-6">
                <Button className="w-full text-sm">
                    Adicionar à Sacola
                </Button>
            </div>
        </div>
    );
}

export default ProductInfo;