import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from 'src/prisma.service';

describe('Users Controller', () => {
  let controller: UsersController;
  let userService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        PrismaService,
        {
          provide: UsersService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    userService = module.get<UsersService>(UsersService);
  });

  it('controllers and services should be defined when module is loaded', () => {
    expect(controller).toBeDefined();
    expect(userService).toBeDefined();
  });

  it(`should call #${UsersService.prototype.create.name} when route is loaded/called`, async () => {
    // Já está no prisma
    const userCreated = {
      id: 1,
      name: 'Tiago Fábio Leandro Lima',
      email: 'tiago_lima@agenciadbd.com',
    };

    // Dado que vou mandar para ser criado no prisma
    const user = {
      ...userCreated,
    };

    jest.spyOn(userService, 'create').mockResolvedValue(userCreated);

    const createUserResult = await controller.create(user);

    expect(createUserResult).toBe(userCreated);
    expect(userService.create).toHaveBeenCalledWith(user);
  });

  it(`should call #${UsersService.prototype.findAll.name} when route is loaded/called`, async () => {
    const simulateUserDatabase = [
      {
        id: 1,
        name: 'Tiago Fábio Leandro Lima',
        email: 'tiago_lima@agenciadbd.com',
      },
    ];

    jest.spyOn(userService, 'findAll').mockResolvedValue(simulateUserDatabase);

    const findAllResult = await controller.findAll();

    expect(findAllResult).toBe(simulateUserDatabase);
    expect(userService.findAll).toHaveBeenCalled();
  });
});
