import { useState } from "react";
import { ModalProducto } from "./ModalProducto";

export const ListaCompras = () => {
  const [modalAbierto, setModalAbierto] = useState(false);


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

  /*Función que agrega un nuevo producto al estado*/
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
        {productos.map((producto) => (
          <div key={producto.id} className="flex items-center justify-between w-full mb-3" >
            <div className="flex items-center gap-3">
              <input type="checkbox" checked={producto.comprado} onChange={() => toggleSeleccion(producto.id)} className="w-5 h-5 blue-green-600 cursor-pointer" />

              <span
                className={
                  producto.comprado
                    ? "line-through text-gray-400"
                    : ""
                }
              >
                {producto.nombre}
              </span>
            </div>
          </div>
        ))}

        <button onClick={() => setModalAbierto(true)} className="mt-6 rounded-full bg-blue-500 px-8 py-3 font-bold text-white hover:bg-blue-700 transition" >
          Agregar Producto
        </button>
      </div>

      <ModalProducto abierto={modalAbierto} cerrar={() => setModalAbierto(false)} guardar={agregarProducto} />
    </div>
  );
};