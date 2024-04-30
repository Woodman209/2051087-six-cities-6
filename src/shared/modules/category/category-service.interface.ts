import { DocumentType } from '@typegoose/typegoose';
import { CreateCategoryDto } from './index.js';
import { CategoryEntity } from './index.js';

export interface CategoryService {
  create(dto: CreateCategoryDto): Promise<DocumentType<CategoryEntity>>;
  findByCategoryId(categoryId: string): Promise<DocumentType<CategoryEntity> | null>;
  findByCategoryName(categoryName: string): Promise<DocumentType<CategoryEntity> | null>;
  findByCategoryNameOrCreate(categoryName: string, dto: CreateCategoryDto): Promise<DocumentType<CategoryEntity>>;
  find(): Promise<DocumentType<CategoryEntity>[]>;
}
