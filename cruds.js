let title = document.getElementById('title');
let price = document.getElementById('price');
let tax = document.getElementById('tax');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

let mood = 'Create';
let updatedProduct;
let deleteAllProducts;

// get total price

function getTotalPrice() {
	if (price.value != '') {
		let result = +price.value + +tax.value + +ads.value - +discount.value;
		if (result <= 0) {
			alert('Wrong price !');
			result = '';
			clearinputs();
		}
		total.innerText = result;
		total.style.background = '#040';
	} else {
		total.innerText = '';
		total.style.background = '#c20000';
	}
}

let products;
if (localStorage.product != null) {
	products = JSON.parse(localStorage.product);
} else {
	products = [];
}

// create a product

function createproduct() {
	let newProduct = {
		title: title.value.toLowerCase(),
		price: price.value,
		tax: tax.value,
		ads: ads.value,
		discount: discount.value,
		total: total.innerText,
		count: count.value,
		category: category.value.toLowerCase(),
	};
	if (mood === 'Create') {
		if (newProduct.count > 1) {
			for (let i = 0; i < newProduct.count; i++) {
				products.push(newProduct);
			}
		} else {
			products.push(newProduct);
		}
	} else {
		products[updatedProduct] = newProduct;
		mood = 'Create';
		submit.innerHTML = 'Create';
		count.style.display = 'block';
	}

	localStorage.setItem('product', JSON.stringify(products));
	console.log(localStorage);

	clearinputs();
	showData();
}

// clear input fields

function clearinputs() {
	title.value = '';
	price.value = '';
	tax.value = '';
	ads.value = '';
	discount.value = '';
	total.innerText = '';
	count.value = '';
	category.value = '';
}

// show data in html

function showData() {
	getTotalPrice();
	let table = '';
	for (let i = 0; i < products.length; i++) {
		table += `
	                <tr>
						<td>${i + 1}</td>
						<td>${products[i].title}</td>
						<td>${products[i].price}</td>
						<td>${products[i].tax}</td>
						<td>${products[i].ads}</td>
						<td>${products[i].discount}</td>
						<td>${products[i].total}</td>
						<td>${products[i].category}</td>
						<td><button  onclick="updateProduct(${i})" class="update">update</button></td>
						<td><button  onclick="deleteProduct(${i})" class="delete">delete</button></td>
					</tr>

                `;
	}
	document.getElementById('tbody').innerHTML = table;
	let deleteall = document.getElementById('deleteall');
	deleteAllProducts = deleteall;

	if (products.length > 0) {
		deleteall.innerHTML = `<button  onclick="deleteAll()" class="delete">Delete All (${products.length})</button>`;
	} else {
		deleteall.innerHTML = '';
	}
}
showData();

// delete one product

function deleteProduct(i) {
	products.splice(i, 1);
	localStorage.product = JSON.stringify(products);
	showData();
	clearinputs();
}

// delete all products

function deleteAll() {
	if (confirm('are you sure you want to delete all products')) {
		localStorage.clear();
		products.splice(0);
		showData();
		clearinputs();
	}
}

// update one product

function updateProduct(i) {
	title.value = products[i].title;
	price.value = products[i].price;
	tax.value = products[i].tax;
	ads.value = products[i].ads;
	discount.value = products[i].discount;
	getTotalPrice();
	count.style.display = 'none';
	category.value = products[i].category;
	submit.innerHTML = 'Update';

	mood = 'Update';
	updatedProduct = i;
	scroll({
		top: 0,
		behavior: 'smooth',
	});
}

// search for products by (title,category)

let searching = document.getElementById('searching');

function searchMoods(id) {
	if (id == 'searchTitle') {
		searching.placeholder = 'search by title';
	} else {
		searching.placeholder = 'search by category';
	}
	searching.focus();
	searching.value = '';
	showData();
}

function searchProducts(value) {
	let table = '';

	for (let i = 0; i < products.length; i++) {
		if (searching.placeholder == 'search by category') {
			if (products[i].category.includes(value.toLowerCase())) {
				table += `
	                <tr>
						<td>${i + 1}</td>
						<td>${products[i].title}</td>
						<td>${products[i].price}</td>
						<td>${products[i].tax}</td>
						<td>${products[i].ads}</td>
						<td>${products[i].discount}</td>
						<td>${products[i].total}</td>
						<td>${products[i].category}</td>
						<td><button  onclick="updateProduct(${i})" class="update">update</button></td>
						<td><button  onclick="deleteProduct(${i})" class="delete">delete</button></td>
					</tr>

                `;
			}
		} else {
			if (products[i].title.includes(value.toLowerCase())) {
				table += `
	                <tr>
						<td>${i + 1}</td>
						<td>${products[i].title}</td>
						<td>${products[i].price}</td>
						<td>${products[i].tax}</td>
						<td>${products[i].ads}</td>
						<td>${products[i].discount}</td>
						<td>${products[i].total}</td>
						<td>${products[i].category}</td>
						<td><button  onclick="updateProduct(${i})" class="update">update</button></td>
						<td><button  onclick="deleteProduct(${i})" class="delete">delete</button></td>
					</tr>

                `;
			}
		}
	}

	document.getElementById('tbody').innerHTML = table;
	deleteAllProducts.innerHTML = '';
	if (value == '') {
		showData();
	}
}
