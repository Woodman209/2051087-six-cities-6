import { OfferGenerator } from './offer-generator.interface.js';
import { CityDesc, MockServerData, User } from '../../types/index.js';
import {
  generateRandomValue,
  getRandomItem,
  getRandomItems,
} from '../../helpers/common.js';

const OFFER_SETTINGS = {
  PRICE: {
    MIN_PRICE: 100,
    MAX_PRICE: 100000,
  },
  RATING: {
    MIN_RATING: 1,
    MAX_RATING: 5,
  },
  ROOM_COUNT: {
    MIN_COUNT: 1,
    MAX_COUNT: 8,
  },
  GUEST_COUNT: {
    MIN_COUNT: 1,
    MAX_COUNT: 10,
  },
  COMMENT_COUNT: {
    MIN_COUNT: 1,
    MAX_COUNT: 10,
  },
};

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    const rentalName = getRandomItem<string>(this.mockData.titles);
    const descriptionOffer = getRandomItem<string>(this.mockData.descriptions);
    const createdAt = getRandomItem<string>(this.mockData.createdAtDates);
    const city = getRandomItem<CityDesc>(this.mockData.cities).name;
    const previewLogo = getRandomItem<string>(this.mockData.previews);
    const photo = getRandomItem<string>(this.mockData.images);
    const isPremium = getRandomItem<boolean>(
      this.mockData.premiumStatuses
    ).toString();
    const isFavorite = getRandomItem<boolean>(
      this.mockData.favoriteStatuses
    ).toString();
    const rating = generateRandomValue(
      OFFER_SETTINGS.RATING.MIN_RATING,
      OFFER_SETTINGS.RATING.MAX_RATING
    ).toString();
    const typeOfHousing = getRandomItem<string>(this.mockData.housing);
    const roomCount = generateRandomValue(
      OFFER_SETTINGS.ROOM_COUNT.MIN_COUNT,
      OFFER_SETTINGS.ROOM_COUNT.MAX_COUNT
    ).toString();
    const guestCount = generateRandomValue(
      OFFER_SETTINGS.GUEST_COUNT.MIN_COUNT,
      OFFER_SETTINGS.GUEST_COUNT.MAX_COUNT
    ).toString();
    const price = generateRandomValue(
      OFFER_SETTINGS.PRICE.MIN_PRICE,
      OFFER_SETTINGS.PRICE.MAX_PRICE
    ).toString();
    const facilities = getRandomItems<string>(this.mockData.facilities).join(
      ';'
    );
    const user = Object.values(getRandomItem<User>(this.mockData.users)).join(
      ' '
    );
    const commentCount = generateRandomValue(
      OFFER_SETTINGS.COMMENT_COUNT.MIN_COUNT,
      OFFER_SETTINGS.COMMENT_COUNT.MAX_COUNT
    ).toString();
    const coordinates = getRandomItem<CityDesc>(this.mockData.cities).location;

    return [
      rentalName,
      descriptionOffer,
      createdAt,
      city,
      previewLogo,
      photo,
      isPremium,
      isFavorite,
      rating,
      typeOfHousing,
      roomCount,
      guestCount,
      price,
      facilities,
      user,
      commentCount,
      coordinates.latitude,
      coordinates.longitude,
    ].join('\t');
  }
}
