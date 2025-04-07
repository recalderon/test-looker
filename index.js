class DataTableViz {
  constructor() {
    this.container = document.createElement('div');
    this.container.className = 'datatable-container';
    this.table = document.createElement('table');
    this.table.className = 'display';
    this.container.appendChild(this.table);
    
    // Load DataTables CSS and JS dynamically
    this.loadResources();
  }

  loadResources() {
    const css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = 'https://cdn.datatables.net/1.11.5/css/jquery.dataTables.min.css';
    document.head.appendChild(css);

    const script = document.createElement('script');
    script.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
    script.onload = () => {
      const dtScript = document.createElement('script');
      dtScript.src = 'https://cdn.datatables.net/1.11.5/js/jquery.dataTables.min.js';
      dtScript.onload = () => this.initialized = true;
      document.head.appendChild(dtScript);
    };
    document.head.appendChild(script);
  }

  async draw(data, config) {
    if (!this.initialized) {
      await new Promise(resolve => {
        const check = setInterval(() => {
          if (this.initialized) {
            clearInterval(check);
            resolve();
          }
        }, 100);
      });
    }

    // Clear previous table if exists
    if (this.dataTable) {
      this.dataTable.destroy();
    }

    // Prepare data
    const headers = data.fields.map(field => field.name);
    const rows = data.tables.DEFAULT.map(row => 
      headers.map(header => row[header]?.value || '')
    );

    // Create table HTML
    this.table.innerHTML = `
      <thead><tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr></thead>
      <tbody>${rows.map(row => 
        `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`
      ).join('')}</tbody>
    `;

    // Initialize DataTable
    this.dataTable = $(this.table).DataTable({
      paging: config.style?.pageLength !== undefined,
      pageLength: config.style?.pageLength || 10,
      searching: config.style?.showSearch !== false
    });
  }

  getVisualization() {
    return this.container;
  }
}

// Register visualization
window['DataTableViz'] = DataTableViz;