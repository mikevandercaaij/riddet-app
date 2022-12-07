import { DynamicModule, Module } from '@nestjs/common';
import { Neo4jConfig } from './neo4j-config.interface';
import { NEO4J_CONFIG, NEO4J_DRIVER } from './neo4j.constants';
import { Neo4jService } from './neo4j.service';
import { createDriver } from './neo4j.util';



@Module({})
export class Neo4jModule {
  static forRoot(config: Neo4jConfig): DynamicModule {
    return {
      module: Neo4jModule,
      providers: [
        Neo4jService,
        {
          provide: NEO4J_CONFIG,
          useValue: config,
        },
        {
          provide: NEO4J_DRIVER,
          inject: [NEO4J_CONFIG],
          useFactory: (config: Neo4jConfig) => createDriver(config),
        }
      ],
      exports: [Neo4jService],
    }
  }
}