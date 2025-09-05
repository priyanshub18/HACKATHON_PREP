import { useState } from "react";
import { motion } from "framer-motion";

export default function App() {
  const [showChat, setShowChat] = useState(false);
  const [plan, setPlan] = useState(null);

  const handleRecommendation = (e) => {
    e.preventDefault();
    setPlan({
      name: "Smart Saver Pack",
      price: "₹299 / month",
      benefits: ["2GB/day Data", "Unlimited Calls", "100 SMS/day"]
    });
  };

  return (
    <div className="font-sans text-gray-800 bg-white scroll-smooth">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
          <h1 className="text-xl font-bold text-blue-700">RechargeSmart</h1>
          <div className="space-x-6 hidden md:flex">
            <a href="#home" className="hover:text-blue-600">Home</a>
            <a href="#features" className="hover:text-blue-600">Features</a>
            <a href="#recommendation" className="hover:text-blue-600">Recommendation</a>
            <a href="#chatbot" className="hover:text-blue-600">Chatbot</a>
            <a href="#contact" className="hover:text-blue-600">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex flex-col justify-center items-center text-center px-4 pt-24">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold text-blue-700"
        >
          Track. Understand. Recharge Smarter.
        </motion.h2>
        <p className="mt-4 text-lg md:text-xl max-w-2xl">
          Get personalized recharge recommendations based on your usage habits. Save more, recharge better.
        </p>
        <a href="#recommendation" className="mt-6 px-6 py-3 bg-blue-700 text-white rounded-xl shadow hover:bg-blue-800 transition">
          Get Started
        </a>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50 px-6">
        <h3 className="text-3xl font-bold text-center text-blue-700 mb-12">Features</h3>
        <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {[
            { title: "Recharge Tracking", desc: "See your spending habits and recharge history." },
            { title: "Smart Recommendations", desc: "AI suggests the best plan for you." },
            { title: "Chatbot Support", desc: "Ask doubts and get instant help." },
            { title: "Seamless Insights", desc: "Visualize your recharge usage with graphs." }
          ].map((f, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="bg-white shadow rounded-2xl p-6 text-center border border-blue-100"
            >
              <h4 className="text-xl font-semibold text-blue-700 mb-2">{f.title}</h4>
              <p className="text-gray-600">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Recommendation Section */}
      <section id="recommendation" className="py-20 px-6">
        <h3 className="text-3xl font-bold text-center text-blue-700 mb-12">Get Your Plan</h3>
        <div className="max-w-lg mx-auto">
          <form onSubmit={handleRecommendation} className="space-y-4">
            <input placeholder="Monthly Budget" className="w-full p-3 border rounded-xl focus:outline-blue-600" />
            <input placeholder="Data Usage (GB/month)" className="w-full p-3 border rounded-xl focus:outline-blue-600" />
            <input placeholder="Call Preference (Low/High)" className="w-full p-3 border rounded-xl focus:outline-blue-600" />
            <button type="submit" className="w-full bg-blue-700 text-white py-3 rounded-xl hover:bg-blue-800 transition">
              Recommend Plan
            </button>
          </form>
          {plan && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-6 bg-blue-50 border border-blue-200 rounded-2xl text-center"
            >
              <h4 className="text-xl font-semibold text-blue-700">{plan.name}</h4>
              <p className="text-lg font-bold">{plan.price}</p>
              <ul className="mt-2 text-gray-700">
                {plan.benefits.map((b, i) => <li key={i}>✔ {b}</li>)}
              </ul>
            </motion.div>
          )}
        </div>
      </section>

      {/* Chatbot Section */}
      <section id="chatbot" className="py-20 px-6 bg-gray-50 text-center">
        <h3 className="text-3xl font-bold text-blue-700 mb-6">Chatbot Support</h3>
        <p className="max-w-xl mx-auto mb-12">Ask questions and get instant answers through our AI-powered chatbot.</p>
        <button onClick={() => setShowChat(!showChat)} className="px-6 py-3 bg-blue-700 text-white rounded-xl shadow hover:bg-blue-800 transition">
          {showChat ? "Close Chat" : "Open Chat"}
        </button>
        {showChat && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-6 right-6 w-80 h-96 bg-white shadow-xl border rounded-2xl flex flex-col"
          >
            <div className="p-3 bg-blue-700 text-white font-semibold rounded-t-2xl">RechargeSmart Chatbot</div>
            <div className="flex-1 p-3 overflow-y-auto text-left">
              <p className="mb-2"><strong>User:</strong> What plan is best for me?</p>
              <p className="mb-2"><strong>Bot:</strong> Based on your usage, I suggest the Smart Saver Pack with 2GB/day.</p>
            </div>
            <div className="p-2 border-t flex">
              <input placeholder="Type a message..." className="flex-1 p-2 border rounded-xl mr-2" />
              <button className="px-4 py-2 bg-blue-700 text-white rounded-xl">Send</button>
            </div>
          </motion.div>
        )}
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6">
        <h3 className="text-3xl font-bold text-center text-blue-700 mb-6">Stay Connected</h3>
        <div className="max-w-md mx-auto">
          <input placeholder="Your Email" className="w-full p-3 border rounded-xl focus:outline-blue-600" />
          <button className="w-full mt-4 bg-blue-700 text-white py-3 rounded-xl hover:bg-blue-800 transition">
            Subscribe
          </button>
        </div>
        <footer className="text-center mt-12 text-gray-500">© 2025 RechargeSmart. All rights reserved.</footer>
      </section>
    </div>
  );
}