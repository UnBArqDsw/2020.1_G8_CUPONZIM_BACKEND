import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'

const typeOrmConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'cuponzim',
  synchronize: true,
  logging: false,
  entities: ['src/entities/**/*.ts', 'dist/entities/**/*.js']
}

export { typeOrmConfig }
