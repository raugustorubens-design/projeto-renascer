import { PageTransition } from "@/components/layout/PageTransition";
import { EnergyLine } from "@/components/ui/EnergyLine";

export default function HomePage() {
  return (
    <PageTransition>
      {/* 
        TELA DE APRESENTAÇÃO
        - Respeita a forma aprovada
        - Fundo e contraste canônicos
        - Sem efeitos em texto
      */}
      <section
        className="
          relative
          min-h-screen
          flex
          items-center
          justify-center
          bg-[#081A3A]
        "
      >
        {/* Conteúdo interno (dentro da forma aprovada) */}
        <div
          className="
            relative
            w-full
            max-w-4xl
            px-8
            py-24
            text-[#E9F4FC]
          "
        >
          {/* Linha de energia (efeito permitido) */}
          <EnergyLine />

          {/* Texto principal */}
          <div className="mt-16 space-y-6">
            <h1
              className="
                text-3xl
                md:text-4xl
                font-semibold
                tracking-tight
              "
            >
              Renascer é atravessar com consciência.
            </h1>

            <p
              className="
                text-base
                md:text-lg
                leading-relaxed
                opacity-80
              "
            >
              Um projeto de formação humana, ética e evolução pessoal —
              sem atalhos.
            </p>
          </div>

          {/* CTA */}
          <div className="mt-16">
            <button
              className="
                px-6
                py-3
                bg-[#E9F4FC]
                text-[#081A3A]
                border
                border-[#E9F4FC]
                font-medium
                transition-opacity
                hover:opacity-90
              "
            >
              Iniciar a Jornada
            </button>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
