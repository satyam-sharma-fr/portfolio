import {
  siAnthropic,
  siGooglegemini,
  siMeta,
  siHuggingface,
  siOllama,
  siMistralai,
  siN8n,
  siZapier,
  siMake,
  siPostgresql,
  siSupabase,
  siMongodb,
  siRedis,
  siMilvus,
  siElasticsearch,
  siPython,
  siTypescript,
  siNextdotjs,
  siReact,
  siNodedotjs,
  siFastapi,
  siVercel,
  siDocker,
  siGithub,
  siGooglecloud,
  siCloudflare,
  siNotion,
  siAirtable,
  siHubspot,
  siStripe,
  siLangchain,
} from "simple-icons";

type Tool = {
  name: string;
  path: string;
  hex: string;
};

type Ring = {
  label: string;
  description: string;
  radius: number;
  duration: number;
  reverse: boolean;
  tools: Tool[];
  annotationAngle: number;
};

function si(icon: { title: string; path: string; hex: string }): Tool {
  return { name: icon.title, path: icon.path, hex: icon.hex };
}

const OPENAI_PATH =
  "M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z";

const SLACK_PATH =
  "M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z";

const CX = 340;
const CY = 340;
const LINE_LENGTH = 40;

const rings: Ring[] = [
  {
    label: "AI & LLMs",
    description: "Intelligence layer",
    radius: 120,
    duration: 60,
    reverse: false,
    annotationAngle: -55,
    tools: [
      { name: "OpenAI", path: OPENAI_PATH, hex: "FFFFFF" },
      si(siAnthropic),
      si(siGooglegemini),
      si(siMeta),
      si(siHuggingface),
      si(siOllama),
      si(siMistralai),
      si(siLangchain),
    ],
  },
  {
    label: "Automation & Data",
    description: "Workflow & storage",
    radius: 215,
    duration: 90,
    reverse: true,
    annotationAngle: -15,
    tools: [
      si(siN8n),
      si(siZapier),
      si(siMake),
      si(siPostgresql),
      si(siSupabase),
      si(siMongodb),
      si(siRedis),
      si(siMilvus),
      si(siElasticsearch),
    ],
  },
  {
    label: "Stack & Integrations",
    description: "Infra & connections",
    radius: 310,
    duration: 120,
    reverse: false,
    annotationAngle: 30,
    tools: [
      si(siPython),
      si(siTypescript),
      si(siNextdotjs),
      si(siReact),
      si(siNodedotjs),
      si(siFastapi),
      si(siVercel),
      si(siDocker),
      si(siGithub),
      si(siGooglecloud),
      si(siCloudflare),
      { name: "Slack", path: SLACK_PATH, hex: "4A154B" },
      si(siNotion),
      si(siAirtable),
      si(siHubspot),
      si(siStripe),
    ],
  },
];

const allTools = rings.flatMap((r) => r.tools);

const DARK_HEXES = new Set([
  "000000",
  "181717",
  "191919",
  "1C3C3C",
  "111111",
]);

function brandColor(hex: string): string {
  return DARK_HEXES.has(hex) ? "#FFFFFF" : `#${hex}`;
}

function ToolIcon({ tool, size = 18 }: { tool: Tool; size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={brandColor(tool.hex)}
      aria-label={tool.name}
    >
      <path d={tool.path} />
    </svg>
  );
}

function toRad(deg: number) {
  return (deg * Math.PI) / 180;
}

function ringEdge(radius: number, angleDeg: number) {
  const rad = toRad(angleDeg);
  return {
    x: CX + radius * Math.cos(rad),
    y: CY + radius * Math.sin(rad),
  };
}

function labelAnchor(radius: number, angleDeg: number) {
  const rad = toRad(angleDeg);
  return {
    x: CX + (radius + LINE_LENGTH) * Math.cos(rad),
    y: CY + (radius + LINE_LENGTH) * Math.sin(rad),
  };
}

export function Tools() {
  return (
    <section className="py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-white/[0.02]">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-6">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-6">
            Built with the tools you already use
          </h2>
          <p className="text-lg text-white/50 leading-relaxed">
            Always simple, fast, and reliable.
          </p>
        </div>

        {/* ===== Desktop: Orbit ===== */}
        <div className="hidden md:flex justify-center overflow-visible">
          <div
            className="orbit-system relative overflow-visible"
            style={{ width: 680, height: 680 }}
          >
            {/* Center hub — spinning arc reactor + ripples */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
              {/* Ripple rings */}
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="absolute top-1/2 left-1/2 w-28 h-28 rounded-full border border-[#FF4444]/15"
                  style={{
                    animation: "orbit-ripple 4s ease-out infinite",
                    animationDelay: `${i * 1.3}s`,
                  }}
                />
              ))}

              {/* Spinning arc ring */}
              <div className="relative w-[72px] h-[72px]">
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background:
                      "conic-gradient(from 0deg, transparent 0%, #FF4444 12%, transparent 35%, transparent 55%, rgba(255,68,68,0.4) 70%, transparent 100%)",
                    mask: "radial-gradient(circle, transparent 58%, black 60%)",
                    WebkitMask:
                      "radial-gradient(circle, transparent 58%, black 60%)",
                    animation: "orbit 3s linear infinite",
                  }}
                />
                {/* Inner ring — counter-rotates */}
                <div
                  className="absolute inset-[10px] rounded-full"
                  style={{
                    background:
                      "conic-gradient(from 180deg, transparent 0%, rgba(255,68,68,0.6) 8%, transparent 25%, transparent 70%, rgba(255,68,68,0.3) 85%, transparent 100%)",
                    mask: "radial-gradient(circle, transparent 52%, black 55%)",
                    WebkitMask:
                      "radial-gradient(circle, transparent 52%, black 55%)",
                    animation: "orbit 2s linear infinite reverse",
                  }}
                />
                {/* Static center glow */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="w-5 h-5 rounded-full"
                    style={{
                      background:
                        "radial-gradient(circle, rgba(255,68,68,0.5) 0%, rgba(255,68,68,0.15) 50%, transparent 70%)",
                      animation:
                        "orbit-center-glow 2.5s ease-in-out infinite",
                    }}
                  />
                </div>
              </div>

              {/* Label */}
              <span className="mt-3 text-[9px] uppercase tracking-[0.25em] text-white/25 font-medium">
                one ecosystem
              </span>
            </div>

            {/* Static ring borders */}
            {rings.map((ring, i) => (
              <div
                key={`border-${i}`}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.04]"
                style={{
                  width: ring.radius * 2,
                  height: ring.radius * 2,
                }}
              />
            ))}

            {/* Annotation lines + labels (static, high z-index) */}
            <svg
              className="absolute inset-0 pointer-events-none z-20 overflow-visible"
              viewBox="0 0 680 680"
              width={680}
              height={680}
            >
              {rings.map((ring) => {
                const edge = ringEdge(ring.radius, ring.annotationAngle);
                const label = labelAnchor(ring.radius, ring.annotationAngle);
                const textEnd = {
                  x: label.x + 60,
                  y: label.y,
                };

                return (
                  <g key={ring.label}>
                    {/* Dot on ring edge */}
                    <circle
                      cx={edge.x}
                      cy={edge.y}
                      r={3}
                      fill="#FF4444"
                      opacity={0.6}
                    />
                    {/* Line from ring edge outward */}
                    <line
                      x1={edge.x}
                      y1={edge.y}
                      x2={label.x}
                      y2={label.y}
                      stroke="#FF4444"
                      strokeWidth={1}
                      opacity={0.25}
                    />
                    {/* Horizontal line from elbow */}
                    <line
                      x1={label.x}
                      y1={label.y}
                      x2={textEnd.x}
                      y2={textEnd.y}
                      stroke="#FF4444"
                      strokeWidth={1}
                      opacity={0.25}
                    />
                    {/* End dot */}
                    <circle
                      cx={textEnd.x}
                      cy={textEnd.y}
                      r={2}
                      fill="#FF4444"
                      opacity={0.4}
                    />
                    {/* Label text */}
                    <text
                      x={textEnd.x + 10}
                      y={textEnd.y - 6}
                      fill="white"
                      opacity={0.5}
                      fontSize={11}
                      fontWeight={600}
                      letterSpacing="0.05em"
                    >
                      {ring.label}
                    </text>
                    {/* Description text */}
                    <text
                      x={textEnd.x + 10}
                      y={textEnd.y + 10}
                      fill="white"
                      opacity={0.25}
                      fontSize={10}
                    >
                      {ring.description}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Rotating rings — pointer-events:none on container so inner rings are reachable */}
            {rings.map((ring, ri) => (
              <div
                key={`ring-${ri}`}
                className="absolute inset-0 orbit-ring pointer-events-none"
                style={{
                  animation: `orbit ${ring.duration}s linear infinite ${ring.reverse ? "reverse" : ""}`,
                }}
              >
                {ring.tools.map((tool, ti) => {
                  const angle =
                    (2 * Math.PI * ti) / ring.tools.length - Math.PI / 2;
                  const x = ring.radius * Math.cos(angle);
                  const y = ring.radius * Math.sin(angle);

                  return (
                    <div
                      key={tool.name}
                      className="absolute group/icon pointer-events-auto"
                      style={{
                        left: `calc(50% + ${x}px)`,
                        top: `calc(50% + ${y}px)`,
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      {/* Counter-rotate to keep icons upright */}
                      <div
                        className="orbit-icon-counter relative flex flex-col items-center"
                        style={{
                          animation: `orbit ${ring.duration}s linear infinite ${ring.reverse ? "" : "reverse"}`,
                        }}
                      >
                        {/* Icon container */}
                        <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-white/[0.04] border border-white/[0.06] group-hover/icon:bg-white/[0.1] group-hover/icon:border-white/[0.15] group-hover/icon:scale-110 transition-all duration-300 cursor-default">
                          <ToolIcon tool={tool} size={20} />
                        </div>
                        {/* Tooltip on hover */}
                        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-white/[0.1] backdrop-blur-sm border border-white/[0.08] opacity-0 group-hover/icon:opacity-100 transition-opacity duration-200 pointer-events-none z-30 whitespace-nowrap">
                          <span className="text-[10px] text-white/70 font-medium">
                            {tool.name}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* ===== Mobile: Categorized icon grid with labels ===== */}
        <div className="md:hidden space-y-8">
          {rings.map((ring) => (
            <div key={ring.label}>
              {/* Category label */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 rounded-full bg-[#FF4444]/50" />
                <h3 className="text-xs uppercase tracking-[0.15em] text-white/40 font-semibold">{ring.label}</h3>
                <div className="flex-1 h-px bg-white/[0.06]" />
              </div>
              {/* Tool icons in a responsive grid */}
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
                {ring.tools.map((tool) => (
                  <div
                    key={tool.name}
                    className="flex flex-col items-center gap-1.5"
                  >
                    <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-white/[0.04] border border-white/[0.06]">
                      <ToolIcon tool={tool} size={20} />
                    </div>
                    <span className="text-[9px] sm:text-[10px] text-white/30 font-medium text-center leading-tight">
                      {tool.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
