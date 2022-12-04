import { Body, Controller, Delete, Get, Logger, Param, Post } from '@nestjs/common';
import { Roles } from '../auth/auth.module';
import { Role } from '../auth/role.enum';
import { ParseObjectIdPipe } from '../shared/pipes/ParseObjectIdPipe';
import { CategoryDto } from './category.dto';
import { Category } from "./category.schema";
import { CategoryService } from './category.service';

@Controller('categories')
export class CommunitiesController {
  constructor(private readonly categoryService: CategoryService) {}

  @Roles(Role.Admin)
  @Get(':id')
  async getById(
    @Param('id', ParseObjectIdPipe) id: string): Promise<Category> {
      
    Logger.log(`Getting category with id: ${id} (READ)`);

    return await this.categoryService.getById(id);
  }

  @Get()
  async getAll(): Promise<Category[]> {
      Logger.log(`Getting all categories (READ)`);

      return this.categoryService.getAll();
  }


  @Roles(Role.Admin)
  @Post()
  async create(@Body() categoryDto: CategoryDto): Promise<Category> {
      Logger.log(`Creating category (CREATE)`);

      return this.categoryService.create(categoryDto);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  async delete(@Param('id', ParseObjectIdPipe) id: string): Promise<Category> {

    Logger.log(`Getting category with id: ${id} (DELETE)`);
    
    return this.categoryService.delete(id);
  }

}