import { create } from "zustand";
import { persist } from "zustand/middleware";

const useRegisterStudent = create(
  persist(
    (set) => ({
      step: 0,
      user_id: "",
      name: "",
      paternSurname: "",
      maternSurname: "",
      email: "",
      phone: "",
      typeRegister: "ESTUDIANTE",
      genre: "",
      nacionality: "",
      code_invitation: "",

      company: "",
      industry: "SECTOR EDUCATIVO",
      position: "ESTUDIANTE",
      area: "",
      country: "",
      municipality: "",
      state: "",
      city: "",
      address: "",
      colonias: [],
      colonia: "",
      postalCode: "",
      webPage: "",
      phoneCompany: "",

      eventKnowledge: "",
      productInterest: "",
      levelInfluence: "NO",
      wannaBeExhibitor: "NO",
      alreadyVisited: "",
     
      complete_register: false,
      invoiceDownToLoad: "",
      
      code_cortesia: "",

      setUser_id: (user_id) => set({ user_id }),
      setName: (name) => set({ name }),
      setPaternSurname: (paternSurname) => set({ paternSurname }),
      setMaternSurname: (maternSurname) => set({ maternSurname }),
      setEmail: (email) => set({ email }),
      setPhone: (phone) => set({ phone }),
      setTypeRegister: (typeRegister) => set({ typeRegister }),
      setGenre: (genre) => set({ genre }),
      setNacionality: (nacionality) => set({ nacionality }),
      setCodeInvitation: (code_invitation) => set({ code_invitation }),

      setCompany: (company) => set({ company }),
      setIndustry: (industry) => set({ industry }),
      setPosition: (position) => set({ position }),
      setArea: (area) => set({ area }),
      setCountry: (country) => set({ country }),
      setMunicipality: (municipality) => set({ municipality }),
      setState: (state) => set({ state }),
      setCity: (city) => set({ city }),
      setAddress: (address) => set({ address }),
      setColonia: (colonia) => set({ colonia }),
      setColonias: (colonias) => set({ colonias }),
      setPostalCode: (postalCode) => set({ postalCode }),
      setWebPage: (webPage) => set({ webPage }),
      setPhoneCompany: (phoneCompany) => set({ phoneCompany }),

      setEventKnowledge: (eventKnowledge) => set({ eventKnowledge }),
      setProductInterest: (productInterest) => set({ productInterest }),
      setLevelInfluence: (levelInfluence) => set({ levelInfluence }),
      setWannaBeExhibitor: (wannaBeExhibitor) => set({ wannaBeExhibitor }),
      setAlreadyVisited: (alreadyVisited) => set({ alreadyVisited }),

      setCompleteRegister: (complete_register) => set({ complete_register }),
      setInvoiceDownToLoad: (invoiceDownToLoad) => set({ invoiceDownToLoad }),
      setCode_cortesia: (code_cortesia) => set({ code_cortesia }),
      

      incrementStep: () =>
        set((state) => ({
          step: state.step + 1,
        })),
      decrementStep: () =>
        set((state) => ({
          step: state.step - 1,
        })),

      clear: () =>
        set({
          step: 0,
          user_id: "",
          name: "",
          paternSurname: "",
          maternSurname: "",
          phone: "",
          typeRegister: "ESTUDIANTE",
          genre: "",
          nacionality: "",
          code_invitation: "",

          company: "",
          industry: "SECTOR EDUCATIVO",
          position: "ESTUDIANTE",
          area: "",
          country: "",
          municipality: "",
          state: "",
          city: "",
          address: "",
          colonia: "",
          colonias: [],
          postalCode: "",
          webPage: "",
          phoneCompany: "",

          eventKnowledge: "",
          productInterest: "",
          levelInfluence: "NO",
          wannaBeExhibitor: "NO",
          alreadyVisited: "",
          code_cortesia: "",
          verify_directory: false,

    
        }),
    }),
    { name: "register-student-replus" }
  )
);

export { useRegisterStudent };
