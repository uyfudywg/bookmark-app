let name_sit =document.getElementById('sit-name');
let url = document.getElementById('url');
let btn = document.getElementById('btn');
let alertUrl = document.getElementById('alert');
let searchInput = document.getElementById('search-input');
let searchBtn = document.getElementById('search-btn');
let FavoriteBtn = document.getElementById('favorite-btn');
let containersit;
let currentIndex;

if(localStorage.getItem('data') != null){
    containersit =JSON.parse(localStorage.getItem('data'))
    displiy()
}else{
    containersit =[];
}

function addsit(){
    if(btn.innerHTML== "Submit"){
      add()
    }
    else{
      etidData()
    }
}
function isUrlDuplicate(url) {
    return containersit.some(item => item.url === url);
}

function add(){
    if (validate() === true) {
        if (isUrlDuplicate(url.value)) {
            alert('This URL has already been added.');
            clear();
            validateclear();
            return; 
        }
        let list = {
            name: name_sit.value,
            url: url.value,
            favorite: ''
        };
        containersit.push(list);
        console.log(containersit);
        localStorage.setItem('data', JSON.stringify(containersit));
        clear();
        displiy();
        validateclear();
    }
}

function clear(){
    name_sit.value ='';
    url.value =''
}

function displiy(){
    let data =''
    for(let i =0; i<containersit.length; i++){
        data +=`
        <tr class ="item">
            <td>${[i+1]}</td>
            <td>${containersit[i].name}</td>
             <td><a href="${containersit[i].url}" class="btn btn-outline-primary ">Visit</a></td>
             <td ><button class="btn btn-outline-warning" onclick="setData(${i})">Update</button></td>
             <td><button class=" btn btn-outline-danger" onclick="delet(${i})">Delete</button></td>
            <td>
                <i class="fa fa-heart" aria-hidden="true" style="color:${containersit[i].favorite}" onclick="toggleFavorite(this, ${i})"></i>
            </td>

        </tr>
        `
    }
    document.getElementById('table').innerHTML = data;
}

function delet(index){
    containersit.splice(index,1)
    localStorage.setItem('data',JSON.stringify(containersit))
    displiy()
}

function validate(){
    let regx=/(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/
    if(!url.value || !name_sit.value){
       alert('plese fill the form')
            return false
    }else if(regx.test(url.value)){
    url.classList.add('is-valid')
    url.classList.remove('is-invalid')
    alertUrl.classList.add('d-none')
    alertUrl.classList.remove('d-block')
    return true
   }else{
    url.classList.add('is-invalid')
    url.classList.remove('is-valid')
    alertUrl.classList.add('d-block')
    alertUrl.classList.remove('d-none')
    return false
   }
}
function validateclear(){
    url.classList.remove('is-valid');
}
url.addEventListener('blur' , validate)

function setData(index){
    currentIndex=index;
    name_sit.value=containersit[index].name;
    url.value=containersit[index].url;
    btn.innerHTML="Update";
}

function etidData(){
    if( validate() == true &&  validate() == true){
    containersit[currentIndex].name= name_sit.value;
    containersit[currentIndex].url=url.value;
    btn.innerHTML="Submit";
    localStorage.setItem('data',JSON.stringify(containersit))
    displiy()
    validateclear()
    clear()
    }
}

function toggleFavorite(icon, index) {
    if (icon.style.color === 'red') {
        icon.style.color = '';
        containersit[index].favorite = '';
    } else {
        icon.style.color = 'red'; 
        containersit[index].favorite = 'red';
    }
    
    localStorage.setItem('data', JSON.stringify(containersit));
}

searchBtn.addEventListener('click', function() {
    let searchValue = searchInput.value.toLowerCase();
    displayFiltered(searchValue);
});

function displayFiltered(searchValue) {
    let filteredData = containersit.filter(item => 
        item.name.toLowerCase().includes(searchValue) || 
        item.url.toLowerCase().includes(searchValue)
    );

    let data = '';
    for (let i = 0; i < filteredData.length; i++) {
        data += `
        <tr class="item">
            <td>${filteredData[i].name}</td>
            <td><a href="${filteredData[i].url}" class="btn btn-outline-primary">Visit</a></td>
            <td><button class="btn btn-outline-warning" onclick="setData(${i})">Update</button></td>
            <td><button class="btn btn-outline-danger" onclick="delet(${i})">Delete</button></td>
            <td>
                <i class="fa fa-heart" aria-hidden="true" style="color:${filteredData[i].favorite}" onclick="toggleFavorite(this, ${i})"></i>
            </td>
        </tr>
        `;
    }
    document.getElementById('table').innerHTML = data;
}

function displayFavorites() {
    let favoriteData = containersit.filter(item => item.favorite === 'red');

    let data = '';
    for (let i = 0; i < favoriteData.length; i++) {
        data += `
        <tr class="item">
            <td>${[i + 1]}</td>
            <td>${favoriteData[i].name}</td>
            <td><a href="${favoriteData[i].url}" class="btn btn-outline-primary">Visit</a></td>
            <td><button class="btn btn-outline-warning" onclick="setData(${i})">Update</button></td>
            <td><button class="btn btn-outline-danger" onclick="delet(${i})">Delete</button></td>
            <td>
                <i class="fa fa-heart" aria-hidden="true" style="color:${favoriteData[i].favorite}" onclick="toggleFavorite(this, ${i})"></i>
            </td>
        </tr>
        `;
    }
    document.getElementById('table').innerHTML = data;
}

function addfavorit() {
    if (FavoriteBtn.innerHTML === "Favorites") {
        displayFavorites();
        FavoriteBtn.innerHTML = "All";
    } else {
        displiy();
        FavoriteBtn.innerHTML = "Favorites"; 
    }
}
