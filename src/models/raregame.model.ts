import {Entity, model, property} from '@loopback/repository';

@model()
export class Raregame extends Entity {
  @property({
    type: 'number',
    required: true,
  })
  number: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'number',
    required: true,
  })
  rank: number;

  @property({
    type: 'string',
    required: true,
  })
  location: string;

  @property({
    type: 'string',
    required: true,
  })
  condition: string;

  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;


  constructor(data?: Partial<Raregame>) {
    super(data);
  }
}

export interface RaregameRelations {
  // describe navigational properties here
}

export type RaregameWithRelations = Raregame & RaregameRelations;
