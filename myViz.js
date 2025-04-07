const myViz = {
  render: (data, config, context) => {
    const container = context?.domContainer || document.body;
    container.innerHTML = '<h3>Hello Looker Studio 👋</h3>';
  }
};

globalThis.myViz = myViz;
