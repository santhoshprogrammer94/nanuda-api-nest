import { BaseDto } from 'src/core';
import { Menu } from '../menu.entity';
import { IsOptional, IsNotEmpty, IsEnum } from 'class-validator';
import { Expose } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { YN, Default } from 'src/common';

export class AdminMenuCreateDto extends BaseDto<AdminMenuCreateDto>
  implements Partial<Menu> {
  constructor(partial?: any) {
    super(partial);
  }

  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  nameKr: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  nameEng?: string;

  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  brandNo: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  desc?: string;

  @ApiProperty({ enum: YN })
  @Expose()
  @IsEnum(YN)
  @Default(YN.NO)
  mainYn: YN;

  @ApiPropertyOptional({ enum: YN })
  @IsOptional()
  @IsEnum(YN)
  @Default(YN.NO)
  @Expose()
  showYn?: YN;

  @ApiPropertyOptional({ enum: YN })
  @IsOptional()
  @IsEnum(YN)
  @Default(YN.NO)
  @Expose()
  delYn?: YN;
}
