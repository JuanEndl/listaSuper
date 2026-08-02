import { useState } from "react";

export const ModalProducto = ({ abierto, cerrar, guardar }) => {
  const [nombre, setNombre] = useState("");

  if (!abierto) return null;

  const agregar = () => {
    if (!nombre.trim()) return;

    guardar(nombre);
    setNombre("");
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Evita que la página se recargue
    agregar();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="w-96 rounded-xl bg-white p-6 shadow-xl">
        <h2 className="mb-4 text-2xl font-bold">
          Nuevo producto
        </h2>

        <form onSubmit={handleSubmit}>
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre del producto" className="mb-4 w-full rounded-lg border p-2" autoFocus/>

          <div className="flex justify-end gap-3">
            <button type="button" onClick={() => { setNombre(""); cerrar(); }} className="rounded-lg bg-gray-400 px-5 py-2 text-white hover:bg-gray-500" >
              Cancelar
            </button>

            <button type="submit" className="rounded-lg bg-sky-600 px-5 py-2 text-white hover:bg-sky-700" >
              Agregar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};