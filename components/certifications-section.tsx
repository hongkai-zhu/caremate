import Image from "next/image"

const certificates = [
  {
    title: "ISO 13485 Certificate (English)",
    image: "/files/certificates/PNG/ISO13585.png",
  },
  {
    title: "ISO 13485 Certificate (Chinese)",
    image: "/files/certificates/PNG/ISO13485_chinese.png",
  },
  {
    title: "EU MDR Certificate",
    image: "/files/certificates/PNG/MDR-5s.png",
  },
  {
    title: "FDA Registration",
    image: "/files/certificates/PNG/FDA.png",
  },
  {
    title: "EU Declaration of Conformity",
    image: "/files/certificates/PNG/DOC0917_stethoscopes.png",
  },
  {
    title: "Stethoscope Medical Device Filing",
    image: "/files/certificates/PNG/stethoscope-filing-5s.png",
  },
  {
    title: "Blood Pressure Monitor Registration",
    image: "/files/certificates/PNG/国内-血压表中华人民共和国医疗器械注册证.ofd.png",
  },
  {
    title: "Medical Device Manufacturing License",
    image: "/files/certificates/PNG/国内-血压表医疗器械生产许可证.ofd.png",
    landscape: true,
  },
]

export function CertificationsSection() {
  return (
    <section id="certifications" className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-8 md:mb-10">
          <div>
            <p className="text-xs uppercase tracking-widest text-background/70 mb-3">
              Certifications &amp; Compliance
            </p>
            <h2 className="text-2xl md:text-3xl font-light leading-tight max-w-xl">
              Credentials that stand behind our quality.
            </h2>
          </div>
          <p className="text-sm md:text-base text-background/65 leading-relaxed max-w-lg md:text-right">
            International certifications and regulatory registrations supporting our quality systems and products.
          </p>
        </div>

        <div className="-mx-4 overflow-x-auto px-4 pb-5 snap-x snap-mandatory [scrollbar-width:thin] [scrollbar-color:var(--primary)_transparent] [&amp;::-webkit-scrollbar]:h-1.5 [&amp;::-webkit-scrollbar-track]:bg-background/10 [&amp;::-webkit-scrollbar-thumb]:bg-primary">
          <div className="flex w-max items-start gap-4 md:gap-5">
            {certificates.map((certificate) => (
              <figure
                key={certificate.image}
                className={`${certificate.landscape ? "w-[86vw] max-w-[380px]" : "w-[72vw] max-w-[230px] md:w-[192px]"} shrink-0 snap-start`}
              >
                <div className="h-[320px] md:h-[270px] flex items-center justify-center">
                  <div
                    className={`relative overflow-hidden bg-white border border-background/20 shadow-sm ${certificate.landscape ? "w-full aspect-[1190/841]" : "h-full aspect-[595/841]"}`}
                  >
                    <Image
                      src={certificate.image}
                      alt={certificate.title}
                      fill
                      sizes={certificate.landscape ? "(max-width: 768px) 86vw, 380px" : "(max-width: 768px) 72vw, 192px"}
                      className="object-contain"
                    />
                  </div>
                </div>
                <figcaption className="mt-4 min-h-10 text-sm font-medium leading-snug text-center text-background/90">
                  {certificate.title}
                </figcaption>
                <span className="mx-auto mt-3 block h-px w-10 bg-primary" aria-hidden="true" />
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
