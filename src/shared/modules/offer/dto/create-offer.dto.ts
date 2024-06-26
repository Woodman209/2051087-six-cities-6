import { City, Coordinates, Housing } from '../../../types/rental-offer.js';
import { User } from '../../../types/user.js';

export class CreateOfferDto {
  public rentalName: string;
  public descriptionOffer: string;
  public city: City;
  public previewLogo: string;
  public photo: string;
  public isPremium: boolean;
  public isFavorite: boolean;
  public rating: number;
  public typeOfHousing: Housing;
  public roomCount: number;
  public guestCount: number;
  public price: number;
  public facilities: string[];
  public authorOfProposal: User;
  public commentCount: number;
  public coordinates: Coordinates;
}
