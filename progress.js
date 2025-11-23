//Create const for DOM data

const usernameInput = document.querySelector("[data-username]");
const weightInput = document.querySelector("[data-weight]");
const feetInput = document.querySelector("[data-feet]");
const inchesInput = document.querySelector("[data-inches]");
const workoutText = document.getElementById("workoutText");

const createLogBtn = document.getElementById("createLogBtn");
const cardGrid = document.querySelector("[data-card-grid]");
const template = document.querySelector("[data-progress-template]");

//add event listener 
createLogBtn.addEventListener('click', createLog)

//Calculate BMI

function calculateBMI(weight, feet, inches) {
  const totalInches = feet * 12 + inches;
  const bmi = (weight / (totalInches * totalInches)) * 703;
  return bmi.toFixed(1);
}

function createLog(){
  const username = usernameInput.value || 'Anonymous';
  const weight = Number(weightInput.value);
  const feet = Number(feetInput.value);
  const inches = Number(inchesInput.value);
  const exercises = workoutText.value;

  const bmi = calculateBMI(weight, feet, inches);

  // Get today's date
  const today = new Date();
  const dateStr = today.toLocaleDateString();

  // Clone template
  const clone = template.content.cloneNode(true);
  clone.querySelector('[data-date]').textContent = dateStr;
  clone.querySelector('[data-username]').textContent = username;
  clone.querySelector('[data-exercise-info]').textContent = exercises;
  clone.querySelector('.card-link').textContent = `BMI: ${bmi}`;

  // Append to grid
  cardGrid.appendChild(clone);
}
