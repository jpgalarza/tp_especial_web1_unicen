let recipes = [
    {
      title: 'Costillar al asador',
      level: 'Alto',
      time: 50,
      imgUrl: 'file:///C:/Users/jpgal/Documents/GitHub/tp_especial_web1_unicen/img/asado_640_480.jpg',

    },
    {
      title: 'Milanesa Napolitana',
      level: 'Medio',
      time: 40,
      imgUrl: 'file:///C:/Users/jpgal/Documents/GitHub/tp_especial_web1_unicen/img/mila_napo_640_480.jpg',

    }
  ] ;

   const recipeStorage = JSON.parse(localStorage.getItem('recipes'));

   if(recipeStorage && recipeStorage.length > 0) {
    recipes = recipeStorage; 
   }



