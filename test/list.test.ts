import { expect, it, describe } from "vitest";
import { List } from "../src";
export interface Person {
  name: string;
  age: number;
}
describe("List", () => {
  describe("List constructor", () => {
    it("Should can be instaiated within generic type parameter", () => {
      const stringList = new List<string>();

      expect(stringList).toMatchInlineSnapshot(`
        List {
          "_context": [],
          "length": 0,
          "position": 0,
          "size": 0,
        }
      `);
      expect(stringList.size).toStrictEqual(0);
      expect(stringList.length).toStrictEqual(0);
      expect(stringList.position).toStrictEqual(0);
    });
  });
  describe("List method calll", () => {
    it("Should can be append any element and computed the properties", () => {
      const data = new List<string>();
      data.append("name");
      data.append("value");

      const persons = new List<Person>();
      persons.append({
        name: "hakim",
        age: 20,
      });
      persons.find((person) => person.name === "hakim");
    });
    it("Should can be append multiple elements", () => {
      const persons = new List<Partial<Person>>();
      const personsdata: Person[] = [
        {
          name: "Hakim",
          age: 10,
        },
        {
          name: "Hanam",
          age: 20,
        },
      ];
      persons.appends(personsdata);

      expect(persons.size).toStrictEqual(2);
    });
    it("Should can be remove any givens element and return booleans, annd decrementing their size aautomatically", () => {
      const personList = new List<Partial<Person>>();
      personList.append({
        name: "hakim",
        age: 10,
      });
      expect(personList.size).toStrictEqual(1);
      expect(personList.remove({ name: "hakim", age: 10 })).toStrictEqual(true);
      expect(personList.size).toStrictEqual(0);
      expect(personList.remove({ name: "hakim", age: 10 })).toStrictEqual(
        false,
      );

      personList.append({
        name: "hanan",
        age: 20,
      });
      expect(personList.size).toStrictEqual(1);
      expect(personList.length).toStrictEqual(1);
      personList.append({
        name: "hasan",
        age: 20,
      });
      expect(personList.length).toStrictEqual(2);
    });

    describe("insert method call", () => {
      it("should can be insert element at correct position with passing ```after``` argument", () => {
        const personLists = new List<Partial<Person>>();
        personLists.appends([
          {
            name: "hakim1",
            age: 10,
          },
          {
            name: "hanan",
            age: 10,
          },
        ]);

        personLists.insert(
          {
            name: "insert",
            age: 20,
          },
          {
            name: "hakim1",
            age: 10,
          },
        );

        console.log(personLists);
      });
      it("should can be insert element at correct position without passing ```after``` argument", () => {
        const personLists = new List<Partial<Person>>();
        personLists.appends([
          {
            name: "hakim1",
            age: 10,
          },
          {
            name: "hanan",
            age: 10,
          },
        ]);

        personLists.insert({
          name: "insert",
          age: 20,
        });
      });
    });
  });
});
