import { ReactFlowProvider } from "@xyflow/react";
import AutomationBuilder from "./components/AutomationBuilder";
import { DnDProvider } from "./contexts/DnDContext";
import { ModalContextProvider } from "./contexts/ModalContext";
import { NodeContextProvider } from "./contexts/NodeContext";
import styles from "./page.module.css";
import { DetailsBar } from "./components/detailsBar";

const Home = () => {
  return (
    <div className={styles.main}>
      <ReactFlowProvider>
        <DnDProvider>
          <ModalContextProvider>
            <NodeContextProvider>
              <AutomationBuilder />
              <DetailsBar />
            </NodeContextProvider>
          </ModalContextProvider>
        </DnDProvider>
      </ReactFlowProvider>
    </div>
  );
};

export default Home;
