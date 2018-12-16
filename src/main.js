function component() {
  var element = document.createElement('div');
  element.innerHTML = "webpackDemo";
  return element;
}

document.body.appendChild(component());