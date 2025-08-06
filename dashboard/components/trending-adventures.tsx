import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function TrendingAdventures() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container">
        <h2 className="text-3xl font-bold mb-10">Trending Adventures</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg overflow-hidden shadow-md">
            <div className="relative h-64">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="K2 Base Camp Trek"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">K2 Base Camp Trek</h3>
              <p className="text-sm text-gray-500 mb-3">Pakistan, Karakoram</p>
              <p className="mb-4">
                Follow the iconic trail on this K2 Base Camp Trek to the foot of the World's second highest mountain
              </p>
              <Link href="#">
                <Button className="w-full bg-[#1E8A95] hover:bg-[#176D76]">View Trip</Button>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg overflow-hidden shadow-md">
            <div className="relative h-64">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Hunza Valley Explorer"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Hunza Valley Explorer</h3>
              <p className="text-sm text-gray-500 mb-3">Pakistan, Gilgit-Baltistan</p>
              <p className="mb-4">
                A delightful self-guided walking holiday discovering Hunza's paradise hiking trails and ancient culture
              </p>
              <Link href="#">
                <Button className="w-full bg-[#F28C38] hover:bg-[#D97A2D]">View Trip</Button>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg overflow-hidden shadow-md">
            <div className="relative h-64">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Pakistan Family Adventure Holiday"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Pakistan Family Adventure</h3>
              <p className="text-sm text-gray-500 mb-3">Pakistan, Northern Areas</p>
              <p className="mb-4">
                Our family adventure holiday in Pakistan, exploring Fairy Meadows, Hunza Valley and the Karakoram
                Highway
              </p>
              <Link href="#">
                <Button className="w-full bg-[#4F3B9A] hover:bg-[#3D2E77]">View Trip</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

