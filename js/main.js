let name_sit =document.getElementById('sit-name');
let url = document.getElementById('url');
let btn = document.getElementById('btn')
let alertUrl = document.getElementById('alert')
let containersit;
if(localStorage.getItem('data') != null){
    containersit =JSON.parse(localStorage.getItem('data'))
    displiy()
}else{
    containersit =[];
}

function add(){
 if(validate() == true){
    let list ={
        name:name_sit.value,
        url:url.value
    }
    containersit.push(list)
    console.log(containersit)
    localStorage.setItem('data',JSON.stringify(containersit))
    clear()
    displiy()
    validateclear()
  }
}

function clear(){
    name_sit.value =''
    url.value =''
}

function displiy(){
    let data =''
    for(let i =0; i<containersit.length; i++){
        data +=`
        <tr class ="item">
            <td>${containersit[i].name}</td>
             <td><a href="${containersit[i].url}" class="btn btn-outline-primary ">Visit</a></td>
             <td><button class=" btn btn-outline-danger" onclick="delet(${i})">Delete</button></td>
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
