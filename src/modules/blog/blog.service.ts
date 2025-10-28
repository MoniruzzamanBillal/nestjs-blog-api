import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { BlogModel } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBlogDto } from './dto/create-blog.dto';

@Injectable()
export class BlogService {
  constructor(private prisma: PrismaService) {}

  // ! for creating a new blog
  async addNewBlog(payload: CreateBlogDto): Promise<BlogModel> {
    try {
      const result: BlogModel = await this.prisma.blogModel.create({
        data: { ...payload },
      });

      return result;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Database error:', error.message);
      } else {
        console.error('An unknown error occurred.');
      }

      throw new InternalServerErrorException('Failed to add blog');
    }
  }

  // ! for getting all blogs
  async getAllBlogs() {
    const result = await this.prisma.blogModel.findMany();

    return result;
  }

  // ! for getting single blog
  async getSingleBlog(blogId: string) {
    const result = await this.prisma.blogModel.findUniqueOrThrow({
      where: { id: blogId },
    });

    return result;
  }

  //
}
