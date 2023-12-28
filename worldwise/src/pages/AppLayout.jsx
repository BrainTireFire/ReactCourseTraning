import Map from "../componets/map/Map";
import Sidebar from "../componets/sidebar/Sidebar";
import User from "../componets/User";
import styles from "./AppLayout.module.css";

function AppLayout() {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
      <User />
    </div>
  );
}

export default AppLayout;
