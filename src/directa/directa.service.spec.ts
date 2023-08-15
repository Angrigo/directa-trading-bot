import { Test, TestingModule } from '@nestjs/testing';
import { DirectaService } from './directa.service';

describe('DirectaService', () => {
  let service: DirectaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DirectaService],
    }).compile();

    service = module.get<DirectaService>(DirectaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
