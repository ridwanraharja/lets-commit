import { Coins, Handshake, Calendar } from "lucide-react";
import { IHowItWorksStep } from "../types/constType";

export const howItWorksSteps: IHowItWorksStep[] = [
  {
    step: "1",
    title: "Create or Join Events",
    description:
      "Anyone can create learning events as an organizer, or browse and join existing events as a participant. Participant require commitment payment.",
    icon: Calendar,
  },
  {
    step: "2", 
    title: "Attend & Commit Together",
    description:
      "Organizers run sessions while participants attend. Both parties use real-time check-ins to prove their commitment and active participation.",
    icon: Handshake,
  },
  {
    step: "3",
    title: "Earn Session-Based Rewards",
    description:
      "Both organizers and participants earn USDC cashback for each session they fulfill. Consistency = Maximum rewards for everyone!",
    icon: Coins,
  },
];