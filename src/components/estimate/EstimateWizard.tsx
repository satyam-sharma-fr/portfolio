"use client";

import { useState } from "react";
import Link from "next/link";

import { StepIndicator } from "@/components/estimate/StepIndicator";
import { EstimateResults, type EstimateResult } from "@/components/estimate/EstimateResults";

/* ------------------------------------------------------------------ */
/*  Step definitions                                                   */
/* ------------------------------------------------------------------ */

interface StepOption {
  label: string;
  description?: string;
}

interface StepConfig {
  question: string;
  subtitle?: string;
  type: "single" | "multi" | "textarea" | "contact";
  options?: StepOption[];
  placeholder?: string;
  required: boolean;
}

const STEPS: StepConfig[] = [
  {
    question: "What best describes the application you want to build?",
    type: "single",
    required: true,
    options: [
      { label: "SaaS", description: "A platform where users pay regularly for ongoing access to software or content." },
      { label: "Online Marketplace", description: "A digital hub connecting buyers and sellers to exchange products or services." },
      { label: "Internal Application", description: "Software to streamline internal operations and boost productivity." },
      { label: "Customer Portal", description: "A system for interacting with and supporting your client base." },
      { label: "Social Networking App", description: "A space for users to connect, share, and interact online." },
      { label: "AI-Powered Assistant", description: "An intelligent tool using AI to enhance user tasks and outcomes." },
      { label: "Personal Productivity App", description: "An application designed to enhance individual efficiency or lifestyle." },
      { label: "Marketing App", description: "An app with the sole purpose of driving traffic such as quizzes, promotion, etc." },
      { label: "Other", description: "Please specify" },
    ],
  },
  {
    question: "What's the monetization model for your app?",
    subtitle: "You can select more than one option.",
    type: "multi",
    required: true,
    options: [
      { label: "Free", description: "Users can access the application without any cost. Primarily applies to applications meant for internal, personal or informational purposes." },
      { label: "Usage-based", description: "Costs are incurred based on the extent of the application's use. This could relate to data storage, transaction volumes, or operational time." },
      { label: "Advertising", description: "The application is free for users, generating revenue through displayed advertisements." },
      { label: "Big-ticket sales/Licensing", description: "The application is offered to other companies for rebranding and resale as their product. Revenue comes from licensing fees or revenue share model." },
      { label: "Commission", description: "You get a percentage cut out of each transaction happening in your platform" },
      { label: "Subscription", description: "Users pay a recurring fee to access the application. This includes monthly and annual fees and may have a freemium component." },
      { label: "One-time purchase", description: "Users pay a single fee to download and use the application. Common in consumer apps and software products." },
      { label: "I don't know yet" },
      { label: "Other", description: "Please specify" },
    ],
  },
  {
    question: "Describe your software project idea",
    subtitle: "The more detail you provide, the better estimate we'll be able to give.",
    type: "textarea",
    placeholder: "Enter a description",
    required: true,
  },
  {
    question: "Where do you want your app to live?",
    subtitle: "Keep in mind, that each additional platform you choose, the more it's going to cost.",
    type: "multi",
    required: true,
    options: [
      { label: "Web app" },
      { label: "iOS" },
      { label: "Android" },
      { label: "Other", description: "Please specify" },
    ],
  },
  {
    question: "What third-party integrations will you need? (Optional)",
    subtitle: "You can select more than one option.",
    type: "multi",
    required: false,
    options: [
      { label: "Payments", description: "(e.g. Stripe)" },
      { label: "Email sending", description: "(e.g. Sendgrid, Amazon SES)" },
      { label: "AI", description: "(e.g. OpenAI, Anthropic, etc)" },
      { label: "Social logins", description: "(e.g. Google, Facebook, etc)" },
      { label: "Maps", description: "(e.g. Google Maps, Mapbox)" },
      { label: "CRM", description: "(e.g. Hubspot, Pipedrive, etc)" },
      { label: "Other", description: "Please specify" },
    ],
  },
  {
    question: "Do you have any specific technical requirements? (Optional)",
    type: "multi",
    required: false,
    options: [
      { label: "Real-time updates" },
      { label: "Offline functionality" },
      { label: "Ability to quickly handle large amounts of data", description: "e.g. millions of data entries" },
      { label: "Hosting the servers and data onsite" },
      { label: "Audit logs", description: "Ability to see the logs of all actions taken on the app" },
      { label: "Other", description: "Please specify" },
    ],
  },
  {
    question: "Anything else you'd like to add? (Optional)",
    subtitle: "Any extra details help us with a more detailed scope.",
    type: "textarea",
    placeholder: "Enter a description",
    required: false,
  },
  {
    question: "Almost there! Tell us how to reach you.",
    subtitle: "We'll send a detailed copy of your estimate to your email.",
    type: "contact",
    required: true,
  },
];

/* ------------------------------------------------------------------ */
/*  Form data type                                                     */
/* ------------------------------------------------------------------ */

export interface EstimateFormData {
  applicationType: string;
  applicationTypeOther?: string;
  monetization: string[];
  monetizationOther?: string;
  description: string;
  platforms: string[];
  platformsOther?: string;
  integrations: string[];
  integrationsOther?: string;
  technicalRequirements: string[];
  technicalRequirementsOther?: string;
  additionalDetails: string;
  name: string;
  email: string;
}

const INITIAL_FORM_DATA: EstimateFormData = {
  applicationType: "",
  monetization: [],
  description: "",
  platforms: [],
  integrations: [],
  technicalRequirements: [],
  additionalDetails: "",
  name: "",
  email: "",
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function EstimateWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<EstimateFormData>(INITIAL_FORM_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [results, setResults] = useState<EstimateResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const stepConfig = STEPS[currentStep - 1];
  const totalQuizSteps = 7;
  const isContactStep = currentStep === 8;
  const showStepIndicator = currentStep <= totalQuizSteps;

  /* ---- Validation ---- */

  function isStepValid(): boolean {
    switch (currentStep) {
      case 1:
        return formData.applicationType !== "";
      case 2:
        return formData.monetization.length > 0;
      case 3:
        return formData.description.trim().length > 0;
      case 4:
        return formData.platforms.length > 0;
      case 5:
      case 6:
      case 7:
        return true; // optional
      case 8:
        return formData.name.trim().length > 0 && isValidEmail(formData.email);
      default:
        return false;
    }
  }

  function isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  /* ---- Navigation ---- */

  function handleNext() {
    if (currentStep < 8) {
      setCurrentStep((s) => s + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      handleSubmit();
    }
  }

  function handleBack() {
    if (currentStep > 1) {
      setCurrentStep((s) => s - 1);
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
      setResults(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  /* ---- Single select handler ---- */

  function handleSingleSelect(value: string) {
    setFormData((prev) => ({ ...prev, applicationType: value }));
  }

  /* ---- Multi select handler ---- */

  function getMultiField(): keyof EstimateFormData {
    switch (currentStep) {
      case 2: return "monetization";
      case 4: return "platforms";
      case 5: return "integrations";
      case 6: return "technicalRequirements";
      default: return "monetization";
    }
  }

  function getOtherField(): keyof EstimateFormData {
    switch (currentStep) {
      case 2: return "monetizationOther";
      case 4: return "platformsOther";
      case 5: return "integrationsOther";
      case 6: return "technicalRequirementsOther";
      default: return "monetizationOther";
    }
  }

  function handleMultiToggle(value: string) {
    const field = getMultiField();
    setFormData((prev) => {
      const current = prev[field] as string[];
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [field]: next };
    });
  }

  /* ---- Textarea handler ---- */

  function getTextareaField(): keyof EstimateFormData {
    return currentStep === 3 ? "description" : "additionalDetails";
  }

  /* ---- "Other" spec field value ---- */

  function getOtherValue(): string {
    const field = getOtherField();
    return (formData[field] as string) || "";
  }

  function isOtherSelected(): boolean {
    if (currentStep === 1) return formData.applicationType === "Other";
    const field = getMultiField();
    return (formData[field] as string[]).includes("Other");
  }

  /* ---- If we have results, show them ---- */

  if (results) {
    return <EstimateResults result={results} name={formData.name} />;
  }

  /* ---- Submitting state ---- */

  if (isSubmitting) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full border-2 border-white/10" />
            <div
              className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#FF4444]"
              style={{ animation: "spin 1s linear infinite" }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-6 h-6 text-[#FF4444]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
              </svg>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Generating Your Estimate</h2>
          <p className="text-white/50">Our AI is analyzing your project requirements...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-[#0A0A0A] border-b border-white/[0.06]">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/work" className="text-white/50 hover:text-white transition-colors text-sm flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back
          </Link>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">
            Software Project Price Estimation
          </p>
          <div className="w-16" />
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1 flex items-start justify-center px-6 py-12">
        <div className="w-full max-w-2xl">
          {/* Step indicator */}
          {showStepIndicator && (
            <div className="mb-10">
              <StepIndicator currentStep={currentStep} />
            </div>
          )}

          {/* Question */}
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              {stepConfig.question}
            </h1>
            {stepConfig.subtitle && (
              <p className="text-white/50 text-sm sm:text-base">
                {stepConfig.subtitle}
              </p>
            )}
          </div>

          {/* Error banner */}
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          {/* Step content */}
          <div className="space-y-3 mb-10">
            {/* Single select (Step 1) */}
            {stepConfig.type === "single" &&
              stepConfig.options?.map((opt) => (
                <button
                  key={opt.label}
                  type="button"
                  onClick={() => handleSingleSelect(opt.label)}
                  className={`
                    w-full text-left px-5 py-4 rounded-xl border transition-all duration-200
                    ${
                      formData.applicationType === opt.label
                        ? "bg-[#2563EB]/10 border-[#2563EB]/50 shadow-[0_0_20px_rgba(37,99,235,0.1)]"
                        : "bg-white/[0.02] border-white/[0.08] hover:bg-white/[0.04] hover:border-white/[0.12]"
                    }
                  `}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`
                        mt-0.5 w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors
                        ${
                          formData.applicationType === opt.label
                            ? "border-[#2563EB] bg-[#2563EB]"
                            : "border-white/30"
                        }
                      `}
                    >
                      {formData.applicationType === opt.label && (
                        <div className="w-2 h-2 rounded-full bg-white" />
                      )}
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">{opt.label}</p>
                      {opt.description && (
                        <p className="text-white/40 text-sm mt-0.5">{opt.description}</p>
                      )}
                    </div>
                  </div>
                </button>
              ))}

            {/* "Other" text input for single select */}
            {stepConfig.type === "single" && formData.applicationType === "Other" && (
              <div className="pl-8">
                <input
                  type="text"
                  value={formData.applicationTypeOther || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, applicationTypeOther: e.target.value }))
                  }
                  placeholder="Please specify..."
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-[#2563EB]/50 focus:ring-1 focus:ring-[#2563EB]/25 transition-colors"
                />
              </div>
            )}

            {/* Multi select (Steps 2, 4, 5, 6) */}
            {stepConfig.type === "multi" &&
              stepConfig.options?.map((opt) => {
                const field = getMultiField();
                const selected = (formData[field] as string[]).includes(opt.label);

                return (
                  <button
                    key={opt.label}
                    type="button"
                    onClick={() => handleMultiToggle(opt.label)}
                    className={`
                      w-full text-left px-5 py-4 rounded-xl border transition-all duration-200
                      ${
                        selected
                          ? "bg-[#2563EB]/10 border-[#2563EB]/50 shadow-[0_0_20px_rgba(37,99,235,0.1)]"
                          : "bg-white/[0.02] border-white/[0.08] hover:bg-white/[0.04] hover:border-white/[0.12]"
                      }
                    `}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`
                          mt-0.5 w-5 h-5 rounded-md border-2 shrink-0 flex items-center justify-center transition-colors
                          ${
                            selected
                              ? "border-[#2563EB] bg-[#2563EB]"
                              : "border-white/30"
                          }
                        `}
                      >
                        {selected && (
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <div>
                        <p className="text-white font-semibold text-sm">{opt.label}</p>
                        {opt.description && (
                          <p className="text-white/40 text-sm mt-0.5">{opt.description}</p>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}

            {/* "Other" text input for multi select */}
            {stepConfig.type === "multi" && isOtherSelected() && (
              <div className="pl-8">
                <input
                  type="text"
                  value={getOtherValue()}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, [getOtherField()]: e.target.value }))
                  }
                  placeholder="Please specify..."
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-[#2563EB]/50 focus:ring-1 focus:ring-[#2563EB]/25 transition-colors"
                />
              </div>
            )}

            {/* Textarea (Steps 3, 7) */}
            {stepConfig.type === "textarea" && (
              <textarea
                value={formData[getTextareaField()] as string}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, [getTextareaField()]: e.target.value }))
                }
                placeholder={stepConfig.placeholder}
                rows={5}
                className="w-full px-5 py-4 rounded-xl bg-white/[0.02] border border-white/[0.08] text-white placeholder:text-white/30 text-sm leading-relaxed resize-none focus:outline-none focus:border-[#2563EB]/50 focus:ring-1 focus:ring-[#2563EB]/25 transition-colors"
              />
            )}

            {/* Contact (Step 8) */}
            {stepConfig.type === "contact" && (
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-white/60 text-sm font-medium mb-2">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    placeholder="John Doe"
                    className="w-full px-5 py-3.5 rounded-xl bg-white/[0.02] border border-white/[0.08] text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-[#2563EB]/50 focus:ring-1 focus:ring-[#2563EB]/25 transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-white/60 text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, email: e.target.value }))
                    }
                    placeholder="john@company.com"
                    className="w-full px-5 py-3.5 rounded-xl bg-white/[0.02] border border-white/[0.08] text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-[#2563EB]/50 focus:ring-1 focus:ring-[#2563EB]/25 transition-colors"
                  />
                  {formData.email && !isValidEmail(formData.email) && (
                    <p className="text-red-400 text-xs mt-1.5">Please enter a valid email address</p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Navigation buttons */}
          <div className="flex items-center justify-center gap-4">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={handleBack}
                className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/[0.15] text-white text-sm font-medium hover:bg-white/[0.05] transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                Back
              </button>
            )}

            <button
              type="button"
              onClick={handleNext}
              disabled={stepConfig.required && !isStepValid()}
              className={`
                flex items-center gap-2 px-8 py-3 rounded-full text-sm font-medium transition-all duration-200
                ${
                  !stepConfig.required || isStepValid()
                    ? "bg-[#2563EB] text-white hover:bg-[#1D4FD8] shadow-[0_0_20px_rgba(37,99,235,0.3)]"
                    : "bg-white/[0.06] text-white/30 cursor-not-allowed"
                }
              `}
            >
              {isContactStep ? "Finish" : "Next"}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
