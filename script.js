<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Problem of the Day</title>
  <style>
    body {
      font-family: sans-serif;
      background: #f8f9fa;
      margin: 0;
      padding: 2rem;
    }
    h1 {
      text-align: center;
    }
    .box {
      background: white;
      border: 1px solid #ccc;
      border-radius: 8px;
      padding: 1.5rem;
      max-width: 800px;
      margin: 2rem auto;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    a {
      color: #007bff;
    }
    a:hover {
      text-decoration: underline;
    }
    em {
      color: #555;
    }
  </style>
</head>
<body>
  <h1>Problem of the Day</h1>
  <div id="problem-container" class="box">
    Loading...
  </div>

  <script>
    // Replace with your actual published Google Sheets CSV link:
    const CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vT557Kwc6JfNHfUDNQf8cbiiMXGtbOapZS4MItk5DdB5_cwju35a0xoO9kFoct1Iwl4gMZfKYhKF1vT/pub?output=csv
https://docs.google.com/spreadsheets/d/e/YOUR_SHEET_ID/pub?output=csv";

    function formatDateToDDMMYYYY(date) {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    }

    function displayProblem(problem) {
      const container = document.getElementById('problem-container');
      container.innerHTML = `
        <h3>${problem.date}</h3>
        <p><strong>Source:</strong> ${problem.source || 'Unknown'}</p>
        <p><strong>Problem:</strong><br>${problem.statement}</p>
        ${problem.link ? `<p><a href="${problem.link}" target="_blank">View Original</a></p>` : ''}
        ${problem.hint ? `<p><em>Hint:</em> ${problem.hint}</p>` : ''}
      `;
    }

    function displayNoProblem() {
      const container = document.getElementById('problem-container');
      container.innerHTML = `<p>No problem found for today.</p>`;
    }

    function fetchProblems() {
      fetch(CSV_URL)
        .then(response => response.text())
        .then(csvText => {
          const rows = csvText.trim().split('\n').map(row => row.split(','));
          const headers = rows[0];
          const dataRows = rows.slice(1);

          const today = formatDateToDDMMYYYY(new Date());

          const problems = dataRows.map(row => {
            const obj = {};
            headers.forEach((key, i) => {
              obj[key.trim().toLowerCase()] = row[i]?.trim();
            });
            return {
              date: obj.date,
              statement: obj["problem statement"],
              source: obj.source,
              link: obj.link,
              hint: obj.hint
            };
          });

          const todayProblem = problems.find(p => p.date === today);
          if (todayProblem) {
            displayProblem(todayProblem);
          } else {
            displayNoProblem();
          }
        })
        .catch(error => {
          console.error("Error loading CSV:", error);
          displayNoProblem();
        });
    }

    window.onload = fetchProblems;
  </script>
</body>
</html>
