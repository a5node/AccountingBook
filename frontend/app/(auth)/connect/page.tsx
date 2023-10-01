import { Connecter } from './components';

import styles from './connect.module.css';

export default async function Connect(): Promise<JSX.Element> {
  return (
    <div className={styles.wrap}>
      <Connecter />
    </div>
  );
}
