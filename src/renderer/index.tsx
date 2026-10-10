import "@fontsource/jetbrains-mono/latin-400.css";
import "@fontsource/jetbrains-mono/latin-700.css";
import "./styles.css";
import { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { Drill } from "./screens/Drill";
import { Home } from "./screens/Home";
import { Results } from "./screens/Results";
import { useStore } from "./store";

function App() {
  const loaded = useStore((s) => s.loaded);
  const screen = useStore((s) => s.screen);
  const sessionId = useStore((s) => s.session?.id);
  const init = useStore((s) => s.init);

  useEffect(() => {
    void init();
  }, [init]);

  if (!loaded) return null;
  if (screen === "drill") return <Drill key={sessionId} />;
  if (screen === "results") return <Results />;
  return <Home />;
}

createRoot(document.getElementById("root")!).render(<App />);
