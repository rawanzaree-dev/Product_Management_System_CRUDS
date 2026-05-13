let title= document.getElementById("title"),
    priceParent= document.querySelector(".price"),
    price= document.getElementById("price"),
    taxes= document.getElementById("taxes"),
    ads= document.getElementById("ads"),
    discount= document.getElementById("discount"),
    total= document.querySelector(".total"),
    count= document.getElementById("count"),
    category= document.getElementById("category"),
    submitBtn= document.getElementById("submit"),
    deleteAllBtn= document.getElementById("delete-all"),
    arr= [], obj= {}, mood= "create", temp;

// calculate total
function getTotal() {
    if(price.value != "") {
        total.innerHTML= (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.style.setProperty("background-color", "#080");
    }else {
        total.innerHTML= "";
        total.style.setProperty("background-color", "#ea8187");
    }
}
priceParent.oninput= getTotal;

// create product
submitBtn.onclick= function() {
    if(localStorage.getItem("products")) {
        arr= JSON.parse(localStorage.getItem("products"));
    }
    let obj= {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value,
    };

    if(mood === "create") {
        if(count.value > 0) {
            for(let i= 0; i < count.value; i++) {
                arr.push(obj);
            }
        }else {
            arr.push(obj);
        }
    }else {
        arr[temp]= obj;
        mood= "create";
        submitBtn.textContent= "Crerate";
        count.style.display= "block";
    }
    
    localStorage.setItem("products", JSON.stringify(arr));
    clearData();
    getTotal();
    readData();
}

function clearData() {
    title.value= "";
    price.value= "";
    taxes.value= "";
    ads.value= "";
    discount.value= "";
    count.value= "";
    category.value= "";
}

// read data
function readData() {
    let table= "";
    if(localStorage.products) {
        arr= JSON.parse(localStorage.products);
    }

    arr.forEach((el, idx) => {
        table+= `
            <tr>
                <td>${idx + 1}</td>
                <td>${el.title}</td>
                <td>${el.price}</td>
                <td>${el.taxes}</td>
                <td>${el.ads}</td>
                <td>${el.discount}</td>
                <td>${el.total}</td>
                <td>${el.category}</td>
                <td><button onclick="updateProduct(${idx})">Update</button></td>
                <td><button onclick="deleteProduct(${idx})">Delete</button></td>
            </tr>
        `;
    });
    document.querySelector("tbody").innerHTML= table;

    if(arr.length > 0) {
        deleteAllBtn.style.display= "block";
        deleteAllBtn.innerHTML= `Delete All (${arr.length})`;
    }else {
        deleteAllBtn.style.display= "none";
    }
}
window.onload= readData;

// delete one product
function deleteProduct(i) {
    arr.splice(i, 1);
    localStorage.setItem("products", JSON.stringify(arr));
    readData();
}

// delete all data
function deleteAll() {
    arr.splice(0);
    localStorage.clear();
    readData();
}

// update product
function updateProduct(i) {
    title.value= arr[i].title;
    price.value= arr[i].price;
    taxes.value= arr[i].taxes;
    ads.value= arr[i].ads;
    discount.value= arr[i].discount;
    total.innerHTML= arr[i].total;
    category.value= arr[i].category;
    count.style.display= "none";
    submitBtn.textContent= "Update";
    getTotal();
    mood= "update";
    window.scroll({
        top: 0,
        behavior: "smooth",
    });
    temp= i;
}


