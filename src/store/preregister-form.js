import { create } from "zustand";
import { persist } from "zustand/middleware";

const usePreregisterForm = create(
  persist(
    (set) => ({
      // Esta es la estructura del estado inicial para el formulario de prerregistro.Su funcion es almacenar los valores de los campos del formulario y proporcionar funciones para actualizarlos.
      name: "",
      email: "",
      typeRegister: "prerregistro",

      // Aqui se definen las funciones para actualizar cada campo del estado. Su funcion es recibir un valor y actualizar el estado correspondiente.
      setName: (name) => set({ name }),
      setEmail: (email) => set({ email }),
      setTypeRegister: (typeRegister) => set({ typeRegister }),
      setCompleteRegister: (complete_register) => set({ complete_register }),
      
      // Esta funcion se utiliza para limpiar los campos del formulario. Su funcion es restablecer los valores de name y email a cadenas vacias, permitiendo que el usuario comience de nuevo si lo desea.
      clear: () => { 
        set({ name: "", email: "", typeRegister: "prerregistro" });
        localStorage.removeItem("preregister-ecomondo");
      },
    }),
    {
      //Aqui se configura la persistencia del estado utilizando localStorage. Su funcion es guardar el estado del formulario en el almacenamiento local del navegador para que los datos no se pierdan al recargar la pagina.

      name: "preregister-ecomondo", // Esta es la clave utilizada para almacenar los datos en localStorage. Su funcion es identificar de manera unica el estado del formulario de prerregistro en el almacenamiento local.

      getStorage: () => localStorage, // Esta funcion especifica que se utilizara localStorage para almacenar los datos. Su funcion es permitir que los datos del formulario se guarden en el almacenamiento local del navegador.
    },
  ),
);

export { usePreregisterForm };
