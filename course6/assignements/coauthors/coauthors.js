function constructTableHeadHtml(headings) {
  const headHtml = headings.map(h => `<th>${h}</th>`).join('');
  return `<thead><tr>${headHtml}</tr></thead>`;
}

function constructTableRowsHtml(rowData) {
  const rowsHtml = rowData.map(row => {
    const cols = row.map(col => `<td>${col}</td>`).join('');
    return `<tr>${cols}</tr>`;
  }).join('');
  return `<tbody>${rowsHtml}</tbody>`;
}

function getPublications(publicationsData) {
  const result = {};

  publicationsData.forEach(pub => {
    if (!pub.authors || !pub.authors.author) {
      return; // Skip publications with no authors
    }

    const year = pub.year;
    const title = pub.title;
    const rawAuthors = pub.authors.author;
    const authors = Array.isArray(rawAuthors) ? rawAuthors : [rawAuthors];

    const entry = {
      title,
      authors,
      year
    };

    if (!result[year]) {
      result[year] = [];
    }

    result[year].push(entry);
  });

  return result;
}

function getYears(publications) {
  return Object.keys(publications)
    .map(year => String(year)) // Ensure all are strings
    .sort((a, b) => parseInt(a) - parseInt(b)); // Sort ascending numerically
}

function fillOptionList(years) {
  const select = document.querySelector('select');
  select.innerHTML = ''; // Clear existing options

  years.forEach(year => {
    const option = document.createElement('option');
    option.value = year;
    option.textContent = year;
    select.appendChild(option);
  });

  // Add "All" option at the end
  const allOption = document.createElement('option');
  allOption.value = 'all';
  allOption.textContent = 'All';
  select.appendChild(allOption);
}

function constructPublicationRowData(publications, years) {
  const rows = [];

  years.forEach(year => {
    if (!publications[year]) return;

    publications[year].forEach(pub => {
      const yearStr = pub.year;
      const title = pub.title;
      const authors = pub.authors;

      const firstAuthor = authors[0]?.text || '';
      const coAuthors = authors.length > 1
        ? authors.slice(1).map(a => a.text).join(', ')
        : '';

      rows.push([yearStr, title, firstAuthor, coAuthors]);
    });
  });

  return rows;
}

function constructPublicationsTableHtml(publications, year = null) {
  const headings = ['Year', 'Title', 'The 1st author', 'Co-authors'];

  const selectedYears = (year && year !== 'all')
    ? [year]
    : getYears(publications);

  const rowData = constructPublicationRowData(publications, selectedYears);
  const tableHead = constructTableHeadHtml(headings);
  const tableRows = constructTableRowsHtml(rowData);

  return `
    <table>
      <caption>Publications</caption>
      ${tableHead}
      ${tableRows}
    </table>
  `;
}

function init() {
  const publications = getPublications(publicationsData);
  const years = getYears(publications);
  fillOptionList(years);

  const container = document.getElementById('container');
  const form = document.querySelector('form');
  const select = document.querySelector('select');

  // Initial display with first year
  container.innerHTML = constructPublicationsTableHtml(publications, years[0]);

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    const selectedYear = select.value;
    const tableHtml = constructPublicationsTableHtml(publications, selectedYear);
    container.innerHTML = tableHtml;
  });
}
