import { User } from './user.js';

export type Coordinates = {
  latitude: string,
  longitude: string
}

export enum City {
  Paris = 'Paris',
  Cologne = 'Cologne',
  Brussels = 'Brussels',
  Amsterdam = 'Amsterdam',
  Hamburg = 'Hamburg',
  Dusseldorf = 'Dusseldorf'
}

export enum Housing {
  apartment = 'apartment',
  house = 'house',
  room = 'room',
  hotel = 'hotel'
}

export enum Convenience {
  Breakfast = 'Breakfast',
  AirConditioning = 'Air conditioning',
  LaptopFriendly = 'Laptop friendly workspace',
  BabySeat = 'Baby seat',
  Washer = 'Washer',
  Towels = 'Towels',
  Fridge = 'Fridge'
}

export type RentalOffer = {
  rentalName: string,
  descriptionOffer: string,
  createdAt: string,
  city: City,
  previewLogo: string,
  photo: string,
  isPremium: boolean,
  isFavorite: boolean,
  rating: number,
  typeOfHousing: Housing,
  roomCount: number,
  guestCount: number,
  price: number,
  facilities: string[],
  authorOfProposal: User,
  commentCount: number,
  coordinates: Coordinates
}
