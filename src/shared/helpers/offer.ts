import { City, Housing, RentalOffer, UserType } from '../types/index.js';

export function createOffer(offerData: string): RentalOffer {
  const [
    name,
    desc,
    createdAt,
    cityType,
    logo,
    photoRoom,
    isPrem,
    isFav,
    rating,
    typeOfHousing,
    roomCount,
    guestCount,
    price,
    facilities,
    userName,
    email,
    avatar,
    pass,
    typeOfUser,
    commentCount,
    latitude,
    longitude,
  ] = offerData.replace('\n', '').split('\t');

  return {
    rentalName: name,
    descriptionOffer: desc,
    createdAt: createdAt,
    city: City[
      cityType as
        | 'Paris'
        | 'Cologne'
        | 'Brussels'
        | 'Amsterdam'
        | 'Hamburg'
        | 'Dusseldorf'
    ],
    previewLogo: logo,
    photo: photoRoom,
    isPremium: JSON.parse(isPrem),
    isFavorite: JSON.parse(isFav),
    rating: Number.parseInt(rating, 10),
    typeOfHousing:
      Housing[typeOfHousing as 'apartment' | 'house' | 'room' | 'hotel'],
    roomCount: Number.parseInt(roomCount, 10),
    guestCount: Number.parseInt(guestCount, 10),
    price: Number.parseInt(price, 10),
    facilities: facilities.split(';').map((item) => item),
    authorOfProposal: {
      name: userName,
      email: email,
      avatar: avatar,
      password: pass,
      userType: UserType[typeOfUser as 'common' | 'pro'],
    },
    commentCount: Number.parseInt(commentCount, 10),
    coordinates: { latitude, longitude },
  };
}
