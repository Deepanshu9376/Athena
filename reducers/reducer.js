// const initialState = {
//     minicard: [],
//     carddata: []
//     // other state properties
// };

// export const reducer = (state = initialState, action) => {
//     switch(action.type) {
//         case 'add':
//             return {
//                 ...state,
//                 minicard: action.payload,  // Replace minicard with new search results
//                 carddata: action.payload   // Replace carddata with new search results
//             };
//         default:
//             return state;
//     }
// };
const initialState = []

export const reducer =(state=initialState,action)=>{
    if(action.type=='add'){
        return action.payload
    }
   return state
}
