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

const BASE_API_URL = "https://v2.exercisedb.dev/api/v1";

async function fetchData() {
  try {
    const response = await fetch(`${BASE_API_URL}/liveness`);
    const result = await response.text();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

//grab elements from dom with selectors
const workOutBtn = document.querySelector("[data-workout]");
const cardGrid = document.querySelector("[data-card-grid]");
const workOutTemplate = document.querySelector("[data-workout-template]");
const equipmentList = document.querySelector("[data-equipment-list]");

//add event listeners
workOutBtn.addEventListener("click", getExercise);

//Const arrays for data to be stored
const equipList = [];

//GET METHODS

/**
 * Here we will be getting a random body weight exercise if no equipment is checked on equipment drop down
 * @method getRandomExercise
 * @returns {JSON data for exercises according to checkboxes in equipList}
 */

async function getExercise() {
  const exerciseList = [];
  const exerciseURL = `${BASE_API_URL}/exercises/search?search=body+weight`;
  try {
    const response = await fetch(exerciseURL);
    if (!response.ok) {
      throw new Error(`HTTP error status ${response.status}`);
    }
    const exercise = await response.json();
    exerciseList.push(...exercise.data);
    const num = randomNum(exerciseList);
    console.log(exerciseList);
    fetchExercise(exerciseList, num);
  } catch (error) {
    console.log(`Error catching exercise list response: ${error.message}`);
  }
}

async function fetchExercise(data, num) {
  const exerciseID = String(data[num].exerciseId);
  const exerciseIdURL = `${BASE_API_URL}/exercises/${exerciseID}`;
  const exercise = []
  console.log(data[num].exerciseId);
  try {
    const response = await fetch(exerciseIdURL);
    const exerciseResp = await response.json();
    const exerciseData = exerciseResp.data
    renderExercise(exerciseData)
  } catch (error) {
    console.log(`Error catching exercise response: ${error.message}`);
  }
}

/**
 * @method getEquipmentList will pull the equipment list for the drop down menu
 * user will select what equipments and @method getRandomExercise will adjust to selection
 *
 */

async function getEquipData() {
  const equipmentURL = `${BASE_API_URL}/equipments`;
  try {
    const response = await fetch(equipmentURL);
    if (!response.ok) {
      throw new Error(`HTTP error status ${response.status}`);
    }
    const equipment = await response.json();
    equipList.push(...equipment.data);
    renderList(equipList);
  } catch (error) {
    console.log(`Error catching equipList response: ${error.message}`);
  }
}

//RENDER METHODS

/**
 * @method renderList()
 * @param {data} take equipList data and render to checkbox list on equipment
 */

function renderList(data) {
  console.log(data);
  equipmentList.innerHTML = `<input class="dropdown-item" type="checkbox" value="all" data-category="all">
                              <label>All Equipment</label>`;
  data.forEach((equipment) => {
    const li = document.createElement("li");
    const label = document.createElement("label");
    const input = document.createElement("input");
    input.setAttribute("data-category", `${equipment.name}`);
    label.textContent = equipment.name;
    input.className = `dropdown-item`;
    input.type = `checkbox`;
    input.value = equipment.name;
    input.name = equipment.name;
    li.append(input, label);
    equipmentList.appendChild(li);
  });
}

async function renderExercise(data) {
  cardGrid.innerHTML = "";

  console.log(data);
  //Step 1 clone card
  const card = workOutTemplate.content.cloneNode(true);

  //Step 2 populate card
  card.querySelector("[data-title]").textContent = data.name;

  // card.querySelector("[data-description]").textContent = data.description;
  card.querySelector("[data-image]").src = data.imageUrl;
  card.querySelector("[data-image]").alt = data.name;
  card.querySelector("[data-description]").textContent= data.instructions.join()
  
  cardGrid.appendChild(card);
}

// Other Methods

function randomNum(arr) {
  return Math.floor(Math.random() * arr.length) + 1;
}

// Initialize APP

function init() {
  getEquipData();
}

init();
