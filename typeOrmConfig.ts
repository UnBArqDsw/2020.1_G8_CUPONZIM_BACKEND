import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'

const typeOrmConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'cuponzim.cghpvfvxevqv.sa-east-1.rds.amazonaws.com',
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "cuponzim",
  synchronize: true,
  logging: false,
  entities: ['src/entity/**/*.ts'],
  migrations: ['src/migration/**/*.ts'],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration'
  }
}

export { typeOrmConfig }
