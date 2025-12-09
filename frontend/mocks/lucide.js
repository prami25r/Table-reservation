const React = require("react");

module.exports = new Proxy(
  {},
  {
    get: () =>
      function MockIcon() {
        return React.createElement("div");
      },
  }
);
