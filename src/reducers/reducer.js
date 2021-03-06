const defaultState = {
  currentUser: null,
  horses: [],
  selectedHorse: null,
  barns: [],
  selectedBarn: null,
  current_barn: null,
  paddocks: [],
  stalls: [],
  vets: [],
  farriers: [],
  supplies: [],
  meals:[],
  errors:[]
}


export const reducer = (state=defaultState, action)=>{
  console.log(action)
  switch (action.type) {
    case 'LOGIN_USER':
      return {...state,
        currentUser: action.payload.user,
        users:[...action.payload.users],
        horses: [...action.payload.horses],
        current_barn:action.payload.current_barn,
        barns: [...action.payload.barns],
        vets: [...action.payload.vets],
        farriers: [...action.payload.farriers],
        paddocks: [...action.payload.paddocks],
        stalls: [...action.payload.stalls],
        healthreports: [...action.payload.healthreports],
        supplies: [...action.payload.supplies],
        meals: [...action.payload.meals]
      }
    case 'LOGIN_ERRORS':
      return{...state, errors: [action.payload]}
    case 'SELECT_HORSE':
      return {...state, selectedHorse: action.payload}
    case 'SELECT_BARN':
      return {...state, selectedBarn: action.payload}
    case "LOGOUT":
  		return defaultState
    case "SUBMIT_REPORT_CARD":
      return {...state}
    case "CREATE_BARN":
      return {...state, barns:[...state.barns, action.payload], selectedBarn: action.payload.id}
    case "CREATE_HORSE":
      return {...state, horses:[...state.horses, action.payload], selectedHorse: action.payload}
    case "CREATE_VET":
      return {...state, vets:[...state.vets, action.payload]}
    case "CREATE_FARRIER":
      return {...state, farriers:[...state.farriers, action.payload]}
    case "CREATE_MEAL":
      return {...state, meals:[...state.meals, action.payload]}
    case "FETCH_BARNS":
      return {...state, barns:[...action.payload]}
    case "UPDATE_USER":
      return {...state, users:[...action.payload]}
    case "EDIT_MEAL":
      return {...state, meals:[...action.payload.meals]}
    case "EDIT_HORSE":
      return {...state, horses:[...action.payload.horses], selectedHorse: action.payload.horse}
    case "SUBMIT_SUPPLY":
      return {...state, supplies:[...state.supplies, action.payload]}
    default:
      return state
  }
}
