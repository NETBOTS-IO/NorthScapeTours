"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageCircle, X, Bot, Send } from "lucide-react"
import emailjs from "@emailjs/browser"

const allChatbotQuestions = [
  {
    id: 1,
    question: "What tours do you offer?",
    answer:
      "Oh, we've got some amazing adventures for you! 😃 We offer trekking, expeditions, mountain biking, skiing, cultural tours, and safaris. What kind of experience are you looking for?",
  },
  {
    id: 2,
    question: "How do I book a tour?",
    answer:
      "Booking with us is super easy! 😊 You can either use our website or I can help you get in touch with our friendly team. Would you like me to help you start the booking process?",
  },
  {
    id: 3,
    question: "What's included in the tour price?",
    answer:
      "Great question! 👍 Our tour prices typically cover all the essentials - accommodation, tasty meals, transportation, expert guides, and necessary permits. But each tour is unique, so is there a specific tour you're curious about?",
  },
  {
    id: 4,
    question: "What's the best time to visit Pakistan?",
    answer:
      "Ah, timing is everything! 🌞 Generally, May to October is fantastic for most mountain areas. But it really depends on what you want to see and do. Do you have any specific activities or places in mind?",
  },
]

interface Message {
  type: "user" | "bot"
  content: string
}

interface UserInfo {
  name: string
  email: string
  phone: string
  interests?: string
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [currentQuestions, setCurrentQuestions] = useState(allChatbotQuestions.slice(0, 3))
  const [userInfo, setUserInfo] = useState<UserInfo>({ name: "", email: "", phone: "", interests: "" })
  const [collectingUserInfo, setCollectingUserInfo] = useState(false)
  const [currentInfoField, setCurrentInfoField] = useState<keyof UserInfo | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 4000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          type: "bot",
          content:
            "Hello there! 👋 I'm your friendly Mountain Travels Pakistan assistant. How can I make your adventure dreams come true today?",
        },
      ])
    }
  }, [isOpen, messages.length])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const startCollectingUserInfo = async () => {
    setCollectingUserInfo(true)
    setCurrentInfoField("name")
    addBotMessage("I'd be thrilled to connect you with our awesome team! 😊 First off, could you tell me your name?")
  }

  const handleUserInfoInput = async (input: string) => {
    if (!currentInfoField) return

    setUserInfo((prev) => ({ ...prev, [currentInfoField]: input }))

    switch (currentInfoField) {
      case "name":
        setCurrentInfoField("email")
        addBotMessage(`Great to meet you, ${input}! 🎉 Could you share your email address with me?`)
        break
      case "email":
        setCurrentInfoField("phone")
        addBotMessage("Awesome! 📞 And what's the best phone number to reach you?")
        break
      case "phone":
        setCurrentInfoField("interests")
        addBotMessage("Last question, I promise! 😉 What kind of tours are you most excited about?")
        break
      case "interests":
        setCurrentInfoField(null)
        setCollectingUserInfo(false)
        await submitUserInfo({ ...userInfo, interests: input })
        break
    }
  }

  const addBotMessage = (content: string) => {
    setMessages((prev) => [...prev, { type: "bot", content }])
  }

  const submitUserInfo = async (info: UserInfo) => {
    setIsTyping(true)
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          to_email: "info@mountaintravelspakistan.com",
          from_name: info.name,
          from_email: info.email,
          phone: info.phone,
          message: `Interests: ${info.interests}`,
        },
        process.env.NEXT_PUBLIC_EMAILJS_USER_ID!,
      )

      addBotMessage(
        "Thank you so much for sharing your info! 🎉 Our team will be in touch faster than you can say 'adventure'! " +
          "While you wait, is there anything else you'd like to know about our amazing tours?",
      )
    } catch (error) {
      console.error("Error sending email:", error)
      addBotMessage(
        "Oh no! 😟 It seems our messenger pigeon got lost. Could you please try reaching out to us directly at info@mountaintravelspakistan.com? We'd hate to miss out on helping you!",
      )
    }
    setIsTyping(false)
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage = inputValue.trim()
    setInputValue("")
    setMessages((prev) => [...prev, { type: "user", content: userMessage }])

    if (collectingUserInfo) {
      handleUserInfoInput(userMessage)
      return
    }

    setIsTyping(true)
    setError(null)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      })

      if (!response.ok) throw new Error("Failed to get response")

      const data = await response.json()
      addBotMessage(data.response)

      if (
        userMessage.toLowerCase().includes("speak") ||
        userMessage.toLowerCase().includes("contact") ||
        userMessage.toLowerCase().includes("representative")
      ) {
        startCollectingUserInfo()
      }
    } catch (error) {
      console.error("Error:", error)
      setError("Oops! 😅 I'm having a bit of trouble connecting right now. Mind giving it another shot in a moment?")
    }

    setIsTyping(false)
  }

  const handleQuestionClick = (question: (typeof allChatbotQuestions)[0]) => {
    setMessages((prev) => [...prev, { type: "user", content: question.question }])
    setIsTyping(true)

    setTimeout(() => {
      setMessages((prev) => [...prev, { type: "bot", content: question.answer }])
      setIsTyping(false)
    }, 1000)

    setCurrentQuestions((prev) => {
      const remaining = allChatbotQuestions.filter((q) => !prev.includes(q))
      return [...remaining, ...prev].slice(0, 3)
    })
  }

  return (
    <>
      {!isOpen && (
        <Button
          className="fixed bottom-4 right-4 rounded-full p-4 bg-primary text-white border-2 border-white shadow-lg z-50"
          onClick={() => setIsOpen(true)}
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {isOpen && (
        <div
          className="fixed bottom-4 right-4 w-[320px] md:w-[380px] bg-white rounded-lg shadow-xl border border-gray-200 z-50 flex flex-col"
          style={{ maxHeight: "calc(100vh - 2rem)" }}
        >
          <div className="flex justify-between items-center p-4 bg-primary text-white rounded-t-lg">
            <h3 className="font-bold flex items-center">
              <Bot className="mr-2" /> Chat with us
            </h3>
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-4" style={{ maxHeight: "400px" }}>
            {messages.map((message, index) => (
              <div key={index} className={`mb-3 ${message.type === "user" ? "text-right" : "text-left"}`}>
                <span
                  className={`inline-block p-3 rounded-lg ${
                    message.type === "user" ? "bg-primary text-white" : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {message.content}
                </span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center text-gray-500">
                <Bot className="mr-2 h-4 w-4" />
                <span className="typing-indicator">Typing</span>
              </div>
            )}

            {error && <div className="text-red-500 text-sm mt-2 text-center">{error}</div>}

            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t">
            {!collectingUserInfo && currentQuestions.length > 0 && (
              <div className="flex flex-col space-y-2 mb-4 max-h-[120px] overflow-y-auto">
                {currentQuestions.map((question) => (
                  <Button
                    key={question.id}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuestionClick(question)}
                    className="text-left whitespace-normal h-auto py-2"
                  >
                    {question.question}
                  </Button>
                ))}
              </div>
            )}

            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={collectingUserInfo ? `Enter your ${currentInfoField}` : "Type your message..."}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1"
              />
              <Button onClick={handleSendMessage}>
                <Send className="h-4 w-4" />
              </Button>
            </div>

            {!collectingUserInfo && (
              <Button onClick={startCollectingUserInfo} className="mt-2 w-full text-sm" variant="outline">
                Speak to a Representative
              </Button>
            )}
          </div>
        </div>
      )}
    </>
  )
}

