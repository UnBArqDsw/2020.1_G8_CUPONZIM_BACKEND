import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'

const typeOrmConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: String(process.env.DB_USERNAME),
  password: String(process.env.DB_PASSWORD),
  database: String(process.env.DB_DATABASE),
  synchronize: true,
  logging: false,
  entities: ['src/entities/**/*.ts', 'dist/entities/**/*.js'],
  migrations: ['src/migration/**/*.ts', 'dist/migration/*.js'],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration'
  }
}

export { typeOrmConfig }
