import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({
    summary: 'Cria um novo usuário',
    description:
      'Cria um usuário com os dados que você passar. É necessário passar e-mail válido e um nome.',
  })
  @ApiCreatedResponse({
    description: 'Usuário criado com sucesso',
  })
  @ApiBadRequestResponse({
    description:
      'Usuário não pode ser criado. Por favor, valide os dados e tente novamente.',
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Retorna os usuários do banco de dados.',
  })
  @ApiOkResponse({
    description: 'Usuários buscados com sucesso',
  })
  @ApiBadRequestResponse({
    description: 'Não foi possível retornar os usuários.',
  })
  findAll() {
    return this.usersService.findAll();
  }
}
