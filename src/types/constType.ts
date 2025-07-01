import { type LucideIcon} from "lucide-react";

export interface IFaqs {
    id: number;
    question: string;
    answer: string;
}

export interface IFeaturedEvent {
    id: number;
    title : string;
    description: string;
    startDate : string;
    endDate: string;
    location: string;
    participant: number;
    maxParticipant: number;
    eventPrice: number;
    commitmentPrice: number;
    organizerName: string;
    linkImg: string;
    StatusTags: 'ON_SALE' | 'ON_GOING' | 'FINISHED';
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
id: string;
  name: string;
  icon: LucideIcon;
  amount: string;
  period: 'one-time' | 'monthly' | 'yearly';
  description: string;
  features: string[];
  color: string;
  bgColor: string;
  link: string;
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