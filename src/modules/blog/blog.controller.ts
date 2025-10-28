import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogServices: BlogService) {}

  @Post('/add-blog')
  async addNewBlog(@Body() addBlogDto: CreateBlogDto) {
    const result = await this.blogServices.addNewBlog(addBlogDto);

    return {
      success: true,
      statusCode: HttpStatus.CREATED,
      data: result,
    };
  }

  @Get('/all-blogs')
  async allBlogs() {
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

  //
}
