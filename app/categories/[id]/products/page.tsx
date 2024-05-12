import Header from "@/app/_components/header";
import ProductItem from "@/app/_components/product-item";
import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";

interface CategoriesProductsPageProps {
    params: {
        id: string
    }
}

const CategoryProductsPage = async ({ params: { id } }: CategoriesProductsPageProps) => {
    const category = await db.category.findUnique({
        where: {
            id: id
        },
        include: {
            products: {
                include: {
                    restaurant: true
                }
            }
        }
    })
    if (!category) {
        return notFound();
    }
    return (
        <>
            <Header />
            <div className="py-6 px-5">
                <h2 className="font-semibold text-lg mb-6">{category.name}</h2>
                <div className="grid grid-cols-2 gap-5">
                    {category.products.map((product) => (
                        <ProductItem key={product.id} product={product} className="min-w-full max-w-full" />
                    ))}
                </div>
            </div>
        </>
    );
}

export default CategoryProductsPage;