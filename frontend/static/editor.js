const currentPath = window.location.pathname;
const pathElements = currentPath.split('/');
const currentId = pathElements[pathElements.length - 1];

console.log(currentId);

document.querySelector('#root').innerHTML = `this is the editor for cat id ${currentId}`

fetch(`/api/cats/${currentId}`)
  .then(res => res.json())
  .then(data => {
    if (data.id) {
      console.log(data)
      // show editor with data
    } else {
      console.log(data)
      // show error message
    }
  })