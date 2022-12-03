import { Body, Controller, Delete, Get, HttpException, HttpStatus, Logger, Param, Patch, Post } from '@nestjs/common';
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

    const category = await this.categoryService.getById(id);

    if(!category) {
      throw new HttpException(`Category with id of ${id} doesn't exist!`, HttpStatus.NOT_FOUND);
    }

    return category;
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
  @Patch(':id')
  async update(@Param('id', ParseObjectIdPipe) id: string, @Body() categoryDto: CategoryDto): Promise<Category> {
    Logger.log(`Getting category with id: ${id} (UPDATE)`);

    const category = await this.categoryService.getById(id);
    
    if(!category) {
      throw new HttpException(`Category with id of ${id} doesn't exist!`, HttpStatus.NOT_FOUND);
    }

    return this.categoryService.update(id, categoryDto);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  async delete(@Param('id', ParseObjectIdPipe) id: string): Promise<Category> {

    Logger.log(`Getting category with id: ${id} (DELETE)`);

    const category = await this.categoryService.getById(id);
    
    if(!category) {
      throw new HttpException(`Category with id of ${id} doesn't exist!`, HttpStatus.NOT_FOUND);
    }
    
    return this.categoryService.delete(id);
  }

}