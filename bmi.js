function calculateBMI() {
    const height = document.getElementById("height").value;
    const weight = document.getElementById("weight").value;
    if (height > 0 && weight > 0) {
        const bmi = (weight / ((height / 100) ** 2)).toFixed(2);
        document.getElementById("bmi-result").innerText = `Your BMI is ${bmi}`;
    } else {
        document.getElementById("bmi-result").innerText = "Please enter valid height and weight.";
    }
}

function calculateCalories() {
    const activityLevel = document.getElementById("activity").value;
    const goal = document.getElementById("goal").value;
    const calories = document.getElementById("calories").value;

    if (calories > 0) {
        let dailyCalories;
        if (goal === "weight_loss") {
            dailyCalories = calories * 0.8; // Example logic for weight loss
        } else if (goal === "muscle_gain") {
            dailyCalories = calories * 1.2; // Example logic for muscle gain
        } else {
            dailyCalories = calories;
        }
        document.getElementById("calorie-result").innerText = `Daily calories for your goal: ${dailyCalories.toFixed(2)}`;
        // Nutrient calculations can be added based on the daily calories
        const protein = (dailyCalories * 0.3 / 4).toFixed(2); // Example: 30% from protein
        const fats = (dailyCalories * 0.25 / 9).toFixed(2); // Example: 25% from fats
        const carbs = (dailyCalories * 0.45 / 4).toFixed(2); // Example: 45% from carbs
        document.getElementById("nutrient-result").innerText = `Protein: ${protein}g, Fats: ${fats}g, Carbs: ${carbs}g`;
    } else {
        document.getElementById("calorie-result").innerText = "Please enter valid calorie intake.";
    }
}
