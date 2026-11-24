import { useState } from "react";

function Contacto() {
  const [enviado, setEnviado] = useState(false);

  function manejarEnvio(evento) {
    evento.preventDefault();
    setEnviado(true);
  }

  return (
    <main className="contenido">
      <div className="container py-4" style={{ maxWidth: "1024px" }}>

      
        <div className="text-center mb-4">
          <h1 className="fs-2 fw-bold texto-primario">¿Necesitas ayuda?</h1>
          <p className="mt-3 text-secondary">
            ¿Tienes dudas sobre nuestros vuelos, hoteles o
            recomendaciones? Escríbenos y te responderemos.
          </p>
        </div>

       
        <div className="card border-0 shadow-lg rounded-4">
          <div className="card-body p-4 p-md-5">

            {enviado ? (
              <div role="status" className="alert alert-success text-center mb-0">
                <h2 className="fs-5 fw-bold">¡Formulario completado!</h2>
                <p className="mt-2">
                  Esta es una demostración. El mensaje no
                  ha sido enviado a un servidor.
                </p>
                <button
                  type="button"
                  onClick={() => setEnviado(false)}
                  className="btn btn-success mt-2 px-4"
                >
                  Escribir otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={manejarEnvio}>

              
                <div className="row g-4 mb-4">
                  <div className="col-12 col-md-6">
                    <label htmlFor="nombre" className="form-label fw-semibold">
                      Nombre completo
                    </label>
                    <input
                      id="nombre"
                      type="text"
                      name="nombre"
                      required
                      placeholder="Tu nombre"
                      className="form-control"
                    />
                  </div>

                  <div className="col-12 col-md-6">
                    <label htmlFor="correo" className="form-label fw-semibold">
                      Correo electrónico
                    </label>
                    <input
                      id="correo"
                      type="email"
                      name="correo"
                      required
                      placeholder="nombre@ejemplo.cl"
                      className="form-control"
                    />
                  </div>
                </div>

             
                <div className="mb-4">
                  <label htmlFor="motivo" className="form-label fw-semibold">
                    Motivo de contacto
                  </label>
                  <select
                    id="motivo"
                    name="motivo"
                    required
                    defaultValue=""
                    className="form-select"
                  >
                    <option value="" disabled>
                      Selecciona una opción
                    </option>
                    <option value="consulta">Consulta general</option>
                    <option value="vuelos">Cambio de fecha o devolución</option>
                    <option value="pedido">Cancelación de vuelo</option>
                    <option value="reclamo">Reclamo o sugerencia</option>
                  </select>
                </div>

              
                <div className="mb-4">
                  <label htmlFor="mensaje" className="form-label fw-semibold">
                    Mensaje
                  </label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    rows={5}
                    required
                    minLength={10}
                    placeholder="Cuéntanos en qué podemos ayudarte..."
                    className="form-control"
                  />
                </div>

               
                <div className="d-flex justify-content-end">
                  <button type="submit" className="btn btn-todos fw-semibold px-4 py-2">
                    Enviar mensaje
                  </button>
                </div>

              </form>
            )}
          </div>
        </div>

      
        <p className="text-center small text-secondary mt-4">
          ¡Gracias por tu tiempo!
        </p>

      </div>
    </main>
  );
}

export default Contacto;