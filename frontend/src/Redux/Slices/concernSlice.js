import { createSlice } from '@reduxjs/toolkit'

const initialState = {


    loading: false,
    allConcerns: null,
    allTreatments: null,
    allPackages: null,
    refresh:0,
    allEnquiries: null,


}

export const concernSlice = createSlice({
    name:"concern",
    initialState,
    reducers:{

        setLoading:(state,action)=>{
            state.loading = action.payload
        },

        setAllConcerns:(state,action)=>{
            state.allConcerns = action.payload
        },

        clearAllConcerns:(state)=>{
            state.allConcerns = null
        },

        setAllTreatements:(state,action)=>{
            state.allTreatments = action.payload
        },

        clearAllTreatments:(state)=>{
            state.allTreatments = null
        },

        setAllPackages:(state,action)=>{
            state.allPackages = action.payload
        },

        clearAllPackages:(state)=>{
            state.allPackages = null
        },

        setAllEnquiries:(state,action)=>{
            state.allEnquiries = action.payload
        },

        clearAllEnquiries:(state)=>{
            state.allEnquiries = null
        },

        setRefresh:(state,action)=>{
            state.refresh =state.refresh + 1
        },





    }
})

export const {setLoading, setAllConcerns,clearAllConcerns,setAllTreatements,clearAllTreatments,setAllPackages,clearAllPackages,setRefresh,setAllEnquiries,clearAllEnquiries} = concernSlice.actions
export default concernSlice.reducer