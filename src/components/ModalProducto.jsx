import { useState } from "react";

export const ModalProducto = ({ abierto, cerrar, guardar }) => {

  const [nombre, setNombre] = useState("");

  if (!abierto) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="w-96 rounded-xl bg-white p-6 shadow-xl">

        <h2 className="mb-4 text-2xl font-bold">
          Nuevo producto
        </h2>

        <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre del producto" className="mb-4 w-full rounded-lg border p-2" />

        <div className="flex justify-end gap-3">

          <button onClick={cerrar} className="rounded-lg bg-gray-400 px-5 py-2 text-white" >
            Cancelar
          </button>

          <button
            onClick={() => { guardar(nombre); setNombre(""); }} className="rounded-lg bg-green-600 px-5 py-2 text-white" >
            Agregar
          </button>

        </div>
      </div>
    </div>
  );
};