import React from "react";
import { PlayCircle, BarChart, Info } from "lucide-react";
import { Disclosure } from "@headlessui/react";

// Educational Video Links
const videos = [
  {
    title: "Understanding the Menstrual Cycle",
    url: "https://cdn.live2.ai/uploads/pv2x12vnez/video/transcoded/480p/133d7240c1.mp4",
  },
  {
    title: "How to Use a Sanitary Pad",
    url: "https://cdn.live2.ai/uploads/pv2x12vnez/video/transcoded/480p/b71584dfc3.mp4",
  },
  {
    title: "How to Wash & Reuse Pads",
    url: "https://cdn.live2.ai/uploads/pv2x12vnez/video/transcoded/480p/c9f7b9a8c9.mp4",
  },
];

// FAQs
const faqs = [
  {
    question: "What is menstruation?",
    answer:
      "Menstruation is the monthly shedding of the uterine lining. It typically lasts between 3 to 7 days and occurs in a cycle of about 28 days.",
  },
  {
    question: "Is it normal to have irregular periods?",
    answer:
      "Yes, minor irregularities in the menstrual cycle are common, especially in teenagers. However, if your cycle is consistently irregular, consult a doctor.",
  },
  {
    question: "What are the best hygiene practices during periods?",
    answer:
      "Change your pad/tampon every 4-6 hours, wash reusable pads properly, and maintain proper hygiene to prevent infections.",
  },
];

export const Education = () => {
  return (
    <div className="min-h-screen pt-20 bg-gray-100 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <h1 className="text-4xl font-bold text-center text-green-600 mb-8">
          Period Awareness & Education
        </h1>
        <p className="text-lg text-center text-gray-600 max-w-3xl mx-auto">
          Understanding menstruation is essential for health and well-being. Here, you'll find
          educational videos, FAQs, and helpful resources.
        </p>

        {/* Video Education Section */}
        <div className="mt-10">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <PlayCircle size={28} className="text-green-600" /> Educational Videos
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {videos.map((video, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                <video controls className="w-full rounded-md">
                  <source src={video.url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <h3 className="text-lg font-semibold mt-3 text-center">{video.title}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* Menstrual Health Infographic */}
        <div className="mt-12">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <BarChart size={28} className="text-green-600" /> Menstrual Cycle Infographic
          </h2>
          <div className="flex justify-center">
            <img
              src="https://thumbs.dreamstime.com/b/menstrual-cycle-diagram-fertility-window-hormonal-regulation-follicular-phase-to-ovulation-luteal-menstruation-vector-338466341.jpg"
              alt="Menstrual Cycle Chart"
              className="w-full max-w-2xl rounded-lg shadow-md"
            />
          </div>
        </div>

        {/* FAQs Section */}
        <div className="mt-12">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Info size={28} className="text-green-600" /> Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Disclosure key={index}>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="w-full flex justify-between items-center p-4 bg-white shadow-md rounded-lg text-left font-semibold">
                      {faq.question}
                      <span>{open ? "−" : "+"}</span>
                    </Disclosure.Button>
                    <Disclosure.Panel className="p-4 bg-gray-50 rounded-lg text-gray-600">
                      {faq.answer}
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </div>
        </div>

        {/* Additional Awareness Image */}
        <div className="mt-12">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Awareness Matters</h2>
          <div className="flex justify-center">
            <img
              src="https://media.istockphoto.com/id/1348759466/vector/cramps-period-menstruation-days-vector-illustration-lady-periodical-abdomen-pain-dates-girls.jpg?s=612x612&w=0&k=20&c=IPtMQMrxCcU5pTGxYL8kTiDsGjYnGj8_6FtiLynARIw="
              alt="Menstrual Awareness"
              className="w-full max-w-2xl rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
