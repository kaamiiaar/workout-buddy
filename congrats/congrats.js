document.addEventListener("DOMContentLoaded", () => {
  const congratsDiv = document.getElementById("congrats");

  const styles = `
        <style>
            body {
                font-family: 'Roboto', sans-serif;
                margin: 0;
                padding: 20px;
                background-color: #f5f5f5;
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .congrats-container {
                text-align: center;
                background-color: white;
                padding: 40px;
                border-radius: 10px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                max-width: 500px;
                width: 100%;
            }
            h1 {
                color: #4CAF50;
                margin-bottom: 20px;
            }
            .message {
                margin-bottom: 30px;
                color: #666;
            }
            .home-button {
                padding: 15px 30px;
                background-color: #2196f3;
                color: white;
                border: none;
                border-radius: 5px;
                font-size: 16px;
                cursor: pointer;
                transition: background-color 0.3s;
            }
            .home-button:hover {
                background-color: #1976d2;
            }
        </style>
    `;

  const content = `
        <div class="congrats-container">
            <h1>🎉 Congratulations! 🎉</h1>
            <div class="message">
                You've completed your workout for today. Keep up the great work!
            </div>
            <button class="home-button" onclick="window.location.href='../'">Back to Workouts</button>
        </div>
    `;

  congratsDiv.innerHTML = styles + content;
});
