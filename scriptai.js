const FOOD_DATABASE = {
    'Chicken Breast': { calories: 165, protein: 31, carbs: 0, fat: 3.6 },
    'Broccoli': { calories: 55, protein: 3.7, carbs: 11, fat: 0.6 },
    'Quinoa': { calories: 120, protein: 4.1, carbs: 21.3, fat: 1.9 },
    'Salmon': { calories: 208, protein: 20, carbs: 0, fat: 13 },
    'Almonds': { calories: 160, protein: 6, carbs: 6, fat: 14 },
    'Sweet Potato': { calories: 103, protein: 2.3, carbs: 24, fat: 0.2 },
    'Spinach': { calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4 }
};

let userProfile = {};

function calculateDailyCalories(profile) {
    let calorieModifier = profile.goal === 'muscle gain' ? 1.1 : profile.goal === 'weight loss' ? 0.85 : 1.0;
    let activityMultiplier = profile.activityLevel === 'sedentary' ? 1.2 : profile.activityLevel === 'lightly active' ? 1.375 : profile.activityLevel === 'active' ? 1.55 : 1.725;
    return Math.round((10 * profile.weight + 6.25 * profile.height - 5 * profile.age + 5) * activityMultiplier * calorieModifier);
}

function recommendMeals(profile, dailyCalories) {
    let mealPlan = [];
    let totalCalories = 0;

    while (totalCalories < dailyCalories) {
        let foodItem = Object.keys(FOOD_DATABASE)[Math.floor(Math.random() * Object.keys(FOOD_DATABASE).length)];
        let nutrition = FOOD_DATABASE[foodItem];

        if (profile.dietaryPreferences === 'vegetarian' && foodItem.includes('Chicken')) continue;
        if (profile.allergies && foodItem.toLowerCase().includes(profile.allergies.toLowerCase())) continue;

        mealPlan.push(foodItem);
        totalCalories += nutrition.calories;
    }

    return mealPlan;
}

function generatePlan() {
    userProfile = {
        name: document.getElementById('name').value,
        age: parseInt(document.getElementById('age').value),
        weight: parseFloat(document.getElementById('weight').value),
        height: parseFloat(document.getElementById('height').value),
        activityLevel: document.getElementById('activityLevel').value,
        goal: document.getElementById('goal').value,
        dietaryPreferences: document.getElementById('dietaryPreferences').value,
        allergies: document.getElementById('allergies').value
    };

    userProfile.dailyCalories = calculateDailyCalories(userProfile);
    userProfile.mealPlan = recommendMeals(userProfile, userProfile.dailyCalories);

    // Display the dashboard
    document.getElementById('form-container').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';

    document.getElementById('userName').innerText = userProfile.name;
    document.getElementById('userCalories').innerText = userProfile.dailyCalories;

    const mealList = document.getElementById('mealPlan');
    mealList.innerHTML = '';
    userProfile.mealPlan.forEach(meal => {
        let listItem = document.createElement('li');
        listItem.textContent = meal;
        mealList.appendChild(listItem);
    });
}

function showShoppingList() {
    const shoppingItems = {};
    userProfile.mealPlan.forEach(meal => {
        if (shoppingItems[meal]) {
            shoppingItems[meal]++;
        } else {
            shoppingItems[meal] = 1;
        }
    });

    const shoppingList = document.getElementById('shoppingItems');
    shoppingList.innerHTML = '';
    for (let [item, quantity] of Object.entries(shoppingItems)) {
        let listItem = document.createElement('li');
        listItem.textContent = `${item} - ${quantity} servings`;
        shoppingList.appendChild(listItem);
    }

    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('shoppingList').style.display = 'block';
}

function showDashboard() {
    document.getElementById('shoppingList').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
}

function resetForm() {
    document.getElementById('form-container').style.display = 'block';
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('shoppingList').style.display = 'none';
}
