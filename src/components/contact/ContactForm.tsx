"use client";

import { useState } from "react";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission - replace with actual API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 sm:p-12">
        <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-6">
          <svg className="w-7 h-7 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-light mb-3">Message sent!</h3>
        <p className="text-white/40 text-sm leading-relaxed max-w-xs">
          Thanks for reaching out. I&apos;ll get back to you within 24 hours.
        </p>
        <button
          onClick={() => {
            setIsSubmitted(false);
            setFormData({ name: "", email: "", projectType: "", message: "" });
          }}
          className="mt-8 text-xs text-white/30 hover:text-white/60 uppercase tracking-[0.15em] transition-colors duration-300"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-5"
    >
      <div className="mb-2">
        <h2 className="text-lg font-light text-white/80 tracking-tight">Send a message</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-[11px] text-white/25 uppercase tracking-[0.2em] mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/20 focus:border-white/20 focus:bg-white/[0.05] focus:outline-none focus:ring-1 focus:ring-white/10 transition-all duration-300"
            placeholder="Your name"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-[11px] text-white/25 uppercase tracking-[0.2em] mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/20 focus:border-white/20 focus:bg-white/[0.05] focus:outline-none focus:ring-1 focus:ring-white/10 transition-all duration-300"
            placeholder="you@company.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="projectType" className="block text-[11px] text-white/25 uppercase tracking-[0.2em] mb-2">
          Project Type
        </label>
        <div className="relative">
          <select
            id="projectType"
            required
            value={formData.projectType}
            onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
            className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-3 text-sm text-white focus:border-white/20 focus:bg-white/[0.05] focus:outline-none focus:ring-1 focus:ring-white/10 transition-all duration-300 appearance-none cursor-pointer"
          >
            <option value="" disabled className="bg-[#141414]">Select project type</option>
            <option value="automation" className="bg-[#141414]">Workflow Automation</option>
            <option value="development" className="bg-[#141414]">AI-Powered Development</option>
            <option value="prototype" className="bg-[#141414]">Rapid Prototyping</option>
            <option value="integration" className="bg-[#141414]">Integration &amp; APIs</option>
            <option value="other" className="bg-[#141414]">Other</option>
          </select>
          <svg
            className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-[11px] text-white/25 uppercase tracking-[0.2em] mb-2">
          Message
        </label>
        <textarea
          id="message"
          required
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/20 focus:border-white/20 focus:bg-white/[0.05] focus:outline-none focus:ring-1 focus:ring-white/10 transition-all duration-300 resize-none"
          placeholder="Tell me about your project..."
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="group relative w-full bg-white text-black font-medium py-4 sm:py-3.5 rounded-xl sm:rounded-lg overflow-hidden transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] active:scale-[0.98]"
      >
        <span className="relative z-10 flex items-center justify-center gap-2 text-sm">
          {isSubmitting ? (
            <>
              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Sending...
            </>
          ) : (
            <>
              Send Message
              <svg
                className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </>
          )}
        </span>
      </button>

      <p className="text-center text-[11px] text-white/20 pt-1">
        Your information is never shared with third parties.
      </p>
    </form>
  );
}
