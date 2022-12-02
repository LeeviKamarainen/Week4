
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
    addRecipe();
    addCategories();
    let searchField = document.getElementById('search');
    searchField.addEventListener("keyup", function(event) {
        if (event.key === 'Enter') {
            let searchText = searchField.value;
            getRecipe(searchText)
        }
    });

    



function addCategories() {
    let dietCategories = document.getElementById('dietcategories');
    fetch('http://localhost:3000/diets/')
    .then(response => response.json())
    .then(data => { 
        for (let index = 0; index < data.length; index++) {
            
            var label = document.createElement('label')
            
            var span = document.createElement('span')
            span.innerHTML = data[index].name;

            var iteminput = document.createElement("input");
            iteminput.type = 'checkbox';
            iteminput.value = data[index].name;
            iteminput.id = data[index]._id;

            label.appendChild(iteminput);
            label.appendChild(span)

            dietCategories.appendChild(label);
        }
    })



}

function getRecipe(name) {
    let recipelist = document.getElementById('recipelist')
    recipelist.innerHTML = '';
    recipelist.className = 'collection'
    fetch('http://localhost:3000/recipe/'+name)
    .then(response => response.json())
    .then(data => {
        var name = document.createElement('p');
        name.innerHTML = '<h4>'+data.name+'</h4>';
        name.className = 'collection-item'
        var ingredientsList = document.createElement('ul')
        ingredientsList.className = 'collection-item'
        var instructionsList = document.createElement('ul')
        instructionsList.className = 'collection-item'
        ingredientsList.innerHTML = '<h4>Ingredients:</h4>'
        instructionsList.innerHTML = '<h4>Instructions:</h4>'
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
        imageIDs = data.images;
        console.log(imageIDs)
        fetch('http://localhost:3000/images/'+imageIDs, {
            headers: {
                'Content-type': 'image/jpeg',
                'Content-Disposition': 'inline'
            },
        })
        .then(response2 => response2.json())
        .then(data2 => {
            let imagediv = document.getElementById('images');
            console.log(JSON.stringify(data2[0])+'ja tämä')
            for (let index = 0; index < data2.length; index++) {
                var img = document.createElement('img');
                img.src = 'data:image/png;base64,'+data2[index];
                imagediv.appendChild(img);
                
            }

        })
    })

}
    async function addRecipe() {

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

            let dietList = [];
            
            let dietCategories = document.getElementById('dietcategories');
            dietEntries = dietCategories.getElementsByTagName('label')
            console.log(dietEntries)
            for (let index = 0; index < dietEntries.length; index++) {
                
                if(dietEntries[index].children[0].checked == true) {
                    console.log(dietEntries[index].children[0].id)
                    dietList.push(dietEntries[index].children[0].id)
                }
                
            }

            let namevalue = nameText.value;
            let imageID = [];

            let image = document.getElementById('image-input');
            const formDataImage = new FormData();
            formDataImage.append('images',image.files[0]);
            let recipe = {
                name: namevalue,
                instructions: instructionList,
                ingredients: ingredientList,
                categories: dietList,
                images: imageID
            }

            fetch('http://localhost:3000/images', {
                method: 'POST',
                data: formDataImage,
                body: formDataImage,
                })
                .then(response => response.json())
                .then(data => {
                imageID.push(data.id);
                console.log(recipe)})
                .then(data => {
                fetch('http://localhost:3000/recipe/', {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(recipe)
                    })
                    .then(response2 => response2.json())
                    .then(data2 => {
                    console.log(data2)
                });
        })
        
            ingredientList = [];
            instructionList = [];
        })
    }


}