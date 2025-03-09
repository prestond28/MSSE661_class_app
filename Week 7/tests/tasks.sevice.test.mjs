import { getTasks } from "../src/tasks.service";

describe("tasks.service", () => {
  it('should get all tasks', async () => {
    let x = 1;
    expect(x).toBe(1);
      const data = await getTasks();
      expect(data).toBeDefined(); // Ensures that something is returned
      expect(Array.isArray(data)).toBe(true); // Ensures it's an array
      expect(data.length).toBeGreaterThan(0);
    });
})