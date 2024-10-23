import { create } from "zustand";
import { persist } from "zustand/middleware";

const useRegisterForm = create( 
    persist(
        (set) => ({     
            step: 0,            
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
            item:{},
            code_cortesia: "",
            
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

            addTocart: (item) => set(() => ({
                item: {...item}
            })),

            clear: () => set({ 
                step: 0,            
                name: "",
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
                item:{},
                code_cortesia: ""        
            })
        }), 
        { name: "register-form" }
    )
)

export {useRegisterForm};