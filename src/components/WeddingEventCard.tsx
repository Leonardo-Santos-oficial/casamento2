import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface WeddingEventCardProps {
  icon: LucideIcon;
  title: string;
  time: string;
  location: string;
  address: string;
}

export const WeddingEventCard = ({ 
  icon: Icon, 
  title, 
  time, 
  location, 
  address 
}: WeddingEventCardProps) => {
  return (
    <Card className="h-full">
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-rose-100 dark:bg-rose-900/20 rounded-full flex items-center justify-center mb-4">
            <Icon className="w-8 h-8 text-rose-500" />
          </div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-2xl font-bold text-rose-500 mb-4">{time}</p>
          <div className="space-y-1">
            <p className="font-medium">{location}</p>
            <p className="text-sm text-muted-foreground">{address}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
