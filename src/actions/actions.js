
const API_URL = "http://localhost:3000/api/v1"
const token = localStorage.getItem("token")
const headers = { 'Access-Control-Allow-Origin':'*', "Content-Type": "application/json", "Accept": "application/json"}
function authedHeaders(){
  return {...headers, "Authorization": token}
}

export function login(email, password){
	return (dispatch) => {
		return fetch(API_URL + "/login", {
			method: "POST",
			headers: headers,
			body: JSON.stringify({email, password})
		})
		.then(res => res.json())
		.then(userData => {
      if (userData.error) {
        dispatch({
          type: "LOGIN_ERRORS",
          payload: userData.error
        })
      }else{
        localStorage.setItem("token", userData.jwt)
        dispatch({
          type: "LOGIN_USER",
          payload: userData
        })
      }
		})
	}
}

export function signup(email, password){

	return (dispatch) => {
		return fetch(API_URL + "/signup", {
			method: "POST",
			headers: headers,
			body: JSON.stringify({email, password})
		})
		.then(res => res.json())
		.then(userData => {
      if (userData.error) {
        dispatch({
          type: "LOGIN_ERRORS",
          payload: userData.error
        })
      }else{
  			localStorage.setItem("token", userData.jwt)
  			dispatch({
  				type: "LOGIN_USER",
  				payload: userData
  			})
      }
		})
	}
}

export function getUser(){
  console.log("getting a user!!")
	const token = localStorage.getItem("token")
	return (dispatch) => {
		return fetch(API_URL + "/get_user", {
			headers: {
				"Authorization": token
			}
		})
		.then(res => res.json())
		.then(userData => {
			dispatch({
				type: "LOGIN_USER",
				payload: userData
			})
		})
	}
}


export const submitReportCard = (cardInfo)=>{
  return (dispatch)=>{
    fetch(API_URL + '/healthreports', {
      method: "POST",
      headers: authedHeaders(),
      body: JSON.stringify({...cardInfo})
    })
    .then(r=>r.json())
    .then(userData => {
      dispatch({
        type: "SUBMIT_REPORT_CARD"
      })
    })
  }
}

export const createSupply = (supply)=>{
  return (dispatch)=>{
    return fetch(API_URL + '/supplies', {
      method: "POST",
      headers: authedHeaders(),
      body: JSON.stringify({...supply})
    })
    .then(r=>r.json())
    .then(supplyData => {
      dispatch({
        type: "SUBMIT_SUPPLY",
        payload: supplyData
      })
    })
  }
}

export const selectedHorse = (horse)=>{
  return {
    type: "SELECT_HORSE",
    payload: horse
  }
}

export const selectedBarn = (barn)=>{
  return {
    type: "SELECT_BARN",
    payload: barn
  }
}

export function logout(){
	localStorage.removeItem("token")
	return {
		type: "LOGOUT"
	}
}


export const createUser = (user)=>{
  return (dispatch)=>{
    return fetch(API_URL + '/signup', {
      method: "POST",
      headers: headers,
      body: JSON.stringify({ user })
    })
    .then(r=>r.json())
    .then(userData => {
      if (userData.error) {
        dispatch({
          type: "LOGIN_ERRORS",
          payload: userData.error
        })
      }else{
        dispatch ({
          type: "LOGIN_USER",
          payload:userData
        })
      }
    })
  }
}

export const fetchBarns = ()=>{
  return (dispatch)=>{
    fetch(API_URL + '/barns')
    .then(r=>r.json())
    .then(barns => {
      dispatch ({
        type: "FETCH_BARNS",
        payload: barns
      })
    })
  }
}


export const createBarn = (barn)=>{
  return (dispatch)=>{
    return fetch(API_URL + '/newbarn', {
      method: "POST",
      headers: headers,
      body: JSON.stringify({ barn:{...barn, images: {...barn.images}, amenities: [...barn.amenities]} })
    })
    .then(r=>r.json())
    .then(barnData => {
      if (barnData.error) {
        dispatch({
          type: "LOGIN_ERRORS",
          payload: barnData.error
        })
      }else{
        dispatch ({
          type: "CREATE_BARN",
          payload: barnData
        })
      }
    })
  }
}

export const createVet = (vet)=>{
  return (dispatch)=>{
    return fetch(API_URL + '/newvet', {
      method: "POST",
      headers: authedHeaders(),
      body: JSON.stringify({vet})
    })
    .then(r=>r.json())
    .then(vetData => {
      dispatch ({
        type: "CREATE_VET",
        payload: vetData
      })
    })
  }
}

export const createFarrier = (farrier)=>{
  return (dispatch)=>{
    return fetch(API_URL + '/newfarrier', {
      method: "POST",
      headers: authedHeaders(),
      body: JSON.stringify({farrier})
    })
    .then(r=>r.json())
    .then(farrierData => {
      dispatch ({
        type: "CREATE_FARRIER",
        payload: farrierData
      })
    })
  }
}

export const createMeal = (meal)=>{
  return (dispatch)=>{
    return fetch(API_URL + '/meals', {
      method: "POST",
      headers: authedHeaders(),
      body: JSON.stringify({meal})
    })
    .then(r=>r.json())
    .then(mealData => {
      dispatch ({
        type: "CREATE_MEAL",
        payload: mealData
      })
    })
  }
}

export const editMeal = (meal)=>{
  return (dispatch)=>{
    return fetch(API_URL + `/meals/${meal.id}`, {
      method: "PATCH",
      headers: authedHeaders(),
      body: JSON.stringify({meal})
    })
    .then(r=>r.json())
    .then(mealData => {
      dispatch ({
        type: "EDIT_MEAL",
        payload: mealData
      })
    })
  }
}

export const mealDelete = (meal)=>{
  return (dispatch)=>{
    return fetch(API_URL + `/meals/${meal.id}`, {
      method: "DELETE",
      headers: authedHeaders(),
    })
    .then(r=>r.json())
    .then(mealData => {
      dispatch ({
        type: "EDIT_MEAL",
        payload: mealData
      })
    })
  }
}

export const createHorse = (horse)=>{
  console.log(horse)
  return (dispatch)=>{
    return fetch(API_URL + '/newhorse', {
      method: "POST",
      headers: authedHeaders(),
      body: JSON.stringify( {horse})
    })
    .then(r=>r.json())
    .then(horseData => {
      dispatch ({
        type: "CREATE_HORSE",
        payload: horseData
      })
    })
  }
}

export const editHorse = (horse)=>{
  console.log(horse)
  return (dispatch)=>{
    return fetch(API_URL + `/horses/${horse.id}`, {
      method: "PATCH",
      headers: authedHeaders(),
      body: JSON.stringify( {horse})
    })
    .then(r=>r.json())
    .then(horseData => {
      dispatch ({
        type: "EDIT_HORSE",
        payload: horseData
      })
    })
  }
}

export const updateUser = (user)=>{
  console.log(user)
  return (dispatch)=>{
    fetch(API_URL + `/users/${user.id}`, {
      method: "PATCH",
      headers: authedHeaders(),
      body: JSON.stringify( {user})
    })
    .then(r=>r.json())
    .then(userData => {
      dispatch({
        type: "UPDATE_USER",
        payload: userData
      })
    })
  }
}

export const submitImage = (image)=>{
  console.log("upload", image)
  return (dispatch)=>{
    fetch(API_URL + `/horses`, {
      method: "POST",
      headers: authedHeaders(),
      body: JSON.stringify( {image})
    })
    .then(r=>r.json())
    .then(imageData => {
      console.log(imageData)
    })
  }
}
