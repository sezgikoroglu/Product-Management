import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items:[],
    length:0,
    index:"",
    amount:0,
}

export const basketSlice = createSlice({
    name:"basket",
    initialState,
    
    
    reducers:{
        addItemToBasket:(state,action)=>{
            state.items=action.payload
        }, 
        setLength:(state,action)=>{
            state.length=action.payload
        },
        setIndex:(state,action)=>{
            state.index=action.payload
        },
        setAmount:(state,action)=>{
            state.amount=action.payload
        }

        
    },
})

export const { addItemToBasket , setLength } = basketSlice.actions
export default basketSlice.reducer