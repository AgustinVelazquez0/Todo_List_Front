// src/components/Loading.js

import styles from "../App.module.css";

function Loading() {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.spinner}></div>
      <p>Loading...</p>
    </div>
  );
}

export default Loading;
