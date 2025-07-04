import { Event } from "../services/types";
import { IFeaturedEvent } from "../types/constType";

export const mapApiEventToFeaturedEvent = (apiEvent: Event): IFeaturedEvent => {
  // Convert timestamp to date strings
  const startDate = new Date(apiEvent.startSaleDate * 1000).toISOString();
  const endDate = new Date(apiEvent.endSaleDate * 1000).toISOString();

  // Extract organizer name from wallet address (you might want to improve this)
  const organizerName =
    apiEvent.organizer.slice(0, 6) + "..." + apiEvent.organizer.slice(-4);

  return {
    id: apiEvent.eventId,
    title: apiEvent.title,
    description: apiEvent.description,
    startDate: startDate,
    endDate: endDate,
    location: apiEvent.location,
    participant: apiEvent.participant,
    maxParticipant: apiEvent.maxParticipant,
    eventPrice: parseFloat(apiEvent.priceAmountUsdFormat),
    commitmentPrice: parseFloat(apiEvent.commitmentAmountUsdFormat),
    organizerName: organizerName,
    linkImg: apiEvent.imageUri,
    StatusTags: apiEvent.status,
  };
};
