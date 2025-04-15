/**
 * Build row data to be shown in a table
 *
 * @param {object} yearlyTechStats Year by year stats of technologies mentioned in StackOverflow
 * @param {Array<string>} selectedTechs Technologies selected
 * @param {number} firstYear First year of data selected
 * @param {number} lastYear Last year of data selected
 * @returns {Array<Array<string|number>>}
 */
function buildRowData(yearlyTechStats, selectedTechs, firstYear, lastYear) {
  const rowData = [];

  for (const tech of selectedTechs) {
    const row = [tech];

    for (let year = firstYear; year <= lastYear; year++) {
      const value = yearlyTechStats[year]?.[tech] ?? 0;
      row.push(value);
    }

    rowData.push(row);
  }

  return rowData;
}

/**
 * Get HTML of table rows
 *
 * @param {Array<Array<string|number>>} rowData
 * @returns {string} HTML of the table rows
 */
function constructTableRowsHtml(rowData) {
  return rowData.map(row =>
    `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`
  ).join('');
}

/**
 * Get HTML of table heading row
 *
 * @param {Array<string|number>} headings Table headings
 * @returns {string} HTML of the heading row
 */
function constructTableHeadHtml(headings) {
  return `<tr>${headings.map(heading => `<th>${heading}</th>`).join('')}</tr>`;
}

/**
 * Fetch JSON data from a URL
 * 
 * @param {string|URL} url The URL to fetch data from
 * @returns {Promise<object>} Promise that resolves to the JSON data
 */
function getJSON(url) {
  return fetch(url).then(response => response.json());
}

/**
 * Fetch Stack Overflow data from the API
 * 
 * @param {string} apiUrl The base API URL
 * @param {Array<string>|null} technologies Optional array of technologies to filter by
 * @returns {Promise<object>} Promise that resolves to the Stack Overflow data
 */
function getStackOverflowData(apiUrl, technologies = null) {
  let url = apiUrl;

  if (technologies && technologies.length > 0) {
    const encodedTechs = technologies.map(tech => encodeURIComponent(tech));
    const techQueryValue = encodedTechs.join('%3B'); // Properly encode semicolon
    url = `${apiUrl}?tech=${techQueryValue}`;
  }

  return getJSON(url);
}
