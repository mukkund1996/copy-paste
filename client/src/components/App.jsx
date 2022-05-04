import { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CopyArea from "./CopyArea";
import PasteArea from "./PasteArea";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const [isPaste, setIsPaste] = useState(true);
  const [isCopy, setIsCopy] = useState(true);

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="app">
        {isCopy && <CopyArea setIsPaste={setIsPaste} />}
        {isPaste && <PasteArea setIsCopy={setIsCopy} />}
      </div>
    </ThemeProvider>
  );
}

export default App;
