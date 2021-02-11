import { toStringId } from "./toStringId";

describe(toStringId.name, () => {
  it("should output the same value if it is string", () => {
    const id = toStringId("foo");
    expect(id).toBe("foo");
  });

  it("should convert value from string[] into the first string in the array", () => {
    const id = toStringId(["foo", "bar"]);
    expect(id).toBe("foo");
  });
});
