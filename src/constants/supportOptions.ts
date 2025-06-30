  // Support options
 import { Heart, Coffee, DollarSign} from "lucide-react";
import { ISupportOptions } from "../types/constType";


  export const supportOptions: ISupportOptions[] = [
    {
      icon: Heart,
      title: "Donasi",
      description: "Dukung misi kami dengan donasi untuk pengembangan platform",
      amount: "Mulai dari $10",
      color: "bg-red-500",
      link: "/donate"
    },
    {
      icon: Coffee,
      title: "Buy us a Coffee",
      description: "Apresiasi tim developer dengan secangkir kopi virtual",
      amount: "$5 - $25",
      color: "bg-amber-600",
      link: "/buy-coffee"
    },
    {
      icon: DollarSign,
      title: "Become a Sponsor",
      description: "Jadilah sponsor dan dapatkan eksposur brand di platform kami",
      amount: "Paket mulai $500",
      color: "bg-green-600",
      link: "/sponsorship"
    }
  ];