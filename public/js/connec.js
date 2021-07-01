let APIURL = "http://localhost:8080/"

// equivalent à  $(document).ready(function(){})
window.addEventListener("DOMContentLoaded", (event) => {
  console.log("DOM entièrement chargé et analysé");
  dataStorage()
  document.getElementById('nolink').onclick = function(e){
    e.preventDefault()
    console.log('nolink')
    // emulate get user by ID
    const id = 1 //hardcode to test
    getUser(id) 
  }
  /*document.getElementById('register').onclick = function(e){
    e.preventDefault()
    console.log('register')    
    registerUser()
  } */
});


// on document.ready test if localstorage exist
function dataStorage(){  
   if(!localStorage.getItem("isLogged")){
     localStorage.setItem("isLogged", false);
     console.log("localStorage isLogged created");
   };
   if(!localStorage.getItem("token")){
    localStorage.setItem("token", ''); 
    console.log("localStorage token created");
  };
 }

// get identity user by id
function getUser(id) {
  const token = localStorage.getItem("token")
  const _url = APIURL + 'api/users/me'
  fetch(_url, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      'Authorization' : 'Bearer ' + token

    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    
  })
  .then( response => {
    console.log(response) 
      
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(response);
  })
  .then( data => {
      console.log(data)      
      //document.getElementById('master').innerHTML = data.content
  })
  .catch(error => console.log(error))
}

// called by click on button Add article
function addArticle() {
  console.log('callserver')
  const article= {
    title: "post 34", 
    content: "QDefsf boubtrooi sd freolki dortavdsnd wxcn wkxcl mdgmoern! mgdfogpa" 
  }
  const requestOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(article)
  }
  
  fetch(APIURL + 'article', requestOptions)      
    .then( response => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(response);
    })
    .then( data => {
        //console.log(data[0].insertId)
        article.id = data[0].insertId
        console.log(article)
    })
    .catch(error => console.log('Error' + error))  
}


/*
*Validate data before send to server
*email
*password
*name
*/
function registerUser(e){
  e.preventDefault()
  console.log('registerUser')
  let form = document.forms['formRegister']
  
  let user = {
    email: form.elements['email'].value,
    password: form.elements['password'].value,
    name:form.elements['name'].value
  }
  console.log(user)
  if(validateFields(user)) {
    const _url = APIURL + 'api/users/'
    fetch(_url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(user) // body data type must match "Content-Type" header
    })
    .then( response => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(response);
    })
    .then( data => {
      console.log(data.token)
      localStorage.setItem("token", data.token);
      window.location = APIURL
    })
    .catch(error => console.log('Error' + error))
  }
  return false  
}


function validateFields(user){
  if(validatePseudo(user.name)){
    if(validateEmail(user.email)){
      if(validatePwd(user.pasword))
        return true
      return 'invalid password must contains 7 to 15 characters which contain at least one numeric digit and a special character'
    }
    return 'invalide email'
  }
  return 'invalid name must be contains only number and character'
}

function validatePseudo(input){
  return true
  /*var letterNumber = /^[0-9a-zA-Z]+$/;
  if(input.match(letterNumber))
    return true 
  return false*/
}

function validateEmail(input) {  
  return true
  /*var reg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  if(reg.match(reg))
    return true 
  return false*/
}
//To check a password between 7 to 15 characters which contain at least one numeric digit and a special character
function validatePwd(input){
  return true
  /*var paswd=  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
  if(input.match(paswd)) 
    return true;  
  return false; */
}