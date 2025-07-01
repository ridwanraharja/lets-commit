  // Support options
 import { Heart, Coffee, Zap} from "lucide-react";
import { ISupportOptions } from "../types/constType";


  export const supportOptions: ISupportOptions[] = [
{
    id: "community",
    name: "Community Supporter",
    icon: Heart,
    amount: "$10",
    period: "one-time",
    description: "Join our community of learners and help us grow",
    features: [
      "Community Discord access",
      "Monthly newsletter",
      "Supporter badge",
      "Early feature updates"
    ],
    color: "from-pink-500 to-rose-500",
    bgColor: "bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20",
    link: "/donate"
  },
  {
    id: "developer",
    name: "Developer Fuel",
    icon: Coffee,
    amount: "$25",
    period: "monthly",
    description: "Keep our developers caffeinated and productive",
    features: [
      "Everything in Community",
      "Priority support",
      "Beta feature access",
      "Monthly developer Q&A",
      "Custom feature requests"
    ],
    color: "from-amber-500 to-orange-500",
    bgColor: "bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20",
    link: "/donate"
  },
  {
    id: "enterprise",
    name: "Platform Partner",
    icon: Zap,
    amount: "$12,5000",
    period: "monthly",
    description: "Become a strategic partner in our mission",
    features: [
      "Everything in Developer",
      "Logo on platform",
      "Co-marketing opportunities",
      "Direct line to founders",
      "Custom integrations",
      "Analytics dashboard"
    ],
    color: "from-purple-500 to-indigo-500",
    bgColor: "bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20",
    link: "/partnership"
  }
  ];