function postData(url, data, ...args) {
    return new Promise((resolve, reject) => {

      verb = args[0]

      if(args.length === 0){
        verb = 'POST'
      }

    const options = {
      method: verb,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    }
    
    fetch(url, options)
      .then((response) =>  response.json())
      .then(data => resolve(data))
      .catch((error) => reject(error))
    })
}

function getData(url) {

    return new Promise((resolve, reject) => {
    const options = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }
    
    fetch(url, options)
      .then((response) =>  response.json())
      .then(data => resolve(data))
      .catch((error) => {
        console.log(error);
        reject(error)
      })
    })
}