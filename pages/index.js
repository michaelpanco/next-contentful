import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import { loadDataLists } from '../services/loadPages';

export async function getStaticProps() {
    const data = await loadDataLists();

    return {
        props: {
            pages: data
        }
    };
}

function Home({ pages }) {
    const pageLists = pages.map((page, index) => {
        return (
            <div className={styles.homepageLinks} key={index}>
                <Link href={'/page/' + page.params.id}>
                    <a>{page.params.header}</a>
                </Link>
            </div>
        );
    });

    return (
        <div className={styles.container}>
            <Head>
                <title>NextJS Test</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <div className={styles.mainLabel}>Please select a page</div>
                {pageLists}
            </main>
        </div>
    );
}

export default Home;
