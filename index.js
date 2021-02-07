const searchField = document.querySelector('.search-field');
const searchButton = document.querySelector('.search-btn');
const Name = document.querySelector('.dish-name');
const foodSection = document.querySelector('#food-section');
const foodInformation = document.querySelector('.information');
const backButton = document.querySelector('.back');
const notFound = document.querySelector('.not-found');

// searching for the food
searchButton.addEventListener('click', () => {
    const searchItem = searchField.value;
    getTheFood(searchItem);

})


// function for getting the food list
const getTheFood = (searchItem) => {

    const base = 'https://www.themealdb.com/api/json/v1/1/search.php'
    const query = `?s=${searchItem}`;

    fetch(base + query)
        .then(res => res.json())
        .then(data => {

            if (data.meals === null) {
                notFound.classList.remove('d-none');
            } 
            else {
                data.meals.forEach(dish => {

                    const dishName = dish.strMeal;
                    const dishImage = dish.strMealThumb;
                    const id = dish.idMeal;

                    let html = `
                    <div onclick="foodInfo(${id})" class="item my-3">
                        <div class="food-img">
                            <img src="${dishImage}" alt="" class="dish-img">
                        </div>
                        <h5 class="text-center my-2 py-2 dish-name">${dishName}</h5>
                    </div>
                `
                    const div = document.createElement('div');
                    div.innerHTML = html;
                    div.classList.add('col-md-3');
                    div.classList.add('food');
                    foodSection.appendChild(div);
                })
                
                notFound.classList.add('d-none');

            };

        });

}


// function for getting the information about the dish
const foodInfo = (id) => {

    const base = 'https://www.themealdb.com/api/json/v1/1/lookup.php'
    const query = `?i=${id}`;

    fetch(base + query)
        .then(res => res.json())
        .then(data => {

            foodSection.classList.add('d-none');
            foodInformation.classList.remove('d-none');
            foodInformation.innerHTML = "<div></div>";

            const dishName = data.meals[0].strMeal;
            const dishImage = data.meals[0].strMealThumb;
            const ingredient1 = data.meals[0].strIngredient1;
            const ingredient2 = data.meals[0].strIngredient2;
            const ingredient3 = data.meals[0].strIngredient3;
            const ingredient4 = data.meals[0].strIngredient4;
            const ingredient5 = data.meals[0].strIngredient5;

            let html = `
        <div class="dish-full-img">
            <img src="${dishImage}" alt="">
        </div>
        <h1 class="my-5">${dishName}</h1>
        <h3 class="my-5">Ingredients:</h3>
        <p class=" my-3"><span ><i class="fas fa-check-square tick"></i></span>${ingredient1}</p>
        <p class=" my-3"><span ><i class="fas fa-check-square tick"></i></span>${ingredient2}</p>
        <p class=" my-3"><span ><i class="fas fa-check-square tick"></i></span>${ingredient3}</p>
        <p class=" my-3"><span ><i class="fas fa-check-square tick"></i></span>${ingredient4}</p>
        <p class=" my-3"><span ><i class="fas fa-check-square tick"></i></span>${ingredient5}</p>
        
        <button onclick="takeMeHome()" class="btn btn-danger back">Take Me Back</button>
        `

            const div = document.createElement('div');
            div.innerHTML = html;
            div.classList.add('dish-information');
            foodInformation.appendChild(div);

        })
}


// function to go to the food list section
const takeMeHome = () => {
    foodSection.classList.remove('d-none');
    foodInformation.classList.add('d-none');
}