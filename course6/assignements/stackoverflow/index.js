{
  // Create an anonymous code block to avoid name collisions
  // Because of JavaScript's block level scoping all variables and functions
  // created inside the block are only visible inside the block and do not
  // "pollute" global namespace.
  // Only global variable used is "techStats" from techStats.js

  const TECHNOLOGIES = ['C#', 'C++', 'Java', 'JavaScript', 'PHP', 'Python'];

  const YEARS = Object.keys(techStats)
    .map(year => Number.parseInt(year, 10))
    .sort((y1, y2) => y1 - y2);

  const firstYear = YEARS[0];
  const lastYear = YEARS[YEARS.length - 1];
  const thead = document.querySelector('#table-header');
  const tbody = document.querySelector('#table-rows');
  const rowData = buildRowData(techStats, TECHNOLOGIES, firstYear, lastYear);

  thead.innerHTML = constructTableHeadHtml(['Technology', ...YEARS]);
  tbody.innerHTML = constructTableRowsHtml(rowData);
}
