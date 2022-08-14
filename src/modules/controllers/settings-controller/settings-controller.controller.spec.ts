import { Test, TestingModule } from '@nestjs/testing';
import { SettingsControllerController } from './settings-controller.controller';

describe('SettingsControllerController', () => {
  let controller: SettingsControllerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SettingsControllerController],
    }).compile();

    controller = module.get<SettingsControllerController>(SettingsControllerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
