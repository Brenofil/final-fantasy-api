import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {get, getModelSchemaRef, param, post} from '@loopback/rest';
import {Raregame} from '../models';
import {RaregameRepository} from '../repositories';

export class RaregameController {
  constructor(
    @repository(RaregameRepository)
    public raregameRepository: RaregameRepository,
  ) {}

  @post('/rareGames', {
    responses: {
      '200': {
        description: 'Item model instance',
        content: {'application/json': {schema: getModelSchemaRef(Raregame)}},
      },
    },
  })
  async createRareGames(): Promise<any> {
    let data = require('../../public/raregames.json');

    for (let current of data.raregames) {
      var raregame = new Raregame();

      raregame.number = current.number;
      raregame.name = current.name;
      raregame.rank = current.rank;
      raregame.location = current.location;
      raregame.condition = current.condition;

      this.raregameRepository.create(raregame);
    }
  }

  @get('/raregames/count', {
    responses: {
      '200': {
        description: 'Raregame model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(@param.where(Raregame) where?: Where<Raregame>): Promise<Count> {
    return this.raregameRepository.count(where);
  }

  @get('/raregames', {
    responses: {
      '200': {
        description: 'Array of Raregame model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Raregame, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Raregame) filter?: Filter<Raregame>,
  ): Promise<Raregame[]> {
    return this.raregameRepository.find(filter);
  }

  @get('/raregames/{id}', {
    responses: {
      '200': {
        description: 'Raregame model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Raregame, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Raregame, {exclude: 'where'})
    filter?: FilterExcludingWhere<Raregame>,
  ): Promise<Raregame> {
    return this.raregameRepository.findById(id, filter);
  }
}
