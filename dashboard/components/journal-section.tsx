import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BookOpen } from "lucide-react"

export function JournalSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container">
        <div className="flex justify-between items-center mb-10">
          <div>
            <div className="text-sm text-[#1E8A95] font-medium mb-2">2025</div>
            <h2 className="text-3xl font-bold">From the journal</h2>
          </div>
          <Link href="#">
            <Button variant="outline" className="border-[#1E8A95] text-[#1E8A95] hover:bg-[#1E8A95] hover:text-white">
              VIEW MORE ARTICLES
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative group overflow-hidden rounded-lg">
            <div className="relative h-80">
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="Journal article"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute top-4 right-4 bg-white/90 p-2 rounded-full">
                <BookOpen className="w-5 h-5 text-[#4F3B9A]" />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <h3 className="text-xl font-bold text-white mb-2">Top 10 Treks in Northern Pakistan</h3>
              <p className="text-white/80 mb-4 line-clamp-2">
                Discover the most breathtaking trekking routes through Pakistan's northern mountains
              </p>
              <Link href="#" className="text-[#F28C38] hover:underline text-sm font-medium">
                Read more
              </Link>
            </div>
          </div>

          <div className="relative group overflow-hidden rounded-lg">
            <div className="relative h-80">
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="Journal article"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute top-4 right-4 bg-white/90 p-2 rounded-full">
                <BookOpen className="w-5 h-5 text-[#4F3B9A]" />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <h3 className="text-xl font-bold text-white mb-2">The Cultural Heritage of Hunza Valley</h3>
              <p className="text-white/80 mb-4 line-clamp-2">
                Exploring the rich traditions and ancient history of Pakistan's Hunza Valley
              </p>
              <Link href="#" className="text-[#F28C38] hover:underline text-sm font-medium">
                Read more
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

