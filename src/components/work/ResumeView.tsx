"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { DM_Sans } from "next/font/google";
import { ArrowRight } from "lucide-react";
import {
  siAnthropic,
  siLangchain,
  siHuggingface,
  siOllama,
  siPython,
  siTypescript,
  siNextdotjs,
  siReact,
  siNodedotjs,
  siFastapi,
  siN8n,
  siMake,
  siZapier,
  siPostgresql,
  siSupabase,
  siMongodb,
  siRedis,
  siDocker,
  siVercel,
  siGooglecloud,
  siCloudflare,
} from "simple-icons";
import {
  profile,
  stats,
  domainExpertise,
  technologyCategories,
  experience,
  education,
  languages,
  certifications,
  projects,
} from "@/data/resume-data";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const OPENAI_PATH =
  "M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z";

type TechIcon = { name: string; path: string; hex: string };

const DARK_HEXES = new Set(["000000", "181717", "191919", "1C3C3C", "111111"]);

const techIconMap: Record<string, TechIcon> = {
  OpenAI: { name: "OpenAI", path: OPENAI_PATH, hex: "412991" },
  Anthropic: { name: siAnthropic.title, path: siAnthropic.path, hex: siAnthropic.hex },
  LangChain: { name: siLangchain.title, path: siLangchain.path, hex: siLangchain.hex },
  "Hugging Face": { name: siHuggingface.title, path: siHuggingface.path, hex: siHuggingface.hex },
  Ollama: { name: siOllama.title, path: siOllama.path, hex: siOllama.hex },
  Python: { name: siPython.title, path: siPython.path, hex: siPython.hex },
  TypeScript: { name: siTypescript.title, path: siTypescript.path, hex: siTypescript.hex },
  "Next.js": { name: siNextdotjs.title, path: siNextdotjs.path, hex: siNextdotjs.hex },
  React: { name: siReact.title, path: siReact.path, hex: siReact.hex },
  "Node.js": { name: siNodedotjs.title, path: siNodedotjs.path, hex: siNodedotjs.hex },
  FastAPI: { name: siFastapi.title, path: siFastapi.path, hex: siFastapi.hex },
  n8n: { name: siN8n.title, path: siN8n.path, hex: siN8n.hex },
  Make: { name: siMake.title, path: siMake.path, hex: siMake.hex },
  Zapier: { name: siZapier.title, path: siZapier.path, hex: siZapier.hex },
  PostgreSQL: { name: siPostgresql.title, path: siPostgresql.path, hex: siPostgresql.hex },
  Supabase: { name: siSupabase.title, path: siSupabase.path, hex: siSupabase.hex },
  MongoDB: { name: siMongodb.title, path: siMongodb.path, hex: siMongodb.hex },
  Redis: { name: siRedis.title, path: siRedis.path, hex: siRedis.hex },
  Docker: { name: siDocker.title, path: siDocker.path, hex: siDocker.hex },
  Vercel: { name: siVercel.title, path: siVercel.path, hex: siVercel.hex },
  "Google Cloud": { name: siGooglecloud.title, path: siGooglecloud.path, hex: siGooglecloud.hex },
  Cloudflare: { name: siCloudflare.title, path: siCloudflare.path, hex: siCloudflare.hex },
};

function brandColor(hex: string) {
  return DARK_HEXES.has(hex) ? "#1a1a1a" : `#${hex}`;
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const },
  }),
};

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block px-3 py-1.5 text-[14px] font-medium text-neutral-700 bg-neutral-100 border border-neutral-200 rounded-md">
      {children}
    </span>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 mb-10">
      <h2 className="text-[28px] md:text-[32px] font-bold tracking-tight text-neutral-900 bg-neutral-100/80 px-5 py-2.5 rounded-lg">
        {children}
      </h2>
      <div className="flex-1 h-px bg-neutral-200" />
    </div>
  );
}

const MAX_TECH_PER_ROLE = 5;

export function ResumeView() {
  return (
    <div
      className={`${dmSans.className} bg-white text-neutral-900 min-h-screen`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20">
        <div className="flex flex-col md:flex-row gap-0">
          {/* ===== LEFT SIDEBAR ===== */}
          <motion.aside
            className="md:w-[290px] lg:w-[310px] flex-shrink-0"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            <div className="md:sticky md:top-0 md:h-screen md:overflow-y-auto bg-neutral-50 border-r border-neutral-200/80 px-7 py-10 md:py-16 -mx-6 md:mx-0 md:-ml-12 md:pl-12 space-y-6">
              {/* Photo — soft shadow + border */}
              <div className="relative w-28 h-28 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white shadow-xl shadow-neutral-200/80 mx-auto md:mx-0">
                <Image
                  src={profile.photo}
                  alt={profile.name}
                  fill
                  className="object-cover"
                  style={{ objectPosition: "center 15%" }}
                />
              </div>

              {/* Name & Title with floating availability badge */}
              <div className="text-center md:text-left relative pt-5">
                {/* Floating availability notification */}
                <div className="absolute top-0 right-0 md:-right-1 flex items-center gap-1.5 bg-green-50 border border-green-200/60 rounded-full px-2.5 py-1 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[10px] text-green-700 font-semibold uppercase tracking-wider whitespace-nowrap">
                    Available
                  </span>
                </div>
                <h1 className="text-[28px] font-bold tracking-tight text-neutral-900 mb-1 leading-tight">
                  {profile.name}
                </h1>
                <p className="text-[14px] text-neutral-500 uppercase tracking-wider font-medium">
                  {profile.title}
                </p>
                <p className="text-[13px] text-neutral-400 mt-2">
                  {profile.location}
                </p>
              </div>

              {/* Stats — bigger numbers, readable labels */}
              <div className="space-y-4 pt-6 border-t border-neutral-200">
                <p className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold">
                  Stats
                </p>
                <div className="grid grid-cols-3 md:grid-cols-1 gap-4">
                  {stats.map((stat) => (
                    <div key={stat.label} className="text-center md:text-left">
                      <div className="text-[28px] font-bold text-neutral-900 leading-none">
                        {stat.value}
                      </div>
                      <div className="text-[12px] text-neutral-500 mt-1">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div className="space-y-4 pt-6 border-t border-neutral-200">
                <p className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold">
                  Education
                </p>
                {education.map((edu) => (
                  <div key={edu.degree}>
                    <p className="text-[12px] text-neutral-400 font-mono">
                      {edu.dates}
                    </p>
                    <p className="text-[14px] font-semibold text-neutral-900 mt-0.5 leading-snug">
                      {edu.degree}
                    </p>
                    <p className="text-[11px] text-neutral-400 uppercase tracking-wider mt-0.5">
                      {edu.institution}
                    </p>
                  </div>
                ))}
              </div>

              {/* Languages */}
              <div className="space-y-3 pt-6 border-t border-neutral-200">
                <p className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold">
                  Languages
                </p>
                {languages.map((lang) => (
                  <div key={lang.name} className="flex items-baseline justify-between">
                    <p className="text-[15px] font-semibold text-neutral-900">
                      {lang.name}
                    </p>
                    <p className="text-[11px] text-neutral-400 uppercase tracking-wider">
                      {lang.level}
                    </p>
                  </div>
                ))}
              </div>

              {/* Certifications */}
              <div className="space-y-3 pt-6 border-t border-neutral-200">
                <p className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold">
                  Certifications
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {certifications.map((cert) => (
                    <span
                      key={cert}
                      className="inline-block text-[11px] px-2.5 py-1 rounded-md bg-white border border-neutral-200 text-neutral-500 font-medium"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.aside>

          {/* ===== RIGHT CONTENT ===== */}
          <div className="flex-1 min-w-0 pt-6 md:pt-14 pb-16 bg-[#FAFBFC] md:pl-16 lg:pl-20 md:pr-10">
            {/* Name headline — larger than everything else */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
              className="mb-12"
            >
              <h2 className="text-[30px] md:text-[38px] font-bold tracking-tight text-neutral-900 leading-tight">
                {profile.name}
              </h2>
              <p className="text-[18px] text-neutral-400 font-normal mt-1">
                {profile.title}
              </p>
            </motion.div>

            {/* Summary */}
            <motion.section
              className="mb-14"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
            >
              <p className="text-neutral-600 text-[17px]" style={{ lineHeight: 1.7 }}>
                {profile.summary}
              </p>
            </motion.section>

            {/* Domain Expertise */}
            <motion.section
              className="mb-12"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={3}
            >
              <p className="text-[16px] text-neutral-800 mb-3 font-semibold">
                {stats[0].value} of commercial experience in
              </p>
              <div className="flex flex-wrap gap-2">
                {domainExpertise.map((d) => (
                  <Tag key={d}>{d}</Tag>
                ))}
              </div>
            </motion.section>

            {/* Technologies — categorized with icons */}
            <motion.section
              className="mb-20"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={4}
            >
              <div className="space-y-8">
                {technologyCategories.map((cat) => (
                  <div key={cat.label}>
                    <p className="text-[14px] text-neutral-400 font-semibold uppercase tracking-wider mb-3">
                      {cat.label}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {cat.tools.map((t) => {
                        const icon = techIconMap[t];
                        if (!icon)
                          return <Tag key={t}>{t}</Tag>;
                        return (
                          <div key={t} className="group/tech relative">
                            <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-neutral-100 border border-neutral-200 group-hover/tech:border-neutral-300 group-hover/tech:bg-neutral-50 group-hover/tech:shadow-md group-hover/tech:scale-110 transition-all duration-200 cursor-default">
                              <svg
                                viewBox="0 0 24 24"
                                width={20}
                                height={20}
                                fill={brandColor(icon.hex)}
                                aria-label={icon.name}
                              >
                                <path d={icon.path} />
                              </svg>
                            </div>
                            <div className="absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md bg-neutral-900 text-white text-[11px] font-medium opacity-0 group-hover/tech:opacity-100 transition-opacity duration-150 pointer-events-none whitespace-nowrap z-20">
                              {t}
                              <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-neutral-900" />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Projects */}
            <motion.section
              className="mb-24"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={5}
            >
              <SectionHeading>Projects</SectionHeading>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {projects.map((project) => (
                  <div
                    key={project.title}
                    className="group relative rounded-xl border border-neutral-200 bg-white p-6 hover:border-neutral-300 hover:shadow-md transition-all duration-200"
                  >
                    {/* Metric — larger, bolder */}
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="text-[26px] font-bold text-neutral-900">
                        {project.metric}
                      </span>
                      <span className="text-[11px] text-neutral-400 uppercase tracking-wider font-semibold">
                        {project.metricLabel}
                      </span>
                    </div>

                    <h3 className="text-[15px] font-bold text-neutral-900 mb-1.5">
                      {project.title}
                    </h3>

                    <p className="text-[13px] text-neutral-500 mb-4" style={{ lineHeight: 1.6 }}>
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {project.stack.map((t) => (
                        <span
                          key={t}
                          className="text-[10px] px-2 py-0.5 rounded bg-neutral-50 border border-neutral-200 text-neutral-400 font-medium"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Experience Highlights */}
            <motion.section
              className="mb-20"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={6}
            >
              <SectionHeading>Experience Highlights</SectionHeading>

              <div className="relative">
                {/* Vertical timeline line */}
                <div className="absolute left-[5px] top-3 bottom-3 w-[2px] bg-neutral-200 rounded-full" />

                <div>
                  {experience.map((job, i) => (
                    <div key={`${job.company}-${job.dates}`} className="relative pl-11 mb-14 last:mb-0">
                      {/* Timeline dot — filled for current role, outlined for past */}
                      <div
                        className={`absolute left-0 top-2 w-[12px] h-[12px] rounded-full z-10 ${
                          i === 0
                            ? "bg-neutral-900 border-2 border-neutral-900"
                            : "bg-white border-[2.5px] border-neutral-300"
                        }`}
                      />

                      {/* Title + dates */}
                      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-1">
                        <h3 className="text-[20px] font-bold text-neutral-900 leading-snug">
                          {job.title}
                        </h3>
                        <span className="text-[12px] text-neutral-400 font-mono flex-shrink-0">
                          {job.dates}
                        </span>
                      </div>

                      {/* Company */}
                      <p className="text-[14px] text-neutral-400 mb-4">
                        {job.company}
                      </p>

                      {/* Overview label — lighter, smaller */}
                      <p className="text-[10px] uppercase tracking-[0.15em] text-neutral-300 font-semibold mb-1.5">
                        Overview
                      </p>
                      <p className="text-[15px] text-neutral-600 mb-3" style={{ lineHeight: 1.65 }}>
                        {job.overview}
                      </p>

                      {/* Domain tags */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {job.domains.map((d) => (
                          <span
                            key={d}
                            className="inline-block text-[11px] px-2 py-0.5 rounded bg-neutral-100 border border-neutral-200 text-neutral-500"
                          >
                            {d}
                          </span>
                        ))}
                      </div>

                      {/* Responsibilities label — lighter */}
                      <p className="text-[10px] uppercase tracking-[0.15em] text-neutral-300 font-semibold mb-2">
                        Responsibilities
                      </p>
                      <ul className="space-y-1.5 mb-4">
                        {job.responsibilities.map((r) => (
                          <li
                            key={r}
                            className="text-[15px] text-neutral-600 pl-4 relative before:content-['·'] before:absolute before:left-0 before:text-neutral-300 before:font-bold"
                            style={{ lineHeight: 1.6 }}
                          >
                            {r}
                          </li>
                        ))}
                      </ul>

                      {/* Tech stack — capped, smaller, faded */}
                      <p className="text-[10px] uppercase tracking-[0.15em] text-neutral-300 font-semibold mb-1.5">
                        Tech
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {job.techStack.slice(0, MAX_TECH_PER_ROLE).map((t) => (
                          <span
                            key={t}
                            className="text-[10px] px-2 py-0.5 rounded bg-neutral-50 border border-neutral-100 text-neutral-400"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.section>

            {/* Footer CTA — white card, cohesive */}
            <motion.section
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={7}
            >
              <div className="rounded-2xl border border-neutral-200 bg-white px-8 md:px-10 py-10 md:py-12">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  <div className="flex-1">
                    <p className="text-[22px] md:text-[26px] font-bold text-neutral-900 leading-tight">
                      Let&apos;s build your next AI-powered system
                    </p>
                    <p className="text-[15px] text-neutral-500 mt-2" style={{ lineHeight: 1.6 }}>
                      From idea to production — I ship fast and iterate with you every step of the way.
                    </p>
                  </div>
                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-xl bg-neutral-900 text-white font-bold text-[15px] hover:bg-neutral-800 transition-colors flex-shrink-0"
                  >
                    Book a Call
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.section>
          </div>
        </div>
      </div>
    </div>
  );
}
