const myViz = {
  render: (data, config) => {
    const container = document.createElement('div');
    container.innerHTML = `
      <h2>Hello Looker 👋</h2>
      <pre style="font-size: 12px;">${JSON.stringify(data, null, 2)}</pre>
    `;
    document.body.appendChild(container);
  }
};

globalThis.myViz = myViz;
