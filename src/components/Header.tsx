
import styles from "../../styles/header.module.scss";
import defaultStyles from "../../styles/default.module.scss";

export const Header = () => {
  return (
    <div className={styles.fixed}>
      <h1 className={defaultStyles.title}>Journaliser</h1>
    </div>
  );
};
