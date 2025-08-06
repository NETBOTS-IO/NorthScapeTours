import { Shield, Mountain, Globe, Leaf } from "lucide-react"

export function KeyFeatures() {
  return (
    <section className="py-16 bg-white">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-[#1E8A95]/10 flex items-center justify-center mb-4">
              <Shield className="w-8 h-8 text-[#1E8A95]" />
            </div>
            <h3 className="text-xl font-bold mb-2">Trusted</h3>
            <p className="text-gray-600">15 years of operating; fully bonded and your money 100% protected.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-[#F28C38]/10 flex items-center justify-center mb-4">
              <Mountain className="w-8 h-8 text-[#F28C38]" />
            </div>
            <h3 className="text-xl font-bold mb-2">Active</h3>
            <p className="text-gray-600">From leisurely walking and cycling to push-your-limits expeditions.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-[#4F3B9A]/10 flex items-center justify-center mb-4">
              <Globe className="w-8 h-8 text-[#4F3B9A]" />
            </div>
            <h3 className="text-xl font-bold mb-2">Nationwide</h3>
            <p className="text-gray-600">100+ Guided Group and Self-Guided adventures across Pakistan.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-[#1E8A95]/10 flex items-center justify-center mb-4">
              <Leaf className="w-8 h-8 text-[#1E8A95]" />
            </div>
            <h3 className="text-xl font-bold mb-2">Sustainable</h3>
            <p className="text-gray-600">100% carbon absorption. Caring for the environment and local communities.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

