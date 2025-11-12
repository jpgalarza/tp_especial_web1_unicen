document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.recipe-catalog');

  const renderRecipes = (recipes) => {
    let cards = '';

    recipes.forEach( recipe => {
      cards += `
        <article class="card">
          <figure>
            <img src=${recipe.imgUrl} alt="Imágen de ${recipe.title}">
          </figure>
          <h2>${recipe.title}</h2>
          <div>
            <div class="card-data">
              <p>
                <strong>Nivel ${recipe.level}</strong>
              </p>
              <p>
                <strong>${recipe.time} min.</strong>
              </p>
            </div>
            <a href="receta.html">Ver receta...</a>
          </div>
        </article>
      `;
    });

    grid.innerHTML = cards;
  } 

  renderRecipes(recipes)
})