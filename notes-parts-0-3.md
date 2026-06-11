**What is state?**
State is React's local snapshot of data. React renders the UI from state.

**What is a controlled component?**
A controlled component is an input whose value is controlled by React state.
Example:

```js
<input value={newName} onChange={(e) => setNewName(e.target.value)} />
```

React owns the value.

**What is useEffect?**
useEffect is a React hook used for side effects. It registers a callback function that React executes after rendering. By default, React executes the callback after every render. The dependency array determines when the callback runs again.

Examples: HTTP requests, timers, WebSockets, subscriptions, local storage

**What is a Promise?**
A promise is an object representing the eventual result of an asynchronous operation.

**What is a service module?**
A service module contains code that abstracts away the interaction with external api calls and returns an interface for frontend components to use.

**Where does React run?**
React source code lives in project files. Vite transforms and serves that code. The browser executes the React code.

**Where does the backend run?**
Here, json-server is acting as our backend.

**What is the source of truth?**
The source of truth is the authoritative location of data. In simple React apps, state may be the source of truth. In full-stack applications, the database is usually the source of truth and React state is a local snapshot of that data.
