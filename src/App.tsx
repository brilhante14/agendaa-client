// Styles
import { AuthProvider } from "./context/auth";
import UserRoutes from "./routes";
import { GlobalStyle } from "./styles/global";

// Renderer
export function App() {
  return (
    <AuthProvider>
      <div className="App">
        <GlobalStyle />
        <UserRoutes />
      </div>
    </AuthProvider>
  );
}