import { createClient } from "https://esm.sh/@supabase/supabase-js";

const supabaseUrl = "https://exinlvevcsfxjbnnrqif.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4aW5sdmV2Y3NmeGpibm5ycWlmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM3MzAzMzYsImV4cCI6MjA0OTMwNjMzNn0.MqJHq9NSp9hHkkkyWHJfs4c56Abi46idBNdGd07_nWU";
const supabase = createClient(supabaseUrl, supabaseKey);

document.addEventListener("DOMContentLoaded", async () => {
  const app = document.getElementById("app");

  // Add styles
  const styles = `
    <style>
      .history-container {
        max-width: 1200px;
        margin: 20px auto;
        padding: 20px;
      }
      
      .workout-card {
        background: white;
        border-radius: 8px;
        padding: 20px;
        margin-bottom: 20px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      }
      
      .workout-date {
        font-size: 1.2em;
        font-weight: bold;
        color: #2196f3;
        margin-bottom: 10px;
      }
      
      .workout-day {
        font-size: 1.1em;
        color: #666;
        margin-bottom: 15px;
      }
      
      .exercise-list {
        margin-left: 20px;
      }
      
      .exercise-item {
        margin-bottom: 10px;
      }
      
      .set-details {
        margin-left: 20px;
        color: #666;
        font-size: 0.9em;
      }
      
      .navbar {
        background: #2196f3;
        padding: 15px;
        color: white;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1000;
      }
      
      .nav-link {
        color: white;
        text-decoration: none;
        padding: 8px 16px;
        border-radius: 4px;
      }
      
      .nav-link:hover {
        background: rgba(255,255,255,0.1);
      }
      
      .delete-btn {
        background-color: #ff4444;
        color: white;
        border: none;
        border-radius: 4px;
        padding: 8px 16px;
        cursor: pointer;
        margin-top: 10px;
        transition: background-color 0.3s;
      }
      
      .delete-btn:hover {
        background-color: #cc0000;
      }
    </style>
  `;

  // Add navbar
  const navbar = `
    <div class="navbar">
      <a href="../index.html" class="nav-link">Home</a>
      <a href="./workout-history.html" class="nav-link">History</a>
    </div>
  `;

  // Create main container
  const historyContainer = document.createElement("div");
  historyContainer.className = "history-container";

  // Fetch workout history
  try {
    const { data: workouts, error } = await supabase
      .from("completed_workouts")
      .select("*")
      .order("workout_date", { ascending: false });

    if (error) throw error;

    workouts.forEach((workout) => {
      const workoutCard = document.createElement("div");
      workoutCard.className = "workout-card";

      const date = new Date(workout.workout_date).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });

      workoutCard.innerHTML = `
        <div class="workout-date">${date}</div>
        <div class="workout-day">${workout.workout_day}</div>
        <div class="exercise-list">
          ${workout.exercises
            .map(
              (exercise) => `
            <div class="exercise-item">
              <strong>${exercise.exercise_name}</strong>
              <div class="set-details">
                ${exercise.sets_completed
                  .map(
                    (set) => `
                  Set ${set.setNumber}: ${set.repsCompleted}
                `
                  )
                  .join("<br>")}
              </div>
            </div>
          `
            )
            .join("")}
        </div>
        <button class="delete-btn" data-workout-id="${
          workout.id
        }">Delete</button>
      `;

      // Add event listener for delete button
      const deleteBtn = workoutCard.querySelector(".delete-btn");
      deleteBtn.addEventListener("click", async () => {
        if (confirm("Are you sure you want to delete this workout?")) {
          try {
            const { error } = await supabase
              .from("completed_workouts")
              .delete()
              .eq("id", workout.id);

            if (error) throw error;
            workoutCard.remove();
          } catch (error) {
            console.error("Error deleting workout:", error);
            alert("Failed to delete workout. Please try again.");
          }
        }
      });

      historyContainer.appendChild(workoutCard);
    });
  } catch (error) {
    console.error("Error fetching workout history:", error);
    historyContainer.innerHTML =
      "<p>Error loading workout history. Please try again later.</p>";
  }

  // Add everything to the page
  app.innerHTML = styles + navbar;
  app.appendChild(historyContainer);
});
