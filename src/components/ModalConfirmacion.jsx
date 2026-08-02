export const ModalConfirmacion = ({
        abierto,
        cerrar,
        confirmar,
    }) => {
  if (!abierto) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="w-96 rounded-xl bg-white p-6 shadow-xl">

        <h2 className="text-2xl font-bold mb-3">
          Finalizar compra
        </h2>

        <p className="text-gray-600 mb-6">
          ¿Estás seguro de que querés finalizar la compra?
          <br />
          Se guardaran todos los productos.
        </p>

        <div className="flex justify-end gap-3">
          <button onClick={cerrar} className="rounded-lg bg-gray-400 px-5 py-2 text-white hover:bg-gray-500" >
            Cancelar
          </button>

          <button onClick={confirmar} className="rounded-lg bg-red-600 px-5 py-2 text-white hover:bg-red-700" >
            Sí, eliminar
          </button>
        </div>
      </div>
    </div>
  );
};