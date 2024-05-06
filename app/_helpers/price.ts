import { Product } from "@prisma/client";

export const calculateProductTotalPrice = (product: Product): number => {
    if(product.discountPercentage === 0) {
        return Number(product.price)
    }

    const discount = Number(product.price) * (product.discountPercentage / 100);
    return Number(product.price) - discount
}

export const formatCurrency = (value: number): any => {
    return Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(value)
}