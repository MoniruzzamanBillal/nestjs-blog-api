import { Controller, Get } from '@nestjs/common';

@Controller('blog')
export class BlogController {
  @Get('')
  allBlogs() {
    return {
      message: 'All blogs retrived successfully !!!',
    };
  }

  //
}
