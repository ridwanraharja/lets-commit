import { type LucideIcon} from "lucide-react";

export interface IFaqs {
    id: number;
    question: string;
    answer: string;
}

export interface IFeaturedEvent {
  id: string;
  title: string;
  organizer: string;
  category: string;
  duration: string;
  totalCost: number;
  commitmentFee: number;
  potentialCashback: number;
  date: string;
  time: string;
  participants: number;
  maxParticipants: number;
}

export interface IHowItWorksStep {
  step: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface ISponsor {
    id : number;
    name: string;
    logo: string;
    tier: string;
    website: string;
}

export interface IStats {
    title: string;
    value: string;
    description: string;
    icon: LucideIcon ;
    trend: string;
    variant: string;
}

export interface ISupportOptions {
    icon: LucideIcon;
    title: string;
    description : string;
    amount : string;
    color: string;
    link : string;
}

export interface ITestimonial {
    id: string | number;
    name: string;
    role: string;
    company: string;
    text: string;
    image: string;
    rating: number;
    course: string;
}

export interface IVisionPoints {
    icon: LucideIcon;
    title: string;
    description: string;
}