// src/models/howItWorks.ts

import { Coins,Handshake,Calendar,LucideIcon} from "lucide-react";

export interface IHowItWorksStep {
  step: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export const howItWorksSteps: IHowItWorksStep[] = [
  {
    step: "1",
    title: "Pilih & Daftar Event",
    description:
      "Telusuri berbagai event edukasi dan daftar dengan membayar biaya event + biaya komitmen",
    icon: Calendar,
  },
  {
    step: "2",
    title: "Hadiri Sesi & Berkomitmen",
    description:
      "Ikuti setiap sesi dengan check-in real-time untuk membuktikan kehadiran Anda",
    icon: Handshake,
  },
  {
    step: "3",
    title: "Dapatkan Reward",
    description:
      "Klaim cashback USDT setiap sesi yang Anda hadiri. Semakin konsisten, semakin besar reward!",
    icon: Coins,
  },
];