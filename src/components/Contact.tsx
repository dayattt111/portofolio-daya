import { Mail, Github, Linkedin, Send, MessageCircle, Phone } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // WhatsApp format: standard Indonesian format without +
    const message = `Name: ${formData.name}%0AEmail: ${formData.email}%0AMessage: ${formData.message}`;
    const whatsappUrl = `https://wa.me/6282197855715?text=${message}`;
    window.open(whatsappUrl, '_blank');
    
    setFormData({ name: '', email: '', message: '' });
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="section-retro">
      <div className="max-w-6xl mx-auto px-4">
        <div className="scroll-animate mb-16">
          <h2 className="section-title">
            [ CONTACT ]
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left Side - Quick Contact */}
          <div className="scroll-animate" style={{ animationDelay: '0.1s' }}>
            <div className="retro-card-dark p-8">
              <h3 className="text-3xl font-pixel font-bold mb-8 text-neon-cyan">
                LET'S CONNECT
              </h3>
              <p className="text-gray-300 mb-8 leading-relaxed font-retro">
                &gt; Got a project or just want to say hello?<br/>
                &gt; Reach out through any of these channels!
              </p>

              <div className="space-y-6">
                {/* WhatsApp */}
                <a 
                  href="https://wa.me/6282197855715?text=Halo%2C%20saya%20tertarik%20dengan%20portfolio%20mu!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-14 h-14 rounded-lg bg-neon-cyan/10 border-2 border-neon-cyan flex items-center justify-center group-hover:bg-neon-cyan/20 transition-all">
                    <MessageCircle className="w-7 h-7 text-neon-cyan" />
                  </div>
                  <div>
                    <p className="font-pixel text-sm text-neon-cyan">WHATSAPP</p>
                    <p className="text-gray-400 hover:text-neon-cyan transition-colors">082197855715</p>
                  </div>
                </a>

                {/* Phone */}
                <a 
                  href="tel:082197855715"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-14 h-14 rounded-lg bg-neon-pink/10 border-2 border-neon-pink flex items-center justify-center group-hover:bg-neon-pink/20 transition-all">
                    <Phone className="w-7 h-7 text-neon-pink" />
                  </div>
                  <div>
                    <p className="font-pixel text-sm text-neon-pink">PHONE</p>
                    <p className="text-gray-400 hover:text-neon-pink transition-colors">082197855715</p>
                  </div>
                </a>

                {/* Email */}
                <a 
                  href="mailto:contact@hidayatbaru0304@gmail.com"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-14 h-14 rounded-lg bg-neon-purple/10 border-2 border-neon-purple flex items-center justify-center group-hover:bg-neon-purple/20 transition-all">
                    <Mail className="w-7 h-7 text-neon-purple" />
                  </div>
                  <div>
                    <p className="font-pixel text-sm text-neon-purple">EMAIL</p>
                    <p className="text-gray-400 hover:text-neon-purple transition-colors">hidayatbaru0304@gmail.com</p>
                  </div>
                </a>

                {/* GitHub */}
                <a 
                  href="https://github.com/dayattt111"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-14 h-14 rounded-lg bg-neon-yellow/10 border-2 border-neon-yellow flex items-center justify-center group-hover:bg-neon-yellow/20 transition-all">
                    <Github className="w-7 h-7 text-neon-yellow" />
                  </div>
                  <div>
                    <p className="font-pixel text-sm text-neon-yellow">GITHUB</p>
                    <p className="text-gray-400 hover:text-neon-yellow transition-colors">github.com/dayattt111</p>
                  </div>
                </a>

                {/* LinkedIn */}
                <a 
                  href="http://www.linkedin.com/in/muhammad-amin-hidayat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-14 h-14 rounded-lg bg-neon-cyan/10 border-2 border-neon-cyan flex items-center justify-center group-hover:bg-neon-cyan/20 transition-all">
                    <Linkedin className="w-7 h-7 text-neon-cyan" />
                  </div>
                  <div>
                    <p className="font-pixel text-sm text-neon-cyan">LINKEDIN</p>
                    <p className="text-gray-400 hover:text-neon-cyan transition-colors">linkedin.com/in/muhammad-amin-hidayat</p>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <form onSubmit={handleSubmit} className="scroll-animate" style={{ animationDelay: '0.2s' }}>
            <div className="retro-card-dark p-8 space-y-6">
              <h3 className="text-2xl font-pixel font-bold text-neon-pink">SEND MESSAGE</h3>
              
              {isSubmitted && (
                <div className="bg-neon-cyan/20 border-2 border-neon-cyan p-4 text-neon-cyan font-pixel text-sm">
                  &gt; Message sent! Check your WhatsApp!
                </div>
              )}

              <div>
                <label htmlFor="name" className="block text-neon-cyan font-pixel text-sm mb-3">
                  [NAME]
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="retro-input"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-neon-pink font-pixel text-sm mb-3">
                  [EMAIL]
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="retro-input"
                  placeholder="hidayatbaru0304@gmail.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-neon-purple font-pixel text-sm mb-3">
                  [MESSAGE]
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="retro-input resize-none"
                  placeholder="Type your message here..."
                  required
                />
              </div>

              <button
                type="submit"
                className="pixel-btn w-full flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                SEND VIA WHATSAPP
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
