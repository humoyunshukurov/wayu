import { INestApplication } from '@nestjs/common';
import { DataSource } from 'typeorm';

export async function teardownTestApp(app: INestApplication, dataSource: DataSource) {
    if (dataSource?.isInitialized) {
        await dataSource.destroy();
    }
    await app?.close();
}
