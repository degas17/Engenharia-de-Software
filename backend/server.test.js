
const { test } = require("node:test");
const assert = require("node:assert/strict");
const app = require("./server");

test("GET / devolve a mensagem da API", async () => {
  const server = app.listen(0);

  try {
    const address = server.address();
    const response = await fetch(
      `http://127.0.0.1:${address.port}/`
    );

    assert.equal(response.status, 200);

    const data = await response.json();

    assert.equal(
      data.message,
      "Feature Roadmap API is running"
    );
  } finally {
    await new Promise((resolve, reject) => {
      server.close((error) => {
        if (error) reject(error);
        else resolve();
      });
    });
  }
});
