import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from './users.service';
import { Prisma } from '@prisma/client';

describe('UsersService', () => {
  let service: UsersService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              create: jest.fn(),
              findMany: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('my services should be defined when module is loaded and compiled', () => {
    expect(service).toBeDefined();
    expect(prismaService).toBeDefined();
  });

  describe('create a new user', () => {
    it(`should create a user successufully when #${UsersService.prototype.create.name} is called`, async () => {
      const user: Prisma.UserCreateInput = {
        email: 'simone-figueiredo84@ogn.com.br',
        name: 'Simone Esther Figueiredo',
      };

      const simulateUserDatabaseReturn = {
        ...user,
        id: 1,
      };

      jest
        .spyOn(prismaService.user, 'create')
        .mockResolvedValue(simulateUserDatabaseReturn);

      const createUser = await service.create(user);

      expect(createUser).toBe(simulateUserDatabaseReturn);
      expect(prismaService.user.create).toHaveBeenCalledWith({
        data: user,
      });
    });
  });

  describe('find all users', () => {
    it(`should find all users when #${UsersService.prototype.findAll.name} is called`, async () => {
      const users = [
        {
          id: 1,
          email: 'tiago_lima@agenciadbd.com',
          name: 'Tiago Fábio Leandro Lima',
        },
        {
          id: 2,
          email: 'agenciadbd.com',
          name: 'Tiago Fábio Leandro Lima',
        },
        {
          id: 3,
          email: 'simone-figueiredo84@ogn.com.br',
          name: 'Simone Esther Figueiredo',
        },
      ];
      jest.spyOn(prismaService.user, 'findMany').mockResolvedValue(users);

      const result = await service.findAll();

      expect(result).toBe(users);
      expect(prismaService.user.findMany).toHaveBeenCalled();
    });
  });
});
