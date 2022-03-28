const main = document.getElementById('main');

const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionaires = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');


let data = [];
// Double money function




//format number as money 

 formatMoney = (number)=> {
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
 }




updateDom = (givenData = data) => {
  //clear main Div 
  main.innerHTML = '<h2> <strong>Person</strong> Wealth</h2>';

  givenData.forEach( item => { 
     const element = document.createElement('div');
     element.classList.add('person');
     element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
     main.appendChild(element);
  })
}
//add data 

addData = (obj)=>{
  data.push(obj);
  
  updateDom();

}
//fetch random user and add money 


doubleMoney = ()=>{
    data = data.map(user => {
        return {...user, money: user.money*2};
    })

    updateDom();
}

sortByRichest = () => {
   data.sort((a,b) => b.money - a.money);
   updateDom();
}

// filter only millionaires 

showByMillion = ()=> {
    data = data.filter( user => user.money > 1000000);
    updateDom();
}


//Calculate wealth by Reduce method.

calculateWealth = ()=>{
    const wealth = data.reduce((acc, user) => 
        (acc += user.money),0 ) ;
        console.log(wealth);
        const wealthElement = document.createElement('div');
        wealthElement.innerHTML = 
        `<h3>Total Wealth:<strong>${formatMoney(wealth)}</strong></h3>`;
        main.appendChild(wealthElement);
}




 async function getRandomUser()  {
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();

   const user = data.results[0];

   const newUser = {
       name: `${user.name.first} ${user.name.last}`,
       money: Math.floor(Math.random() * 1000000)
   }

    addData(newUser);


 };

//Event Listeners 

addUserBtn.addEventListener('click',getRandomUser);
doubleBtn.addEventListener('click',doubleMoney);
sortBtn.addEventListener('click',sortByRichest);
showMillionaires.addEventListener('click',showByMillion);
calculateWealthBtn.addEventListener('click',calculateWealth);




 getRandomUser();
 getRandomUser();
 getRandomUser();

