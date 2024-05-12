import { Category } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface CategoryItemProps {
    category: Category
}

const CategoryItem = ({ category }: CategoryItemProps) => {
    return (
        <Link href={`/categories/${category.id}/products`} className="flex items-center gap-3 py-3 px-4 bg-white shadow-md rounded-full">
            <Image src={category.imageUrl} alt={category.name} width={30} height={30} />
            <span className="text-sm font-semibold">{category.name}</span>
        </Link>
    );
}

export default CategoryItem;