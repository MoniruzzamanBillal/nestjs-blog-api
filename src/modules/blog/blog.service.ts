import { Injectable } from '@nestjs/common';
import { BlogModel } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

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
    } catch (error) {
      throw new Error('Failed to add blog', error);
    }
  }

  // ! for getting all blogs
  async getAllBlogs() {
    const result = await this.prisma.blogModel.findMany();

    return result;
  }

  // ! for getting single blog
  async getSingleBlog(blogId: string) {
    try {
      const result = await this.prisma.blogModel.findUniqueOrThrow({
        where: { id: blogId },
      });

      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  // ! for updating blog
  async updateBlog(blogId: string, payload: UpdateBlogDto) {
    try {
      await this.prisma.blogModel.findUniqueOrThrow({ where: { id: blogId } });

      const result = await this.prisma.blogModel.update({
        where: { id: blogId },
        data: { ...payload },
      });

      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  //
}
