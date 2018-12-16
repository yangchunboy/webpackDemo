import './style.css';

const component = ()=> {
  const element = document.getElementById('app');
  const str = 'webpackDemo';
  element.innerHTML = str;
  return element;
}

const less = () => {
  const element = document.createElement('div');
  element.setAttribute('id', 'less');
  const str = 'less编译成功的话背景会变成红色！';
  element.innerHTML = str;
  return element;
};

const css = () => {
  const element = document.createElement('div');
  element.setAttribute('id', 'css');
  const str = 'css编译成功的话背景会变成蓝色！';
  element.innerHTML = str;
  return element;
};

document.body.appendChild(component());
document.body.appendChild(less());
document.body.appendChild(css());