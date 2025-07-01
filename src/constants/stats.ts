 import { Calendar, Users, Coins,  } from "lucide-react";
import { IStats } from "../types/constType";


export const statsConst:IStats[] = [
    {
        title: "Total Events",
        value: "2,847",
        description: "Successfully completed learning events this month",
        icon: Calendar,
        trend: "+12%",
        variant: 'commitment' as const
    },
    {
        title: "Total Participants",
        value: "15,632",
        description: "Total community members learning together",
        icon: Users,
        trend: "+23%",
        variant: 'success' as const
    },

    {
        title: "Total Cashback",
        value: "$127k", // Escaped dollar sign
        description: "Total Cashback to our participants",
        icon: Coins,
        trend: "+18%",
        variant: 'default' as const
    }
];