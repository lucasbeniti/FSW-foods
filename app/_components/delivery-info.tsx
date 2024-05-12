import { BikeIcon, TimerIcon } from "lucide-react";
import { Card } from "./ui/card";
import { formatCurrency } from "../_helpers/price";
import { Restaurant } from "@prisma/client";

interface DeliverInfoProps {
    restaurant: Pick<Restaurant, 'deliveryFee' | 'deliveryTimeMinutes'>
}

const DeliveryInfo = ({ restaurant }: DeliverInfoProps) => {
    return (
        <div>
            <Card className="flex justify-around py-3 mt-6">
                {/* custo */}
                <div className="flex flex-col items-center">
                    <div className="flex items-center gap-1 text-muted-foreground">
                        <span className="text-xs">Entrega</span>
                        <BikeIcon size={14} />
                    </div>
                    <p className="text-xs font-semibold">
                        {Number(restaurant.deliveryFee) > 0 ? formatCurrency(Number(restaurant.deliveryFee)) : 'Grátis'}
                    </p>
                </div>
                {/* tempo */}
                <div className="flex flex-col items-center">
                    <div className="flex items-center gap-1 text-muted-foreground">
                        <span className="text-xs">Tempo</span>
                        <TimerIcon size={14} />
                    </div>
                    <p className="text-xs font-semibold">
                        {restaurant.deliveryTimeMinutes} min
                    </p>
                </div>
            </Card>
        </div>
    );
}

export default DeliveryInfo;