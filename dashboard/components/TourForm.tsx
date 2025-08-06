"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  PlusCircle,
  MinusCircle,
  MapPin,
  Calendar,
  Users,
  DollarSign,
  Image as ImageIcon,
  FileText,
  HelpCircle,
  Book,
  Shield,
  Star,
  Tag,
  Link,
  Activity,
  MountainSnow,
} from "lucide-react";
import { getTourById } from "@/lib/data-utils";
import { toast } from "react-hot-toast";
import { BASE_URL } from "@/Var";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { Tour } from "@/lib/data-utils";

const tourCategories = [
  "Trekking",
  "Cultural",
  "Adventure",
  "Sightseeing",
  "Wildlife",
  "Historical",
  "Mountaineering",
];

const ImagePreview = ({
  src,
  onRemove,
}: {
  src: string;
  onRemove: () => void;
}) => {
  return (
    <div className="relative group">
      <img
        src={src || "/placeholder.svg?height=200&width=300"}
        alt="Tour image"
        className="w-full h-32 object-cover rounded-md border"
      />
      <Button
        type="button"
        variant="destructive"
        size="icon"
        className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={onRemove}
      >
        <MinusCircle className="h-4 w-4" />
      </Button>
    </div>
  );
};

const defaultTour: Tour = {
  id: "",
  name: "",
  country: "",
  location: "",
  category: "",
  days: 1,
  groupSize: "",
  difficulty: "Easy",
  rating: 0,
  reviews: 0,
  price: 0,
  originalPrice: 0,
  images: [],
  availability: "",
  nextDeparture: "",
  features: [""],
  highlights: [""],
  included: [""],
  inclusions: [""],
  exclusions: [""],
  shortDescription: "",
  longDescription: "",
  overview: "",
  whyChoose: [{ title: "", description: "" }],
  physicalRequirements: "",
  bestTime: "",
  itineraries: [
    {
      day: 1,
      title: "",
      description: "",
      activities: [""],
      accommodation: "",
      meals: [""],
      location: "",
      duration: "",
      type: "",
      highlights: [""],
      images: [],
    },
  ],
  featured: false,
  tags: [""],
  relatedTrips: [""],
  destination: "",
  faqs: [{ question: "", answer: "" }],
  termsAndConditions: [""],
  policies: [""],
  map: { latitude: 0, longitude: 0 },
  createdAt: "",
  updatedAt: "",
};

export default function TourForm({
  tourId = null,
  initialData = null,
}: {
  tourId?: string | null;
  initialData?: Tour | null;
}) {
  const [tour, setTour] = useState<Tour>(initialData ?? defaultTour);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [itineraryImageFiles, setItineraryImageFiles] = useState<{
    [dayIndex: number]: File[];
  }>({});
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [itineraryImagePreviews, setItineraryImagePreviews] = useState<{
    [dayIndex: number]: string[];
  }>({});
  const router = useRouter();

  useEffect(() => {
    const fetchTour = async () => {
      if (tourId && !initialData) {
        const fetchedTour = await getTourById(tourId);
        if (fetchedTour) {
          setTour(fetchedTour);
          if (fetchedTour.images && fetchedTour.images.length > 0) {
            setImagePreviews(fetchedTour.images);
          }
          if (fetchedTour.itineraries) {
            const itineraryPreviews: { [key: number]: string[] } = {};
            fetchedTour.itineraries.forEach((itinerary: any, index: number) => {
              if (itinerary.images && itinerary.images.length > 0) {
                itineraryPreviews[index] = itinerary.images;
              }
            });
            setItineraryImagePreviews(itineraryPreviews);
          }
        }
      }
    };
    fetchTour();
    if (tourId && initialData) {
      setTour(initialData);
      if (initialData.images && initialData.images.length > 0) {
        setImagePreviews(initialData.images);
      }
      if (initialData.itineraries) {
        const itineraryPreviews: { [key: number]: string[] } = {};
        initialData.itineraries.forEach((itinerary: any, index: number) => {
          if (itinerary.images && itinerary.images.length > 0) {
            itineraryPreviews[index] = itinerary.images;
          }
        });
        setItineraryImagePreviews(itineraryPreviews);
      }
    } else if (initialData) {
      setTour(initialData);
    }
  }, [tourId, initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number | null = null,
    field: keyof Tour | null = null
  ) => {
    const { name, value } = e.target;
    if (index !== null && field) {
      setTour((prevTour: Tour) => ({
        ...prevTour,
        [field]: (prevTour[field] as any[]).map((item: any, i: number) =>
          i === index ? { ...item, [name]: value } : item
        ),
      }));
    } else {
      setTour((prevTour: Tour) => ({ ...prevTour, [name]: value }));
    }
  };

  const handleMapChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTour((prevTour: Tour) => ({
      ...prevTour,
      map: { ...prevTour.map, [name]: Number.parseFloat(value) },
    }));
  };

  const handleArrayChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    field: keyof Tour
  ) => {
    const { value } = e.target;
    setTour((prevTour: Tour) => ({
      ...prevTour,
      [field]: (prevTour[field] as string[]).map((item: string, i: number) =>
        i === index ? value : item
      ),
    }));
  };

  const addArrayItem = (field: keyof Tour) => {
    setTour((prevTour: Tour) => ({
      ...prevTour,
      [field]: [...(prevTour[field] as string[]), ""],
    }));
  };

  const removeArrayItem = (index: number, field: keyof Tour) => {
    setTour((prevTour: Tour) => ({
      ...prevTour,
      [field]: (prevTour[field] as string[]).filter(
        (_, i: number) => i !== index
      ),
    }));
  };

  const updateItineraryDays = (days: number) => {
    setTour((prevTour: Tour) => {
      const newItineraries = [...prevTour.itineraries];
      const currentDays = newItineraries.length;
      if (days > currentDays) {
        for (let i = currentDays + 1; i <= days; i++) {
          newItineraries.push({
            day: i,
            title: "",
            description: "",
            activities: [""],
            accommodation: "",
            meals: [""],
            location: "",
            duration: "",
            type: "",
            highlights: [""],
            images: [],
          });
        }
      } else if (days < currentDays) {
        newItineraries.splice(days);
      }
      return { ...prevTour, itineraries: newItineraries };
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const files = Array.from(e.target.files) as File[];
    setImageFiles((prev) => [...prev, ...files]);
    const fileUrls = files.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev, ...fileUrls]);
    setTour((prevTour: Tour) => ({
      ...prevTour,
      images: [...prevTour.images, ...fileUrls],
    }));
  };

  const removeImage = (index: number) => {
    if (imagePreviews[index]) {
      URL.revokeObjectURL(imagePreviews[index]);
    }
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    setTour((prevTour: Tour) => ({
      ...prevTour,
      images: prevTour.images.filter((_, i) => i !== index),
    }));
  };

  const handleItineraryImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    dayIndex: number
  ) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const files = Array.from(e.target.files) as File[];
    setItineraryImageFiles((prev) => ({
      ...prev,
      [dayIndex]: [...(prev[dayIndex] || []), ...files],
    }));
    const fileUrls = files.map((file) => URL.createObjectURL(file));
    setItineraryImagePreviews((prev) => ({
      ...prev,
      [dayIndex]: [...(prev[dayIndex] || []), ...fileUrls],
    }));
    setTour((prevTour: Tour) => ({
      ...prevTour,
      itineraries: prevTour.itineraries.map((day, i) =>
        i === dayIndex ? { ...day, images: [...day.images, ...fileUrls] } : day
      ),
    }));
  };

  const removeItineraryImage = (dayIndex: number, imageIndex: number) => {
    const urlToRemove = itineraryImagePreviews[dayIndex]?.[imageIndex];
    if (urlToRemove) {
      URL.revokeObjectURL(urlToRemove);
    }
    setItineraryImageFiles((prev) => ({
      ...prev,
      [dayIndex]: (prev[dayIndex] || []).filter((_, i) => i !== imageIndex),
    }));
    setItineraryImagePreviews((prev) => ({
      ...prev,
      [dayIndex]: (prev[dayIndex] || []).filter((_, i) => i !== imageIndex),
    }));
    setTour((prevTour: Tour) => ({
      ...prevTour,
      itineraries: prevTour.itineraries.map((day, i) =>
        i === dayIndex
          ? {
              ...day,
              images: day.images.filter((_, imgI) => imgI !== imageIndex),
            }
          : day
      ),
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Tour data:", tour);
    console.log("Tour Id:", tourId);

    const formData = new FormData();

    if (!tour) {
      // console.error("Tour data is undefined!");
      toast.error("Tour data is missing!");
      return;
    }

    // ✅ Add main tour images to FormData (only if images exist)
    if (imageFiles?.length > 0) {
      imageFiles.forEach((file) => {
        formData.append("images", file);
      });
    }

    // ✅ Add itinerary images to FormData
    Object.values(itineraryImageFiles).forEach((files) => {
      files.forEach((file) => {
        formData.append("itineraryImages", file);
      });
    });

    // ✅ Extract tour data without images
    const { images, itineraries, id, ...tourData } = tour || {};

    // ✅ Check if the tour is being updated
    const isUpdating =
      (tourId !== null && typeof tourId === "string" && tourId.trim() !== "") ||
      (tour.id !== null &&
        typeof tour.id === "string" &&
        tour.id.trim() !== "");

    // ✅ Process itineraries
    const processedItineraries = itineraries?.map(
      (itinerary: any, index: number) => ({
        ...itinerary,
        images: undefined,
        imageCount: (itineraryImageFiles[index] || []).length,
      })
    );

    // ✅ Append text data as JSON
    formData.append(
      "tourData",
      JSON.stringify({
        ...tourData,
        ...(isUpdating ? { id: tour.id } : {}),
        itineraries: processedItineraries || [],
      })
    );

    const url = isUpdating
      ? `${BASE_URL}/api/tours/${tourId}`
      : `${BASE_URL}/api/tours`;
    const method = isUpdating ? "put" : "post";
    console.log(`Submitting tour with method: ${method}, URL: ${url}`);

    // ✅ Debugging: Log FormData before sending
    // for (let pair of formData.entries()) {
    //   console.log("FormData Key:", pair[0], "=>", pair[1]);
    // }

    try {
      const response = await axios({
        method,
        url,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });

      // ✅ Ensure a successful request before showing success toast
      if (response.status >= 200 && response.status < 300) {
        toast.success(`Tour ${isUpdating ? "updated" : "added"} successfully`);
        router.push("/admin/tours");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(
          "Error saving tour:",
          (error as any).response?.data || error.message
        );
        toast.error(
          (error as any).response?.data?.message || "Failed to save tour"
        );
      } else {
        console.error("Unknown error saving tour:", error);
        toast.error("Failed to save tour");
      }
    }
  };

  // Clean up object URLs when component unmounts
  useEffect(() => {
    return () => {
      // Clean up image previews
      imagePreviews.forEach((url) => {
        if (url.startsWith("blob:")) {
          URL.revokeObjectURL(url);
        }
      });

      // Clean up itinerary image previews
      Object.values(itineraryImagePreviews).forEach((urls) => {
        urls.forEach((url) => {
          if (url.startsWith("blob:")) {
            URL.revokeObjectURL(url);
          }
        });
      });
    };
  }, [imagePreviews, itineraryImagePreviews]);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information Section */}
      <Card>
        <CardHeader className="bg-gray-50">
          <CardTitle className="flex items-center">
            <Book className="w-5 h-5 mr-2" />
            Basic Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center">
                <MountainSnow className="w-4 h-4 mr-2" />
                Tour Name
              </Label>
              <Input
                id="name"
                name="name"
                value={tour.name}
                onChange={handleChange}
                required
                placeholder="Enter tour name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category" className="flex items-center">
                <Tag className="w-4 h-4 mr-2" />
                Category
              </Label>
              <Select
                name="category"
                value={tour.category}
                onValueChange={(value) =>
                  handleChange({
                    target: { name: "category", value },
                  } as React.ChangeEvent<HTMLInputElement>)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {tourCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="country" className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                Country
              </Label>
              <Input
                id="country"
                name="country"
                value={tour.country}
                onChange={handleChange}
                placeholder="Enter country"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                Location
              </Label>
              <Input
                id="location"
                name="location"
                value={tour.location}
                onChange={handleChange}
                required
                placeholder="Enter location"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="days" className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                Duration (Days)
              </Label>
              <Input
                id="days"
                name="days"
                type="number"
                min="1"
                value={tour.days}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="groupSize" className="flex items-center">
                <Users className="w-4 h-4 mr-2" />
                Group Size
              </Label>
              <Input
                id="groupSize"
                name="groupSize"
                value={tour.groupSize}
                onChange={handleChange}
                required
                placeholder="e.g., 2-12 people"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="difficulty" className="flex items-center">
                <Activity className="w-4 h-4 mr-2" />
                Difficulty
              </Label>
              <Select
                name="difficulty"
                value={tour.difficulty}
                onValueChange={(value) =>
                  handleChange({
                    target: { name: "difficulty", value },
                  } as React.ChangeEvent<HTMLInputElement>)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Easy">Easy</SelectItem>
                  <SelectItem value="Moderate">Moderate</SelectItem>
                  <SelectItem value="Challenging">Challenging</SelectItem>
                  <SelectItem value="Expert">Expert</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="destination" className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                Destination
              </Label>
              <Input
                id="destination"
                name="destination"
                value={tour.destination}
                onChange={handleChange}
                placeholder="Enter destination"
              />
            </div>

            <div className="flex items-center space-x-2 pt-6">
              <input
                type="checkbox"
                id="featured"
                name="featured"
                checked={tour.featured}
                onChange={(e) =>
                  setTour((prev) => ({ ...prev, featured: e.target.checked }))
                }
                className="h-4 w-4"
              />
              <Label htmlFor="featured">Featured Tour</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pricing & Availability Section */}
      <Card>
        <CardHeader className="bg-gray-50">
          <CardTitle className="flex items-center">
            <DollarSign className="w-5 h-5 mr-2" />
            Pricing & Availability
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Current Price</Label>
              <div className="relative">
                <span className="absolute left-3 top-2.5">$</span>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  value={tour.price}
                  onChange={handleChange}
                  required
                  className="pl-8"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="originalPrice">Original Price</Label>
              <div className="relative">
                <span className="absolute left-3 top-2.5">$</span>
                <Input
                  id="originalPrice"
                  name="originalPrice"
                  type="number"
                  value={tour.originalPrice}
                  onChange={handleChange}
                  className="pl-8"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="availability">Availability</Label>
              <Input
                id="availability"
                name="availability"
                value={tour.availability}
                onChange={handleChange}
                placeholder="e.g., Year-round"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="nextDeparture">Next Departure</Label>
              <Input
                id="nextDeparture"
                name="nextDeparture"
                type="date"
                value={tour.nextDeparture}
                onChange={handleChange}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Description Section */}
      <Card>
        <CardHeader className="bg-gray-50">
          <CardTitle className="flex items-center">
            <FileText className="w-5 h-5 mr-2" />
            Descriptions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="shortDescription">Short Description</Label>
            <Textarea
              id="shortDescription"
              name="shortDescription"
              value={tour.shortDescription}
              onChange={handleChange}
              required
              placeholder="Brief description (appears in listings)"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="longDescription">Detailed Description</Label>
            <Textarea
              id="longDescription"
              name="longDescription"
              value={tour.longDescription}
              onChange={handleChange}
              required
              placeholder="Full tour description"
              rows={5}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="overview">Tour Overview</Label>
            <Textarea
              id="overview"
              name="overview"
              value={tour.overview}
              onChange={handleChange}
              placeholder="Key points about the tour"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Media Section */}
      <Card>
        <CardHeader className="bg-gray-50">
          <CardTitle className="flex items-center">
            <ImageIcon className="w-5 h-5 mr-2" />
            Media
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Tour Images</Label>
              <p className="text-sm text-muted-foreground mb-2">
                Upload high-quality images that showcase your tour
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {imagePreviews.map((preview, index) => (
                  <ImagePreview
                    key={index}
                    src={preview}
                    onRemove={() => removeImage(index)}
                  />
                ))}
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-md cursor-pointer hover:border-primary hover:bg-gray-50 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    multiple
                  />
                  <PlusCircle className="h-6 w-6 mb-2" />
                  <span className="text-sm">Add Images</span>
                </label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Features & Highlights Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="bg-gray-50">
            <CardTitle className="flex items-center">
              <Star className="w-5 h-5 mr-2" />
              Tour Highlights
            </CardTitle>
          </CardHeader>
          <CardContent>
            {tour.highlights.map((highlight, index) => (
              <div key={index} className="flex items-center mb-2">
                <Input
                  value={highlight}
                  onChange={(e) => handleArrayChange(e, index, "highlights")}
                  className="flex-grow"
                  placeholder="Enter highlight"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeArrayItem(index, "highlights")}
                >
                  <MinusCircle className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={() => addArrayItem("highlights")}
              className="w-full mt-2"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Highlight
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-gray-50">
            <CardTitle className="flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              Inclusions & Exclusions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Included Features</Label>
              {tour.inclusions.map((item, index) => (
                <div key={index} className="flex items-center mb-2">
                  <Input
                    value={item}
                    onChange={(e) => handleArrayChange(e, index, "included")}
                    className="flex-grow"
                    placeholder="What's included"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeArrayItem(index, "included")}
                  >
                    <MinusCircle className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => addArrayItem("included")}
                className="w-full mt-2"
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Inclusion
              </Button>
            </div>

            <Separator />

            <div>
              <Label>Excluded Features</Label>
              {tour.exclusions.map((item, index) => (
                <div key={index} className="flex items-center mb-2">
                  <Input
                    value={item}
                    onChange={(e) => handleArrayChange(e, index, "exclusions")}
                    className="flex-grow"
                    placeholder="What's not included"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeArrayItem(index, "exclusions")}
                  >
                    <MinusCircle className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => addArrayItem("exclusions")}
                className="w-full mt-2"
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Exclusion
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Why Choose Section */}
      <Card>
        <CardHeader className="bg-gray-50">
          <CardTitle className="flex items-center">
            <HelpCircle className="w-5 h-5 mr-2" />
            Why Choose This Tour
          </CardTitle>
        </CardHeader>
        <CardContent>
          {tour.whyChoose.map((item, index) => (
            <div key={index} className="mb-4 space-y-2">
              <div className="flex items-center justify-between">
                <Label>Reason #{index + 1}</Label>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    setTour((prev) => ({
                      ...prev,
                      whyChoose: prev.whyChoose.filter((_, i) => i !== index),
                    }))
                  }
                >
                  Remove
                </Button>
              </div>
              <Input
                value={item.title}
                onChange={(e) => {
                  const value = e.target.value;
                  setTour((prev) => ({
                    ...prev,
                    whyChoose: prev.whyChoose.map((w, i) =>
                      i === index ? { ...w, title: value } : w
                    ),
                  }));
                }}
                placeholder="Title"
              />
              <Textarea
                value={item.description}
                onChange={(e) => {
                  const value = e.target.value;
                  setTour((prev) => ({
                    ...prev,
                    whyChoose: prev.whyChoose.map((w, i) =>
                      i === index ? { ...w, description: value } : w
                    ),
                  }));
                }}
                placeholder="Description"
                rows={3}
              />
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={() =>
              setTour((prev) => ({
                ...prev,
                whyChoose: [...prev.whyChoose, { title: "", description: "" }],
              }))
            }
            className="w-full"
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Reason
          </Button>
        </CardContent>
      </Card>

      {/* Features Section */}
      <Card>
        <CardHeader className="bg-gray-50">
          <CardTitle className="flex items-center">
            <Star className="w-5 h-5 mr-2" />
            Features
          </CardTitle>
        </CardHeader>
        <CardContent>
          {tour.features.map((feature, index) => (
            <div key={index} className="flex items-center mb-2">
              <Input
                value={feature}
                onChange={(e) => handleArrayChange(e, index, "features")}
                className="flex-grow"
                placeholder="Enter feature"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeArrayItem(index, "features")}
              >
                <MinusCircle className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={() => addArrayItem("features")}
            className="w-full mt-2"
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Feature
          </Button>
        </CardContent>
      </Card>

      {/* Itinerary Section */}
      <Card>
        <CardHeader className="bg-gray-50">
          <CardTitle className="flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            Itinerary
          </CardTitle>
        </CardHeader>
        <CardContent>
          {tour.itineraries?.map((day, index) => (
            <div key={index} className="border rounded-lg p-4 mb-4 bg-white">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg">Day {day.day}</h3>
                <Button
                  type="button"
                  variant="ghost"
                  className="text-destructive"
                  onClick={() => {
                    const newItineraries = [...tour.itineraries];
                    newItineraries.splice(index, 1);
                    setTour((prev) => ({
                      ...prev,
                      itineraries: newItineraries,
                      days: newItineraries.length,
                    }));
                  }}
                >
                  Remove Day
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`day-${index}-title`}>Day Title</Label>
                  <Input
                    id={`day-${index}-title`}
                    name="title"
                    value={day.title || ""}
                    onChange={(e) => handleChange(e, index, "itineraries")}
                    placeholder="Day title"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`day-${index}-location`}>Location</Label>
                  <Input
                    id={`day-${index}-location`}
                    name="location"
                    value={day.location || ""}
                    onChange={(e) => handleChange(e, index, "itineraries")}
                    placeholder="Location"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor={`day-${index}-description`}>
                    Description
                  </Label>
                  <Textarea
                    id={`day-${index}-description`}
                    name="description"
                    value={day.description || ""}
                    onChange={(e) => handleChange(e, index, "itineraries")}
                    placeholder="Detailed description of the day's activities"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`day-${index}-accommodation`}>
                    Accommodation
                  </Label>
                  <Input
                    id={`day-${index}-accommodation`}
                    name="accommodation"
                    value={day.accommodation || ""}
                    onChange={(e) => handleChange(e, index, "itineraries")}
                    placeholder="Accommodation details"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`day-${index}-duration`}>Duration</Label>
                  <Input
                    id={`day-${index}-duration`}
                    name="duration"
                    value={day.duration || ""}
                    onChange={(e) => handleChange(e, index, "itineraries")}
                    placeholder="Duration of activities"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Activities</Label>
                  {day.activities?.map((activity, activityIndex) => (
                    <div key={activityIndex} className="flex items-center mb-2">
                      <Input
                        value={activity}
                        onChange={(e) => {
                          const value = e.target.value;
                          setTour((prev) => ({
                            ...prev,
                            itineraries: prev.itineraries.map((it, i) =>
                              i === index
                                ? {
                                    ...it,
                                    activities: it.activities.map((a, ai) =>
                                      ai === activityIndex ? value : a
                                    ),
                                  }
                                : it
                            ),
                          }));
                        }}
                        placeholder="Activity"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setTour((prev) => ({
                            ...prev,
                            itineraries: prev.itineraries.map((it, i) =>
                              i === index
                                ? {
                                    ...it,
                                    activities: it.activities.filter(
                                      (_, ai) => ai !== activityIndex
                                    ),
                                  }
                                : it
                            ),
                          }));
                        }}
                      >
                        <MinusCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setTour((prev) => ({
                        ...prev,
                        itineraries: prev.itineraries.map((it, i) =>
                          i === index
                            ? {
                                ...it,
                                activities: [...it.activities, ""],
                              }
                            : it
                        ),
                      }));
                    }}
                    className="w-full"
                  >
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Activity
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label>Meals</Label>
                  {day.meals?.map((meal, mealIndex) => (
                    <div key={mealIndex} className="flex items-center mb-2">
                      <Input
                        value={meal}
                        onChange={(e) => {
                          const value = e.target.value;
                          setTour((prev) => ({
                            ...prev,
                            itineraries: prev.itineraries.map((it, i) =>
                              i === index
                                ? {
                                    ...it,
                                    meals: it.meals.map((m, mi) =>
                                      mi === mealIndex ? value : m
                                    ),
                                  }
                                : it
                            ),
                          }));
                        }}
                        placeholder="Meal details"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setTour((prev) => ({
                            ...prev,
                            itineraries: prev.itineraries.map((it, i) =>
                              i === index
                                ? {
                                    ...it,
                                    meals: it.meals.filter(
                                      (_, mi) => mi !== mealIndex
                                    ),
                                  }
                                : it
                            ),
                          }));
                        }}
                      >
                        <MinusCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setTour((prev) => ({
                        ...prev,
                        itineraries: prev.itineraries.map((it, i) =>
                          i === index
                            ? {
                                ...it,
                                meals: [...it.meals, ""],
                              }
                            : it
                        ),
                      }));
                    }}
                    className="w-full"
                  >
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Meal
                  </Button>
                </div>
              </div>

              {/* Itinerary Images */}
              <div className="mt-4">
                <Label>Day Images</Label>
                <p className="text-sm text-muted-foreground mb-2">
                  Upload images specific to this day
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {(itineraryImagePreviews[index] || []).map(
                    (preview, imgIndex) => (
                      <div key={imgIndex} className="relative group">
                        <img
                          src={preview || "/placeholder.svg"}
                          alt={`Day ${day.day} image ${imgIndex + 1}`}
                          className="w-full h-24 object-cover rounded-md border"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removeItineraryImage(index, imgIndex)}
                        >
                          <MinusCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    )
                  )}
                  <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed rounded-md cursor-pointer hover:border-primary hover:bg-gray-50 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleItineraryImageUpload(e, index)}
                      className="hidden"
                      multiple
                    />
                    <PlusCircle className="h-6 w-6 mb-1" />
                    <span className="text-xs">Add Images</span>
                  </label>
                </div>
              </div>

              {/* New fields for day */}
              <div className="space-y-2">
                <Label htmlFor={`day-${index}-type`}>Type</Label>
                <Input
                  id={`day-${index}-type`}
                  name="type"
                  value={day.type || ""}
                  onChange={(e) => handleChange(e, index, "itineraries")}
                  placeholder="Type of day (e.g., Arrival, Trekking)"
                />
              </div>
              <div className="space-y-2">
                <Label>Day Highlights</Label>
                {day.highlights?.map((highlight, highlightIndex) => (
                  <div key={highlightIndex} className="flex items-center mb-2">
                    <Input
                      value={highlight}
                      onChange={(e) => {
                        const value = e.target.value;
                        setTour((prev) => ({
                          ...prev,
                          itineraries: prev.itineraries.map((it, i) =>
                            i === index
                              ? {
                                  ...it,
                                  highlights: it.highlights.map((h, hi) =>
                                    hi === highlightIndex ? value : h
                                  ),
                                }
                              : it
                          ),
                        }));
                      }}
                      placeholder="Highlight"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setTour((prev) => ({
                          ...prev,
                          itineraries: prev.itineraries.map((it, i) =>
                            i === index
                              ? {
                                  ...it,
                                  highlights: it.highlights.filter(
                                    (_, hi) => hi !== highlightIndex
                                  ),
                                }
                              : it
                          ),
                        }));
                      }}
                    >
                      <MinusCircle className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setTour((prev) => ({
                      ...prev,
                      itineraries: prev.itineraries.map((it, i) =>
                        i === index
                          ? {
                              ...it,
                              highlights: [...it.highlights, ""],
                            }
                          : it
                      ),
                    }));
                  }}
                  className="w-full"
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add Highlight
                </Button>
              </div>
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            onClick={() => {
              const newDayNumber = tour.itineraries.length + 1;
              setTour((prev) => ({
                ...prev,
                itineraries: [
                  ...prev.itineraries,
                  {
                    day: newDayNumber,
                    title: "",
                    description: "",
                    activities: [""],
                    accommodation: "",
                    meals: [""],
                    location: "",
                    duration: "",
                    type: "",
                    highlights: [""],
                    images: [],
                  },
                ],
                days: newDayNumber,
              }));
            }}
            className="w-full mt-2"
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Day
          </Button>
        </CardContent>
      </Card>

      {/* Additional Information Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="bg-gray-50">
            <CardTitle className="flex items-center">
              <HelpCircle className="w-5 h-5 mr-2" />
              FAQs
            </CardTitle>
          </CardHeader>
          <CardContent>
            {tour.faqs?.map((faq, index) => (
              <div key={index} className="mb-4 space-y-2">
                <div className="flex justify-between items-center">
                  <Label>FAQ #{index + 1}</Label>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeArrayItem(index, "faqs")}
                  >
                    Remove
                  </Button>
                </div>
                <Input
                  value={faq.question || ""}
                  onChange={(e) => handleChange(e, index, "faqs")}
                  name="question"
                  placeholder="Question"
                />
                <Textarea
                  value={faq.answer || ""}
                  onChange={(e) => handleChange(e, index, "faqs")}
                  name="answer"
                  placeholder="Answer"
                  rows={3}
                />
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                setTour((prev) => ({
                  ...prev,
                  faqs: [...(prev.faqs || []), { question: "", answer: "" }],
                }))
              }
              className="w-full"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Add FAQ
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-gray-50">
            <CardTitle className="flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              Policies & Terms
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Terms & Conditions</Label>
              {tour.termsAndConditions?.map((term, index) => (
                <div key={index} className="flex items-center mb-2">
                  <Input
                    value={term || ""}
                    onChange={(e) =>
                      handleArrayChange(e, index, "termsAndConditions")
                    }
                    className="flex-grow"
                    placeholder="Term or condition"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeArrayItem(index, "termsAndConditions")}
                  >
                    <MinusCircle className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => addArrayItem("termsAndConditions")}
                className="w-full mt-2"
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Term
              </Button>
            </div>

            <Separator />

            <div>
              <Label>Policies</Label>
              {tour.policies?.map((policy, index) => (
                <div key={index} className="flex items-center mb-2">
                  <Input
                    value={policy || ""}
                    onChange={(e) => handleArrayChange(e, index, "policies")}
                    className="flex-grow"
                    placeholder="Policy details"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeArrayItem(index, "policies")}
                  >
                    <MinusCircle className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => addArrayItem("policies")}
                className="w-full mt-2"
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Policy
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Physical Requirements & Best Time */}
      <Card>
        <CardHeader className="bg-gray-50">
          <CardTitle className="flex items-center">
            <HelpCircle className="w-5 h-5 mr-2" />
            Physical Requirements & Best Time
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="physicalRequirements">
                Physical Requirements
              </Label>
              <Textarea
                id="physicalRequirements"
                name="physicalRequirements"
                value={tour.physicalRequirements}
                onChange={handleChange}
                placeholder="Describe physical requirements for this tour"
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bestTime">Best Time</Label>
              <Input
                id="bestTime"
                name="bestTime"
                value={tour.bestTime}
                onChange={handleChange}
                placeholder="e.g., June to August"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tags & Related Trips */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="bg-gray-50">
            <CardTitle className="flex items-center">
              <Tag className="w-5 h-5 mr-2" />
              Tags
            </CardTitle>
          </CardHeader>
          <CardContent>
            {tour.tags.map((tag, index) => (
              <div key={index} className="flex items-center mb-2">
                <Input
                  value={tag}
                  onChange={(e) => handleArrayChange(e, index, "tags")}
                  className="flex-grow"
                  placeholder="Enter tag"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeArrayItem(index, "tags")}
                >
                  <MinusCircle className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={() => addArrayItem("tags")}
              className="w-full mt-2"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Tag
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-gray-50">
            <CardTitle className="flex items-center">
              <Link className="w-5 h-5 mr-2" />
              Related Trips
            </CardTitle>
          </CardHeader>
          <CardContent>
            {tour.relatedTrips.map((trip, index) => (
              <div key={index} className="flex items-center mb-2">
                <Input
                  value={trip}
                  onChange={(e) => handleArrayChange(e, index, "relatedTrips")}
                  className="flex-grow"
                  placeholder="Enter related trip slug or ID"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeArrayItem(index, "relatedTrips")}
                >
                  <MinusCircle className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={() => addArrayItem("relatedTrips")}
              className="w-full mt-2"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Related Trip
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Location & Submit Section */}
      <Card>
        <CardHeader className="bg-gray-50">
          <CardTitle className="flex items-center">
            <MapPin className="w-5 h-5 mr-2" />
            Location Coordinates
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="latitude">Latitude</Label>
              <Input
                id="latitude"
                name="latitude"
                type="number"
                step="any"
                value={tour.map?.latitude || 0}
                onChange={handleMapChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="longitude">Longitude</Label>
              <Input
                id="longitude"
                name="longitude"
                type="number"
                step="any"
                value={tour.map?.longitude || 0}
                onChange={handleMapChange}
                required
              />
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="flex flex-col justify-end">
        <Button
          type="submit"
          className="w-full h-full bg-primary hover:bg-primary-dark text-white py-2 text-lg"
        >
          {tourId ? "Update Tour" : "Create Tour"}
        </Button>
      </div>
    </form>
  );
}
