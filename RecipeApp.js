let userInput = document.querySelector('.container .search-box input');
let resultBox = document.querySelector('.container .result-box');
let Instruction = document.querySelector('.container .recipe-box .Instructions');
let recipeBox = document.querySelector('.container .recipe-box');
let viewRecipeBtn = document.querySelector('.view-recipe-btn');

 let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

userInput.addEventListener('keyup',(e)=>{
  let dishName = userInput.value;
if(dishName != ''){
  if(e.key == "Enter"){
      getFood(dishName);    
   }
}
})

let getFood =(dishName)=>{
document.querySelector('.container .displaying-message').innerHTML = 'Please wait it took some time.....';
 fetch(url + dishName).then((res) => res.json()).then((data)=>{
document.querySelector('.container .displaying-message').style.display = 'none';
document.querySelector('.container').style.paddingBottom = "20px";
resultBox.style.display = 'block';         
let myMeal = data.meals[0];
console.log(myMeal)
let count = 1;
let ingredients = [];

for(let i in myMeal){
 let ingredient = '';
 let measure = '';
 if(i.startsWith('strIngredient') && myMeal[i]){
   ingredient = myMeal[i];
   measure = myMeal[`strMeasure` + count];
   count += 1;
   ingredients.push(`${measure} ${ingredient}`);
 }
}
//console.log(myMeal.strMealThumb)
//console.log(data)
resultBox.innerHTML = `<div class="details">
 <div class="meal-image">
    <img src="${myMeal.strMealThumb}" alt="Loading....">
 </div> 
<div class="meal-details">
 <p class="meal-name">${myMeal.strMeal}</p>  
 <p class="meal-area">${myMeal.strArea}</p>    
</div>
<div class="ingredients-box">
        
</div>
</div>

<button class="view-recipe-btn" onclick="recipeBoxCall()">View Recipe</button>`;

Instruction.innerHTML = myMeal.strInstructions;
let ingredientsBox = document.querySelector('.container .ingredients-box');
let ul = document.createElement('ul');

ingredients.forEach((i)=>{
let child = document.createElement('li');
child.innerHTML = i;
ul.appendChild(child);
ingredientsBox.appendChild(ul);
})
 }) 
}


let recipeBoxCall =()=>{
 recipeBox.style.left = '0%';   
}

let recipeBoxClose =()=>{
 recipeBox.style.left = '-100%';   
}
