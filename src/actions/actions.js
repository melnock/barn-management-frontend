
const API_URL = "http://localhost:3000/api/v1"
const token = localStorage.getItem("token")
const headers = { "Content-Type": "application/json"}
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
      console.log("LOGGING IN", userData)
			localStorage.setItem("token", userData.jwt)
			dispatch({
				type: "LOGIN_USER",
				payload: userData
			})
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
			localStorage.setItem("token", userData.jwt)
			dispatch({
				type: "LOGIN_USER",
				payload: userData
			})
		})
	}
}

export function getUser(){
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
      return{
        type: "SUBMIT_REPORT_CARD"
      }
    })
  }
}

export const selectedHorse = (horse)=>{
  return {
    type: "SELECT_HORSE",
    payload: horse
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
    fetch(API_URL + '/signup', {
      method: "POST",
      headers: headers,
      body: JSON.stringify({ user })
    })
    .then(r=>r.json())
    .then(userData => {
      dispatch ({
        type: "LOGIN_USER",
        payload:userData
      })
    })
  }
}
