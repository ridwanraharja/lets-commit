import {  Trophy, Calendar, Coins, Users } from "lucide-react";

export const statsConst = [
    {
        title: "Total Events",
        value: "2,847",
        description: "Events berhasil diselesaikan",
        icon: Calendar,
        trend: "+12%",
        variant: 'commitment' as const
    },
    {
        title: "Active Participants",
        value: "15,632",
        description: "Learner aktif bulan ini",
        icon: Users,
        trend: "+23%",
        variant: 'success' as const
    },
    {
        title: "Completion Rate",
        value: "87.5%",
        description: "Tingkat penyelesaian event",
        icon: Trophy,
        trend: "+5.2%",
        variant: 'warning' as const
    },
    {
        title: "Total Rewards",
        value: "$127k", // Escaped dollar sign
        description: "Commitment fee dikembalikan",
        icon: Coins,
        trend: "+18%",
        variant: 'default' as const
    }
];