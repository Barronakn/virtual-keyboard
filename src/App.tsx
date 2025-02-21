import { useState } from "react";

const App = () => {
  const [text, setText] = useState<string>("");
  const [history, setHistory] = useState<string[]>([]);
  const [isShift, setIsShift] = useState<boolean>(false);
  const [keyboardvisibleLetters, setKeyboardvisibleLetters] =
    useState<boolean>(true);
  const [keyboardvisibleSymbols, setKeyboardvisibleSymbols] =
    useState<boolean>(false);

  const letters = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Z", "X", "C", "V", "B", "N", "M"],
  ];

  const symbols = [
    ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
    ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")"],
    ["-", "=", "_", "+", "[", "]", "{", "}", "\\", "|"],
    [";", ":", '"', "'", "<", ">", ",", ".", "/", "?"],
  ];

  const handleKeyPress = (key: string) => {
    setHistory((prevHistory) => [...prevHistory, text]);
    setText(text + key);
  };

  const handleDelete = () => {
    if (text) {
      setHistory((prevHistory) => [...prevHistory, text]);
      setText(text.slice(0, -1));
    }
  };

  const handleDeleteAll = () => {
    if (text) {
      setHistory((prevHistory) => [...prevHistory, text]);
      setText(text.slice(0, -text.length));
    }
  };

  const handleUndo = () => {
    if (history.length > 0) {
      const previousText = history[history.length - 1];
      setHistory((prevHistory) => prevHistory.slice(0, -1));
      setText(previousText);
    }
  };

  const handleVisibleLetters = () => {
    setKeyboardvisibleLetters(true);
    setKeyboardvisibleSymbols(false);
  };

  const handleVisibleSymbols = () => {
    setKeyboardvisibleSymbols(true);
    setKeyboardvisibleLetters(false);
  };

  const handleShift = () => {
    setIsShift(!isShift);
  };

  const handleSpace = () => {
    setHistory((prevHistory) => [...prevHistory, text]);
    setText(text + " ");
  };

  const renderKey = (key: string) => {
    return (
      <button
        key={key}
        onClick={() =>
          handleKeyPress(isShift ? key.toUpperCase() : key.toLowerCase())
        }
        className="px-6 py-3 bg-blue-500 cursor-pointer text-white rounded-md text-lg w-full"
      >
        {isShift ? key.toUpperCase() : key.toLowerCase()}
      </button>
    );
  };

  return (
    <div className="container absolute translate-x-1/2 translate-y-1/2 -top-1/2 -left-1/2 flex flex-col items-center justify-center p-4 max-w-full h-full bg-gray-100">
      <div className="mb-4 w-full max-w-lg">
        <input
          type="text"
          value={text}
          readOnly
          className="border border-gray-500 p-4 rounded-md w-full text-center text-lg"
        />
      </div>
      <div className="mb-4 flex flex-row gap-3 w-full max-w-lg justify-between">
        <button
          onClick={handleUndo}
          className="px-4 py-2 cursor-pointer bg-gray-500 text-white rounded-md w-1/3"
        >
          Ctrl+Z
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-2 cursor-pointer bg-red-500 text-white rounded-md w-1/3"
        >
          Delete
        </button>
        <button
          onClick={handleDeleteAll}
          className="px-4 py-2 cursor-pointer bg-red-700 text-white rounded-md w-1/3"
        >
          Delete All
        </button>
      </div>
      {keyboardvisibleLetters && (
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 mb-4 w-full max-w-lg items-center">
          {letters.flat().map((key) => renderKey(key))}
          <button
            onClick={handleVisibleSymbols}
            className="px-4 py-2 cursor-pointer bg-black rounded-3xl text-white text-nowrap w-fit"
          >
            ?123
          </button>
        </div>
      )}

      {keyboardvisibleSymbols && (
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 mb-4 w-full max-w-lg">
          {symbols.flat().map((key) => renderKey(key))}
          <button
            onClick={handleVisibleLetters}
            className="px-4 py-2 cursor-pointer bg-black rounded-3xl text-white text-nowrap w-fit"
          >
            ABC
          </button>
        </div>
      )}
      <div className="flex space-x-2 w-full max-w-lg">
        <button
          onClick={handleSpace}
          className="px-6 py-3 cursor-pointer bg-gray-400 text-white rounded-md w-2/3"
        >
          Space
        </button>
        <button
          onClick={handleShift}
          className="px-4 py-2 cursor-pointer bg-yellow-500 text-white rounded-md w-1/3"
        >
          Shift
        </button>
      </div>
    </div>
  );
};

export default App;
