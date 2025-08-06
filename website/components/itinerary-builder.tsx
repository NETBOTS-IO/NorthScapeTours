"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import {
  MapPin,
  Calendar,
  DollarSign,
  Plus,
  Trash2,
  Clock,
  Plane,
  Hotel,
  Camera,
  Utensils,
  Mountain,
  Save,
  Share2,
  Download,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ItineraryDay {
  id: string
  day: number
  title: string
  activities: Activity[]
  accommodation?: string
  meals: string[]
  notes: string
}

interface Activity {
  id: string
  time: string
  title: string
  description: string
  type: "transport" | "accommodation" | "sightseeing" | "dining" | "adventure"
  duration: string
  cost?: number
}

const activityTypes = [
  { value: "transport", label: "Transport", icon: Plane, color: "bg-blue-100 text-blue-700" },
  { value: "accommodation", label: "Hotel", icon: Hotel, color: "bg-purple-100 text-purple-700" },
  { value: "sightseeing", label: "Sightseeing", icon: Camera, color: "bg-green-100 text-green-700" },
  { value: "dining", label: "Dining", icon: Utensils, color: "bg-orange-100 text-orange-700" },
  { value: "adventure", label: "Adventure", icon: Mountain, color: "bg-red-100 text-red-700" },
]

export default function ItineraryBuilder() {
  const [tripDetails, setTripDetails] = useState({
    title: "",
    destination: "",
    startDate: "",
    endDate: "",
    travelers: 1,
    budget: "",
  })

  const [itinerary, setItinerary] = useState<ItineraryDay[]>([
    {
      id: "1",
      day: 1,
      title: "Arrival Day",
      activities: [],
      meals: [],
      notes: "",
    },
  ])

  const [currentStep, setCurrentStep] = useState(1)

  const addDay = () => {
    const newDay: ItineraryDay = {
      id: Date.now().toString(),
      day: itinerary.length + 1,
      title: `Day ${itinerary.length + 1}`,
      activities: [],
      meals: [],
      notes: "",
    }
    setItinerary([...itinerary, newDay])
  }

  const removeDay = (dayId: string) => {
    setItinerary(itinerary.filter((day) => day.id !== dayId))
  }

  const addActivity = (dayId: string) => {
    const newActivity: Activity = {
      id: Date.now().toString(),
      time: "09:00",
      title: "",
      description: "",
      type: "sightseeing",
      duration: "2 hours",
    }

    setItinerary(
      itinerary.map((day) => (day.id === dayId ? { ...day, activities: [...day.activities, newActivity] } : day)),
    )
  }

  const updateActivity = (dayId: string, activityId: string, updates: Partial<Activity>) => {
    setItinerary(
      itinerary.map((day) =>
        day.id === dayId
          ? {
              ...day,
              activities: day.activities.map((activity) =>
                activity.id === activityId ? { ...activity, ...updates } : activity,
              ),
            }
          : day,
      ),
    )
  }

  const removeActivity = (dayId: string, activityId: string) => {
    setItinerary(
      itinerary.map((day) =>
        day.id === dayId
          ? { ...day, activities: day.activities.filter((activity) => activity.id !== activityId) }
          : day,
      ),
    )
  }

  const getActivityIcon = (type: string) => {
    const activityType = activityTypes.find((t) => t.value === type)
    return activityType ? activityType.icon : Camera
  }

  const getActivityColor = (type: string) => {
    const activityType = activityTypes.find((t) => t.value === type)
    return activityType ? activityType.color : "bg-gray-100 text-gray-700"
  }

  const totalCost = itinerary.reduce(
    (total, day) => total + day.activities.reduce((dayTotal, activity) => dayTotal + (activity.cost || 0), 0),
    0,
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50">
      {/* Header */}
      <motion.div
        className="bg-white shadow-sm border-b"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Itinerary{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">
                  Builder
                </span>
              </h1>
              <p className="text-gray-600">Create your perfect travel itinerary step by step</p>
            </motion.div>

            <motion.div
              className="flex gap-3 mt-4 md:mt-0"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Button
                variant="outline"
                className="border-gray-300 text-gray-700 hover:border-orange-500 hover:text-orange-600 bg-white"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Draft
              </Button>
              <Button
                variant="outline"
                className="border-gray-300 text-gray-700 hover:border-green-500 hover:text-green-600 bg-white"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white">
                <Download className="w-4 h-4 mr-2" />
                Export PDF
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar - Trip Details */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Card className="sticky top-8 bg-white shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  Trip Details
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div>
                  <Label htmlFor="title" className="text-gray-700 font-medium">
                    Trip Title
                  </Label>
                  <Input
                    id="title"
                    value={tripDetails.title}
                    onChange={(e) => setTripDetails({ ...tripDetails, title: e.target.value })}
                    placeholder="My Amazing Adventure"
                    className="mt-1 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <Label htmlFor="destination" className="text-gray-700 font-medium">
                    Destination
                  </Label>
                  <Input
                    id="destination"
                    value={tripDetails.destination}
                    onChange={(e) => setTripDetails({ ...tripDetails, destination: e.target.value })}
                    placeholder="Paris, France"
                    className="mt-1 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="startDate" className="text-gray-700 font-medium">
                      Start Date
                    </Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={tripDetails.startDate}
                      onChange={(e) => setTripDetails({ ...tripDetails, startDate: e.target.value })}
                      className="mt-1 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="endDate" className="text-gray-700 font-medium">
                      End Date
                    </Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={tripDetails.endDate}
                      onChange={(e) => setTripDetails({ ...tripDetails, endDate: e.target.value })}
                      className="mt-1 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="travelers" className="text-gray-700 font-medium">
                    Travelers
                  </Label>
                  <Select
                    value={tripDetails.travelers.toString()}
                    onValueChange={(value) => setTripDetails({ ...tripDetails, travelers: Number.parseInt(value) })}
                  >
                    <SelectTrigger className="mt-1 border-gray-300 focus:border-orange-500 focus:ring-orange-500">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num} {num === 1 ? "Person" : "People"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="budget" className="text-gray-700 font-medium">
                    Budget
                  </Label>
                  <Input
                    id="budget"
                    value={tripDetails.budget}
                    onChange={(e) => setTripDetails({ ...tripDetails, budget: e.target.value })}
                    placeholder="$5,000"
                    className="mt-1 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                  />
                </div>

                {/* Budget Summary */}
                <motion.div
                  className="bg-gray-50 rounded-lg p-4 mt-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                    <DollarSign className="w-4 h-4 mr-1" />
                    Cost Summary
                  </h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Activities:</span>
                      <span className="font-medium text-gray-900">${totalCost}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Budget:</span>
                      <span className="font-medium text-gray-900">{tripDetails.budget || "$0"}</span>
                    </div>
                    <div className="border-t pt-1 flex justify-between font-semibold">
                      <span className="text-gray-900">Remaining:</span>
                      <span
                        className={`${
                          (Number.parseInt(tripDetails.budget.replace(/\D/g, "")) || 0) - totalCost >= 0
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        ${(Number.parseInt(tripDetails.budget.replace(/\D/g, "")) || 0) - totalCost}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Content - Itinerary */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="space-y-6">
              <AnimatePresence>
                {itinerary.map((day, dayIndex) => (
                  <motion.div
                    key={day.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, delay: dayIndex * 0.1 }}
                  >
                    <Card className="bg-white shadow-lg border-0 overflow-hidden">
                      <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 border-b">
                        <div className="flex items-center justify-between">
                          <CardTitle className="flex items-center text-gray-900">
                            <Calendar className="w-5 h-5 mr-2 text-orange-500" />
                            Day {day.day}
                          </CardTitle>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => addActivity(day.id)}
                              className="border-green-300 text-green-600 hover:border-green-500 hover:text-green-700 bg-white"
                            >
                              <Plus className="w-4 h-4 mr-1" />
                              Add Activity
                            </Button>
                            {itinerary.length > 1 && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => removeDay(day.id)}
                                className="border-red-300 text-red-600 hover:border-red-500 hover:text-red-700 bg-white"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                        <Input
                          value={day.title}
                          onChange={(e) => {
                            setItinerary(itinerary.map((d) => (d.id === day.id ? { ...d, title: e.target.value } : d)))
                          }}
                          placeholder="Day title..."
                          className="mt-2 font-medium border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                        />
                      </CardHeader>

                      <CardContent className="p-6">
                        {/* Activities */}
                        <div className="space-y-4 mb-6">
                          <AnimatePresence>
                            {day.activities.map((activity, activityIndex) => {
                              const ActivityIcon = getActivityIcon(activity.type)
                              return (
                                <motion.div
                                  key={activity.id}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  exit={{ opacity: 0, x: 20 }}
                                  transition={{ duration: 0.3, delay: activityIndex * 0.05 }}
                                  className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                                >
                                  <div className="flex items-start gap-4">
                                    <motion.div
                                      className={`p-2 rounded-lg ${getActivityColor(activity.type)}`}
                                      whileHover={{ scale: 1.1 }}
                                      transition={{ duration: 0.2 }}
                                    >
                                      <ActivityIcon className="w-5 h-5" />
                                    </motion.div>

                                    <div className="flex-1 space-y-3">
                                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                        <div>
                                          <Label className="text-gray-700 font-medium">Time</Label>
                                          <Input
                                            type="time"
                                            value={activity.time}
                                            onChange={(e) =>
                                              updateActivity(day.id, activity.id, { time: e.target.value })
                                            }
                                            className="mt-1 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                                          />
                                        </div>
                                        <div>
                                          <Label className="text-gray-700 font-medium">Type</Label>
                                          <Select
                                            value={activity.type}
                                            onValueChange={(value) =>
                                              updateActivity(day.id, activity.id, { type: value as Activity["type"] })
                                            }
                                          >
                                            <SelectTrigger className="mt-1 border-gray-300 focus:border-orange-500 focus:ring-orange-500">
                                              <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent className="bg-white">
                                              {activityTypes.map((type) => (
                                                <SelectItem key={type.value} value={type.value}>
                                                  {type.label}
                                                </SelectItem>
                                              ))}
                                            </SelectContent>
                                          </Select>
                                        </div>
                                        <div>
                                          <Label className="text-gray-700 font-medium">Duration</Label>
                                          <Input
                                            value={activity.duration}
                                            onChange={(e) =>
                                              updateActivity(day.id, activity.id, { duration: e.target.value })
                                            }
                                            placeholder="2 hours"
                                            className="mt-1 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                                          />
                                        </div>
                                      </div>

                                      <div>
                                        <Label className="text-gray-700 font-medium">Activity Title</Label>
                                        <Input
                                          value={activity.title}
                                          onChange={(e) =>
                                            updateActivity(day.id, activity.id, { title: e.target.value })
                                          }
                                          placeholder="Visit Eiffel Tower"
                                          className="mt-1 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                                        />
                                      </div>

                                      <div>
                                        <Label className="text-gray-700 font-medium">Description</Label>
                                        <Textarea
                                          value={activity.description}
                                          onChange={(e) =>
                                            updateActivity(day.id, activity.id, { description: e.target.value })
                                          }
                                          placeholder="Detailed description of the activity..."
                                          className="mt-1 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                                          rows={2}
                                        />
                                      </div>

                                      <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                          <Label className="text-gray-700 font-medium">Cost:</Label>
                                          <Input
                                            type="number"
                                            value={activity.cost || ""}
                                            onChange={(e) =>
                                              updateActivity(day.id, activity.id, {
                                                cost: Number.parseFloat(e.target.value) || 0,
                                              })
                                            }
                                            placeholder="0"
                                            className="w-24 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                                          />
                                          <span className="text-gray-600">USD</span>
                                        </div>

                                        <Button
                                          variant="outline"
                                          size="sm"
                                          onClick={() => removeActivity(day.id, activity.id)}
                                          className="border-red-300 text-red-600 hover:border-red-500 hover:text-red-700 bg-white"
                                        >
                                          <Trash2 className="w-4 h-4" />
                                        </Button>
                                      </div>
                                    </div>
                                  </div>
                                </motion.div>
                              )
                            })}
                          </AnimatePresence>

                          {day.activities.length === 0 && (
                            <motion.div
                              className="text-center py-8 text-gray-500"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.5 }}
                            >
                              <Clock className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                              <p>No activities planned for this day</p>
                              <Button
                                variant="outline"
                                onClick={() => addActivity(day.id)}
                                className="mt-3 border-green-300 text-green-600 hover:border-green-500 hover:text-green-700 bg-white"
                              >
                                <Plus className="w-4 h-4 mr-2" />
                                Add First Activity
                              </Button>
                            </motion.div>
                          )}
                        </div>

                        {/* Day Notes */}
                        <div>
                          <Label className="text-gray-700 font-medium">Day Notes</Label>
                          <Textarea
                            value={day.notes}
                            onChange={(e) => {
                              setItinerary(
                                itinerary.map((d) => (d.id === day.id ? { ...d, notes: e.target.value } : d)),
                              )
                            }}
                            placeholder="Any special notes for this day..."
                            className="mt-1 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                            rows={2}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Add Day Button */}
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Button
                  onClick={addDay}
                  size="lg"
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add Another Day
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
