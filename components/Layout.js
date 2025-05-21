import SideMenu from './SideMenu';
import styles from '../styles/Layout.module.css';


export default function Layout({ children }) {
  return (
    <>
      <nav>
        <SideMenu />
      </nav>
      <main className={styles.content}>
        {children}
      </main>
    </>
  );
}
