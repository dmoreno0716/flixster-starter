// App.jsx
import { useState } from "react";
import MovieList from "./components/MovieList";
import ScrollBar from "./components/ScrollBar";

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [watchList, setWatchList] = useState([]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <button
        style={{
          position: "fixed",
          backgroundColor: "black",
          border: "none",
          cursor: "pointer",
          zIndex: 5,
        }}
        onClick={toggleSidebar}
      >
        🎥 WatchList
      </button>
      {isSidebarOpen && (
        <>
          <ScrollBar movies={watchList} />
          <div
            style={{
              position: "fixed",
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 2,
              display: isSidebarOpen ? "block" : "none",
            }}
            onClick={toggleSidebar}
          />
        </>
      )}
      <div style={{ textAlign: "center" }}>
        <header
          style={{
            backgroundColor: "#282c34",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
            color: "white",
            padding: "20px",
          }}
        >
          {/* Add header content */}
        </header>
        <MovieList setWatchList={setWatchList} />
      </div>
    </div>
  );
};

export default App;
