import MatrixRain from "@/components/ui/matrix-code";

export function RainTextDemo() {
  return (
    <div className="relative h-80 w-full overflow-hidden rounded-2xl border border-border bg-card">
      <MatrixRain className="absolute inset-0 h-full w-full opacity-60" />
      <div className="relative z-10 flex h-full items-center justify-center">
        <span className="text-2xl font-semibold text-foreground">Matrix Code</span>
      </div>
    </div>
  );
}