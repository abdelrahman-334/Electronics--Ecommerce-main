import { Test, TestingModule } from '@nestjs/testing';
import { paymentController } from './payment.controller';

describe('paymentController', () => {
  let controller: paymentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [paymentController],
    }).compile();

    controller = module.get<paymentController>(paymentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
