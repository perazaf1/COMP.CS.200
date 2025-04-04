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