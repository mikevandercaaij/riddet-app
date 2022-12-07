import { Injectable } from '@nestjs/common';
import { Neo4jService } from './neo4j/neo4j.service';

@Injectable()
export class AppService {

  constructor(private readonly neo4jService: Neo4jService) { }

  getData(): { message: string } {
    return { message: 'Welcome to riddet-api!' };
  }

}
