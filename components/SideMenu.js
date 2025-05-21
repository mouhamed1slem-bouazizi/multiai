import Link from 'next/link';
import styles from '../styles/SideMenu.module.css';

export default function SideMenu() {
  return (
    <nav className={styles.sidemenu}>
      <ul>
        <li>
          <Link href="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link href="/">AI Text Generator</Link>
        </li>
        <li>
          <Link href="/image-generator">Image Generator</Link>
        </li>
        <li>
          <Link href="/video-generator">Video Generator</Link>
        </li>
        <li>
          <Link href="/audio-generator">Audio Tools</Link> 
        </li>
        
      </ul>
    </nav>
  );
}