import {
  Count,
  CountSchema,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef,
  param,

  post
} from '@loopback/rest';
import {Item} from '../models';
import {ItemRepository} from '../repositories';

export class BazaarController {

  constructor(
    @repository(ItemRepository)
    public itemRepository: ItemRepository,
  ) { }

  @post('/bazaarItems', {
    responses: {
      '200': {
        description: 'Item model instance',
        content: {'application/json': {schema: getModelSchemaRef(Item)}},
      },
    },
  })
  async createItems(): Promise<any> {

    let data = require('../../public/weapons.json');

    for (let current of data.items) {
      var auxItem = new Item();

      auxItem.name = current.name;
      auxItem.content = current.content;
      auxItem.required = current.required;
      auxItem.price = current.price;

      this.itemRepository.create(auxItem);
    }
  }

  @get('/items/count', {
    responses: {
      '200': {
        description: 'Item model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Item) where?: Where<Item>,
  ): Promise<Count> {
    return this.itemRepository.count(where);
  }

  @get('/items', {
    responses: {
      '200': {
        description: 'Array of Item model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Item, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    //@param.filter(Item) filter?: Filter<Item>,
  ): Promise<any> {
    let items = await this.itemRepository.findItems();
    console.log(items);
    return items;
  }



  @get('/items/{id}', {
    responses: {
      '200': {
        description: 'Item model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Item, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Item, {exclude: 'where'}) filter?: FilterExcludingWhere<Item>
  ): Promise<Item> {
    return this.itemRepository.findById(id, filter);
  }
}

