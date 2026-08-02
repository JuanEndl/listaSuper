import { useState } from "react";
import { ModalProducto } from "./ModalProducto";
import { ModalConfirmacion } from "./ModalConfirmacion";

export const ListaCompras = () => {
  const [modalAbierto, setModalAbierto] = useState(false);

  const [modalConfirmacion, setModalConfirmacion] = useState(false);

  /*productos seteados, si esta en false no esta marcado si esta en true se marca*/
  const [productos, setProductos] = useState([
    {
      id: crypto.randomUUID(),
      nombre: "Leche",
      comprado: false,
    },
    {
      id: crypto.randomUUID(),
      nombre: "Huevos",
      comprado: false,
    },
    {
      id: crypto.randomUUID(),
      nombre: "Bebida",
      comprado: false,
    },
  ]);

  /*Función que agrega un nuevo producto*/
  const agregarProducto = (nombre) => {
    if (!nombre.trim()) return;

    setProductos((productosAnteriores) => [
      ...productosAnteriores,
      {
        id: crypto.randomUUID(),
        nombre,
        comprado: false,
      },
    ]);

    setModalAbierto(false);
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
    <div className="contenedor">
      <h1 className="titulo">Lista de Compras</h1>

      <div className="card">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b-2 border-white">
              <th className="w-10 p-2">Productos</th>
            </tr>
          </thead>

          <tbody>
            {productos.map((producto) => (
              <tr key={producto.id} className="border-b border-gray-500">
                <td className="w-10 p-3">
                  <div className="flex items-center gap-3"></div>
                  <input type="checkbox" checked={producto.comprado} onChange={() => toggleSeleccion(producto.id)} className="w-5 h-5 cursor-pointer" />
                </td>

                <td
                  className={`${
                    producto.comprado
                      ? "line-through text-gray-300"
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
          <button onClick={() => setModalAbierto(true)} className="mt-6 rounded-full bg-green-700 px-8 py-3 font-bold text-white hover:bg-green-950 transition" >
            Agregar Producto
          </button>

          <button onClick={eliminarProductosFinalizados} className="mt-6 rounded-full bg-red-950 px-8 py-3 font-bold text-white hover:bg-red-700 transition" >
            Eliminar Producto 
          </button>

          <button onClick={() => setModalConfirmacion(true)} className="mt-6 rounded-full bg-lime-700 px-8 py-3 font-bold text-white hover:bg-lime-800 transition" >
            Finalazar compra 
          </button>
          </div>
      </div>

      <ModalProducto abierto={modalAbierto} cerrar={() => setModalAbierto(false)} guardar={agregarProducto} />
      <ModalConfirmacion abierto={modalConfirmacion} cerrar={() => setModalConfirmacion(false)} confirmar={finalizarCompra} />
    </div>
  );
};