import {
  Controller,
  Query,
  Get,
  UseGuards,
  Param,
  ParseIntPipe,
  Body,
  Post,
  Patch,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { BaseController } from 'src/core';
import { BrandService } from './brand.service';
import {
  AdminBrandListDto,
  AdminBrandCreateDto,
  AdminBrandUpdateDto,
} from './dto';
import { PaginatedRequest, PaginatedResponse, UserInfo } from 'src/common';
import { Brand } from './brand.entity';
import { AuthRolesGuard } from 'src/core/guards';
import { CONST_ADMIN_USER } from 'src/shared';
import { Admin } from '../admin';

@Controller()
@ApiTags('ADMIN BRAND')
@ApiBearerAuth()
export class AdminBrandController extends BaseController {
  constructor(private readonly brandService: BrandService) {
    super();
  }

  /**
   * create new brand by admin
   * @param admin
   * @param adminBrandCreateDto
   */
  @UseGuards(new AuthRolesGuard(...CONST_ADMIN_USER))
  @Post('/admin/brand')
  async create(
    @UserInfo() admin: Admin,
    @Body() adminBrandCreateDto: AdminBrandCreateDto,
  ): Promise<Brand> {
    return await this.brandService.create(adminBrandCreateDto, admin.no);
  }

  /**
   * brand update by admin
   * @param brandId
   * @param admin
   * @param adminBrandUpdateDto
   */
  @UseGuards(new AuthRolesGuard(...CONST_ADMIN_USER))
  @Patch('/admin/brand/:id([0-9]+)')
  async update(
    @Param('id', ParseIntPipe) brandId: number,
    @UserInfo() admin: Admin,
    @Body() adminBrandUpdateDto: AdminBrandUpdateDto,
  ): Promise<Brand> {
    return await this.brandService.update(
      brandId,
      admin.no,
      adminBrandUpdateDto,
    );
  }
  /**
   * get brands for admin
   * @param adminBrandListDto
   * @param pagination
   */
  @UseGuards(new AuthRolesGuard(...CONST_ADMIN_USER))
  @Get('/admin/brand')
  async findAll(
    @Query() adminBrandListDto: AdminBrandListDto,
    @Query() pagination: PaginatedRequest,
  ): Promise<PaginatedResponse<Brand>> {
    return await this.brandService.findAll(adminBrandListDto, pagination);
  }

  /**
   * find one for brand
   * @param brandId
   */
  @UseGuards(new AuthRolesGuard(...CONST_ADMIN_USER))
  @Get('/admin/brand/:id([0-9]+)')
  async findOne(@Param('id', ParseIntPipe) brandId: number): Promise<Brand> {
    return await this.brandService.findOne(brandId);
  }
}
