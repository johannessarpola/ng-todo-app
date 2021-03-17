const { GenericContainer } = require("testcontainers");

const port = 5432
const user = 'todo_admin'
const pw = 'D6*dbiKSjC4cL^CfWH3#'


describe("GenericContainer", () => {
  let container: GenericContainer;

  beforeAll(async () => {
    // docker/postgres/ -> make build
    container = await new GenericContainer("todo-postgres-db")
      .withExposedPorts(port)
      .start();

  });

  afterAll(async () => {
    await container.stop();
  });

  it("works", async () => {
    await redisClient.set("key", "val");
    expect(await redisClient.get("key")).toBe("val");
  });
});

test('two plus two is four', () => {
  expect(2 + 2).toBe(4);
});


