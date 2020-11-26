import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Raregame, RaregameRelations} from '../models';

export class RaregameRepository extends DefaultCrudRepository<
  Raregame,
  typeof Raregame.prototype.id,
  RaregameRelations
  > {

  async findRareGames(): Promise<any> {
    return await this.find();
  }

  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Raregame, dataSource);
  }
}
