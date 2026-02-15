"use client";

import { useState, useEffect, useRef, useCallback } from "react";

/* ── Feature prompts with generated code ────────────────── */

const FEATURES = [
  {
    prompt: "Add user authentication with OAuth",
    files: ["auth.ts", "middleware.ts", "login.tsx"],
    activeFile: "auth.ts",
    code: `import { OAuth } from '@/lib/auth'
import { db } from '@/lib/database'

export async function authenticate(
  provider: 'google' | 'github'
) {
  const session = await OAuth.create({
    provider,
    scopes: ['email', 'profile'],
    callback: '/api/auth/callback',
  })

  const user = await db.user.upsert({
    where: { email: session.email },
    create: {
      name: session.name,
      email: session.email,
      avatar: session.picture,
    },
  })

  return { user, token: session.jwt }
}`,
    steps: [
      "Analyzing auth requirements",
      "Generating OAuth provider config",
      "Creating database schema",
      "Building login component",
      "Adding session middleware",
    ],
  },
  {
    prompt: "Build a real-time analytics dashboard",
    files: ["dashboard.tsx", "charts.tsx", "api/metrics.ts"],
    activeFile: "dashboard.tsx",
    code: `import { useRealtimeMetrics } from '@/hooks'
import { AreaChart, KPICard } from '@/ui'

export function Dashboard() {
  const { metrics, isLive } =
    useRealtimeMetrics({
      interval: 5000,
      endpoints: [
        '/api/metrics/revenue',
        '/api/metrics/users',
      ],
    })

  return (
    <div className="grid cols-3 gap-4">
      <KPICard
        title="Active Users"
        value={metrics.activeUsers}
        trend={+12.4}
      />
      <KPICard
        title="Revenue"
        value={metrics.mrr}
        format="currency"
      />
      <AreaChart
        data={metrics.timeseries}
        className="col-span-3"
      />
    </div>
  )
}`,
    steps: [
      "Designing component architecture",
      "Building real-time data hooks",
      "Generating chart components",
      "Creating KPI card layout",
      "Connecting API endpoints",
    ],
  },
  {
    prompt: "Create Stripe payment integration",
    files: ["checkout.tsx", "api/webhook.ts", "plans.ts"],
    activeFile: "api/webhook.ts",
    code: `import Stripe from 'stripe'
import { db } from '@/lib/database'

const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY!
)

export async function POST(req: Request) {
  const body = await req.text()
  const sig = req.headers
    .get('stripe-signature')!

  const event = stripe.webhooks
    .constructEvent(body, sig, secret)

  if (event.type === 'checkout.done') {
    const session = event.data.object
    await db.user.update({
      where: { id: session.metadata.userId },
      data: {
        plan: 'pro',
        stripeCustomerId: session.customer,
      },
    })
  }

  return new Response('ok')
}`,
    steps: [
      "Configuring Stripe SDK",
      "Creating pricing plans schema",
      "Building checkout session flow",
      "Setting up webhook handler",
      "Adding subscription management",
    ],
  },
];

/* ── Component ──────────────────────────────────────────── */

export function SaaSDemo() {
  const [selected, setSelected] = useState<number | null>(null);
  const [typedCode, setTypedCode] = useState("");
  const [currentStep, setCurrentStep] = useState(-1);
  const [isComplete, setIsComplete] = useState(false);
  const codeRef = useRef<HTMLPreElement>(null);

  const reset = useCallback(() => {
    setSelected(null);
    setTypedCode("");
    setCurrentStep(-1);
    setIsComplete(false);
  }, []);

  useEffect(() => {
    if (selected === null) return;

    const feature = FEATURES[selected];
    let charIndex = 0;
    let stepIndex = 0;
    const stepInterval = Math.floor(
      feature.code.length / feature.steps.length
    );

    setCurrentStep(0);

    const timer = setInterval(() => {
      if (charIndex < feature.code.length) {
        charIndex += 2;
        setTypedCode(feature.code.slice(0, charIndex));

        const newStep = Math.min(
          Math.floor(charIndex / stepInterval),
          feature.steps.length - 1
        );
        if (newStep !== stepIndex) {
          stepIndex = newStep;
          setCurrentStep(newStep);
        }

        if (codeRef.current) {
          codeRef.current.scrollTop = codeRef.current.scrollHeight;
        }
      } else {
        clearInterval(timer);
        setCurrentStep(feature.steps.length - 1);
        setTimeout(() => setIsComplete(true), 400);
      }
    }, 25);

    return () => clearInterval(timer);
  }, [selected]);

  const feature = selected !== null ? FEATURES[selected] : null;

  return (
    <div className="flex flex-col h-full bg-[#0D0D0D]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.08]">
        <div className="flex items-center gap-2">
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#FF4444"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
          <span className="text-xs text-white/50 font-medium">
            AI Dev Assistant
          </span>
        </div>
        {selected !== null && (
          <button
            onClick={reset}
            className="text-[10px] text-white/30 hover:text-white/50 transition-colors"
          >
            ← Back
          </button>
        )}
      </div>

      {selected === null ? (
        /* ── Idle: prompt selection ── */
        <div className="flex-1 flex flex-col px-4 py-5 min-h-0">
          {/* Mini editor preview */}
          <div className="flex-1 rounded-lg bg-white/[0.02] border border-white/[0.06] overflow-hidden mb-4">
            <div className="flex items-center gap-1.5 px-3 py-1.5 border-b border-white/[0.04]">
              <div className="w-1.5 h-1.5 rounded-full bg-[#FF4444]/40" />
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400/40" />
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400/40" />
              <span className="text-[9px] text-white/20 ml-1.5 font-mono">
                app.tsx
              </span>
            </div>
            <div className="p-3 font-mono text-[10px] leading-relaxed">
              <p>
                <span className="text-purple-400/40">import</span>
                <span className="text-white/20">
                  {" { NextApp } "}
                </span>
                <span className="text-purple-400/40">from</span>
                <span className="text-emerald-400/40"> &apos;next&apos;</span>
              </p>
              <p className="mt-2 text-white/15">
                {"// Describe a feature below —"}
              </p>
              <p className="text-white/15">
                {"// AI generates production-ready code"}
              </p>
              <div className="w-1.5 h-3.5 bg-white/20 inline-block animate-pulse mt-2" />
            </div>
          </div>

          {/* Prompt buttons */}
          <p className="text-[9px] uppercase tracking-wider text-white/25 mb-2.5 font-medium">
            What should we build?
          </p>
          <div className="space-y-2">
            {FEATURES.map((f, i) => (
              <button
                key={i}
                onClick={() => setSelected(i)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06] hover:border-[#FF4444]/20 hover:bg-[#FF4444]/[0.03] transition-all text-left group"
              >
                <div className="w-5 h-5 rounded-md bg-[#FF4444]/10 flex items-center justify-center shrink-0 group-hover:bg-[#FF4444]/20 transition-colors">
                  <svg
                    width="9"
                    height="9"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#FF6B6B"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </div>
                <span className="text-[11px] text-white/50 group-hover:text-white/70 transition-colors">
                  {f.prompt}
                </span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* ── Active: AI generating code ── */
        <div className="flex-1 flex flex-col min-h-0">
          {/* Prompt bubble */}
          <div className="px-3 pt-3 pb-2 shrink-0">
            <div className="flex items-start gap-2 px-2.5 py-2 rounded-lg bg-white/[0.03] border border-white/[0.06]">
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#FF6B6B"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mt-0.5 shrink-0"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              <p className="text-[10px] text-white/50 leading-relaxed">
                &quot;{feature!.prompt}&quot;
              </p>
            </div>
          </div>

          {/* Code editor */}
          <div className="flex-1 flex flex-col min-h-0 border-b border-white/[0.06]">
            {/* File tabs */}
            <div className="flex items-center border-b border-white/[0.04] shrink-0">
              {feature!.files.map((file) => (
                <div
                  key={file}
                  className={`px-3 py-1.5 text-[9px] font-mono border-r border-white/[0.04] ${
                    file === feature!.activeFile
                      ? "text-white/50 bg-white/[0.02]"
                      : "text-white/20"
                  }`}
                >
                  {file}
                </div>
              ))}
            </div>

            {/* Code content */}
            <pre
              ref={codeRef}
              className="flex-1 overflow-y-auto p-3 font-mono text-[10px] leading-[1.65] min-h-0"
            >
              <code>
                {typedCode.split("\n").map((line, i) => (
                  <div key={i} className="flex">
                    <span className="w-5 shrink-0 text-right pr-3 text-white/10 select-none text-[9px]">
                      {i + 1}
                    </span>
                    <span className="text-white/50 whitespace-pre">
                      {line}
                    </span>
                  </div>
                ))}
                {!isComplete && (
                  <span className="inline-block w-1.5 h-3 bg-[#FF4444]/60 animate-pulse ml-0.5 rounded-sm" />
                )}
              </code>
            </pre>
          </div>

          {/* Steps progress */}
          <div className="shrink-0 px-3 py-2.5 space-y-1">
            {feature!.steps.map((step, i) => {
              const isDone =
                i < currentStep || (i === currentStep && isComplete);
              const isActive = i === currentStep && !isComplete;

              return (
                <div key={step} className="flex items-center gap-2">
                  <div
                    className={`w-3 h-3 rounded-full flex items-center justify-center shrink-0 ${
                      isDone
                        ? "bg-emerald-500/20"
                        : isActive
                          ? "bg-[#FF4444]/20"
                          : "bg-white/[0.03]"
                    }`}
                  >
                    {isDone ? (
                      <svg
                        width="6"
                        height="6"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#10B981"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : isActive ? (
                      <div className="w-1 h-1 rounded-full bg-[#FF4444] animate-pulse" />
                    ) : null}
                  </div>
                  <span
                    className={`text-[10px] ${
                      isDone
                        ? "text-white/35"
                        : isActive
                          ? "text-white/60"
                          : "text-white/15"
                    }`}
                  >
                    {step}
                  </span>
                </div>
              );
            })}

            {isComplete && (
              <div className="flex items-center justify-between pt-1.5 mt-1 border-t border-white/[0.06]">
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span className="text-[10px] text-emerald-400 font-medium">
                    Ready to review & ship
                  </span>
                </div>
                <button
                  onClick={reset}
                  className="text-[9px] text-white/30 hover:text-white/50 transition-colors"
                >
                  Try another
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
