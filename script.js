const sheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT557Kwc6JfNHfUDNQf8cbiiMXGtbOapZS4MItk5DdB5_cwju35a0xoO9kFoct1Iwl4gMZfKYhKF1vT/pub?output=csv';

async function loadProblem() {
  const response = await fetch(sheetUrl);
  const csvText = await response.text();
  const rows = csvText.split('\n').map(row => row.split(','));

  const today = new Date().toLocaleDateString('en-GB').split('/').join('/'); // DD/MM/YYYY
  const dateCol = 1, problemCol = 2, sourceCol = 3, linkCol = 4;

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    if (row[dateCol] === today) {
      document.getElementById('date').textContent = `Date: ${row[dateCol]}`;
      document.getElementById('statement').textContent = row[problemCol];
      document.getElementById('source').textContent = `Source: ${row[sourceCol]}`;
      if (row[linkCol]) {
        document.getElementById('link').href = row[linkCol];
        document.getElementById('link').style.display = 'block';
      }
      return;
    }
  }

  document.getElementById('statement').textContent = 'No problem found for today.';
}
loadProblem();
