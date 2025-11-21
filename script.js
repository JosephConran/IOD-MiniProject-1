/**
 * the workout button will bring out a div containing a picture of the muscle group, the muscle group, the exercise, reps, or time, 
 * the progress button will bring up user data exercises they have done time and reps, space to input weight or height and maybe spaces to keep diet,
 * the sign up button will create a sign up screen to allow the consumer to begin saving data.
 * 
 * @event (workoutbtn) on click brings up work out from .json 
 * we need to create a template to add to the html 
 * template will take space of current cards 
 * 
 * API: https://v2.exercisedb.dev/api/v1/
 * 
 * 
 * @linkcode ?equipments=BODY+WEIGHT
 */

//Fetch all data for testing 

const URL = 'https://v2.exercisedb.dev/api/v1/exercises'

async function fetchData(){
    try {
        const response = await fetch(URL)
        const result = await response.text();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

//grab elements from dom with selectors
const workOutBtn = document.querySelector('[data-workout]')
const cardGrid = document.querySelector('[data-card-grid]')
const workOutTmplt = document.querySelector('[data-workout-template]')

//add event listeners
workOutBtn.addEventListener('click',getRandomExercise)



/**
 * Here we will be getting a random body weight exercise if no equipment is checked on equipment drop down
 * @method getRandomExercise
 * @param {URL${randomNum}}
 * @returns {JSON data for exercise}
 */

function getRandomExercise(){
    



}



function getEquipmentList(){
    
}









function init(){

fetchData()

}

init()

