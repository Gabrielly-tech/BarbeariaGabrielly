const galleryImages = [
  {
    src: 'https://images.pexels.com/photos/3356174/pexels-photo-3356174.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Barbeiro realizando corte com máquina e pente',
    span: 'lg:col-span-2 lg:row-span-2',
  },
  {
    src: 'https://images.pexels.com/photos/12464841/pexels-photo-12464841.jpeg?auto=compress&cs=tinysrgb&w=600',
    alt: 'Degradê preciso com navalha',
    span: '',
  },
  {
    src: 'https://images.pexels.com/photos/3998402/pexels-photo-3998402.jpeg?auto=compress&cs=tinysrgb&w=600',
    alt: 'Modelagem de barba profissional',
    span: '',
  },
  {
    src: 'https://images.pexels.com/photos/7195814/pexels-photo-7195814.jpeg?auto=compress&cs=tinysrgb&w=600',
    alt: 'Interior de barbearia moderna',
    span: '',
  },
  {
    src: 'https://images.pexels.com/photos/16098668/pexels-photo-16098668.jpeg?auto=compress&cs=tinysrgb&w=600',
    alt: 'Corte masculino moderno de perfil',
    span: '',
  },
  {
    src: 'https://images.pexels.com/photos/39559268/pexels-photo-39559268.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Acabamento de cabelo com pente e tesoura',
    span: 'lg:col-span-2',
  },
  {
    src: 'https://images.pexels.com/photos/3998431/pexels-photo-3998431.jpeg?auto=compress&cs=tinysrgb&w=600',
    alt: 'Barba being trimmed carefully',
    span: '',
  },
  {
    src: 'https://images.pexels.com/photos/27467943/pexels-photo-27467943.jpeg?auto=compress&cs=tinysrgb&w=600',
    alt: 'Corte na navalha em barbearia',
    span: '',
  },
];

export default function Gallery() {
  return (
    <section id="galeria" className="py-20 sm:py-28 bg-gradient-to-b from-[#0a0a0a] to-[#0d0d0d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-[1px] w-10 bg-gold/50" />
            <span className="text-gold text-sm tracking-[0.3em] uppercase">Portfólio</span>
            <div className="h-[1px] w-10 bg-gold/50" />
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white">
            Galeria de <span className="gold-text-gradient">Cortes</span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-xl mx-auto">
            Referências visuais de cortes, degradês e barbas. Imagens ilustrativas para inspiração.
          </p>
        </div>

        {/* Gallery grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 auto-rows-[180px] sm:auto-rows-[220px]">
          {galleryImages.map((img, idx) => (
            <div
              key={idx}
              className={`reveal group relative overflow-hidden rounded-lg ${img.span}`}
              style={{ transitionDelay: `${idx * 40}ms` }}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-500" />
              <div className="absolute inset-0 border-2 border-gold/0 group-hover:border-gold/40 rounded-lg transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
