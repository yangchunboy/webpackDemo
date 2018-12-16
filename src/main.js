import './style.css';

const component = ()=> {
  var element = document.getElementById('app');
  const str = 'webpackDemo';
  element.innerHTML = str;
  return element;
}

document.body.appendChild(component());