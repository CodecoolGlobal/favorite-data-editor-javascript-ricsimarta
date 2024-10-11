fetch('/api/cats')
  .then(res => res.json())
  .then(data => {
    console.log(data)

    data.map(cat => document.querySelector("#root").insertAdjacentHTML("beforeend", `
      <button id=${cat.id}>show ${cat.id}</button>  
    `))

    document.querySelectorAll('button').forEach(button => {
      button.addEventListener("click", () => {
        window.location.href = `http://localhost:3000/editor/${button.id}`
      })
    })
  })