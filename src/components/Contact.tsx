import { Mail, Github, Linkedin, Send } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section className="py-24 px-4 bg-[#0B0F1A] relative">
      <div className="max-w-4xl mx-auto">
        <div className="scroll-animate">
          <h2 className="text-5xl font-bold mb-16 text-center neon-text">
            Get In Touch
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="scroll-animate" style={{ animationDelay: '0.1s' }}>
            <h3 className="text-2xl font-bold mb-6">Let's Connect</h3>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Have a project in mind or want to collaborate?
              Feel free to reach out and let's create something amazing together.
            </p>

            <div className="space-y-4">
              <a href="mailto:contact@johndoe.dev" className="flex items-center gap-4 text-gray-300 hover:text-[#00E5FF] transition-colors group">
                <div className="w-12 h-12 rounded-lg bg-[#05060B] border border-[#00E5FF]/20 flex items-center justify-center group-hover:border-[#00E5FF] transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                contact@johndoe.dev
              </a>

              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-gray-300 hover:text-[#00E5FF] transition-colors group">
                <div className="w-12 h-12 rounded-lg bg-[#05060B] border border-[#00E5FF]/20 flex items-center justify-center group-hover:border-[#00E5FF] transition-colors">
                  <Github className="w-5 h-5" />
                </div>
                github.com/johndoe
              </a>

              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-gray-300 hover:text-[#00E5FF] transition-colors group">
                <div className="w-12 h-12 rounded-lg bg-[#05060B] border border-[#00E5FF]/20 flex items-center justify-center group-hover:border-[#00E5FF] transition-colors">
                  <Linkedin className="w-5 h-5" />
                </div>
                linkedin.com/in/johndoe
              </a>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="scroll-animate" style={{ animationDelay: '0.2s' }}>
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="cyber-input"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="cyber-input"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="cyber-input resize-none"
                  required
                ></textarea>
              </div>

              <button type="submit" className="neon-button w-full flex items-center justify-center gap-2">
                Send Message
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>

        <div className="mt-16 text-center text-gray-500 text-sm scroll-animate">
          <p>© 2024 John Doe. Crafted with precision and passion.</p>
        </div>
      </div>
    </section>
  );
}
