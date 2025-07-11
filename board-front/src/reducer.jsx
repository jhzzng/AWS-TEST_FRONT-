export const initState = {
    user:{
        id:'',
        name:'',
        email:'',
        address:'',
        detailAddress:''
    }
}

export const userReducer = (state=initState, action) => {
    switch(action.type) {
        case 'USER': return {...state, user:{...action.payload}};
        default: return state;
    }
}