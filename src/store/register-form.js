import { create } from "zustand";
import { persist } from "zustand/middleware";

const useRegisterForm = create( 
    persist(
        (set) => ({     
            step: 0,
            idUser: 0,
            uuid: "",            
            name: "",
            paternSurname: "",
            maternSurname: "",
            email: "",
            phone: "",
            typeRegister: "",
            genre: "",
            nacionality: "",            
            code_invitation: "",

            company: "",
            industry: "",
            position: "",
            area: "",
            country: "",
            municipality: "",
            state: "",
            city: "",
            address: "",
            colonias:[],
            colonia: "",
            postalCode: "",
            webPage: "",
            phoneCompany: "",

            eventKnowledge: "",
            productInterest: "",
            levelInfluence: "",
            wannaBeExhibitor: "",
            alreadyVisited: [],
            
            complete_register: false,
            invoiceDownToLoad: "",
            items: [],
            total: 0,
            code_cortesia: "",
            
            setIdUser: (idUser) => set({ idUser }),
            setUuid: (uuid) => set({ uuid }),
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
            setCode_cortesia: (code_cortesia) => set({code_cortesia}),

            incrementStep: () => set((state) => ({ 
                step: state.step + 1 
            })),
            decrementStep: () => set((state) => ({ 
                step: state.step - 1 
            })),
            
            addToCart: (item) => set((state) => {
                const itemWithId1Exists = state.items.some(i => i.id === 1);
                const itemAlreadyExists = state.items.some(i => i.id === item.id);
            
                if (item.id === 1) {
                    return {
                        items: [{ ...item }],
                        total: item.price // Asumiendo que el objeto item tiene una propiedad price
                    };
                } else if (itemWithId1Exists || itemAlreadyExists) {
                    // No agregar más productos si ya existe un ítem con id 1 o si el producto ya está en el carrito
                    return state;
                } else {
                    const newItems = [...state.items, { ...item }];
                    const newTotal = newItems.reduce((sum, i) => sum + i.price, 0); // Calcula el nuevo total
                    return {
                        items: newItems,
                        total: newTotal
                    };
                }
            }),
            
            removeToCart: (id) => set((state) => {                
                const newItems = state.items.filter((item) => item.id !== id);
                const newTotal = newItems.reduce((sum, i) => sum + i.price, 0); // Calcula el nuevo total

                return {
                    items: id === 1 ? [] : newItems,
                    total: id === 1 ? 0 : newTotal
                };
            }),

            addDiscount: (item) => set((state) => {
                const itemAlreadyExists = state.items.some(i => i.id === item.id);
                if (itemAlreadyExists) {
                    return state;
                } else {
                    const newItems = [...state.items, { ...item }];
                    const newTotal = newItems.reduce((sum, i) => sum + i.price, 0); // Calcula el nuevo total
                    return {
                        items: newItems,
                        total: newTotal,                        
                    };
                }
            }),

            clear: () => set({ 
                idUser: 0,
                uuid: "",
                step: 0,            
                name: "",
                email: "",
                paternSurname: "",
                maternSurname: "",               
                phone: "",
                typeRegister: "",
                genre: "",               
                nacionality: "",            
                code_invitation: "",

                company: "",
                industry: "",
                position: "",
                area: "",
                country: "",
                municipality: "",
                state: "",
                city: "",
                address: "",
                colonia: "",
                colonias:[],
                postalCode: "",
                webPage: "",
                phoneCompany: "",

                eventKnowledge: "",
                productInterest: "",
                levelInfluence: "",
                wannaBeExhibitor: "",
                alreadyVisited: [],
                items:[],
                total: 0,
                code_cortesia: ""        
            }),

            clear_info_verify: () => set({
                idUser: 0,
                uuid: "",
                name: "",
                paternSurname: "",
                maternSurname: "",
                email: "",
                phone: "",
                company: "",                
                position: "",                                             
            })

        }), 
        { name: "register-form" }
    )
)

export {useRegisterForm};