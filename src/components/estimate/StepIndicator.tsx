const TOTAL_STEPS = 7;

interface StepIndicatorProps {
  currentStep: number;
}

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-0">
      {Array.from({ length: TOTAL_STEPS }).map((_, i) => {
        const step = i + 1;
        const isActive = step === currentStep;
        const isCompleted = step < currentStep;

        return (
          <div key={step} className="flex items-center">
            {/* Circle */}
            <div
              className={`
                w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold
                transition-all duration-300 shrink-0
                ${
                  isActive
                    ? "bg-[#2563EB] text-white shadow-[0_0_16px_rgba(37,99,235,0.4)]"
                    : isCompleted
                      ? "bg-[#2563EB] text-white"
                      : "bg-transparent border-2 border-white/20 text-white/40"
                }
              `}
            >
              {isCompleted ? (
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                step
              )}
            </div>

            {/* Connecting line */}
            {step < TOTAL_STEPS && (
              <div
                className={`
                  w-8 sm:w-12 h-0.5 transition-colors duration-300
                  ${step < currentStep ? "bg-[#2563EB]" : "bg-white/15"}
                `}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
