import { CreateOfferDto } from './index.js';
import { DocumentType } from '@typegoose/typegoose';
import { OfferEntity } from './index.js';

export interface OfferService {
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  findById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
}
