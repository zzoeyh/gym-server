import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

const createUserDto: CreateUserDto = {
  username: 'admin',
  password: '123456',
};

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            create: jest
              .fn()
              .mockImplementation((user: CreateUserDto) =>
                Promise.resolve({ id: '1', ...user }),
              ),
            findAll: jest.fn().mockResolvedValue([
              {
                id: '2',
                username: 'lastName #1',
              },
              {
                id: '3',
                username: 'lastName #2',
              },
            ]),
            findOne: jest.fn().mockImplementation((id: string) =>
              Promise.resolve({
                firstName: 'firstName #1',
                lastName: 'lastName #1',
                id,
              }),
            ),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    usersController = app.get<UsersController>(UsersController);
    usersService = app.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  describe('create()', () => {
    it('should create a user', () => {
      expect(usersController.create(createUserDto)).resolves.toEqual({
        id: '1',
        ...createUserDto,
      });
      expect(usersService.create).toHaveBeenCalled();
      expect(usersService.create).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('findAll()', () => {
    it('should find all users ', () => {
      usersController.findAll();
      expect(usersService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne()', () => {
    it('should find a user', () => {
      usersController.findOne(1);
      expect(usersService.findOne).toHaveBeenCalled();
      expect(usersController.findOne(2)).resolves.toEqual({
        firstName: 'firstName #1',
        lastName: 'lastName #1',
        id: '1',
      });
    });
  });

  describe('remove()', () => {
    it('should remove the user', () => {
      usersController.remove(3);
      expect(usersService.remove).toHaveBeenCalled();
    });
  });
});
