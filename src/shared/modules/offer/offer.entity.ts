/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */
import { defaultClasses, getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import { City, Coordinates, Housing } from '../../types/rental-offer.js';
import { User } from '../../types/user.js';

export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers',
    timestamps: true,
  },
})
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({ trim: true, required: true })
  public rentalName: string;

  @prop({ trim: true })
  public descriptionOffer: string;

  @prop()
  public city: City;

  @prop()
  public previewLogo: string;

  @prop()
  public photo: string;

  @prop()
  public isPremium: boolean;

  @prop()
  public isFavorite: boolean;

  @prop()
  public rating: number;

  @prop()
  public typeOfHousing: Housing;

  @prop()
  public roomCount: number;

  @prop()
  public guestCount: number;

  @prop()
  public price: number;

  @prop()
  public facilities: string[];

  @prop()
  public authorOfProposal: User;

  @prop()
  public commentCount: number;

  @prop()
  public coordinates: Coordinates;
}

export const OfferModel = getModelForClass(OfferEntity);
