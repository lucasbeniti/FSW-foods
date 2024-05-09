import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import ProductImage from "./_components/product-image";
import ProductInfo from "./_components/product-info";

interface ProductsPageProps {
    params: {
        id: string
    }
}

const ProductsPage = async ({ params: { id } }: ProductsPageProps) => {
    const product = await db.product.findUnique({
        where: {
            id,
        },
        include: {
            restaurant: true
        }
    });

    const complementaryProducts = await db.product.findMany({
        where: {
            category: {
                name: 'Sucos'
            },
            restaurant: {
                id: product?.restaurant.id
            }
        },
        include: {
            restaurant: true
        }
    });

    if (!product) {
        return notFound();
    }
    return (
        <div>
            <ProductImage product={product} />
            <ProductInfo product={product} complementaryProducts={complementaryProducts} />
        </div>
    );

}

export default ProductsPage;