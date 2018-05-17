const defaultState = {
  currentUser: null,
  horses: [],
  selectedHorse: null,
  barns: []
}


export const reducer = (state=defaultState, action)=>{
  console.log(action)
  switch (action.type) {
    case 'LOGIN_USER':
      return {...state, currentUser: action.payload.user, horses: [...action.payload.horses], barns: [...action.payload.barns]}
    case 'SELECT_HORSE':
      return {...state, selectedHorse: action.payload}
    case "LOGOUT":
  		return defaultState
    case "SUBMIT_REPORT_CARD":
      return {...state}
    default:
      return state
  }
}
