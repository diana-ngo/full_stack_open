const Persons = ({ persons, searchTerm }) => {
  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <>
      {personsToShow.map((person) => (
        <div key={person.name}>
          {person.name} {person.number}
        </div>
      ))}
    </>
  );
};

export default Persons;
