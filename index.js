const nameProduct = document.querySelector('#name');
const priceProduct = document.querySelector('#price');
const idProduct = document.querySelector('#id');
const form = document.querySelector('#form');
const error = document.querySelector('#error');
const products = !localStorage.products ? [] : JSON.parse(localStorage.getItem('products'));

// running
render();
listProduct(products);

// declarations function
function render() {
  form.addEventListener('submit', handleSubmit.bind(this));
}

function listProduct(products) {
  if(!products.length) {
    const noProduct = document.createElement('h1');
    noProduct.textContent = 'No products';
    noProduct.classList.add('no-product');

    document.querySelector('#infomation-product').appendChild(noProduct);
  } else {
    document.querySelector('.no-product') ? document.querySelector('.no-product').remove(): null; 

    products.forEach(product => {
      const div = document.createElement('div');
      div.classList.add('content-list');

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

      document.querySelector('#infomation-product').appendChild(div);
    })
  }
}

function addProduct(name, price, id) {
  document.querySelector('.no-product') ? document.querySelector('.no-product').remove(): null; 

  const div = document.createElement('div');
  div.classList.add('content-list');

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

  document.querySelector('#infomation-product').appendChild(div);
}

function handleSubmit(e) {
  e.preventDefault();

  const name = nameProduct.value;
  const price = priceProduct.value;
  const id = idProduct.value;
  
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
  const p = document.createElement('p');
  p.textContent = msg;

  error.appendChild(p);

  setTimeout(() => p.remove(), 3000);
}