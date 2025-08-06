
import { fetchPhotoById } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";

interface Props {
  params: { id: string };
}

const BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL || "http://localhost:8000";

export default async function PhotoDetailsPage({ params }: Props) {
  const photo = await fetchPhotoById(params.id);

  if (!photo) {
    return (
      <div className="text-center mt-32 text-red-500">Photo not found.</div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 pt-28 md:pt-32 pb-8">
      <Link href="/gallery" className="text-gray-600 hover:underline hover:text-orange-600 transition-colors duration-300">
        &larr; Back to Gallery
      </Link>

      <h1 className="text-3xl font-bold mt-4 mb-2">{photo.title}</h1>
      <p className="text-gray-600 mb-6">{photo.description}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {photo.src?.map((img: string, index: number) => (
          <div key={index} className="relative w-full aspect-[4/3]">
            <Image
              src={`${BASE_URL}${img}`}
              alt={`Photo ${index + 1}`}
              layout="fill"
              objectFit="cover"
              className="rounded shadow"
            />
          </div>
        ))}
      </div>

      <div className="mt-6 text-sm text-gray-500">
        <p>
          <strong>Category:</strong> {photo.category || "Uncategorized"}
        </p>
        <p>
          <strong>Location:</strong> {photo.location || "Unknown"}
        </p>
        <p>
          <strong>Date:</strong>{" "}
          {photo.date ? new Date(photo.date).toLocaleDateString() : "N/A"}
        </p>
      </div>
    </div>
  );
}
