import Logo from '../../assets/Logo_SGIHPBPS.png'
const HeroSection = () => {
  return (
    <section 
      className="relative text-white bg-cover bg-center"
      style={{
        backgroundImage: `url(${Logo})`
      }}
    >
      <div className="absolute inset-0 bg-primary opacity-60"></div>
      <div className="container mx-auto px-4 lg:px-6 py-32 lg:py-48 relative z-10 text-center">
        <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
          Welcome to the Society of Gastrointestinal & Hepato-Pancreatobiliary Pathologists of India (SGIHPBPs)
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto">
          Fostering excellence in the field of GI & HPB pathology through education, research, and collaboration.
        </p>
      </div>
    </section>
  )
}

export default HeroSection