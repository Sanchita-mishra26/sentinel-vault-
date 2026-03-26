import { Routes, Route } from "react-router-dom";
import { PublicLayout } from "./components/PublicLayout";
import { AppLayout } from "./components/AppLayout";
import { Landing } from "./components/screens/Landing";
import { Auth } from "./components/screens/Auth";
import { Dashboard } from "./components/screens/Dashboard";
import { Upload } from "./components/screens/Upload";
import { Compliance } from "./components/screens/Compliance";
import { EncryptionFlow } from "./components/screens/EncryptionFlow";
import { AttackSimulation } from "./components/screens/AttackSimulation";
import { Isolation } from "./components/screens/Isolation";
import { Reconstruction } from "./components/screens/Reconstruction";
import { Recovery } from "./components/screens/Recovery";

function App() {
  return (
    <Routes>
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<Landing />} />
        <Route path="auth" element={<Auth />} />
      </Route>

      <Route path="/app" element={<AppLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="upload" element={<Upload />} />
        <Route path="compliance" element={<Compliance />} />
        <Route path="encryption" element={<EncryptionFlow />} />
        <Route path="attack" element={<AttackSimulation />} />
        <Route path="isolation" element={<Isolation />} />
        <Route path="reconstruction" element={<Reconstruction />} />
        <Route path="recovery" element={<Recovery />} />
      </Route>
    </Routes>
  );
}

export default App;