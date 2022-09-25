import styles from "../styles/notFound/NotFound.module.css";

const NotFound = () => {

  return (
    <div className={styles.mainContainer}>
      <h1 id="myAnimation"> 404</h1>
      <p>요청하신 페이지를 찾을 수 없습니다</p>
    </div>
  );
};

export default NotFound;
