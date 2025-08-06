import Link from "next/link"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"

export function TravelerReviews() {
  return (
    <section className="py-16 bg-white">
      <div className="container">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold">Latest from our travellers</h2>
          <Link href="#">
            <Button variant="outline" className="border-[#1E8A95] text-[#1E8A95] hover:bg-[#1E8A95] hover:text-white">
              VIEW MORE REVIEWS
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#F28C38] text-[#F28C38]" />
                ))}
              </div>
            </div>
            <h3 className="font-bold mb-2">Fairy Meadows Trek</h3>
            <p className="text-sm mb-4 line-clamp-4">
              A fantastic trip on what is a beautiful region. A special mention to our very knowledgeable guide who
              looked after us and entertained us from start to finish.
            </p>
            <div className="text-xs text-gray-500">By Ahmed From Lahore | February 27, 2025</div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#F28C38] text-[#F28C38]" />
                ))}
              </div>
            </div>
            <h3 className="font-bold mb-2">Deosai Plains Trek</h3>
            <p className="text-sm mb-4 line-clamp-4">
              An unforgettable trip. Excellent service. Everything clearly explained and very clear trip notes. Our
              guide was brilliant in every aspect of the trip. The food on the trip was amazing.
            </p>
            <div className="text-xs text-gray-500">By Sarah From Islamabad | February 24, 2025</div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#F28C38] text-[#F28C38]" />
                ))}
              </div>
            </div>
            <h3 className="font-bold mb-2">Karakoram Highway Explorer</h3>
            <p className="text-sm mb-4 line-clamp-4">
              Staff at your office are excellent in answering questions pertaining to the trip. The actual trip has been
              designed very well - covers all the highlights of Northern Pakistan and includes new experiences.
            </p>
            <div className="text-xs text-gray-500">By John From London, UK | February 21, 2025</div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#F28C38] text-[#F28C38]" />
                ))}
              </div>
            </div>
            <h3 className="font-bold mb-2">Nanga Parbat Base Camp</h3>
            <p className="text-sm mb-4 line-clamp-4">
              Extremely helpful staff manage expectations during the booking process through to departure with excellent
              communication throughout. Use knowledgable and well prepared guides for an enjoyable holiday experience.
            </p>
            <div className="text-xs text-gray-500">By Maria From Karachi | February 20, 2025</div>
          </div>
        </div>
      </div>
    </section>
  )
}

