/*
  Команда --import импортирует данные из tsv;
*/

import { Command } from './command.interface.js';
import { TSVFileReader } from '../../shared/libs/file-reader/tsv-file-reader.js';
import {
  createOffer,
  getErrorMessage,
  getMongoURI,
} from '../../shared/helpers/index.js';
import { UserService } from '../../shared/modules/user/user-service.interface.js';
import { CategoryModel } from '../../shared/modules/category/category.entity.js';
import {
  CategoryService,
  DefaultCategoryService,
} from '../../shared/modules/category/index.js';
import { DefaultOfferService } from '../../shared/modules/offer/default-offer.service.js';
import { OfferService } from '../../shared/modules/offer/index.js';
import { OfferModel } from '../../shared/modules/offer/offer.entity.js';
import { DatabaseClient } from '../../shared/libs/database-client/database-client.interface.js';
import { MongoDatabaseClient } from '../../shared/libs/database-client/mogo.database-client.js';
import { Logger } from '../../shared/libs/logger/logger.interface.js';
import { ConsoleLogger } from '../../shared/libs/logger/console.logger.js';
import { DefaultUserService } from '../../shared/modules/user/default-user.service.js';
import { UserModel } from '../../shared/modules/user/user.entity.js';
import { DEFAULT_DB_PORT } from './command.constant.js';
import { RentalOffer } from '../../shared/types/rental-offer.js';

export class ImportCommand implements Command {
  private userService: UserService;
  private categoryService: CategoryService;
  private offerService: OfferService;
  private databaseClient: DatabaseClient;
  private logger: Logger;
  private salt: string;

  constructor() {
    this.onImportedLine = this.onImportedLine.bind(this);
    this.onCompleteImport = this.onCompleteImport.bind(this);

    this.logger = new ConsoleLogger();
    this.offerService = new DefaultOfferService(this.logger, OfferModel);
    this.categoryService = new DefaultCategoryService(
      this.logger,
      CategoryModel
    );
    this.userService = new DefaultUserService(this.logger, UserModel);
    this.databaseClient = new MongoDatabaseClient(this.logger);
  }

  private async onImportedLine(line: string, resolve: () => void) {
    const offer = createOffer(line);
    await this.saveOffer(offer);
    resolve();
  }

  private onCompleteImport(count: number) {
    console.info(`${count} rows imported`);
    this.databaseClient.disconnect();
  }

  private async saveOffer(offer: RentalOffer) {
    const categories: string[] = [];

    for (const name of offer.facilities) {
      const existCategory =
        await this.categoryService.findByCategoryNameOrCreate(name, { name });
      categories.push(existCategory.id);
    }

    await this.offerService.create({
      rentalName: offer.rentalName,
      descriptionOffer: offer.descriptionOffer,
      city: offer.city,
      previewLogo: offer.previewLogo,
      photo: offer.photo,
      isPremium: offer.isPremium,
      isFavorite: offer.isFavorite,
      rating: offer.rating,
      typeOfHousing: offer.typeOfHousing,
      roomCount: offer.roomCount,
      guestCount: offer.guestCount,
      price: offer.price,
      facilities: offer.facilities,
      authorOfProposal: offer.authorOfProposal,
      commentCount: offer.commentCount,
      coordinates: offer.coordinates,
    });
  }

  public getName(): string {
    return '--import';
  }

  public async execute(
    filename: string,
    login: string,
    password: string,
    host: string,
    dbname: string,
    salt: string
  ): Promise<void> {
    const uri = getMongoURI(login, password, host, DEFAULT_DB_PORT, dbname);
    this.salt = salt;

    await this.databaseClient.connect(uri);

    const fileReader = new TSVFileReader(filename.trim());

    fileReader.on('line', this.onImportedLine);
    fileReader.on('end', this.onCompleteImport);

    try {
      await fileReader.read();
    } catch (error) {
      console.error(`Can/t import data from file: ${filename}`);
      console.error(getErrorMessage(error));
    }
  }
}
