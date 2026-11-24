import logo from "../../public/img/logo.jpg";

function Hero() {
  return (
    <section id="inicio" className="bg-gray-100 py-12 border-b-4 border-(--color-primario) mt-3">
      <div className="container mx-auto px-4 text-center">
        <p className="font-semibold mb-2">¡Todo Vuelos!</p>
        <h1 className="text-5xl md:text-6xl font-bold">La Tiendita</h1>
        
        <img
          src={logo}
          alt="Logo La Tiendita"
          width="220"   
          height="200"
          className="mx-auto mt-8 rounded-full"
          title="Logo"
          loading="lazy"
        />

        <p className="text-xl font-light mt-3">
          Encuentra aquí todos los destinos, pasajes y hoteles.
        </p>
      </div>
    </section>
  );
}

export default Hero;