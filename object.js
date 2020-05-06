class Component {
	constructor() {
		this.nameProduct = document.querySelector('#name');
		this.priceProduct = document.querySelector('#price');
		this.idProduct = document.querySelector('#id');
		this.form = document.querySelector('#form');
		this.error = document.querySelector('#error');
		this.noProducts = document.querySelector('.no-product');
		this.products = !localStorage.products ? [] : JSON.parse(localStorage.getItem('products'));
	}

	listProducts() {
		if(!this.products.length) {
    		this.noProduct();
  		} else {
	     	this.noProducts ? document.querySelector('.no-product').remove(): null; 

			this.products.forEach(product => {
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
	  	const buttons = document.querySelectorAll('#remove-product');
		buttons.forEach(button => {
		    button.addEventListener('click', this.removeProduct.bind(this));
		})
	}

	noProduct() {
		const noProduct = document.createElement('h1');
	  	noProduct.textContent = 'No products';
	  	noProduct.classList.add('no-product');

	  	document.querySelector('#infomation-product').appendChild(noProduct);
	}

	formSubmit() {
		this.form.addEventListener('submit', this.handleSubmit.bind(this));
	}

	handleSubmit(e) {
		e.preventDefault();
		let name = this.nameProduct.value;
		let price = this.priceProduct.value;
		let id = this.idProduct.value;

		if(price < 0) {
			this.alert('Price must be the larger than 0!');
		} else {
			if(!this.checkId(id)) {
				this.products.push({id, name, price});
				localStorage.setItem('products', JSON.stringify(this.products));
				this.addProduct(name, price, id);

				document.querySelector('#name').value = '';
			  	document.querySelector('#price').value = '';
			  	document.querySelector('#id').value = '';
			} else {
				this.alert('Id product is really exist!');
			}
		}
	}

	removeProduct(e) {
		const removeId = e.target.parentNode.firstElementChild.textContent;
		console.log(removeId);
		this.products = this.products.filter(({ id }) => id !== removeId);

		localStorage.setItem('products', JSON.stringify(this.products));

		e.target.parentNode.remove();

		if(!this.products.length) {
		  this.noProduct();
	    }
	}

	addProduct(name, price, id) {
		this.noProducts ? document.querySelector('.no-product').remove(): null; 

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
		    button.addEventListener('click', this.removeProduct.bind(this));
		})
	}

	checkId(id) {
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

	alert(msg) {
		this.error.innerHTML = `<p id="msg-error">${msg}</p>`;

		setTimeout(() => (
		document
		  .querySelector('#msg-error') ? document.querySelector('#msg-error').remove():null
		), 3000);
	}
}

class Render extends Component {
	render() {
		this.listProducts();
		this.formSubmit();
	}
}

const broswer = new Render();
broswer.render();