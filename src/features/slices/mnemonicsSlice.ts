import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface mnemonicsType {
 mnemonics:string|undefined|null
}

let mnemonics_:string|null= localStorage.getItem('mnemonics'); 
if(mnemonics_){
    mnemonics_=JSON.parse(mnemonics_);
}

const initialState: mnemonicsType = {
 mnemonics:mnemonics_
}

export const counterSlice = createSlice({
  name: 'Mnemonics',
  initialState,
  reducers: {
     
    setMnenonics: (state, action: PayloadAction<string>) => {
        if(!action) return ;
        localStorage.setItem('mnemonics',JSON.stringify(action.payload))
      state.mnemonics = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const {  setMnenonics } = counterSlice.actions

export default counterSlice.reducer