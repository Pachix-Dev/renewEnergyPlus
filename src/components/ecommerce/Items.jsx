import { useRegisterForm } from "../../store/register-form";

// Componente de resumen del carrito en checkout.
// Renderiza los productos seleccionados, su precio y la acción para eliminarlos.
export function Items({ currentLanguage }) {
  // Estado global del registro/carrito (Zustand).
  const { items, removeToCart } = useRegisterForm();

  // Indica si el producto ENERGY NIGHT (id 2) está en el carrito.
  const hasEnergyNight = items?.some((cartItem) => cartItem.id === 2);

  // Monto fijo del descuento visual para DAY PASS (id 3).
  const dayPassDiscountAmount = 500;

  // Formatea montos en moneda MXN para mostrar en la UI.
  function formatAmountMXN(amount) {
    const formattedAmount = new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
      minimumFractionDigits: 2,
    }).format(amount);

    return formattedAmount;
  }

  return (
    <div className="grid gap-2">
      {/* Lista de ítems actualmente en el carrito */}
      {items?.map((item) => (
        <div
          key={item.id}
          className="relative rounded-2xl border border-gray-200 bg-white p-3 shadow-sm"
        >
          {/* Botón para remover el producto del carrito */}
          <button
            type="button"
            aria-label={currentLanguage === "es" ? "Eliminar producto" : "Remove product"}
            className="absolute right-3 top-1 rounded-md p-1.5 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
            onClick={() => removeToCart(item.id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={3}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div className="grid gap-2 mt-6 md:grid-cols-[1fr_auto] md:items-center">
            
            {/* Nombre del producto según idioma activo */}
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-black">
                {currentLanguage === "es" ? "Producto" : "Product"}
              </p>
              <p className="mt-1 text-lg font-bold leading-tight text-black md:text-sm">
                {currentLanguage === "es" ? item.name : item.name_en}
              </p>
            </div>

            {/* Precio final del ítem (ya con ajustes aplicados en store) */}
            <div className="rounded-xl bg-gray-50 px-3 py-2 text-left md:min-w-[220px] md:text-right">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-black">
                {currentLanguage === "es" ? "Precio" : "Price"}
              </p>
              <p className="text-3xl font-extrabold text-black md:text-3xl">
                {formatAmountMXN(item.price)}
              </p>

              {/*
                Leyenda de descuento:
                se muestra sólo para DAY PASS (id 3)
                cuando ENERGY NIGHT (id 2) está presente en el carrito.
              */}
              {item.id === 3 && hasEnergyNight && (
                <div className="mt-2 border-t border-gray-200 pt-2 text-sm">
                  <div className="flex items-center justify-between text-black">
                    <span>{currentLanguage === "es" ? "Precio base" : "Base price"}</span>
                    <span>{formatAmountMXN(item.price + dayPassDiscountAmount)}</span>
                  </div>
                  <div className="mt-1 flex items-center justify-between font-semibold text-red-600">
                    <span>{currentLanguage === "es" ? "Descuento" : "Discount"}</span>
                    <span>-{formatAmountMXN(dayPassDiscountAmount)}</span>
                  </div>
                  <div className="mt-1 flex items-center justify-between font-bold text-black">
                    <span>{currentLanguage === "es" ? "Total" : "Total"}</span>
                    <span>{formatAmountMXN(item.price)}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
