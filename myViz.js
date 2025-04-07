const myViz = {
  render: (data, config) => {
    const container = document.createElement("div");
    container.style.padding = "1rem";
    container.style.fontFamily = "sans-serif";
    container.innerHTML = `
      <h2>Hello Looker Studio 👋</h2>
      <pre>${JSON.stringify(data, null, 2)}</pre>
    `;
    document.body.appendChild(container);
  }
};

globalThis.myViz = myViz;
