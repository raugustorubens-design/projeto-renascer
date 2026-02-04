"use client";

export function EnergyLine() {
  return (
    <div className="relative w-full">
      {/* Linha base */}
      <div
        className="
          relative
          h-px
          bg-[rgba(233,244,252,0.35)]
          overflow-visible
        "
      >
        {/* Fluxo de energia (claro ↔ escuro ao longo da linha) */}
        <span
          className="
            absolute
            inset-0
            bg-[linear-gradient(90deg,
              rgba(233,244,252,0.2),
              rgba(233,244,252,0.7),
              rgba(233,244,252,0.3)
            )]
            animate-energy-flow
          "
        />

        {/* Halo fluorescente suave (permitido apenas na linha) */}
        <span
          className="
            absolute
            -inset-x-0
            -inset-y-6
            bg-[rgba(233,244,252,0.15)]
            blur-xl
            pointer-events-none
          "
        />
      </div>
    </div>
  );
}
