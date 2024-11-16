import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({
    message: 'Nome é obrigatório',
  })
  @IsString({
    message: 'Nome deve ser uma string',
  })
  @ApiProperty({
    description: 'Campo nome do usuário',
    examples: ['John Doe', 'Jane Doe'],
    required: true,
    title: 'Campo nome',
  })
  name: string;

  @IsEmail(
    {},
    {
      message: 'E-mail deve ser válido',
    },
  )
  @IsNotEmpty({
    message: 'E-mail não pode ser vazio',
  })
  @IsString({
    message: 'E-mail deve ser uma string',
  })
  @ApiProperty({
    description: 'Campo email do usuário',
    examples: [
      'jose_rocha@contabilidadevictoria.com.br',
      'aparecidamarinasouza@focusgrafica.com.br',
    ],
    required: true,
    title: 'Campo email',
  })
  email: string;
}
