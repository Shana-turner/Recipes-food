const ingredient = document.querySelector("input");
const contenairRecipes = document.querySelector(".recipes");
const spanIngredient = document.querySelector("span");
const nameResult = document.querySelector(".resultname");
const modal = document.querySelector(".modal");
const nameRecipe = document.querySelector(".name-recipe");
const imageRecipe = document.querySelector(".image-recipe");
const listIngredient = document.querySelector(".list-ingredient");
const recette = document.querySelector(".explication-recipe");
const close = document.querySelector(".close");


ingredient.addEventListener("keyup", (event)=>{
    if(event.key === "Enter"){
       // console.log(event.target.value)
        searchRecipe();
        spanIngredient.innerHTML = ingredient.value.trim();
        event.target.value = "";
    }
});

const searchRecipe = ()=>{
    if(ingredient.value.trim()){
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${ingredient.value.trim()}`)
            .then(response => response.json())
            .then(data => {
                createDivRecipe(data.meals);
            })
            .catch(error => {
                console.error('Error fetching recipes:', error);
            });
    }
}

const createDivRecipe = (meals)=>{
    contenairRecipes.innerHTML = " ";
    if (meals) {
        nameResult.style.display ="block";
        meals.forEach(meal => {
            const recipeDiv = document.createElement('div');
            recipeDiv.className = 'recipe';
            recipeDiv.id = meal.idMeal;

            const img = document.createElement('img');
            img.src = meal.strMealThumb;
            img.alt = meal.strMeal;

            const title = document.createElement('h2');
            title.textContent = meal.strMeal;

            const pays = document.createElement('h3');
            pays.textContent = meal.strArea;

            const btn = document.createElement('button');
            btn.textContent = "More details";
            btn.className = "btn";

            recipeDiv.appendChild(img);
            recipeDiv.appendChild(btn);
            recipeDiv.appendChild(pays);
            recipeDiv.appendChild(title);
            contenairRecipes.appendChild(recipeDiv);

            let arrayIngredient = [];
            for(let i =0; i > arrayIngredient; i++){
                arrayIngredient.push(`strIngredient${i}`);
            }
            console.log(arrayIngredient);

            btn.addEventListener('click', ()=>{
                modal.style.display = "block";
                if(recipeDiv.id === meal.idMeal){
                    nameRecipe.textContent = meal.strMeal;
                    imageRecipe.src = meal.strMealThumb;
                    recette.textContent = meal.strInstructions;
                    for(let i= 1; i <=20; i++){
                        listIngredient.innerHTML += "<li>"+meal[`strMeasure${i}`]+" "+ meal[`strIngredient${i}`]+"</li>";
                    } 
                }
                close.addEventListener('click', ()=>{
                    modal.style.display = "none";
                    listIngredient.innerHTML = " ";
                })
                modal.addEventListener('click', ()=>{
                    modal.style.display = "none";
                    listIngredient.innerHTML = " ";
                })
            });
        });

    } else {
        contenairRecipes.innerHTML = '<p>Aucune recette trouvée.</p>';
    }
}




//`www.themealdb.com/api/json/v1/1/filter.php/images/media/meals/llcbn01574260722.jpg/preview?i=${search.value}`