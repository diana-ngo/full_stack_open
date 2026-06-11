import { useState, useEffect } from "react";
import Note from "./components/Note";
import noteService from "./services/notes";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  }, []);

  const addNote = (e) => {
    e.preventDefault();

    const newNoteObj = {
      content: newNote,
      important: Math.random() < 0.5,
    };

    noteService.create(newNoteObj).then((returnedNote) => {
      setNotes([...notes, returnedNote]);
      setNewNote("");
    });
  };

  const toggleImportanceOf = (id) => {
    const note = notes.find((note) => note.id === id);
    const updatedNote = { ...note, important: !note.important };

    noteService
      .update(id, updatedNote)
      .then((returnedNote) =>
        setNotes(notes.map((note) => (note.id === id ? returnedNote : note))),
      )
      .catch((error) => {
        alert(`the note '${note.content}' was already deleted from the server`);
        setNotes(notes.filter((note) => note.id !== id));
      });
  };

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

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
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
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
