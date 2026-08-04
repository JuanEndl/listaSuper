import { ModalProducto } from "./ModalProducto";
import { ModalConfirmacion } from "./ModalConfirmacion";
import { useState, useEffect } from "react";

export const ListaCompras = () => {

  const url = import.meta.env.VITE_API_URL;

  const mostrarDatos = async () => {
  try {
    const respuesta = await fetch(`${url}/productos`);

    const datos = await respuesta.json();

    const productosFormateados = datos.map((producto) => ({
      id: producto.id,
      nombre: producto.producto,
      comprado: false,
    }));

    setProductos(productosFormateados);
  } catch (error) {
    console.error(error);
  }
};

  useEffect(() => {
    mostrarDatos();
  }, []);

  


  const [modalAbierto, setModalAbierto] = useState(false);

  const [modalConfirmacion, setModalConfirmacion] = useState(false);

  /*productos seteados, si esta en false no esta marcado si esta en true se marca*/
 const [productos, setProductos] = useState([]);

  /*Función que agrega un nuevo producto*/
  const agregarProducto = async (nombre) => {
  if (!nombre.trim()) return;

  try {
    const respuesta = await fetch(`${url}/productos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        producto: nombre,
      }),
    });

    if (!respuesta.ok) {
      throw new Error("Error al agregar el producto");
    }

    await mostrarDatos();

    setModalAbierto(false);
  } catch (error) {
    console.error(error);
  }
};

  /*Eliminar productos seleccionados*/
  const eliminarProductosFinalizados = () => {
  setProductos((productosAnteriores) =>
    productosAnteriores.filter(
      (producto) => !producto.comprado
    )
  );
};

  /*Finalizar compra (borra toda la lista y la agrega a la base de datos, pregunta si se quiere finalizar)*/
  const finalizarCompra = () => {
    setProductos([]);
    setModalConfirmacion(false);
  };

  /* actualizar un elemento dentro de un array en React sin modificar el estado directamente */
  const toggleSeleccion = (id) => {
    setProductos((productosAnteriores) =>
      productosAnteriores.map((producto) =>
        producto.id === id
          ? {
              ...producto,
              comprado: !producto.comprado,
            }
          : producto
      )
    );
  };

  return (
    <div className="contenedor w-full overflow-x-hidden">
      <h1 className="titulo">Lista de Compras</h1>

      <div className="card w-full">
        <table className="w-full">
          <thead>
            <tr className="mb-8">
              <th className="w-10">Productos</th>
            </tr>
          </thead>

          <hr className="my-3 border-0 h-0.5 bg-black" />

          <tbody>
            {productos.map((producto) => (
              <tr key={producto.id} className="border border-black-500">
                <td className="w-10 p-3">
                  <input type="checkbox" checked={producto.comprado} onChange={() => toggleSeleccion(producto.id)} className="w-5 h-5 cursor-pointer" />
                </td>

                <td 
                  className={`${
                    producto.comprado
                      ? "line-through text-red-500"
                      : ""
                  }`}
                >
                  {producto.nombre}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center gap-4 mt-6 flex-wrap">
          <button onClick={() => setModalAbierto(true)} className="mt-6 rounded-full bg-sky-600 px-8 py-3 font-bold text-white hover:bg-green-950 transition" >
            Agregar Producto
          </button>

          <button onClick={eliminarProductosFinalizados} className="mt-6 rounded-full bg-red-500 px-8 py-3 font-bold text-white hover:bg-red-700 transition" >
            Eliminar Producto 
          </button>

          <button onClick={() => setModalConfirmacion(true)} className="mt-6 rounded-full bg-green-700 px-8 py-3 font-bold text-white hover:bg-green-800 transition" >
            Finalazar compra 
          </button>
          </div>
      </div>

      <ModalProducto abierto={modalAbierto} cerrar={() => setModalAbierto(false)} guardar={agregarProducto} />
      <ModalConfirmacion abierto={modalConfirmacion} cerrar={() => setModalConfirmacion(false)} confirmar={finalizarCompra} />
    </div>
  );
};