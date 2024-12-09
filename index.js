document.addEventListener("DOMContentLoaded", () => {
  // Create a reusable workout plan
  const upperBodyWorkout = [
    {
      name: "Resistance Cycling",
      sets: 1,
      reps: "10 mins",
      notes: "Low resistance, focus on form",
      gif: "/assets/gifs/stationary-bike.gif",
    },
    {
      name: "Backward Incline Walk",
      sets: 1,
      reps: "10 mins",
      notes: "Treadmill: 10-15% incline, 2-3 mph backward",
      gif: "/assets/gifs/treadmill-walk.gif",
    },
    {
      name: "Pull-ups",
      sets: 4,
      reps: "6-10",
      notes: "Use assistance if needed",
      gif: "/assets/gifs/pull-up.gif",
    },
    {
      name: "Bench Press",
      sets: 4,
      reps: "8-12",
      notes: "Machine or barbell",
      gif: "/assets/gifs/bench-press.gif",
    },
    {
      name: "Rows",
      sets: 4,
      reps: "8-12",
      notes: "Machine or barbell",
      gif: "/assets/gifs/barbell-row.gif",
    },
    {
      name: "Shoulder Press",
      sets: 4,
      reps: "8-12",
      notes: "Machine or dumbbells",
      gif: "/assets/gifs/shoulder-press.gif",
    },
    {
      name: "Bicep Curls",
      sets: 3,
      reps: "10-15",
      notes: "Choose variation",
      gif: "/assets/gifs/bicep-curl.gif",
    },
    {
      name: "Tricep Dips",
      sets: 3,
      reps: "10-15",
      notes: "Machine or bench",
      gif: "/assets/gifs/tricep-dip.gif",
    },
    {
      name: "Plank",
      sets: 3,
      reps: "30-60 sec",
      notes: "",
      gif: "/assets/gifs/plank.gif",
    },
    {
      name: "Russian Twists",
      sets: 3,
      reps: "20",
      notes: "With or without weight",
      gif: "/assets/gifs/russian-twist.gif",
    },
  ];

  const alternateUpperBodyWorkout = [
    {
      name: "Resistance Cycling",
      sets: 1,
      reps: "10 mins",
      notes: "Low resistance, focus on form",
      gif: "/assets/gifs/stationary-bike.gif",
    },
    {
      name: "Backward Incline Walk",
      sets: 1,
      reps: "10 mins",
      notes: "Treadmill: 10-15% incline, 2-3 mph backward",
      gif: "/assets/gifs/treadmill-walk.gif",
    },
    {
      name: "Incline Bench Press",
      sets: 4,
      reps: "8-12",
      notes: "Machine or dumbbell",
      gif: "/assets/gifs/incline-bench-press.gif",
    },
    {
      name: "Lat Pulldowns",
      sets: 4,
      reps: "8-12",
      notes: "Wide grip for back width",
      gif: "/assets/gifs/lat-pulldown.gif",
    },
    {
      name: "Lateral Raises",
      sets: 3,
      reps: "12-15",
      notes: "Light weight, focus on form",
      gif: "/assets/gifs/lateral-raise.gif",
    },
    {
      name: "Face Pulls",
      sets: 3,
      reps: "12-15",
      notes: "For rear delts and rotator health",
      gif: "/assets/gifs/face-pull.gif",
    },
    {
      name: "Hammer Curls",
      sets: 3,
      reps: "10-15",
      notes: "Works brachialis and forearms",
      gif: "/assets/gifs/hammer-curl.gif",
    },
    {
      name: "Overhead Tricep Extensions",
      sets: 3,
      reps: "10-15",
      notes: "Cable or dumbbell",
      gif: "/assets/gifs/overhead-tricep-extension.gif",
    },
    {
      name: "Side Planks",
      sets: 3,
      reps: "30 sec each",
      notes: "Core stability",
      gif: "/assets/gifs/side-plank.gif",
    },
  ];

  const workoutData = {
    Monday: upperBodyWorkout,
    Tuesday: alternateUpperBodyWorkout,
    Wednesday: "Rest Day",
    Thursday: upperBodyWorkout,
    Friday: alternateUpperBodyWorkout,
    Saturday: upperBodyWorkout,
    Sunday: "Rest Day",
  };

  const app = document.getElementById("app");

  // Styles
  const styles = `
        <style>
            body {
                font-family: 'Roboto', sans-serif;
                margin: 0;
                padding: 20px;
                padding-top: 50px;
                background-color: #f5f5f5;
            }
            .tabs {
                display: flex;
                gap: 10px;
                margin-bottom: 20px;
                flex-wrap: wrap;
            }
            .tab {
                padding: 10px 20px;
                background-color: #e0e0e0;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                transition: background-color 0.3s;
            }
            .tab.active {
                background-color: #2196f3;
                color: white;
            }
            .workout-list {
                background-color: white;
                border-radius: 10px;
                padding: 20px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            .exercise {
                display: flex;
                gap: 20px;
                padding: 15px;
                border-bottom: 1px solid #eee;
                align-items: start;
            }
            .exercise:last-child {
                border-bottom: none;
            }
            .exercise-name {
                font-weight: 500;
            }
            .notes {
                color: #666;
                font-size: 0.9em;
            }
            .checkbox {
                width: 20px;
                height: 20px;
                cursor: pointer;
            }
            .done-button {
                display: block;
                width: 100%;
                padding: 15px;
                margin-top: 20px;
                background-color: #4CAF50;
                color: white;
                border: none;
                border-radius: 5px;
                font-size: 16px;
                cursor: pointer;
                transition: background-color 0.3s;
            }
            .done-button:disabled {
                background-color: #cccccc;
                cursor: not-allowed;
            }
            .exercise.completed {
                background-color: #f8fff8;
            }
            .exercise-content {
                display: flex;
                flex: 1;
                gap: 20px;
                justify-content: space-between;
                align-items: center;
            }
            .exercise-info {
                flex: 1;
            }
            .exercise-gif {
                width: 200px;
                height: 200px;
                overflow: hidden;
                border-radius: 8px;
                flex-shrink: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                background: #f0f0f0;
            }
            .loading {
                animation: pulse 1.5s infinite;
            }
            @keyframes pulse {
                0% { opacity: 0.6; }
                50% { opacity: 1; }
                100% { opacity: 0.6; }
            }
            .exercise-gif img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
            @media (max-width: 768px) {
                .exercise-content {
                    flex-direction: column;
                }
                .exercise-gif {
                    width: 100%;
                    height: 250px;
                }
            }
            .api-toggle {
                position: fixed;
                top: 10px;
                right: 20px;
                display: flex;
                align-items: center;
                gap: 8px;
                background: white;
                padding: 8px 12px;
                border-radius: 5px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                z-index: 1000;
            }
            .toggle-switch {
                position: relative;
                display: inline-block;
                width: 40px;
                height: 20px;
            }
            .toggle-switch input {
                opacity: 0;
                width: 0;
                height: 0;
            }
            .toggle-slider {
                position: absolute;
                cursor: pointer;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: #ccc;
                transition: .4s;
                border-radius: 20px;
            }
            .toggle-slider:before {
                position: absolute;
                content: "";
                height: 16px;
                width: 16px;
                left: 2px;
                bottom: 2px;
                background-color: white;
                transition: .4s;
                border-radius: 50%;
            }
            .toggle-switch input:checked + .toggle-slider {
                background-color: #2196F3;
            }
            .toggle-switch input:checked + .toggle-slider:before {
                transform: translateX(20px);
            }
            .sets-container {
                margin-top: 10px;
            }
            .set-row {
                display: flex;
                align-items: center;
                gap: 10px;
                margin-bottom: 5px;
            }
            .rep-input {
                padding: 5px;
                width: 80px;
                border: 1px solid #ddd;
                border-radius: 4px;
            }
            .add-set-btn {
                margin-top: 5px;
                padding: 5px 10px;
                background-color: #e0e0e0;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                font-size: 14px;
            }
            .add-set-btn:hover {
                background-color: #d0d0d0;
            }
            .remove-set-btn {
                background-color: #ff4444;
                color: white;
                border: none;
                border-radius: 50%;
                width: 20px;
                height: 20px;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 16px;
                padding: 0;
                line-height: 1;
            }
            .remove-set-btn:hover {
                background-color: #cc0000;
            }
        </style>
    `;

  // Create tabs
  const createTabs = () => {
    const tabsDiv = document.createElement("div");
    tabsDiv.className = "tabs";

    Object.keys(workoutData).forEach((day, index) => {
      const tab = document.createElement("button");
      tab.className = `tab ${index === 0 ? "active" : ""}`;
      tab.textContent = day;
      tab.onclick = () => showWorkout(day);
      tabsDiv.appendChild(tab);
    });

    return tabsDiv;
  };

  // Add this at the top of your file
  const exerciseApiOptions = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "fc455c3eccmsh15e1aa2f2b4903fp18c606jsn30e1031015f0",
      "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
    },
  };

  // Update LOCAL_GIFS with the verified URLs I've found
  const LOCAL_GIFS = {
    "resistance cycling": "/assets/gifs/stationary-bike.gif",
    "backward incline walk": "/assets/gifs/treadmill-walk.gif",
    "pull-ups": "/assets/gifs/pull-up.gif",
    "bench press": "/assets/gifs/bench-press.gif",
    rows: "/assets/gifs/barbell-row.gif",
    "shoulder press": "/assets/gifs/shoulder-press.gif",
    "bicep curls": "/assets/gifs/bicep-curl.gif",
    "tricep dips": "/assets/gifs/tricep-dip.gif",
    plank: "/assets/gifs/plank.gif",
    "russian twists": "/assets/gifs/russian-twist.gif",
    "incline bench press": "/assets/gifs/incline-bench-press.gif",
    "lat pulldowns": "/assets/gifs/lat-pulldown.gif",
    "lateral raises": "/assets/gifs/lateral-raise.gif",
    "face pulls": "/assets/gifs/face-pull.gif",
    "hammer curls": "/assets/gifs/hammer-curl.gif",
    "overhead tricep extensions": "/assets/gifs/overhead-tricep-extension.gif",
    "side planks": "/assets/gifs/side-plank.gif",
  };

  // Function to save gif to local storage
  async function saveGifLocally(exerciseName, gifUrl) {
    try {
      // Convert exercise name to a suitable filename
      const safeFileName = exerciseName.toLowerCase().replace(/\s+/g, "-");

      // Log the URL for manual saving
      console.log(`Please save this GIF locally:
          Exercise: ${exerciseName}
          URL: ${gifUrl}
          Suggested path: /assets/gifs/${safeFileName}.gif`);

      // Update the LOCAL_GIFS mapping
      LOCAL_GIFS[
        exerciseName.toLowerCase()
      ] = `/assets/gifs/${safeFileName}.gif`;

      // Note: Actually saving files would require server-side code
      // This implementation provides instructions for manual saving
    } catch (error) {
      console.error("Error handling gif:", error);
    }
  }

  // Add this near the top where other constants are defined
  const DEFAULT_USE_API = false;
  let useApi = DEFAULT_USE_API;

  // Update the fetchExerciseGif function
  async function fetchExerciseGif(exerciseName) {
    const lowerCaseName = exerciseName.toLowerCase();

    // Always check local storage first
    if (LOCAL_GIFS[lowerCaseName]) {
      return LOCAL_GIFS[lowerCaseName];
    }

    // Only proceed with API call if useApi is true
    if (!useApi) {
      console.log(
        "API calls disabled. Enable API toggle to fetch new exercises."
      );
      return null;
    }

    // If not found locally, fetch from API
    try {
      const searchName = lowerCaseName
        .replace("resistance cycling", "stationary bike")
        .replace("backward incline walk", "treadmill walk")
        .replace("russian twists", "russian twist");

      const response = await fetch(
        `https://exercisedb.p.rapidapi.com/exercises/name/${searchName}`,
        exerciseApiOptions
      );
      const data = await response.json();

      if (data[0]?.gifUrl) {
        // Save the new gif locally for future use
        await saveGifLocally(exerciseName, data[0].gifUrl);
        return data[0].gifUrl;
      }
      return null;
    } catch (error) {
      console.error("Error fetching exercise gif:", error);
      return null;
    }
  }

  // Update the showWorkout function to include caching status
  const showWorkout = async (day) => {
    // Update active tab
    document.querySelectorAll(".tab").forEach((tab) => {
      tab.classList.remove("active");
      if (tab.textContent === day) tab.classList.add("active");
    });

    // Update workout display
    const workoutDiv = document.querySelector(".workout-list");
    workoutDiv.innerHTML = "";

    if (typeof workoutData[day] === "string") {
      workoutDiv.innerHTML = `<div class="exercise"><div>${workoutData[day]}</div></div>`;
    } else {
      for (const exercise of workoutData[day]) {
        const exerciseDiv = document.createElement("div");
        exerciseDiv.className = "exercise";

        // Create initial layout
        exerciseDiv.innerHTML = `
          <input type="checkbox" class="checkbox">
          <div class="exercise-content">
            <div class="exercise-info">
              <div class="exercise-name">${exercise.name}</div>
              ${
                exercise.notes
                  ? `<div class="notes">${exercise.notes}</div>`
                  : ""
              }
              <div class="sets-container">
                  ${Array(exercise.sets)
                    .fill()
                    .map(
                      (_, i) => `
                      <div class="set-row">
                          <span>Set ${i + 1}:</span>
                          <input type="text" 
                              class="rep-input" 
                              placeholder="${exercise.reps}"
                              aria-label="Enter reps/time for set ${i + 1}">
                      </div>
                  `
                    )
                    .join("")}
                  <button class="add-set-btn">+ Add Set</button>
              </div>
            </div>
            <div class="exercise-gif loading">
              ${
                LOCAL_GIFS[exercise.name.toLowerCase()]
                  ? "Loading local gif..."
                  : "Fetching from API..."
              }
            </div>
          </div>
        `;

        // Add event listener for the add set button
        const addSetBtn = exerciseDiv.querySelector(".add-set-btn");
        const setsContainer = exerciseDiv.querySelector(".sets-container");

        addSetBtn.addEventListener("click", () => {
          const newSetNum =
            setsContainer.querySelectorAll(".set-row").length + 1;
          const newSetRow = document.createElement("div");
          newSetRow.className = "set-row additional-set";
          newSetRow.innerHTML = `
                <span>Set ${newSetNum}:</span>
                <input type="text" 
                    class="rep-input" 
                    placeholder="${exercise.reps}"
                    aria-label="Enter reps/time for set ${newSetNum}">
            <button class="remove-set-btn" aria-label="Remove set">×</button>
        `;

          // Add event listener for remove button
          const removeBtn = newSetRow.querySelector(".remove-set-btn");
          removeBtn.addEventListener("click", () => {
            newSetRow.remove();
            // Renumber remaining sets
            setsContainer.querySelectorAll(".set-row").forEach((row, index) => {
              row.querySelector("span").textContent = `Set ${index + 1}:`;
            });
          });

          setsContainer.insertBefore(newSetRow, addSetBtn);
        });

        workoutDiv.appendChild(exerciseDiv);

        // Fetch and update gif
        const gifUrl = await fetchExerciseGif(exercise.name);
        const gifContainer = exerciseDiv.querySelector(".exercise-gif");

        if (gifUrl) {
          gifContainer.innerHTML = `<img src="${gifUrl}" alt="${exercise.name} demonstration" />`;
        } else {
          gifContainer.innerHTML = "No demonstration available";
        }
        gifContainer.classList.remove("loading");
      }

      // Add Done button
      const doneButton = document.createElement("button");
      doneButton.className = "done-button";
      doneButton.textContent = "Complete Workout";
      doneButton.disabled = true;

      // Handle checkbox changes
      const checkboxes = workoutDiv.querySelectorAll(".checkbox");
      checkboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", (e) => {
          const exerciseDiv = e.target.closest(".exercise");
          exerciseDiv.classList.toggle("completed", e.target.checked);

          // Enable/disable done button based on all checkboxes
          const allChecked = Array.from(checkboxes).every((cb) => cb.checked);
          doneButton.disabled = !allChecked;
        });
      });

      // Handle workout completion
      doneButton.addEventListener("click", () => {
        window.location.href = "congrats/congrats.html";
      });

      workoutDiv.appendChild(doneButton);
    }
  };

  // Add this to the initialization section
  const createApiToggle = () => {
    const toggleDiv = document.createElement("div");
    toggleDiv.className = "api-toggle";
    toggleDiv.innerHTML = `
        <label class="toggle-switch">
            <input type="checkbox" ${useApi ? "checked" : ""}>
            <span class="toggle-slider"></span>
        </label>
        <span>Use API</span>
    `;

    toggleDiv.querySelector("input").addEventListener("change", (e) => {
      useApi = e.target.checked;
      showWorkout(document.querySelector(".tab.active").textContent);
    });

    return toggleDiv;
  };

  // Initialize app
  app.innerHTML = styles;
  app.appendChild(createApiToggle());
  app.appendChild(createTabs());
  const workoutDiv = document.createElement("div");
  workoutDiv.className = "workout-list";
  app.appendChild(workoutDiv);
  showWorkout("Monday");
});
