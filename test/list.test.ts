import { expect, it, describe } from "vitest";
import { List } from "../src";
export interface Person {
  name: string;
  age: number;
}
describe("List", () => {
  describe("List Constructor Callee", () => {
    it("A List class Should can be instantiated within generic type parameter", () => {
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
  describe("List method call by categorized", () => {
    describe("Mutation Methods Call", () => {
      it("Call ``append()`` Should can be append any element and computed the properties", () => {
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
      it("Call ``appends()`` Should can be append multiple elements", () => {
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
      it("call ``remove()`` Should can be remove any givens element and return booleans, annd decrementing their size aautomatically", () => {
        const personList = new List<Partial<Person>>();
        personList.append({
          name: "hakim",
          age: 10,
        });
        expect(personList.size).toStrictEqual(1);
        expect(personList.remove({ name: "hakim", age: 10 })).toStrictEqual(
          true,
        );
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
      it("call ``insert()`` Should can be insert element at correct position with passing ```after``` argument", () => {
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

        expect(personLists.context[1]).toStrictEqual({
          name: "insert",
          age: 20,
        });
      });
      it("call ``insert()`` should can be insert element at correct position without passing ```after``` argument", () => {
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
        personLists.insert({
          name: "insertTwo",
          age: 10,
        });

        expect(personLists.context[2]).toStrictEqual({
          name: "insert",
          age: 20,
        });
        expect(personLists.context[3]).toStrictEqual({
          name: "insertTwo",
          age: 10,
        });
      });
    });
    describe("Iteration Methods Call", () => {
      it("call `getElement()`` Can be return a correct element for currennt position", () => {
        const personLists = new List<Person>();

        personLists.append({
          name: "person1",
          age: 20,
        });
        personLists.append({
          name: "person3",
          age: 20,
        });
        personLists.append({
          name: "person3",
          age: 20,
        });

        expect(personLists.size).toStrictEqual(3);
        expect(personLists.getElement()).toStrictEqual({
          name: "person1",
          age: 20,
        });
      });

      it("call ``next()`` and ``previoius`` should return a correct element for current position", () => {
        const personLists = new List<Person>();

        personLists.append({
          name: "person1",
          age: 10,
        });
        personLists.append({
          name: "person2",
          age: 20,
        });
        personLists.append({
          name: "person3",
          age: 30,
        });

        expect(personLists.size).toStrictEqual(3);
        personLists.next().next();
        expect(personLists.getElement()).toStrictEqual({
          name: "person3",
          age: 30,
        });
        personLists.previous();
        expect(personLists.getElement()).toStrictEqual({
          name: "person2",
          age: 20
        })
        personLists.previous();
        expect(personLists.getElement()).toStrictEqual({
          name: "person1",
          age: 10
        })
      });

      it("call ``moveTo`` any ways should return correct element for that position", () => {
        const personLists = new List<Person>();

        personLists.append({
          name: "person1",
          age: 10,
        });
        personLists.append({
          name: "person2",
          age: 20,
        });
        personLists.append({
          name: "person3",
          age: 30,
        });

        console.log(personLists.position);
        personLists.moveTo(3);
        expect(personLists.getElement()).toStrictEqual({
          name: "person3",
          age: 30
        })
        expect(personLists.current()).toStrictEqual(personLists.position);
      })
    });
    describe("Utils Methods Call", () => {
      it("Call ``toString()`` should can return string represent the list", () => {
        const personLists = new List<Person>();
        personLists.append({
          name: "person1",
          age: 20,
        });
        personLists.append({
          name: "person3",
          age: 20,
        });
        personLists.append({
          name: "person3",
          age: 20,
        });

        expect(personLists.toString()).toStrictEqual(
          JSON.stringify(personLists.context),
        );
      });
    });
  });
});
