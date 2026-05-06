import 'dotenv/config';

import { DataSource, DataSourceOptions } from 'typeorm';

const TestDataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    url: process.env.TEST_DB_URL,
    entities: ['./src/**/*.entity.ts'],
    synchronize: true,
    dropSchema: false,
    logging: false,
};

export async function createTestDataSource(): Promise<DataSource> {
    const cleaner = new DataSource({ type: 'postgres', url: process.env.TEST_DB_URL });
    await cleaner.initialize();
    await cleaner.query('DROP SCHEMA IF EXISTS public CASCADE');
    await cleaner.query('CREATE SCHEMA IF NOT EXISTS public');
    await cleaner.query('GRANT ALL ON SCHEMA public TO PUBLIC');
    await cleaner.destroy();

    const dataSource = new DataSource(TestDataSourceOptions);
    await dataSource.initialize();
    return dataSource;
}
