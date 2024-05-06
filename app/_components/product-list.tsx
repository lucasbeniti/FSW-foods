import { db } from "../_lib/prisma";
import ProductItem from "./product-item";

const ProductList = async () => {
    const products = await db.product.findMany({
        where: {
            discountPercentage: {
                gt: 0
            }
        },
        take: 10,
        include: {
            restaurant: {
                select: {
                    name: true
                }
            }
        }
    })
    return (
        <div className="flex overflow-x-scroll [&::-webkit-scrollbar]:hidden px-5 gap-4">
            {products.map((product) => (
                <ProductItem product={product} key={product.id} />
            ))}
        </div>
    );
}

export default ProductList;