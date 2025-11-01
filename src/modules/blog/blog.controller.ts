import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogServices: BlogService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/add-blog')
  async addNewBlog(@Body() addBlogDto: CreateBlogDto, @Request() req) {
    console.log('user info = ', req?.user);

    const result = await this.blogServices.addNewBlog(addBlogDto);

    return {
      success: true,
      statusCode: HttpStatus.CREATED,
      data: result,
    };
  }

  @Get('/all-blogs')
  async allBlogs(@Request() req) {
    const result = await this.blogServices.getAllBlogs();

    return {
      success: true,
      statusCode: HttpStatus.OK,
      data: result,
    };
  }

  // ! for getting single blog
  @Get('/:id')
  async getSingleBlog(@Param('id') id: string) {
    const result = await this.blogServices.getSingleBlog(id);

    return {
      success: true,
      statusCode: HttpStatus.OK,
      data: result,
    };
  }

  // ! for updating a blog
  @Patch('/update-blog/:id')
  async updateBlog(
    @Param('id') id: string,
    @Body() updateBlogDto: UpdateBlogDto,
  ) {
    const result = await this.blogServices.updateBlog(id, updateBlogDto);

    return {
      success: true,
      statusCode: HttpStatus.OK,
      data: result,
    };
  }

  //
}
