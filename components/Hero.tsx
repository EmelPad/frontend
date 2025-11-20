


function Hero() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-32 lg:py-40 font-roboto">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-linear-to-br from-gray-900 via-black to-gray-950" />
      
      {/* Animated background elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-gray-800 to-gray-900 border border-gray-700 mb-8">
            <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span className="text-sm font-medium text-gray-300">Now live on Arc Testnet</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-sm md:text-2xl font-bold mb-6 leading-tight">
            <span className="bg-linear-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              Launch NFT Collections
            </span>
            <br />
            <span className="bg-linear-to-r from-gray-300 to-gray-500 bg-clip-text text-transparent">
              in Seconds
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-sm md:text-lg text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Create and mint NFT collections with ease.
            Built for creators, by creators.
          </p>


        </div>
      </div>
    </section>
  );
}

export default Hero;
