import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import useGetUserID from "../hooks/useGetUserID";
import { useCookies } from "react-cookie";

const SavedRecipe = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [cookies, _] = useCookies("access_token");
  const userID = useGetUserID();
  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/recipe/getAllSavedRecipe/${userID}`,
          {
            headers: {
              Authorization: cookies.access_token,
            },
          }
        );

        setSavedRecipes(response.data.savedRecipes);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSavedRecipes();
  }, []);

  const handleShare = async (recipe) => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: recipe.title,
          text: recipe.instructions,
          url: window.location.href,
        });
      } else {
        // Fallback for browsers that do not support Web Share API
        console.log("Web Share API not supported");
        // Implement your custom sharing options here
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  const isRecipeSaved = (recipeID) =>
    Array.isArray(savedRecipes) && savedRecipes.includes(recipeID);

  return (
    <>
      {savedRecipes.map((recipe) => (
        <div
          key={recipe._id}
          className='mx-auto flex m-2 flex-col max-w-lg p-6 space-y-6 overflow-hidden rounded-lg shadow-md dark:bg-gray-900 dark:text-gray-100'
        >
          <div className='flex justify-between'>
            <div className='flex flex-col space-y-1'>
              <a
                rel='noopener noreferrer'
                href='#'
                className='text-base font-semibold'
              >
                Bonjour{recipe.name}
              </a>
              <span className='text-xs dark:text-gray-400'>
                4 hours ago {recipe.createdAt}
              </span>
            </div>
            <div className='space-x-2'>
              {isRecipeSaved(recipe._id) ? (
                <button
                  aria-label='Bookmark this post'
                  type='button'
                  className='p-2'
                  disabled={
                    Array.isArray(savedRecipes) && isRecipeSaved(recipe._id)
                  }
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-5 h-4 fill-current dark:text-violet-400'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z'
                    />
                  </svg>
                </button>
              ) : (
                //   <button
                //   aria-label='Bookmark this post'
                //   type='button'
                //   className='p-2'
                //   onClick={() => handleSaveRecipe(recipe._id)}
                // >
                //   <svg
                //     xmlns='http://www.w3.org/2000/svg'
                //     fill='none'
                //     viewBox='0 0 24 24'
                //     strokeWidth={1.5}
                //     stroke='currentColor'
                //     className='w-5 h-4  dark:text-violet-400'
                //   >
                //     <path
                //       strokeLinecap='round'
                //       strokeLinejoin='round'
                //       d='M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z'
                //     />
                //   </svg>
                // </button>
                <button disabled='disabled'></button>
              )}

              <button
                aria-label='Share this post'
                type='button'
                className='p-2 text-center'
                onClick={() => handleShare(recipe)}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 512 512'
                  className='w-4 h-4 fill-current dark:text-violet-400'
                >
                  <path d='M404,344a75.9,75.9,0,0,0-60.208,29.7L179.869,280.664a75.693,75.693,0,0,0,0-49.328L343.792,138.3a75.937,75.937,0,1,0-13.776-28.976L163.3,203.946a76,76,0,1,0,0,104.108l166.717,94.623A75.991,75.991,0,1,0,404,344Zm0-296a44,44,0,1,1-44,44A44.049,44.049,0,0,1,404,48ZM108,300a44,44,0,1,1,44-44A44.049,44.049,0,0,1,108,300ZM404,464a44,44,0,1,1,44-44A44.049,44.049,0,0,1,404,464Z'></path>
                </svg>
              </button>
            </div>
          </div>
          <div>
            <img
              src={recipe.imageUrl}
              alt='recipe name'
              className='object-cover w-full mb-4 h-56 sm:h-76 dark:bg-gray-500'
            />
            <h2 className='mb-1 text-xl font-semibold'>{recipe.title}</h2>
            <h6 className='mb-1 text-sm font-normal'>
              Cooking Time : {recipe.cookingTime} (mins)
            </h6>
            <p className='text-sm dark:text-gray-400'>{recipe.instructions}</p>
          </div>
        </div>
      ))}{" "}
    </>
  );
};

export default SavedRecipe;
