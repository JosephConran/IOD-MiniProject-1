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

//URLs

const BASE_API_URL = "https://v2.exercisedb.dev/api/v1";
let equipURL;

//grab elements from dom with selectors
const workOutBtn = document.querySelector("[data-workout]");
const cardGrid = document.querySelector("[data-card-grid]");
const workOutTemplate = document.querySelector("[data-workout-template]");
const equipmentList = document.querySelector("[data-equipment-list]");
const nextExerciseBtn = document.getElementById("next-exercise");
const resetBtn = document.getElementById("reset-btn");
const progCard = document.querySelector("[data-progress-card]")
const wrkCard = document.querySelector("[data-workout]")
//add event listeners


// workOutBtn.addEventListener("click", getExercise);

nextExerciseBtn.addEventListener("click", getExercise);

// turn buttons on and off for reset and next exercise 

workOutBtn.addEventListener("click", () => {
  getExercise()
  nextExerciseBtn.classList.remove("d-none");
  resetBtn.classList.remove("d-none");
});






resetBtn.addEventListener("click", () => {
  cardGrid.innerHTML = ""; // clear cards
  cardGrid.append(wrkCard,progCard)
  
  nextExerciseBtn.classList.add("d-none");
  resetBtn.classList.add("d-none");
});

//Const arrays for data to be stored
const allEquipList = [];
const checkedEquipList = [];

// Initialize APP

function init() {
  getEquipData();
}
init();

//GET METHODS

/**
 * Here we will be getting a random body weight exercise if no equipment is checked on equipment drop down
 * @method getRandomExercise
 * @returns {JSON data for exercises according to checkboxes in equipList}
 * @example https://v2.exercisedb.dev/api/v1/exercises?equipments=Barbell%2CDumbbell
 */

async function getExercise() {
  const exerciseURL = () => {
    const base = `${BASE_API_URL}/exercises/search?search=body+weight`;
    const equipSearch = `${BASE_API_URL}${equipURL}`;
    // If nothing checked use default search
    if (checkedEquipList.length === 0) {
      return base;
    } else {
      return equipSearch;
    }
  };
  console.log(exerciseURL());
  const exerciseList = [];

  try {
    const response = await fetch(exerciseURL());
    if (!response.ok) {
      throw new Error(`HTTP error status ${response.status}`);
    }
    const exercise = await response.json();
    exerciseList.push(...exercise.data);
    const num = randomNum(exerciseList);
    console.log(exerciseList);
    fetchExerciseByID(exerciseList, num);
  } catch (error) {
    console.log(`Error catching exercise list response: ${error.message}`);
  }
}

async function fetchExerciseByID(data, num) {
  const exerciseID = String(data[num].exerciseId);
  const exerciseIdURL = `${BASE_API_URL}/exercises/${exerciseID}`;
  console.log(data[num].exerciseId);
  try {
    const response = await fetch(exerciseIdURL);
    const exerciseResp = await response.json();
    const exerciseData = exerciseResp.data;
    renderExercise(exerciseData);
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
    allEquipList.push(...equipment.data);
    renderList(allEquipList);
  } catch (error) {
    console.log(`Error catching allEquipList response: ${error.message}`);
  }
}

//RENDER METHODS

/**
 * @method renderList()
 * @param {data} take equipList data and render to checkbox list on equipment
 */

function renderList(data) {
   const li = document.createElement("li");
    const label = document.createElement("label");
    const input = document.createElement("input");
    input.setAttribute("data-category", `ALL`);
    label.htmlFor = `AlL`
    label.className = `dropdown-item btn btn-outline-primary`
    label.textContent = `ALL`
    input.className = `dropdown-item btn-check`;
    input.type = `checkbox`;
    input.value = `ALL`
    input.id = `ALL`
    li.append(input, label);
    equipmentList.appendChild(li);
  
  data.forEach((equipment) => {
    const li = document.createElement("li");
    const label = document.createElement("label");
    const input = document.createElement("input");
    input.setAttribute("data-category", `${equipment.name}`);
    label.htmlFor = equipment.name
    label.className = `dropdown-item btn btn-outline-primary`
    label.textContent = equipment.name;
    input.className = `dropdown-item btn-check`;
    input.type = `checkbox`;
    input.value = equipment.name;
    input.id = equipment.name;
    li.append(input, label);
    equipmentList.append(li)
  });
  const equipChecks = document.querySelectorAll("[data-category]");
  equipChecks.forEach((box) => {
    box.addEventListener("change", updateEquipList);
  });
}

async function renderExercise(data) {
  cardGrid.innerHTML = "";
  // filerEquipment();

  console.log(data);
  //Step 1 clone card
  const card = workOutTemplate.content.cloneNode(true);

  //Step 2 populate card
  card.querySelector("[data-title]").textContent = data.name;

  // card.querySelector("[data-description]").textContent = data.description;
  card.querySelector("[data-image]").src = data.imageUrl;
  card.querySelector("[data-image]").alt = data.name;
  card.querySelector("[data-description]").textContent =
    data.instructions.join();
  // create wrapper for reactive design
  const wrapper = document.createElement("div");
  wrapper.className = "col-12";
  wrapper.appendChild(card);
  cardGrid.appendChild(wrapper);
}

// Other Methods

function randomNum(arr) {
  return Math.floor(Math.random() * arr.length);
}

//Get Exercises based off Equipment
/**
 * @example https://v2.exercisedb.dev/api/v1/exercises?equipments=Barbell%2CDumbbell
 */

function updateEquipList(event) {
  const value = event.target.value;
  const checkedEquip = event.target.checked;
  if (checkedEquip) {
    if (!checkedEquipList.includes(value)) {
      checkedEquipList.push(value);
    }
  } else {
    const index = checkedEquipList.indexOf(value);
    if (index !== -1) {
      checkedEquipList.splice(index, 1);
    }
  }

  const encodedEquipments = checkedEquipList
    .map((e) => encodeURIComponent(e).replace(/%20/g, "+"))
    .join("%2C"); // comma between items

  equipURL = `/exercises?equipments=${encodedEquipments}`;
  console.log(equipURL);
  return equipURL;
}
