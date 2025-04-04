/**
 * Build row data to be shown in a table
 *
 * @param {object} yearlyTechStats Year by year stats of technologies mentioned in StackOverflow
 * @param {Array<string>} selectedTechs Technologies selected
 * @param {number} firstYear First year of data selected
 * @param {number} lastYear Last year of data selected
 * @returns {Array<string|number>}
 */
function buildRowData(yearlyTechStats, selectedTechs, firstYear, lastYear) {
  const rowData = [];
  
  // For each selected technology, create a row
  for (const tech of selectedTechs) {
    const row = [tech]; // First column is the technology name
    
    // For each year in the range, add the count or 0 if not available
    for (let year = firstYear; year <= lastYear; year++) {
      // Check if data exists for this year and technology
      if (yearlyTechStats[year] && yearlyTechStats[year][tech] !== undefined) {
        row.push(yearlyTechStats[year][tech]);
      } else {
        row.push(0); // Use 0 if data doesn't exist
      }
    }
    
    rowData.push(row);
  }
  
  return rowData;
}

/**
 * Get HTML of table rows
 *
 * @param {Array<string|number>} rowData
 * @returns {string} HTML of the table rows
 */
function constructTableRowsHtml(rowData) {
  let html = '';
  
  // For each row in the data
  for (const row of rowData) {
    html += '<tr>';
    
    // For each cell in the row
    for (const cell of row) {
      html += `<td>${cell}</td>`;
    }
    
    html += '</tr>';
  }
  
  return html;
}

/**
 * Get HTML of table heading row
 *
 * @param {Array<string|number>} headings Table headings
 * @returns {string} HTML of the heading row
 */
function constructTableHeadHtml(headings) {
  let html = '<tr>';
  
  // For each heading
  for (const heading of headings) {
    html += `<th>${heading}</th>`;
  }
  
  html += '</tr>';
  
  return html;
}

/**
 * Builds yearly technology statistics from Stack Overflow data
 * 
 * @param {object} techStats Object containing Stack Overflow technology statistics
 * @returns {object} Object containing yearly technology statistics
 */
function buildYearlyTechStats(techStats) {
  const yearlyTechStats = {};
  
  // Iterate through each year in techStats
  for (const year in techStats) {
    yearlyTechStats[year] = {};
    
    // Go through all keys in the year's data
    for (const category in techStats[year]) {
      // Include only data from keys that start with 'current'
      if (category.startsWith('current')) {
        const technologies = techStats[year][category];
        
        // Add each technology's count to the year's data
        for (const tech in technologies) {
          yearlyTechStats[year][tech] = technologies[tech];
        }
      }
    }
  }
  
  return yearlyTechStats;
}

/**
 * Updates HTML table based on selected technologies and statistics
 * 
 * @param {HTMLTableElement} table DOM element of the HTML table to be updated
 * @param {object} yearlyTechStats Object containing yearly technology statistics
 * @param {Array<string>} selectedTechs Array of selected technologies to be shown
 * @param {number} firstYear First year of data to include
 * @param {number} lastYear Last year of data to include
 */
function updateTable(table, yearlyTechStats, selectedTechs, firstYear, lastYear) {
  // Get the years range to display as columns
  const years = [];
  for (let year = firstYear; year <= lastYear; year++) {
    years.push(year);
  }
  
  // Build table headings with "Technology" and the years
  const headings = ['Technology', ...years];
  
  // Build row data for the selected technologies and year range
  const rowData = buildRowData(yearlyTechStats, selectedTechs, firstYear, lastYear);
  
  // Update the table head and body with the new HTML
  const thead = table.querySelector('thead');
  const tbody = table.querySelector('tbody');
  
  thead.innerHTML = constructTableHeadHtml(headings);
  tbody.innerHTML = constructTableRowsHtml(rowData);
}