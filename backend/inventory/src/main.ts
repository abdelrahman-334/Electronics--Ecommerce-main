/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { InventoryService } from './inventory/inventory.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  const inventoryService = app.get(InventoryService);
  await inventoryService.synchronizeWithProducts(); // Synchronize inventory with products

  await app.listen(process.env.PORT ?? 3002);
}
bootstrap();
