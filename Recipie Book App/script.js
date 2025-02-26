// Retrieve recipes from LocalStorage
let recipes = JSON.parse(localStorage.getItem("recipes") || "[]");

const recipeList = document.getElementById("recipe-list");
const searchInput = document.getElementById("search");

// Display recipes on load
document.addEventListener("DOMContentLoaded", renderRecipes);

function renderRecipes() {
    recipeList.innerHTML = "";
    recipes.forEach((recipe) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <strong>${recipe.name}</strong>
            <button onclick="editRecipe('${recipe.id}')">✏️</button>
            <button onclick="deleteRecipe('${recipe.id}')">❌</button>
        `;
        recipeList.appendChild(li);
    });
}

function openRecipeModal(id = "") {
    const modal = document.getElementById("recipe-modal");
    modal.style.display = "flex";

    const recipeId = document.getElementById("recipe-id");
    const recipeName = document.getElementById("recipe-name");
    const recipeIngredients = document.getElementById("recipe-ingredients");
    const recipeInstructions = document.getElementById("recipe-instructions");

    if (id) {
        const recipe = recipes.find((r) => r.id === id);
        if (recipe) {
            recipeId.value = recipe.id;
            recipeName.value = recipe.name;
            recipeIngredients.value = recipe.ingredients;
            recipeInstructions.value = recipe.instructions;
        }
    } else {
        recipeId.value = "";
        recipeName.value = "";
        recipeIngredients.value = "";
        recipeInstructions.value = "";
    }
}

function closeRecipeModal() {
    const modal = document.getElementById("recipe-modal");
    modal.style.display = "none";
}

function saveRecipe() {
    const recipeId = document.getElementById("recipe-id").value;
    const recipeName = document.getElementById("recipe-name").value;
    const recipeIngredients = document.getElementById("recipe-ingredients").value;
    const recipeInstructions = document.getElementById("recipe-instructions").value;

    if (!recipeName || !recipeIngredients || !recipeInstructions) {
        alert("Please fill in all fields!");
        return;
    }

    if (recipeId) {
        const index = recipes.findIndex((r) => r.id === recipeId);
        recipes[index] = { id: recipeId, name: recipeName, ingredients: recipeIngredients, instructions: recipeInstructions };
    } else {
        const newRecipe = {
            id: Date.now().toString(),
            name: recipeName,
            ingredients: recipeIngredients,
            instructions: recipeInstructions
        };
        recipes.push(newRecipe);
    }

    localStorage.setItem("recipes", JSON.stringify(recipes));
    closeRecipeModal();
    renderRecipes();
}

function deleteRecipe(id) {
    recipes = recipes.filter((r) => r.id !== id);
    localStorage.setItem("recipes", JSON.stringify(recipes));
    renderRecipes();
}

searchInput.addEventListener("input", function () {
    const searchValue = searchInput.value.toLowerCase();
    const filteredRecipes = recipes.filter((r) =>
        r.ingredients.toLowerCase().includes(searchValue)
    );

    recipeList.innerHTML = "";
    filteredRecipes.forEach((recipe) => {
        const li = document.createElement("li");
        li.innerHTML = `<strong>${recipe.name}</strong>`;
        recipeList.appendChild(li);
    });
});
