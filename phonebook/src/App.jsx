import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personsService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    personsService.getAll().then((allPersons) => {
      setPersons(allPersons);
    });
  }, []);

  const handlePersonSubmit = (e) => {
    e.preventDefault();

    const matchingPerson = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase(),
    );

    if (matchingPerson) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`,
        )
      ) {
        const updatedPerson = { ...matchingPerson, number: newNumber };

        personsService
          .update(matchingPerson.id, updatedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id === returnedPerson.id ? returnedPerson : person,
              ),
            );
            setNewName("");
            setNewNumber("");
          });
      }
      return;
    }

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    personsService.create(newPerson).then((person) => {
      setPersons([...persons, person]);
      setNewName("");
      setNewNumber("");
    });
  };

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name} ?`)) {
      personsService.remove(id).then(() => {
        const newPersons = persons.filter((person) => person.id !== id);
        setPersons(newPersons);
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <h2>Add a New Person</h2>
      <PersonForm
        handlePersonSubmit={handlePersonSubmit}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        searchTerm={searchTerm}
        deletePerson={deletePerson}
      />
    </div>
  );
};

export default App;
