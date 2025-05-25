import { IsEmail, IsISO31661Alpha2, IsNotEmpty, IsString, IsStrongPassword, Length } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => value.trim())
    username: string;

    @IsEmail()
    @Transform(({ value }) => value.toLowerCase())
    email: string;

    @ApiProperty({ description: 'Country Alpha2 code', example: 'CN' })
    @IsISO31661Alpha2()
    country: string;

    @Length(9, 16)
    @Transform(({ value }) => value.trim())
    phoneNumber: string;

    @IsStrongPassword({minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1})
    password: string;
}