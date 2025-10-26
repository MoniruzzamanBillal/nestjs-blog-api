import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogServices: BlogService) {}

  @Get('')
  allBlogs() {
    return {
      message: 'All blogs retrived successfully !!!',
    };
  }

  @Post('/add-blog')
  async addNewBlog(@Body() addBlogDto: CreateBlogDto) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const result = await this.blogServices.addNewBlog(addBlogDto);

    return {
      success: true,
      statusCode: HttpStatus.CREATED,
      data: result,
    };
  }

  //
}
