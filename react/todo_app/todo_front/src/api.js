const API_URL = "http://192.168.0.190:8080/api/todos/";

export async function getTodos(){
   return fetch(API_URL)
      .then(res => {
        if(!res.ok){
          if(res.status >= 400 && res.status < 500){
            return res.json().then(res=>{
              let err =  {errorMessage: res.message};
              throw err;
            })
          } else {
            let err = {errorMessage: "Server not responding"};
            throw err;
          }
        }
        return res.json();
      })
}

export async function createTodo(val){
    return fetch(API_URL, {
      method: "POST",
      headers: new Headers({
        "Content-Type":"application/json"
      }),
      body: JSON.stringify({name:val})
    }
    )
      .then(res => {
        if(!res.ok){
          if(res.status >= 400 && res.status < 500){
            return res.json().then(res=>{
              let err =  {errorMessage: res.message};
              throw err;
            })
          } else {
            let err = {errorMessage: "Server not responding"};
            throw err;
          }
        }
        return res.json();
      })
}

export async function removeTodo(id){
    const deleteURL =  API_URL + id;
    return fetch(deleteURL, {
      method: "DELETE",
    })
      .then(res => {
        if(!res.ok){
          if(res.status >= 400 && res.status < 500){
            return res.json().then(res=>{
              let err =  {errorMessage: res.message};
              throw err;
            })
          } else {
            let err = {errorMessage: "Server not responding"};
            throw err;
          }
        }
        return res.json();
      })
}

export async function updateTodo(todo) {
  const updateURL = API_URL + todo._id;
   return fetch(updateURL, {
     method: 'put',
     headers: new Headers({
       'Content-Type': 'application/json',
     }),
     body: JSON.stringify({completed: !todo.completed})
   })
    .then(resp => {
      if(!resp.ok) {
        if(resp.status >=400 && resp.status < 500) {
          return resp.json().then(data => {
            let err = {errorMessage: data.message};
            throw err;
          })
        } else {
          let err = {errorMessage: 'Please try again later, server is not responding'};
          throw err;
        }
      }
      return resp.json();
   })
}
