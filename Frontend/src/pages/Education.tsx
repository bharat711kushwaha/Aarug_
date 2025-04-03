import React, { useState, useEffect } from "react";
import { PlayCircle, BarChart, Info, Calendar, MessageCircle, BookOpen, Activity } from "lucide-react";
import { Disclosure, Transition } from "@headlessui/react";

// Educational Video Links
const videos = [
  {
    title: "Understanding the Menstrual Cycle",
    url: "https://cdn.live2.ai/uploads/pv2x12vnez/video/transcoded/480p/133d7240c1.mp4",
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtowvzj_0V6gb7nnlpf_4KjqzCUKVunzooSg&s"
  },
  {
    title: "How to Use a Sanitary Pad",
    url: "https://cdn.live2.ai/uploads/pv2x12vnez/video/transcoded/480p/b71584dfc3.mp4",
    thumbnail: "https://plus.unsplash.com/premium_photo-1664375262917-67b1515c569b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c2FuaXRhcnklMjBwYWRzfGVufDB8fDB8fHww"
  },
  {
    title: "How to Wash & Reuse Pads",
    url: "https://cdn.live2.ai/uploads/pv2x12vnez/video/transcoded/480p/c9f7b9a8c9.mp4",
    thumbnail: "https://cdn.myshoptet.com/usr/www.bamboolik.eu/user/documents/upload/All%20about%20Cloth%20Diapers/How%20to%20wash%20reusable%20pads_1.png"
  },
  {
    title: "Understanding Menstrual Hygiene",
    url: "https://cdn.live2.ai/uploads/pv2x12vnez/video/transcoded/480p/c9f7b9a8c9.mp4",
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTlTQMw1qKFjbiqfQZVXKYGg4V-YAVbS04UA&s"
  },
];

// FAQs - Expanded with more questions
const faqs = [
  {
    question: "What is menstruation?",
    answer: "Menstruation is the monthly shedding of the uterine lining. It typically lasts between 3 to 7 days and occurs in a cycle of about 28 days."
  },
  {
    question: "Is it normal to have irregular periods?",
    answer: "Yes, minor irregularities in the menstrual cycle are common, especially in teenagers. However, if your cycle is consistently irregular, consult a doctor."
  },
  {
    question: "What are the best hygiene practices during periods?",
    answer: "Change your pad/tampon every 4-6 hours, wash reusable pads properly, and maintain proper hygiene to prevent infections."
  },
  {
    question: "Why do I get cramps during my period?",
    answer: "Period cramps (dysmenorrhea) occur when the muscles of the uterus contract to help shed the uterine lining. These contractions can cause pain in the lower abdomen, lower back, and thighs."
  },
  {
    question: "How can I manage period pain?",
    answer: "You can manage period pain with over-the-counter pain relievers, applying heat to your abdomen, light exercise, rest, and staying hydrated. If pain is severe, consult a healthcare provider."
  },
  {
    question: "What are the different period products available?",
    answer: "Common period products include disposable pads, tampons, menstrual cups, period underwear, and reusable cloth pads. Each has its advantages and it's good to try different options to find what works best for you."
  },
  {
    question: "Can I exercise during my period?",
    answer: "Yes, exercise is generally safe and can even help reduce period symptoms like cramps and mood swings. Listen to your body and adjust intensity as needed."
  },
  {
    question: "What should I eat during my period?",
    answer: "Focus on iron-rich foods (leafy greens, beans), calcium-rich foods (dairy), whole grains, and plenty of water. Limiting salt, caffeine, and sugar can help reduce bloating and mood swings."
  }
];

// Cycle Tracking Information
const cycleTrackingInfo = [
  {
    phase: "Menstrual Phase",
    days: "Days 1-5",
    description: "The uterine lining sheds, resulting in menstrual bleeding. You may experience cramps, fatigue, and mood changes."
  },
  {
    phase: "Follicular Phase",
    days: "Days 1-13",
    description: "Estrogen rises, preparing the uterine lining for potential pregnancy. Energy levels increase and mood often improves."
  },
  {
    phase: "Ovulation",
    days: "Day 14 (approx.)",
    description: "An egg is released from the ovary. You may notice increased cervical mucus and slight pain on one side of the abdomen."
  },
  {
    phase: "Luteal Phase",
    days: "Days 15-28",
    description: "Progesterone rises. You may experience PMS symptoms like bloating, breast tenderness, and mood changes."
  }
];

// Myths and Facts
const mythsAndFacts = [
  {
    myth: "You shouldn't exercise during your period",
    fact: "Exercise can actually help reduce period pain and improve mood. Low to moderate intensity exercises are beneficial."
  },
  {
    myth: "You can't get pregnant during your period",
    fact: "While less likely, pregnancy can occur if you have sex during your period, especially if you have short cycles or long periods."
  },
  {
    myth: "Menstrual blood is dirty",
    fact: "Menstrual blood is simply a mixture of blood, tissue from the uterine lining, and natural vaginal secretions. It's a normal bodily function."
  },
  {
    myth: "Irregular periods always indicate a serious problem",
    fact: "Many factors can cause irregular periods, including stress, weight changes, and hormonal fluctuations. While sometimes it can indicate health issues, it's often normal."
  }
];

// Period Products Information
const periodProducts = [
  {
    name: "Disposable Pads",
    description: "Absorbent pads that attach to underwear. Available in various sizes and absorbencies.",
    pros: "Easy to use, widely available, good for beginners",
    cons: "Environmental impact, may cause irritation for some"
  },
  {
    name: "Tampons",
    description: "Cotton plugs inserted into the vagina to absorb menstrual flow.",
    pros: "Comfortable for swimming and sports, invisible under clothing",
    cons: "Risk of TSS if left in too long, may be difficult for beginners"
  },
  {
    name: "Menstrual Cups",
    description: "Flexible cups made of silicone or rubber that collect menstrual blood.",
    pros: "Reusable, eco-friendly, can be worn for up to 12 hours",
    cons: "Learning curve for insertion, requires washing"
  },
  {
    name: "Reusable Cloth Pads",
    description: "Washable fabric pads that attach to underwear.",
    pros: "Eco-friendly, cost-effective long-term, fewer chemicals",
    cons: "Require washing, may be bulkier than disposables"
  },
  {
    name: "Period Underwear",
    description: "Absorbent underwear that can be worn without other period products.",
    pros: "Comfortable, eco-friendly, good for light days or backup",
    cons: "Expensive upfront, requires washing"
  }
];

export const Education = () => {
  const [activeTab, setActiveTab] = useState("videos");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white pt-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section with Animation */}
        <div className={`transition-all duration-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h1 className="text-4xl md:text-5xl font-bold text-center text-pink-600 mb-8">
            Period Awareness & Education
          </h1>
          <p className="text-lg text-center text-gray-600 max-w-3xl mx-auto">
            Understanding menstruation is essential for health and well-being. Here, you'll find
            educational videos, FAQs, and helpful resources to empower you with knowledge about your menstrual cycle.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setActiveTab("videos")}
            className={`px-4 py-2 rounded-full transition-all duration-300 flex items-center gap-2 ${
              activeTab === "videos" ? "bg-pink-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            <PlayCircle size={20} /> Videos
          </button>
          <button
            onClick={() => setActiveTab("cycle")}
            className={`px-4 py-2 rounded-full transition-all duration-300 flex items-center gap-2 ${
              activeTab === "cycle" ? "bg-pink-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            <Calendar size={20} /> Cycle Tracking
          </button>
          <button
            onClick={() => setActiveTab("products")}
            className={`px-4 py-2 rounded-full transition-all duration-300 flex items-center gap-2 ${
              activeTab === "products" ? "bg-pink-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            <BookOpen size={20} /> Products
          </button>
          <button
            onClick={() => setActiveTab("myths")}
            className={`px-4 py-2 rounded-full transition-all duration-300 flex items-center gap-2 ${
              activeTab === "myths" ? "bg-pink-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            <MessageCircle size={20} /> Myths & Facts
          </button>
          <button
            onClick={() => setActiveTab("faqs")}
            className={`px-4 py-2 rounded-full transition-all duration-300 flex items-center gap-2 ${
              activeTab === "faqs" ? "bg-pink-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            <Info size={20} /> FAQs
          </button>
        </div>

        {/* Content Sections */}
        <div className="mt-8">
          {/* Video Education Section */}
          {activeTab === "videos" && (
            <div className={`transition-all duration-500 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <h2 className="text-3xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <PlayCircle size={28} className="text-pink-600" /> Educational Videos
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {videos.map((video, index) => (
                  <div 
                    key={index} 
                    className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className="relative">
                      <img 
                        src={video.thumbnail} 
                        alt={video.title} 
                        className="w-full h-40 object-cover rounded-md mb-2"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-pink-600 rounded-full p-2 text-white opacity-80 hover:opacity-100 transition-opacity cursor-pointer">
                          <PlayCircle size={32} />
                        </div>
                      </div>
                    </div>
                    <video controls className="w-full rounded-md hidden">
                      <source src={video.url} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    <h3 className="text-lg font-semibold mt-3 text-center">{video.title}</h3>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Cycle Tracking Section */}
          {activeTab === "cycle" && (
            <div className={`transition-all duration-500 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <h2 className="text-3xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <Calendar size={28} className="text-pink-600" /> Understanding Your Cycle
              </h2>
              
              <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <p className="text-gray-700 mb-4">
                  The menstrual cycle is typically 28 days long, but can range from 21 to 35 days. Understanding your cycle helps you prepare for your period and recognize when something might be unusual.
                </p>
                
                <div className="flex justify-center mb-8">
                  <img
                    src="https://cdn1.byjus.com/wp-content/uploads/2021/08/Menstrual-Cycle.png"
                    alt="Menstrual Cycle Chart"
                    className="w-full max-w-2xl rounded-lg shadow-md"
                  />
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
                  {cycleTrackingInfo.map((phase, index) => (
                    <div key={index} className="bg-pink-50 p-4 rounded-lg border border-pink-200 hover:shadow-md transition-all duration-300">
                      <h3 className="text-lg font-semibold text-pink-600 mb-2">{phase.phase}</h3>
                      <p className="text-sm font-medium text-gray-500 mb-2">{phase.days}</p>
                      <p className="text-gray-700">{phase.description}</p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 p-4 bg-pink-50 rounded-lg border border-pink-200">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <Activity size={20} className="text-pink-600" /> Tracking Tips
                  </h3>
                  <ul className="list-disc pl-5 text-gray-700 space-y-2">
                    <li>Record the first day of your period each month</li>
                    <li>Note how long your period lasts</li>
                    <li>Track symptoms like cramps, mood changes, and energy levels</li>
                    <li>Consider using a period tracking app for convenience</li>
                    <li>Pay attention to changes in your cycle length or flow</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Period Products Section */}
          {activeTab === "products" && (
            <div className={`transition-all duration-500 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <h2 className="text-3xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <BookOpen size={28} className="text-pink-600" /> Period Products Guide
              </h2>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-gray-700 mb-6">
                  There are many different period products available today. Finding the right product for you depends on your comfort level, lifestyle, and personal preferences.
                </p>
                
                <div className="space-y-6">
                  {periodProducts.map((product, index) => (
                    <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
                      <h3 className="text-xl font-semibold text-pink-600 mb-2">{product.name}</h3>
                      <p className="text-gray-700 mb-3">{product.description}</p>
                      
                      <div className="grid md:grid-cols-2 gap-4 mt-3">
                        <div className="bg-green-50 p-3 rounded-lg">
                          <h4 className="font-medium text-green-700 mb-1">Pros:</h4>
                          <p className="text-gray-700">{product.pros}</p>
                        </div>
                        <div className="bg-red-50 p-3 rounded-lg">
                          <h4 className="font-medium text-red-700 mb-1">Cons:</h4>
                          <p className="text-gray-700">{product.cons}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 p-4 bg-pink-50 rounded-lg border border-pink-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Tips for Choosing Products:</h3>
                  <ul className="list-disc pl-5 text-gray-700 space-y-1">
                    <li>Consider your flow intensity (light, medium, heavy)</li>
                    <li>Think about your activities (sports, swimming, etc.)</li>
                    <li>Start with beginner-friendly options if you're new to menstruation</li>
                    <li>Consider environmental impact and cost</li>
                    <li>Don't be afraid to try different products to find what works best</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Myths and Facts Section */}
          {activeTab === "myths" && (
            <div className={`transition-all duration-500 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <h2 className="text-3xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <MessageCircle size={28} className="text-pink-600" /> Myths & Facts
              </h2>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-gray-700 mb-6">
                  There are many misconceptions about menstruation. Let's separate fact from fiction to better understand this natural process.
                </p>
                
                <div className="space-y-6">
                  {mythsAndFacts.map((item, index) => (
                    <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
                      <div className="flex items-start gap-4">
                        <div className="bg-red-100 text-red-700 p-2 rounded-full mt-1">
                          <MessageCircle size={20} />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-red-600 mb-2">Myth: {item.myth}</h3>
                          <div className="flex items-start gap-4 mt-4">
                            <div className="bg-green-100 text-green-700 p-2 rounded-full mt-1">
                              <Info size={20} />
                            </div>
                            <div>
                              <h4 className="text-lg font-semibold text-green-600 mb-2">Fact: {item.fact}</h4>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* FAQs Section */}
          {activeTab === "faqs" && (
            <div className={`transition-all duration-500 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <h2 className="text-3xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <Info size={28} className="text-pink-600" /> Frequently Asked Questions
              </h2>
              
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <Disclosure key={index} as="div" className="transition-all duration-300">
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="w-full flex justify-between items-center p-4 bg-white shadow-md rounded-lg text-left font-semibold hover:bg-pink-50 transition-colors">
                          <span>{faq.question}</span>
                          <span className={`transition-transform duration-300 ${open ? "rotate-180" : "rotate-0"}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                          </span>
                        </Disclosure.Button>
                        
                        <Transition
                          enter="transition duration-100 ease-out"
                          enterFrom="transform scale-95 opacity-0"
                          enterTo="transform scale-100 opacity-100"
                          leave="transition duration-75 ease-out"
                          leaveFrom="transform scale-100 opacity-100"
                          leaveTo="transform scale-95 opacity-0"
                        >
                          <Disclosure.Panel className="p-4 bg-pink-50 rounded-lg text-gray-700 mt-1">
                            {faq.answer}
                          </Disclosure.Panel>
                        </Transition>
                      </>
                    )}
                  </Disclosure>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Self-Care During Periods Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Self-Care During Your Period</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="text-pink-600 mb-4 flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                  <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                  <line x1="6" y1="1" x2="6" y2="4"></line>
                  <line x1="10" y1="1" x2="10" y2="4"></line>
                  <line x1="14" y1="1" x2="14" y2="4"></line>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-center mb-3">Proper Nutrition</h3>
              <ul className="text-gray-700 space-y-2">
                <li>Eat iron-rich foods (spinach, beans)</li>
                <li>Stay hydrated with plenty of water</li>
                <li>Consume calcium-rich foods</li>
                <li>Limit caffeine and salt</li>
                <li>Consider warm herbal teas</li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="text-pink-600 mb-4 flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-center mb-3">Pain Management</h3>
              <ul className="text-gray-700 space-y-2">
                <li>Use a heating pad on your abdomen</li>
                <li>Try gentle stretching or yoga</li>
                <li>Consider over-the-counter pain relievers</li>
                <li>Rest when needed</li>
                <li>Massage lower back and abdomen</li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="text-pink-600 mb-4 flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-center mb-3">Emotional Wellbeing</h3>
              <ul className="text-gray-700 space-y-2">
                <li>Practice self-compassion</li>
                <li>Get adequate sleep</li>
                <li>Use relaxation techniques</li>
                <li>Connect with supportive friends</li>
                <li>Journal your feelings</li>
              </ul>
            </div>
          </div>
        </div>

        {/* When to See a Doctor Section */}
        <div className="mt-16 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">When to See a Doctor</h2>
          <p className="text-gray-700 mb-4">
            While period discomfort is normal, some symptoms may indicate a need for medical attention. Consult a healthcare provider if you experience:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <ul className="list-disc pl-5 text-gray-700 space-y-2">
                <li>Extremely heavy bleeding (soaking through a pad/tampon every hour)</li>
                <li>Severe pain that interferes with daily activities</li>
                <li>Periods lasting longer than 7 days</li>
                <li>Irregular periods (varying by more than 7-9 days)</li>
              </ul>
            </div>
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <ul className="list-disc pl-5 text-gray-700 space-y-2">
                <li>Missed periods (if sexually active)</li>
                <li>Bleeding between periods</li>
                <li>Severe mood changes that affect daily life</li>
                <li>Sudden changes in your menstrual pattern</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer/Resources Section */}
        <div className="mt-16 mb-10">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Additional Resources</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <a href="#" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 no-underline">
              <h3 className="text-xl font-semibold text-pink-600 mb-3">Period Tracker Apps</h3>
              <p className="text-gray-700">Discover apps that help you track your cycle, symptoms, and predict your next period.</p>
            </a>
            <a href="#" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 no-underline">
              <h3 className="text-xl font-semibold text-pink-600 mb-3">Recommended Books</h3>
              <p className="text-gray-700">Educational books about menstruation, reproductive health, and female wellness.</p>
            </a>
            <a href="#" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 no-underline">
              <h3 className="text-xl font-semibold text-pink-600 mb-3">Support Groups</h3>
              <p className="text-gray-700">Connect with communities focused on menstrual health and education.</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Education;