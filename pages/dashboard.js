import Head from 'next/head';
import styles from '../styles/Home.module.css'; // You can reuse or create new styles

export default function DashboardPage() {
  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Application Dashboard" />
      </Head>
      <div className={styles.main}> {/* You might want a different style container */}
        <h1 className={styles.title}>Dashboard</h1>
        <p>Welcome to your dashboard!</p>
        {/* Add dashboard content here */}
      </div>
    </>
  );
}