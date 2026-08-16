import { ModalProducto } from "./ModalProducto";
import { ModalConfirmacion } from "./ModalConfirmacion";
import { useState, useEffect } from "react";
import { socket } from "../socket";


/*tra la lista de los productos de la db*/
export const ListaCompras = () => {

  const url = import.meta.env.VITE_API_URL;

  const mostrarDatos = async () => {
  try {
    const respuesta = await fetch(`${url}/productos`);

    const datos = await respuesta.json();

    const productosFormateados = datos.map((producto) => ({
      id: producto.id,
      nombre: producto.producto,
      comprado: Boolean(producto.comprado),
    }));

    setProductos(productosFormateados);
  } catch (error) {
    console.error(error);
  }
};

  /*useEffect con Sockot para la lectura rapida del navegador en tiempo real*/ 
  useEffect(() => {
      mostrarDatos();

      socket.on("actualizarLista", () => {
          console.log("Lista actualizada por Socket.IO");
          mostrarDatos();
      });

      return () => {
          socket.off("actualizarLista");
      };
  }, []);

  /*Estado del modal*/
  const [modalAbierto, setModalAbierto] = useState(false);

  /*Estado del modal de confirmacion*/
  const [modalConfirmacion, setModalConfirmacion] = useState(false);

  /*productos seteados*/
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
            throw new Error("Error al agregar");
        }

        setModalAbierto(false);

    } catch (error) {
        console.error(error);
    }
};

  /*Eliminar productos seleccionados*/
  const eliminarProductosFinalizados = async () => {
    try {

        const seleccionados = productos.filter((p) => p.comprado);

        for (const producto of seleccionados) {
            await fetch(`${url}/productos/${producto.id}`, {
                method: "DELETE",
            });
        }

    } catch (error) {
        console.error(error);
    }
};

  /*Finalizar compra (borra toda la lista y la agrega a la base de datos, pregunta si se quiere finalizar)*/
  const finalizarCompra = async () => {
  await fetch(`${url}/productos`, {
    method: "DELETE",
  });

  setModalConfirmacion(false);
};

  /* actualizar un elemento dentro de un array en React sin modificar el estado directamente */
  const toggleSeleccion = async (id) => {
    const producto = productos.find((p) => p.id === id);

    if (!producto) return;

    const nuevoEstado = !producto.comprado;

    try {
        const respuesta = await fetch(`${url}/productos/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                comprado: nuevoEstado,
            }),
        });

        if (!respuesta.ok) {
            throw new Error("Error al actualizar el producto");
        }

    } catch (error) {
        console.error(error);
    }
};
  /*Arranca el react con html*/
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