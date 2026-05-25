import { Blog, BlogAPIResponse, SearchBlogsResponse } from "@/data/blogs-types";
import { GalleryPhoto } from "@/data/gallery-data";
import { RentCar } from "@/data/rent-data";
import { Testimonial } from "@/data/testimonials";
import { Tour } from "@/data/trips-data";
import { ContactDataTypes } from "@/data/contact-data";
import axios from "axios";
import { Destination } from "@/data/destinations-data";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
// const BASE_URL = "https://api.northscapepakistan.com"

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

interface GalleryApiResponse {
  photos: GalleryPhoto[];
  total: number;
  currentPage: number;
  pages: number;
}

// Custom error types
export class NetworkError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NetworkError";
  }
}

export class ApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ApiError";
  }
}

function isAxiosError(error: any): boolean {
  return error && error.isAxiosError === true;
}

export async function fetchTours() {
  try {
    const res = await axios.get<ApiResponse<any[]>>(`${BASE_URL}/api/tours`, {
      withCredentials: true,
    });
    if (res.data && res.data.success) {
      return res.data.data;
    } else {
      throw new ApiError(res.data?.message || "Failed to fetch tours");
    }
  } catch (error) {
    const err = error as any;
    if (isAxiosError(err)) {
      throw new NetworkError(
        err.response?.data?.message ||
          err.message ||
          "Network error while fetching tours"
      );
    }
    throw new ApiError("Unexpected error while fetching tours");
  }
}

export async function fetchTourById(id: string) {
  try {
    const res = await axios.get<ApiResponse<any>>(
      `${BASE_URL}/api/tours/${id}`,
      {
        withCredentials: true,
      }
    );
    if (res.data && res.data.success) {
      return res.data.data;
    } else {
      throw new ApiError(res.data?.message || "Failed to fetch tour");
    }
  } catch (error) {
    const err = error as any;
    if (isAxiosError(err)) {
      throw new NetworkError(
        err.response?.data?.message ||
          err.message ||
          "Network error while fetching tour"
      );
    }
    throw new ApiError("Unexpected error while fetching tour");
  }
}

export async function fetchRelatedTours(id: string) {
  try {
    const res = await axios.get<ApiResponse<any[]>>(
      `${BASE_URL}/api/tours/${id}/related`,
      { withCredentials: true }
    );
    if (res.data && res.data.success) {
      return res.data.data;
    } else {
      throw new ApiError(res.data?.message || "Failed to fetch related tours");
    }
  } catch (error) {
    const err = error as any;
    if (isAxiosError(err)) {
      throw new NetworkError(
        err.response?.data?.message ||
          err.message ||
          "Network error while fetching related tours"
      );
    }
    throw new ApiError("Unexpected error while fetching related tours");
  }
}

export async function fetchTourCategories() {
  try {
    const res = await axios.get<ApiResponse<any[]>>(
      `${BASE_URL}/api/tours/categories`,
      { withCredentials: true }
    );
    if (res.data && res.data.success) {
      return res.data.data;
    } else {
      throw new ApiError(
        res.data?.message || "Failed to fetch tour categories"
      );
    }
  } catch (error) {
    const err = error as any;
    if (isAxiosError(err)) {
      throw new NetworkError(
        err.response?.data?.message ||
          err.message ||
          "Network error while fetching tour categories"
      );
    }
    throw new ApiError("Unexpected error while fetching tour categories");
  }
}

export async function fetchGalleryPhotos(
  page = 1,
  limit = 20
): Promise<GalleryApiResponse> {
  try {
    const query = new URLSearchParams({
      page: String(page),
      limit: String(limit),
    });

    const res = await axios.get<GalleryApiResponse>(
      `${BASE_URL}/api/gallery?${query}`,
      {
        withCredentials: true,
      }
    );

    const data = res.data;

    if (data?.photos && Array.isArray(data.photos)) {
      const photos = data.photos.map((photo: any) => ({
        ...photo,
        id: photo._id,
      }));

      return {
        photos,
        total: data.total,
        currentPage: data.currentPage,
        pages: data.pages,
      };
    }

    // fallback in case no photos returned
    return { photos: [], total: 0, currentPage: 1, pages: 1 };
  } catch (error) {
    console.error("Error loading gallery:", error);
    return { photos: [], total: 0, currentPage: 1, pages: 1 };
  }
}

export async function fetchPhotoById(id: string) {
  try {
    const res = await axios.get<ApiResponse<GalleryPhoto>>(
      `${BASE_URL}/api/gallery/${id}`,
      {
        withCredentials: true,
      }
    );
    const photoData = res.data?.data;

    if (photoData && photoData._id) {
      return { ...photoData, id: photoData._id };
    }

    console.log("Fetched photo data is missing or malformed:", res.data);
    return null;
  } catch (error) {
    console.error("Error fetching photo by ID:", error);
    return null;
  }
}
export async function fetchRentalCar() {
  try {
    const res = await axios.get<ApiResponse<RentCar>>(`${BASE_URL}/api/rent/`);
    const rentCarData = res?.data;

    return rentCarData;
  } catch (error) {
    console.error("Error fetching cars:", error);
    return null;
  }
}

export async function getCarById(id: string): Promise<RentCar | {}> {
  try {
    const res = await axios.get(`${BASE_URL}/api/rent/${id}`);
    return res.data || {};
  } catch (error) {
    console.error(`Failed to fetch car with ID ${id}:`, error);
    return {};
  }
}

//blogs apis
export async function fetchBlogs() {
  try {
    const res = await axios.get<ApiResponse<any[]>>(`${BASE_URL}/api/blogs/`, {
      withCredentials: true,
    });
    if (res.data && res.data.success) {
      return res.data.data;
    } else {
      throw new ApiError(res.data?.message || "Failed to fetch tours");
    }
  } catch (error) {
    const err = error as any;
    if (isAxiosError(err)) {
      throw new NetworkError(
        err.response?.data?.message ||
          err.message ||
          "Network error while fetching tours"
      );
    }
    throw new ApiError("Unexpected error while fetching tours");
  }
}

// BLOGS
// Get all blogs with optional filters
export interface BlogsResponse {
  blogs: Blog[];
  total: number;
  pages: number;
  currentPage: number;
}

interface APIResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export async function getBlogs(query: {
  page?: number;
  limit?: number;
  search?: string;
}): Promise<BlogsResponse> {
  const params = new URLSearchParams();

  if (query.page) params.append("page", query.page.toString());
  if (query.limit) params.append("limit", query.limit.toString());
  if (query.search) params.append("search", query.search);

  const res = await axios.get<ApiResponse<BlogsResponse>>(
    `${BASE_URL}/api/blogs?${params.toString()}`
  );
  return res.data.data;
}

// Get single blog by ID
export const getBlogById = async (id: string): Promise<Blog> => {
  try {
    const res = await axios.get<BlogAPIResponse>(`${BASE_URL}/api/blogs/${id}`);
    return res.data.data!; // Return the data property from the response
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "Failed to fetch blog");
  }
};

// Search blogs
export const searchBlogs = async (query: string): Promise<Blog[]> => {
  try {
    const res = await axios.get<SearchBlogsResponse>(
      `${BASE_URL}/api/blogs/search`,
      {
        params: { search: query },
      }
    );
    return res.data.blogs;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "Failed to search blogs");
  }
};

// Get popular blogs
export const getPopularBlogs = async (): Promise<Blog[]> => {
  try {
    const res = await axios.get<SearchBlogsResponse>(
      `${BASE_URL}/api/blogs/popular`
    );
    return res.data.blogs;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message || "Failed to load popular blogs"
    );
  }
};

// Get related blogs (based on category or tags)
export const getRelatedBlogs = async (blogId: string): Promise<Blog[]> => {
  try {
    const res = await axios.get<SearchBlogsResponse>(
      `${BASE_URL}/api/blogs/related/${blogId}`
    );
    return res.data.blogs;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message || "Failed to load related blogs"
    );
  }
};

//TESTIMONIALS APIS
export interface TestimonialsFormState {
  _id?: string;
  name: string;
  location: string;
  description: string;
  image: File | string;
  tags: string[];
  rating: number;
  occupation: string;
  tripName: string;
  tripDate: string;
  verified: boolean;
  featured: boolean;
  createdAt?: string;
}
interface GetTestimonialsResponse {
  data: {
    testimonials: TestimonialsFormState[];
    total: number;
  };
}

export async function getTestimonials(query: {
  page?: number;
  limit?: number;
  search?: string;
}): Promise<GetTestimonialsResponse["data"]> {
  const params = new URLSearchParams();

  if (query.page) params.append("page", query.page.toString());
  if (query.limit) params.append("limit", query.limit.toString());
  if (query.search) params.append("search", query.search);

  const res = await axios.get<GetTestimonialsResponse>(
    `${BASE_URL}/api/testimonials/?${params.toString()}`
  );
  return res.data.data; // Return the data bookings from the response
}

//================ TOUR BOOKING APIS ===============
type FormDataProps = {
  tourId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  totalPrice: number;
  availability: boolean;
};

export async function createTourBooking(
  tourData: Partial<FormDataProps>
): Promise<FormDataProps | undefined> {
  try {
    const response = await axios.post<{ data: FormDataProps }>(
      `${BASE_URL}/api/tour-booking/`,
      tourData
    );
    console.log("booking tour res:", response.data);
    return response.data;
  } catch (error) {
    // console.error(`Failed to booking tour`, error);
    return error?.response;
  }
}

export async function updateTourBookingById(
  id: string,
  tourData: Partial<FormDataProps>
): Promise<Tour | undefined> {
  try {
    const response = await axios.put<{ data: Tour }>(
      `${BASE_URL}/api/tours/update-tour/${id}`,
      tourData
    );
    // console.log("Updated tour:", response.data.data);
    return response.data.data;
  } catch (error) {
    // console.error(`Failed to fetch tour with ID ${id}:`, error);
    return undefined;
  }
}

export async function createContact(contactData: ContactDataTypes) {
  try {
    const res = await axios.post(`${BASE_URL}/api/contact/`, contactData);
    console.log("res", res);
    return res.data;
  } catch (error) {
    console.error("Error fetching cars:", error);
    return null;
  }
}

// ---------- Destinations ----------
export async function getDestinations(): Promise<Destination | []> {
  try {
    const response = await axios.get<Destination>(
      `${BASE_URL}/api/destinations/`
    );
    // console.log('response', response)
    return response.data.data;
  } catch (error) {
    console.error("Failed to fetch Destinations:", error);
    return [];
  }
}

export async function getDestinationById(
  id: string
): Promise<Destination | null> {
  try {
    const res = await axios.get<{ data: Destination }>(
      `${BASE_URL}/api/destinations/${id}`
    );
    console.log("res", res);
    return res.data.data ?? null;
  } catch (error) {
    console.error(`Failed to fetch destination with ID ${id}:`, error);
    return null;
  }
}

//============ DESTINAITON BOOKING ===========
type DestinationFormProps = {
  destinationId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  departureDate: string;
  totalPrice: string;
  travelers: number;
  availability: boolean;
};
export async function createDestinationBooking(
  destinationData: Partial<DestinationFormProps>
): Promise<DestinationFormProps | undefined> {
  try {
    const response = await axios.post<{ data: DestinationFormProps }>(
      `${BASE_URL}/api/destination-booking/`,
      destinationData
    );
    console.log("booking destination res:", response.data);
    return response.data;
  } catch (error) {
    // console.error(`Failed to booking tour`, error);
    return error?.response;
  }
}
