import Layout from '../components/Layout';
import '../src/app/globals.css'; // Assuming your global styles are here

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;