// Styles
import UserRoutes from "./routes";
import { GlobalStyle } from "./styles/global";

// Renderer
export function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <UserRoutes />
    </div>
  );
}