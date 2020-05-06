const nameProduct = document.querySelector('#name');
const priceProduct = document.querySelector('#price');
const idProduct = document.querySelector('#id');
const form = document.querySelector('#form');
const error = document.querySelector('#error');
let products = !localStorage.products ? [] : JSON.parse(localStorage.getItem('products'));

// running
render();

// declarations function
function render() {
  // render all products in localStorage
  form.addEventListener('submit', handleSubmit.bind(this));
  listProducts(products);

  const buttons = document.querySelectorAll('#remove-product');
  buttons.forEach(button => {
    button.addEventListener('click', removeProduct.bind(this));
  })
}

function listProducts(products) {
  if(!products.length) {
    noProduct();
  } else {
    document.querySelector('.no-product') ? document.querySelector('.no-product').remove(): null; 

    products.forEach(product => {
      const div = document.createElement('div');
      const button = document.createElement('button');
      div.classList.add('content-list');
      button.classList.add('remove-product');
      button.setAttribute('id', 'remove-product');

      // create field id
      const spanId = document.createElement('span');
      spanId.textContent = product.id;
      div.appendChild(spanId);

      // create field name
      const spanName = document.createElement('span');
      spanName.textContent = product.name;
      div.appendChild(spanName);

      // create field price
      const spanPrice = document.createElement('span');
      spanPrice.textContent = `$${product.price}`;
      div.appendChild(spanPrice);

       // add button into element div
      button.textContent = 'X';
      div.appendChild(button);

      document.querySelector('#infomation-product').appendChild(div);
    })
  }
}

function removeProduct(e) {
    const removeId = e.target.parentNode.firstElementChild.textContent;
    console.log(removeId);
    products = products.filter(({ id }) => id !== removeId);
    console.log(products);
    localStorage.setItem('products', JSON.stringify(products));

    e.target.parentNode.remove();
    
    if(!products.length) {
      noProduct();
    }
}

function noProduct() {
  const noProduct = document.createElement('h1');
  noProduct.textContent = 'No products';
  noProduct.classList.add('no-product');

  document.querySelector('#infomation-product').appendChild(noProduct);
}

function addProduct(name, price, id) {
  document.querySelector('.no-product') ? document.querySelector('.no-product').remove(): null; 

  const div = document.createElement('div');
  const button = document.createElement('button');
  div.classList.add('content-list');
  button.classList.add('remove-product');
  button.setAttribute('id', 'remove-product');

  // create field id
  const spanId = document.createElement('span');
  spanId.textContent = id;
  div.appendChild(spanId);

  // create field name
  const spanName = document.createElement('span');
  spanName.textContent = name;
  div.appendChild(spanName);

  // create field price
  const spanPrice = document.createElement('span');
  spanPrice.textContent = `$${price}`;
  div.appendChild(spanPrice);

 // add button into element div
  button.textContent = 'X';
  div.appendChild(button);

  document.querySelector('#infomation-product').appendChild(div);

  const buttons = document.querySelectorAll('#remove-product');
  buttons.forEach(button => {
    button.addEventListener('click', removeProduct.bind(this));
  })
}

function handleSubmit(e) {
  e.preventDefault();

  const name = nameProduct.value;
  const price = priceProduct.value;
  const id = idProduct.value;
  
  // check price is more than 0
  if(price < 0) {
    alert('Price must be the larger than 0!');
  } else {
    // check ID of product
    if(!checkId(id)) {
      alert('');

      // add product into localStorage
      products.push({ name, price, id });
      addProduct(name, price, id);

      localStorage.setItem('products', JSON.stringify(products));

      // reset input value
      document.querySelector('#name').value = '';
      document.querySelector('#price').value = '';
      document.querySelector('#id').value = '';
    } else {
      alert('Id product is really exist!');
    }
  }
}

function checkId(id) {
  const products = JSON.parse(localStorage.getItem('products'));
  let isId = false;

  if(!products) return isId;

  products.forEach(product => {
    if(product.id === id) {
      isId = true;
    }
  })

  return isId;
}

function alert(msg) {
  // const p = document.createElement('p');
  // p.textContent = msg;
  error.innerHTML = `<p id="msg-error">${msg}</p>`;

  setTimeout(() => (
    document
      .querySelector('#msg-error') ? document.querySelector('#msg-error').remove():null
  ), 3000);
}