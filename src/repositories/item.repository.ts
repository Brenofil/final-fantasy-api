import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Item, ItemRelations} from '../models';

export class ItemRepository extends DefaultCrudRepository<
  Item,
  typeof Item.prototype.id,
  ItemRelations
  > {

  async findItems(): Promise<any> {
    return await this.find();
  }


  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Item, dataSource);
  }
}
