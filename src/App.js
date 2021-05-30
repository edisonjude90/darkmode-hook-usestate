import { useEffect, useState } from "react";
import "./styles.css";

const useDarkMode = () => {
  const darkThemeMediaQuery = "(prefers-color-scheme: dark)";
  const [mode, setMode] = useState(() => {
    return (
      window.localStorage.getItem("themeMode") ||
      (window.matchMedia(darkThemeMediaQuery).matches ? "dark" : "light")
    );
  });

  useEffect(() => {
    const darkThemeMediaHandler = window.matchMedia(darkThemeMediaQuery);
    const handleChange = (event) => {
      console.log("cahnge", event);
      setMode(event.matches ? "dark" : "light");
    };

    darkThemeMediaHandler.addListener(handleChange);

    return () => darkThemeMediaHandler.removeListener(handleChange);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("themeMode", mode);
  }, [mode]);

  return [mode, setMode];
};

export default function App() {
  const [mode, setMode] = useDarkMode();

  useEffect(() => {
    const currentMode = mode === "light" ? "light" : "dark";
    document.getElementsByTagName("body")[0].setAttribute("class", currentMode);
  }, [mode]);

  return (
    <div>
      change theme :
      <button
        onClick={() => {
          setMode(mode === "light" ? "dark" : "light");
        }}
      >
        {mode === "light" ? "dark" : "light"}
      </button>
    </div>
  );
}
