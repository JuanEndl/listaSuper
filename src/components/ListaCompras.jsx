import { useState } from "react";
import { ModalProducto } from "./ModalProducto";

export const ListaCompras = () => {

  const [modalAbierto, setModalAbierto] = useState(false);

  const [productos, setProductos] = useState([
    "Leche",
    "Huevos",
    "Bebida",
  ]);

  const agregarProducto = (nombre) => {
    if (!nombre.trim()) return;

    setProductos((anterior) => [
      ...anterior,
      nombre,
    ]);

    setModalAbierto(false);
  };

  return (
    <div className="contenedor">
      <h1 className="titulo">Lista de Compras</h1>

      <div className="card">
        {productos.map((producto, index) => (
          <p key={index}>{producto}</p>
        ))}

        <button onClick={() => setModalAbierto(true)} className="mt-6 rounded-full bg-blue-500 px-8 py-3 font-bold text-white hover:bg-blue-700 transition" >
          Agregar Producto
        </button>
      </div>

      <ModalProducto abierto={modalAbierto} cerrar={() => setModalAbierto(false)} guardar={agregarProducto} />
    </div>
  );
};