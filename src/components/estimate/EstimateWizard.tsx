"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cloud,
  Smartphone,
  Globe,
  ShoppingCart,
  Sparkles,
  Wrench,
  Code2,
  LayoutGrid,
  Monitor,
  Laptop,
  Shield,
  CreditCard,
  Zap,
  Brain,
  Plug,
  LayoutDashboard,
  BarChart3,
  Upload,
  Mail,
  Search,
  MapPin,
  MessageSquare,
  Rocket,
  Clock,
  Calendar,
  CalendarRange,
  HelpCircle,
  ArrowLeft,
  ArrowRight,
  Check,
  Send,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { EstimateResults, type EstimateResult } from "./EstimateResults";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type LucideIcon = typeof Cloud;

interface CardOption {
  id: string;
  label: string;
  description?: string;
  icon: LucideIcon;
}

interface BudgetOption {
  id: string;
  label: string;
  description: string;
}

interface FormData {
  projectType: string;
  description: string;
  platforms: string[];
  features: string[];
  timeline: string;
  budget: string;
  name: string;
  email: string;
  company: string;
}

/* ------------------------------------------------------------------ */
/*  Step option data                                                   */
/* ------------------------------------------------------------------ */

const PROJECT_TYPES: CardOption[] = [
  { id: "saas", label: "SaaS Platform", description: "Subscription-based software", icon: Cloud },
  { id: "mobile", label: "Mobile App", description: "iOS or Android application", icon: Smartphone },
  { id: "webapp", label: "Web Application", description: "Browser-based application", icon: Globe },
  { id: "ecommerce", label: "E-Commerce", description: "Online store or marketplace", icon: ShoppingCart },
  { id: "ai", label: "AI / ML Solution", description: "Intelligent automation", icon: Sparkles },
  { id: "internal", label: "Internal Tool", description: "Business operations software", icon: Wrench },
  { id: "api", label: "API / Backend", description: "Server-side infrastructure", icon: Code2 },
  { id: "other", label: "Something Else", description: "Tell us in the next step", icon: LayoutGrid },
];

const PLATFORMS: CardOption[] = [
  { id: "web", label: "Web", description: "Browser-based", icon: Monitor },
  { id: "ios", label: "iOS", description: "iPhone & iPad", icon: Smartphone },
  { id: "android", label: "Android", description: "Android devices", icon: Smartphone },
  { id: "desktop", label: "Desktop", description: "Windows & Mac", icon: Laptop },
];

const FEATURES: CardOption[] = [
  { id: "auth", label: "Authentication", icon: Shield },
  { id: "payments", label: "Payments", icon: CreditCard },
  { id: "realtime", label: "Real-time", icon: Zap },
  { id: "ai", label: "AI Integration", icon: Brain },
  { id: "api", label: "Third-party APIs", icon: Plug },
  { id: "admin", label: "Admin Dashboard", icon: LayoutDashboard },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "storage", label: "File Storage", icon: Upload },
  { id: "email", label: "Notifications", icon: Mail },
  { id: "search", label: "Search", icon: Search },
  { id: "maps", label: "Maps / Location", icon: MapPin },
  { id: "chat", label: "Chat / Messaging", icon: MessageSquare },
];

const TIMELINES: CardOption[] = [
  { id: "asap", label: "ASAP", description: "Less than 1 month", icon: Rocket },
  { id: "1-3", label: "1 – 3 months", description: "Standard timeline", icon: Clock },
  { id: "3-6", label: "3 – 6 months", description: "Complex project", icon: Calendar },
  { id: "6+", label: "6+ months", description: "Enterprise scale", icon: CalendarRange },
  { id: "unsure", label: "Not sure yet", description: "Need guidance", icon: HelpCircle },
];

const BUDGETS: BudgetOption[] = [
  { id: "<5k", label: "Under $5K", description: "Small project or MVP" },
  { id: "5-15k", label: "$5K – $15K", description: "Standard project" },
  { id: "15-50k", label: "$15K – $50K", description: "Complex application" },
  { id: "50-100k", label: "$50K – $100K", description: "Enterprise solution" },
  { id: "100k+", label: "$100K+", description: "Large-scale platform" },
  { id: "unsure", label: "Not sure yet", description: "Need an estimate first" },
];

const STEPS = [
  { question: "What are you looking to build?", subtitle: "Choose the type that best describes your project." },
  { question: "Tell us about your vision", subtitle: "The more detail you share, the more accurate your estimate." },
  { question: "Where should it live?", subtitle: "Select all the platforms you're targeting." },
  { question: "What features do you need?", subtitle: "Pick the capabilities your project requires." },
  { question: "What's your ideal timeline?", subtitle: "This helps us plan and prioritize accordingly." },
  { question: "What's your budget range?", subtitle: "Don't worry — this just helps us tailor the estimate." },
  { question: "Where should we send your estimate?", subtitle: "We'll generate your personalized AI estimate instantly." },
];

const TOTAL_STEPS = STEPS.length;

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 300, damping: 30 },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 80 : -80,
    opacity: 0,
    transition: { duration: 0.2 },
  }),
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: 0.1 },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
};

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export function EstimateWizard() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    projectType: "",
    description: "",
    platforms: [],
    features: [],
    timeline: "",
    budget: "",
    name: "",
    email: "",
    company: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<EstimateResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const progress = ((step + 1) / TOTAL_STEPS) * 100;

  /* ---- Validation ---- */

  const isValid = useCallback((): boolean => {
    switch (step) {
      case 0:
        return formData.projectType !== "";
      case 1:
        return formData.description.trim().length >= 10;
      case 2:
        return formData.platforms.length > 0;
      case 3:
        return true; // features are optional
      case 4:
        return formData.timeline !== "";
      case 5:
        return formData.budget !== "";
      case 6:
        return (
          formData.name.trim().length > 0 &&
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
        );
      default:
        return false;
    }
  }, [step, formData]);

  /* ---- Navigation ---- */

  function goNext() {
    if (step < TOTAL_STEPS - 1) {
      setDirection(1);
      setStep((s) => s + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      handleSubmit();
    }
  }

  function goBack() {
    if (step > 0) {
      setDirection(-1);
      setStep((s) => s - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  /* ---- Submission ---- */

  async function handleSubmit() {
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Failed to generate estimate");
      }

      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
      setIsSubmitting(false);
    }
  }

  /* ---- Handlers ---- */

  function selectSingle(field: keyof FormData, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  function toggleMulti(field: "platforms" | "features", value: string) {
    setFormData((prev) => {
      const current = prev[field];
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [field]: next };
    });
  }

  /* ---- Keyboard ---- */

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey && isValid()) {
      e.preventDefault();
      goNext();
    }
  }

  /* ---- Results ---- */

  if (result) {
    return <EstimateResults result={result} name={formData.name} />;
  }

  /* ---- Loading state ---- */

  if (isSubmitting) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="relative w-20 h-20 mx-auto mb-8">
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-[#FF4444]/20"
              animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0, 0.4] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#FF4444] border-r-[#FF4444]/40"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-[#FF4444]" />
            </div>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Crafting Your Estimate
          </h2>
          <p className="text-white/40 max-w-sm mx-auto text-sm leading-relaxed">
            Our AI is analyzing your project requirements and generating a
            detailed cost & time breakdown...
          </p>
          <motion.div
            className="mt-8 flex justify-center gap-1.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-[#FF4444]/60"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{
                  duration: 1.4,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    );
  }

  /* ---------------------------------------------------------------- */
  /*  Step content renderer                                            */
  /* ---------------------------------------------------------------- */

  function renderStep() {
    switch (step) {
      /* Step 0 — Project type (single select cards) */
      case 0:
        return (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 sm:grid-cols-4 gap-3"
          >
            {PROJECT_TYPES.map((opt) => (
              <motion.button
                key={opt.id}
                variants={staggerItem}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => selectSingle("projectType", opt.id)}
                className={cn(
                  "group relative flex flex-col items-center text-center p-5 rounded-2xl border transition-all duration-200",
                  formData.projectType === opt.id
                    ? "bg-[#FF4444]/10 border-[#FF4444]/40 shadow-[0_0_30px_rgba(255,68,68,0.1)]"
                    : "bg-white/[0.02] border-white/[0.08] hover:bg-white/[0.05] hover:border-white/[0.15]"
                )}
              >
                {formData.projectType === opt.id && (
                  <motion.div
                    layoutId="type-check"
                    className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-[#FF4444] flex items-center justify-center"
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                  </motion.div>
                )}
                <opt.icon
                  className={cn(
                    "w-7 h-7 mb-3 transition-colors duration-200",
                    formData.projectType === opt.id
                      ? "text-[#FF4444]"
                      : "text-white/30 group-hover:text-white/50"
                  )}
                />
                <p className="text-white font-semibold text-sm leading-tight">
                  {opt.label}
                </p>
                {opt.description && (
                  <p className="text-white/25 text-[11px] mt-1 leading-tight">
                    {opt.description}
                  </p>
                )}
              </motion.button>
            ))}
          </motion.div>
        );

      /* Step 1 — Description (textarea) */
      case 1:
        return (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-xl mx-auto"
          >
            <motion.div variants={staggerItem}>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Describe your project idea, the problem it solves, and the key features you envision..."
                rows={6}
                className="w-full px-5 py-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-white placeholder:text-white/20 text-base leading-relaxed resize-none focus:outline-none focus:border-[#FF4444]/30 focus:ring-1 focus:ring-[#FF4444]/15 transition-all"
              />
              <div className="flex justify-between mt-2.5 px-1">
                <p className="text-white/15 text-xs">Minimum 10 characters</p>
                <p
                  className={cn(
                    "text-xs transition-colors",
                    formData.description.length >= 10
                      ? "text-[#FF4444]/50"
                      : "text-white/15"
                  )}
                >
                  {formData.description.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        );

      /* Step 2 — Platforms (multi select cards) */
      case 2:
        return (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 sm:grid-cols-4 gap-3"
          >
            {PLATFORMS.map((opt) => {
              const selected = formData.platforms.includes(opt.id);
              return (
                <motion.button
                  key={opt.id}
                  variants={staggerItem}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => toggleMulti("platforms", opt.id)}
                  className={cn(
                    "group relative flex flex-col items-center text-center p-5 rounded-2xl border transition-all duration-200",
                    selected
                      ? "bg-[#FF4444]/10 border-[#FF4444]/40 shadow-[0_0_30px_rgba(255,68,68,0.1)]"
                      : "bg-white/[0.02] border-white/[0.08] hover:bg-white/[0.05] hover:border-white/[0.15]"
                  )}
                >
                  {selected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-[#FF4444] flex items-center justify-center"
                    >
                      <Check className="w-3 h-3 text-white" strokeWidth={3} />
                    </motion.div>
                  )}
                  <opt.icon
                    className={cn(
                      "w-7 h-7 mb-3 transition-colors duration-200",
                      selected
                        ? "text-[#FF4444]"
                        : "text-white/30 group-hover:text-white/50"
                    )}
                  />
                  <p className="text-white font-semibold text-sm">{opt.label}</p>
                  {opt.description && (
                    <p className="text-white/25 text-[11px] mt-1">
                      {opt.description}
                    </p>
                  )}
                </motion.button>
              );
            })}
          </motion.div>
        );

      /* Step 3 — Features (multi select compact cards) */
      case 3:
        return (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 sm:grid-cols-3 gap-3"
          >
            {FEATURES.map((opt) => {
              const selected = formData.features.includes(opt.id);
              return (
                <motion.button
                  key={opt.id}
                  variants={staggerItem}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => toggleMulti("features", opt.id)}
                  className={cn(
                    "group flex items-center gap-3 p-4 rounded-xl border transition-all duration-200 text-left",
                    selected
                      ? "bg-[#FF4444]/8 border-[#FF4444]/30"
                      : "bg-white/[0.02] border-white/[0.08] hover:bg-white/[0.05] hover:border-white/[0.15]"
                  )}
                >
                  <div
                    className={cn(
                      "w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all duration-200",
                      selected
                        ? "border-[#FF4444] bg-[#FF4444]"
                        : "border-white/20 group-hover:border-white/30"
                    )}
                  >
                    {selected && (
                      <Check className="w-3 h-3 text-white" strokeWidth={3} />
                    )}
                  </div>
                  <opt.icon
                    className={cn(
                      "w-4 h-4 shrink-0 transition-colors duration-200",
                      selected
                        ? "text-[#FF4444]"
                        : "text-white/25 group-hover:text-white/40"
                    )}
                  />
                  <span className="text-white text-sm font-medium">
                    {opt.label}
                  </span>
                </motion.button>
              );
            })}
          </motion.div>
        );

      /* Step 4 — Timeline (single select list) */
      case 4:
        return (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-3 max-w-lg mx-auto"
          >
            {TIMELINES.map((opt) => (
              <motion.button
                key={opt.id}
                variants={staggerItem}
                whileTap={{ scale: 0.98 }}
                onClick={() => selectSingle("timeline", opt.id)}
                className={cn(
                  "w-full flex items-center gap-4 p-4 rounded-xl border transition-all duration-200",
                  formData.timeline === opt.id
                    ? "bg-[#FF4444]/10 border-[#FF4444]/40"
                    : "bg-white/[0.02] border-white/[0.08] hover:bg-white/[0.05] hover:border-white/[0.15]"
                )}
              >
                <opt.icon
                  className={cn(
                    "w-5 h-5 shrink-0 transition-colors",
                    formData.timeline === opt.id
                      ? "text-[#FF4444]"
                      : "text-white/25"
                  )}
                />
                <div className="text-left flex-1">
                  <p className="text-white font-semibold text-sm">
                    {opt.label}
                  </p>
                  {opt.description && (
                    <p className="text-white/25 text-xs mt-0.5">
                      {opt.description}
                    </p>
                  )}
                </div>
                {formData.timeline === opt.id && (
                  <motion.div
                    layoutId="timeline-check"
                    className="w-5 h-5 rounded-full bg-[#FF4444] flex items-center justify-center shrink-0"
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                  </motion.div>
                )}
              </motion.button>
            ))}
          </motion.div>
        );

      /* Step 5 — Budget (single select list) */
      case 5:
        return (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-3 max-w-lg mx-auto"
          >
            {BUDGETS.map((opt) => (
              <motion.button
                key={opt.id}
                variants={staggerItem}
                whileTap={{ scale: 0.98 }}
                onClick={() => selectSingle("budget", opt.id)}
                className={cn(
                  "w-full flex items-center gap-4 p-4 rounded-xl border transition-all duration-200",
                  formData.budget === opt.id
                    ? "bg-[#FF4444]/10 border-[#FF4444]/40"
                    : "bg-white/[0.02] border-white/[0.08] hover:bg-white/[0.05] hover:border-white/[0.15]"
                )}
              >
                <div
                  className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 transition-colors",
                    formData.budget === opt.id
                      ? "bg-[#FF4444]/20 text-[#FF4444]"
                      : "bg-white/[0.04] text-white/25"
                  )}
                >
                  $
                </div>
                <div className="text-left flex-1">
                  <p className="text-white font-semibold text-sm">
                    {opt.label}
                  </p>
                  <p className="text-white/25 text-xs mt-0.5">
                    {opt.description}
                  </p>
                </div>
                {formData.budget === opt.id && (
                  <motion.div
                    layoutId="budget-check"
                    className="w-5 h-5 rounded-full bg-[#FF4444] flex items-center justify-center shrink-0"
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                  </motion.div>
                )}
              </motion.button>
            ))}
          </motion.div>
        );

      /* Step 6 — Contact information */
      case 6:
        return (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-5 max-w-lg mx-auto"
          >
            <motion.div variants={staggerItem}>
              <label className="block text-white/40 text-sm font-medium mb-2">
                Full Name <span className="text-[#FF4444]">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="John Doe"
                className="w-full px-5 py-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white placeholder:text-white/20 text-sm focus:outline-none focus:border-[#FF4444]/30 focus:ring-1 focus:ring-[#FF4444]/15 transition-all"
              />
            </motion.div>

            <motion.div variants={staggerItem}>
              <label className="block text-white/40 text-sm font-medium mb-2">
                Email Address <span className="text-[#FF4444]">*</span>
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                placeholder="john@company.com"
                className="w-full px-5 py-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white placeholder:text-white/20 text-sm focus:outline-none focus:border-[#FF4444]/30 focus:ring-1 focus:ring-[#FF4444]/15 transition-all"
              />
              {formData.email &&
                !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) && (
                  <p className="text-red-400/80 text-xs mt-1.5">
                    Please enter a valid email address
                  </p>
                )}
            </motion.div>

            <motion.div variants={staggerItem}>
              <label className="block text-white/40 text-sm font-medium mb-2">
                Company{" "}
                <span className="text-white/15 font-normal">(optional)</span>
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, company: e.target.value }))
                }
                placeholder="Acme Inc."
                className="w-full px-5 py-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white placeholder:text-white/20 text-sm focus:outline-none focus:border-[#FF4444]/30 focus:ring-1 focus:ring-[#FF4444]/15 transition-all"
              />
            </motion.div>

            {/* Social proof */}
            <motion.div
              variants={staggerItem}
              className="pt-4 flex items-center justify-center gap-3 text-white/15 text-xs"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Your information is secure and never shared</span>
            </motion.div>
          </motion.div>
        );

      default:
        return null;
    }
  }

  /* ---------------------------------------------------------------- */
  /*  Render                                                           */
  /* ---------------------------------------------------------------- */

  return (
    <div className="min-h-screen flex flex-col" onKeyDown={handleKeyDown}>
      {/* Sticky header with progress */}
      <header className="sticky top-0 z-10 bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={step > 0 ? goBack : undefined}
            className={cn(
              "flex items-center gap-2 text-sm transition-colors",
              step > 0
                ? "text-white/40 hover:text-white cursor-pointer"
                : "invisible"
            )}
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <p className="text-[11px] font-medium text-white/30 tabular-nums">
            {step + 1} of {TOTAL_STEPS}
          </p>
          <Link
            href="/"
            className="text-white/20 hover:text-white/50 text-xs transition-colors"
          >
            Exit
          </Link>
        </div>

        {/* Animated progress bar */}
        <div className="h-[3px] bg-white/[0.04]">
          <motion.div
            className="h-full bg-gradient-to-r from-[#FF4444] to-[#FF6B6B] rounded-r-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ type: "spring", stiffness: 200, damping: 30 }}
          />
        </div>
      </header>

      {/* Main content area */}
      <div className="flex-1 flex items-start justify-center px-6 py-12 sm:py-16">
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              {/* Question heading */}
              <div className="text-center mb-10">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 tracking-tight">
                  {STEPS[step].question}
                </h1>
                <p className="text-white/35 text-sm sm:text-base">
                  {STEPS[step].subtitle}
                </p>
              </div>

              {/* Error banner */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center"
                >
                  {error}
                </motion.div>
              )}

              {/* Dynamic step content */}
              {renderStep()}
            </motion.div>
          </AnimatePresence>

          {/* Navigation buttons */}
          <motion.div
            className="flex items-center justify-center gap-4 mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {step > 0 && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={goBack}
                className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/[0.1] text-white/50 text-sm font-medium hover:bg-white/[0.04] hover:text-white/80 transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </motion.button>
            )}

            <motion.button
              whileHover={isValid() || step === 3 ? { scale: 1.02 } : undefined}
              whileTap={isValid() || step === 3 ? { scale: 0.98 } : undefined}
              onClick={goNext}
              disabled={step !== 3 && !isValid()}
              className={cn(
                "flex items-center gap-2 px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300",
                isValid() || step === 3
                  ? "bg-gradient-to-r from-[#FF4444] to-[#FF6B6B] text-white shadow-[0_0_24px_rgba(255,68,68,0.25)] hover:shadow-[0_0_36px_rgba(255,68,68,0.35)]"
                  : "bg-white/[0.05] text-white/20 cursor-not-allowed"
              )}
            >
              {step === TOTAL_STEPS - 1 ? (
                <>
                  Get My Estimate
                  <Send className="w-4 h-4" />
                </>
              ) : (
                <>
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </motion.button>
          </motion.div>

          {/* Optional step hint */}
          {step === 3 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center text-white/15 text-xs mt-4"
            >
              This step is optional — skip it if you&apos;re not sure yet
            </motion.p>
          )}

          {/* Keyboard hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center text-white/10 text-[11px] mt-6 hidden sm:block"
          >
            Press <kbd className="px-1.5 py-0.5 rounded bg-white/[0.06] text-white/20 font-mono text-[10px]">Enter ↵</kbd> to continue
          </motion.p>
        </div>
      </div>
    </div>
  );
}
