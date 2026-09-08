import Header from "../sections/Header";
import Footer from "../sections/Footer";
import { useState } from "react";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [result, setResult] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setResult ("Sending...");
    const formData = new FormData(e.target);

    formData.append("access_key", "7671be8c-0c07-4585-a742-032f13674e7d");

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await res.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      e.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }

    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <section className="bg-cover bg-center" style={{ backgroundImage: `url('/homeBg.png')` }}>
      <Header />

      <div className="flex items-center justify-center min-h-screen py-20 px-[5%]">
        <div className="bg-indigo-600 rounded-2xl p-10 w-full max-w-lg">
          <h2 className="text-3xl font-bold text-center text-white mb-6">
            Contact Us
          </h2>
          <form action="https://api.web3forms.com/submit" method="POST" className="space-y-5 mb-5" onSubmit={handleSubmit}>

          <input type="hidden" name="access_key" value="7671be8c-0c07-4585-a742-032f13674e7d" />

            <input
              type="text"
              name="name"
              required
              placeholder="Your Name"
              className="w-full px-4 font-semibold py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="email"
              name="email"
              required
              placeholder="Your Email"
              className="w-full px-4 font-semibold py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <textarea
              rows="5"
              name="message"
              required
              placeholder="Your Message"
              className="w-full px-4 py-3 font-semibold border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>

            <input type="checkbox" name="botcheck" className="hidden" style={{display: "none"}} />

            <button
              type="submit"
              className="w-full bg-indigo-700 text-white font-semibold py-3 rounded-lg hover:bg-indigo-800 transition-all duration-300 shadow-md cursor-pointer"
            >
              Send Message
            </button>
          </form>

          <span className="font-medium">{result}</span>
        </div>
      </div>

      <Footer />
    </section>
  );
}

export default Contact;