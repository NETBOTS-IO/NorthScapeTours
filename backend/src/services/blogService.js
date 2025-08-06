import Blog from "../models/blogModel.js";
import { calculateReadTime } from "../utils/readTimeCalculator.js";

class BlogService {
  async createBlog(blogData) {
    // Inject calculated readTime
    blogData.readTime = calculateReadTime(blogData.content);
    return await Blog.create(blogData);
  }

  async getAllBlogs(query = {}) {
    const {
      page = 1,
      limit = 10,
      author,
      tag,
      search,
      category,
      status = "published",
    } = query;

    const filter = {};

    if (author) filter.author = author;
    if (tag) filter.tags = tag;
    if (category) filter.category = category;
    if (status) filter.status = status;

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { summary: { $regex: search, $options: "i" } },
        { "content.blocks.data.text": { $regex: search, $options: "i" } },
      ];
    }

    const skip = (page - 1) * limit;
    const blogs = await Blog.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Blog.countDocuments(filter);

    return {
      blogs,
      total,
      pages: Math.ceil(total / limit),
      currentPage: Number(page),
    };
  }

  async getBlogById(id) {
    const blog = await Blog.findById(id);
    if (!blog) throw new Error("Blog not found");
    return blog;
  }

  async updateBlog(id, blogData) {
    blogData.readTime = calculateReadTime(blogData.content);
    const updatedBlog = await Blog.findByIdAndUpdate(id, blogData, {
      new: true,
      runValidators: true,
    });
    if (!updatedBlog) throw new Error("Blog not found");
    return updatedBlog;
  }

  async deleteBlog(id) {
    const deleted = await Blog.findByIdAndDelete(id);
    if (!deleted) throw new Error("Blog not found");
    return deleted;
  }

  async getPopularBlogs(limit = 5) {
    return await Blog.find({ status: "published" })
      .sort({ createdAt: -1 })
      .limit(limit);
  }

  async getFeaturedBlogs(limit = 3) {
    return await Blog.find({ isFeatured: true, status: "published" })
      .sort({ createdAt: -1 })
      .limit(limit);
  }

  async getRelatedBlogs(blogId) {
    const currentBlog = await Blog.findById(blogId);
    if (!currentBlog) throw new Error("Blog not found");

    const relatedBlogs = await Blog.find({
      _id: { $ne: blogId },
      $or: [
        { category: currentBlog.category },
        { tags: { $in: currentBlog.tags || [] } },
      ],
    }).limit(4);

    return relatedBlogs;
  }
}

const blogService = new BlogService();
export default blogService;
