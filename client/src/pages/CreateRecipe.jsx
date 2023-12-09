import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import useGetUserID from "../hooks/useGetUserID";
import { useCookies } from "react-cookie";
const CreateRecipe = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [cookies, _] = useCookies("access_token");
  const userID = useGetUserID();

  const [recipe, setRecipe] = useState({
    title: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    recipeOwner: userID,
  });

  const handleChange = (ev) => {
    const { name, value } = ev.target;
    setRecipe({ ...recipe, [name]: value });
  };
  const handleIngredientChange = (ev, id) => {
    const { value } = ev.target;
    const ingredients = recipe.ingredients;
    ingredients[id] = value;
    setRecipe({ ...recipe, ingredients });
  };
  const addIngredients = (e) => {
    e.preventDefault();
    console.log("come here");
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(recipe);
    await axios
      .post("http://localhost:8000/recipe/create", recipe, {
        headers: {
          Authorization: cookies.access_token,
        },
      })
      .then((response) => {
        enqueueSnackbar("Recipe created Successfully", {
          variant: "success",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });
        console.log(response.data);

        navigate("/");
      })
      .catch((err) => {
        enqueueSnackbar("Recipe not created", {
          variant: "error",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });
        console.log(err);
      });
  };

  return (
    <section className='bg-white dark:bg-gray-900 '>
      <div className='container flex items-center justify-center  min-h-screen px-6 mx-auto'>
        <form className='w-full max-w-md' onSubmit={onSubmit}>
          <div className='relative flex justify-center m-3 text-white font-bold text-2xl items-center'>
            <h1>Create Your Juicy Recipe</h1>
          </div>
          <div className='relative flex items-center mt-4'>
            <input
              onChange={handleChange}
              name='title'
              type='text'
              className='block w-full py-3 text-gray-700 bg-white border rounded-lg px-6 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40'
              placeholder='Recipe Title'
            />
          </div>
          {recipe.ingredients.map((ingredient, id) => (
            <input
              key={id}
              value={ingredient}
              name='ingredients'
              type='text'
              className='block w-full py-3 mt-4 text-gray-700 bg-white border rounded-lg px-6 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40'
              placeholder='Ingredients'
              onChange={(e) => handleIngredientChange(e, id)}
            />
          ))}
          <div className='relative flex  justify-center items-center mt-4 bg-slate-500'>
            <button onClick={addIngredients} type='button'>
              Press to Add Ingredients
            </button>
          </div>
          <div className='relative flex items-center mt-4'>
            <textarea
              name='instructions'
              rows={4}
              type='text'
              className='block w-full py-3 text-gray-700 bg-white border rounded-lg px-6 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40'
              placeholder='instructions'
              onChange={handleChange}
            />
          </div>
          <div className='relative flex items-center mt-4'>
            <input
              name='imageUrl'
              type='text'
              className='block w-full py-3 text-gray-700 bg-white border rounded-lg px-6 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40'
              placeholder='ImageURL'
              onChange={handleChange}
            />
          </div>
          <div className='relative flex items-center mt-4'>
            <input
              name='cookingTime'
              type='text'
              className='block w-full py-3 text-gray-700 bg-white border rounded-lg px-6 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40'
              placeholder='Cooking Time (minutes)'
              onChange={handleChange}
            />
          </div>

          <div className='mt-4'>
            <button
              type='submit'
              className='w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50'
            >
              Create Recipe
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CreateRecipe;
