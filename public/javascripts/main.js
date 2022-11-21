if(document.readyState !== "loading"){
    console.log("Document is ready");
    initializeCode();
} else {
    document.addEventListener("DOMContentLoaded", function(){
        console.log("Document ready after waiting!");
        initializeCode();
    })

}

function initializeCode() {
    console.log('Script loaded!')
    getRecipe();
    addRecipe();

function getRecipe() {
    let recipelist = document.getElementById('recipelist')
    fetch('http://localhost:3000/recipe/'+'Pizza')
    .then(response => response.json())
    .then(data => {
        var name = document.createElement('p');
        name.innerHTML = data.name;
        var ingredientsList = document.createElement('ul')
        var instructionsList = document.createElement('ul')
        ingredientsList.innerHTML = 'Ingredients:'
        instructionsList.innerHTML = 'Ingredients:'
        for (let index = 0; index < data.ingredients.length; index++) {
            var ingredient = document.createElement('li')
            ingredient.innerHTML = data.ingredients[index]
            ingredientsList.appendChild(ingredient)
        }

        for (let index = 0; index < data.instructions.length; index++) {
            var instruction = document.createElement('li')
            instruction.innerHTML = data.instructions[index]
            instructionsList.appendChild(instruction)
        }

        recipelist.appendChild(name)
        recipelist.appendChild(ingredientsList)
        recipelist.appendChild(instructionsList)

    })

}
    function addRecipe() {

        var nameText = document.getElementById('name-text')
        var addInstruction = document.getElementById('add-instruction')
        var addIngredient = document.getElementById('add-ingredient')

        var instructionsText = document.getElementById('instructions-text')
        var ingredientsText = document.getElementById('ingredients-text')

        var submitButton = document.getElementById('submit')

        let instructionList = [];
        let ingredientList = [];
        addInstruction.addEventListener('click', function() {
            let instruction = instructionsText.value;
            instructionList.push(instruction);
            console.log('Added instruction')
        })
        addIngredient.addEventListener('click', function() {
            let ingredient = ingredientsText.value;
            ingredientList.push(ingredient);
            console.log('Added ingredient')
        })

        submitButton.addEventListener('click', function() {
            let namevalue = nameText.value;
            let recipe = {
                name: namevalue,
                instructions: instructionList,
                ingredients: ingredientList
            }


            let image = document.getElementById('image-input');

            const formDataImage = new FormData();
            formDataImage.append('images',image.files[0]);
            for(let [name, value] of formDataImage) {
                console.log(`${name} = ${value}`); // key1 = value1, then key2 = value2
              }


            fetch('http://localhost:3000/recipe/', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
               },
            body: JSON.stringify(recipe)
            })
            .then(response => response.json())
            .then(data => {
            console.log(data)
            });

            fetch('http://localhost:3000/images', {
                method: 'POST',
                body: formDataImage
                })
                .then(response => response)
                .then(data => {
                console.log(data)
                });
        
            ingredientList = [];
            instructionList = [];
        })
    }


}
