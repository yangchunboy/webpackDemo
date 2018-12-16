const component = ()=> {
  var element = document.createElement('div');
  const str = 'webpackDemo';
  element.innerHTML = str;
  return element;
}

document.body.appendChild(component());