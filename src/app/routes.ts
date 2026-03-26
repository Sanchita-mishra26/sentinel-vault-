import { createBrowserRouter } from "react-router";
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

export const router = createBrowserRouter([
  {
    path: "/",
    Component: PublicLayout,
    children: [
      { index: true, Component: Landing },
      { path: "auth", Component: Auth },
    ],
  },
  {
    path: "/app",
    Component: AppLayout,
    children: [
      { path: "dashboard", Component: Dashboard },
      { path: "upload", Component: Upload },
      { path: "compliance", Component: Compliance },
      { path: "encryption", Component: EncryptionFlow },
      { path: "attack", Component: AttackSimulation },
      { path: "isolation", Component: Isolation },
      { path: "reconstruction", Component: Reconstruction },
      { path: "recovery", Component: Recovery },
    ],
  },
]);
