(async () => {
  // Create an immediately invoked function expression (IIFE). This is a function
  // which runs as soon as it is defined.
  //   - https://developer.mozilla.org/en-US/docs/Glossary/IIFE
  //   - https://blog.bitsrc.io/understanding-javascript-iifes-like-a-boss-35d20dc923db
  // Here the function is asynchronous which allows the usage of await. Also avoids
  // global scope "pollution".

  const API_URL = 'https://tie-lukioplus.rd.tuni.fi/cais/api/stackoverflow/stats';

  const TECHNOLOGIES = [
    'JavaScript',
    'Angular',
    'React',
    'Python',
    'Java',
    'C++',
    'Swift',
    'Kotlin',
    'C#',
    'PHP'
  ];

  const stackOverflowStats = await getStackOverflowData(API_URL, TECHNOLOGIES);

  // Create a sorted array of years based on the years in the Stack Overflow data
  const YEARS = Object.keys(stackOverflowStats)
    .map(year => Number.parseInt(year, 10))
    .sort((y1, y2) => y1 - y2);

  /**
   * Create HTML for checkbox form input
   * @param {string} technology name of the technology used as label and value
   * @returns {string} HTML for the checkbox and label
   */
  const getTechCheckboxHtml = technology => {
    return `<div class="form-check m-4">
      <label class="form-check-label">
        <input
          class="form-check-input"
          type="checkbox"
          value=${technology}
          id=${technology}
          checked
        />
        ${technology}
      </label>
    </div>`;
  };

  /**
   * Dynamically update select options for starting and ending year.
   * Disable starting years after ending and ending years before start.
   *
   * @param {Array<number>} years
   * @param {number} firstYear starting year
   * @param {number} lastYear ending year
   */
  const updateSelectedYearOptions = (years, firstYear, lastYear) => {
    let firstYearOptions = '';
    let lastYearOptions = '';

    for (const year of years) {
      if (year < firstYear) {
        firstYearOptions += `<option value="${year}">${year}</option>`;
        lastYearOptions += `<option value="${year}" disabled>${year}</option>`;
      } else if (year === firstYear) {
        firstYearOptions += `<option value="${year}" selected>${year}</option>`;
        lastYearOptions += `<option value="${year}">${year}</option>`;
      } else if (year > firstYear && year < lastYear) {
        firstYearOptions += `<option value="${year}">${year}</option>`;
        lastYearOptions += `<option value="${year}">${year}</option>`;
      } else if (year === lastYear) {
        firstYearOptions += `<option value="${year}">${year}</option>`;
        lastYearOptions += `<option value="${year}" selected>${year}</option>`;
      } else {
        firstYearOptions += `<option value="${year}" disabled>${year}</option>`;
        lastYearOptions += `<option value="${year}">${year}</option>`;
      }
    }

    document.querySelector('#first-year').innerHTML = firstYearOptions;
    document.querySelector('#last-year').innerHTML = lastYearOptions;
  };

  // Setup initial values and update HTML form and table to their initial state
  const yearlyTechStats = buildYearlyTechStats(stackOverflowStats);
  const table = document.querySelector('table');
  let selectedTechnologies = [...TECHNOLOGIES].sort();
  let firstYear = YEARS[0];
  let lastYear = YEARS[YEARS.length - 1];
  updateSelectedYearOptions(YEARS, firstYear, lastYear);
  updateTable(table, yearlyTechStats, selectedTechnologies, firstYear, lastYear);

  // Add checkboxes to DOM
  document.querySelector('#tech-section').innerHTML = [...TECHNOLOGIES]
    .sort()
    .map(getTechCheckboxHtml)
    .join('');

  // Set checkbox listeners to update selectedTechnologies
  document.querySelectorAll('#tech-section input').forEach(input =>
    input.addEventListener('change', function () {
      // If checked: add the technology to selected ones otherwise remove it
      if (this.checked) {
        selectedTechnologies = [...selectedTechnologies, this.value].sort();
      } else {
        selectedTechnologies = selectedTechnologies.filter(tech => tech !== this.value);
      }

      // Make changes to show up in the table
      updateTable(table, yearlyTechStats, selectedTechnologies, firstYear, lastYear);
    })
  );

  // Set listener for starting year select element
  document.querySelector('#first-year').addEventListener('change', function () {
    firstYear = Number.parseInt(this.value, 10);
    updateSelectedYearOptions(YEARS, firstYear, lastYear);
    updateTable(table, yearlyTechStats, selectedTechnologies, firstYear, lastYear);
  });

  // Set listener for ending year select element
  document.querySelector('#last-year').addEventListener('change', function () {
    lastYear = Number.parseInt(this.value, 10);
    updateSelectedYearOptions(YEARS, firstYear, lastYear);
    updateTable(table, yearlyTechStats, selectedTechnologies, firstYear, lastYear);
  });
})();
