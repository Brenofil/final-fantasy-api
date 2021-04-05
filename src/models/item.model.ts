import {Entity, model, property} from '@loopback/repository';

@model()
export class Item extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
    where: {
      order: 'name <ASC|DESC>',
    },
  })
  name: string;

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
  })
  content: string[];

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
  })
  required: string[];

  @property({
    type: 'number',
    required: true,
  })
  price: number;

  @property({
    type: 'string',
    required: true,
  })
  image_url: string;

  constructor(data?: Partial<Item>) {
    super(data);
  }
}

export interface ItemRelations {
  // describe navigational properties here
}

export type ItemWithRelations = Item & ItemRelations;
