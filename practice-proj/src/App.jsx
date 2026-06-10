import { useState } from "react";
import Note from "./components/Note";

const App = ({ notes }) => {
  const [allNotes, setAllNotes] = useState(notes);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);

  const addNote = (e) => {
    e.preventDefault();

    const newNoteObj = {
      id: String(allNotes.length + 1),
      content: newNote,
      important: Math.random() < 0.5,
    };

    setAllNotes([...allNotes, newNoteObj]);
    setNewNote("");
  };

  const notesToShow = showAll
    ? allNotes
    : allNotes.filter((note) => note.important);

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"} notes
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note key={note.id} content={note.content} />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={(e) => setNewNote(e.target.value)} />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default App;
