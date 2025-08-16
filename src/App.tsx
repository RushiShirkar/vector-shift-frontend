import { AppShell } from './components/layout/AppShell';
import { BuilderPage } from './pages/BuilderPage';
import { Analytics } from "@vercel/analytics/react"

function App() {
  return (
    <>
      <Analytics />
      <AppShell>
        <BuilderPage />
      </AppShell>
    </>
  );
}

export default App;