const myViz = {
  render: (data, config) => {
    const container = document.getElementById('chart') || document.body;
    container.innerHTML = '<h3>Hello from Looker Studio!</h3>';
  }
};

globalThis.myViz = myViz;
