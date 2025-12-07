import React from 'react';
import { useParams } from 'react-router-dom';
import MenuBar from '../components/MenuBar/MenuBar';
import styles from './NotFound.module.css';

const NotFound: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    return (
        <>
            <MenuBar
                items={[
                    { id: 'home', label: 'Home', href: '/lavinder/' },
                    { id: 'blog', label: 'Blog', href: '/lavinder/blog' },
                ]}
            />
            <div className={styles.container}>
                <h1 className={styles.title}>404 - Not Found</h1>
                <p className={styles.message}>The page you are looking for does not exist!</p>
                {id && <p className={styles.id}>ID: {id}</p>}
            </div>
        </>
    );
}

export default NotFound;