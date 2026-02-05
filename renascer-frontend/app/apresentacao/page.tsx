import { PageTransition } from "@/components/layout/PageTransition";
import { EnergyLine } from "@/components/ui/EnergyLine";

export default function ApresentacaoPage() {
  return (
    <PageTransition>
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
          <EnergyLine />

          <div className="mt-16 space-y-8">
            <h1 className="text-3xl md:text-4xl font-semibold">
              Projeto Renascer
            </h1>

            <p className="text-base md:text-lg leading-relaxed opacity-85">
              O Renascer é uma plataforma de formação humana focada em ética,
              mérito e evolução pessoal, estruturada como uma jornada clara,
              mensurável e progressiva.
            </p>

            <p className="text-base leading-relaxed opacity-75">
              Esta demonstração apresenta a base conceitual, visual e técnica
              do projeto em sua versão v1.0-demo congelada.
            </p>
          </div>

          <div className="mt-16 flex gap-4 flex-wrap">
            <a
              href="/"
              className="
                px-6
                py-3
                border
                border-[#E9F4FC]
                text-[#E9F4FC]
                hover:opacity-90
              "
            >
              Voltar para Home
            </a>

            <a
              href="#"
              className="
                px-6
                py-3
                bg-[#E9F4FC]
                text-[#081A3A]
                hover:opacity-90
              "
            >
              Iniciar Jornada
            </a>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
