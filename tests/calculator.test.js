const calculator = require("../models/calculator");

test("Should sum 2+2", () => {
    const result = calculator.sum(2, 2);

    expect(result).toBe(4);
});

test("Should sum 5+100", () => {
    const result = calculator.sum(5, 100);

    expect(result).toBe(105);
});

test("'banana' + 100 should return an error", () => {
    const result = calculator.sum("banana", 100);

    expect(result).toBe("Error");
});

test("100 + 'banana' should return an error", () => {
    const result = calculator.sum(100, "banana");

    expect(result).toBe("Error");
});

test("'banana' + 'banana' should return an error", () => {
    const result = calculator.sum("nanana", "banana");

    expect(result).toBe("Error");
});
