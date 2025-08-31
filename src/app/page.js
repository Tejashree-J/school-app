import Link from "next/link";
import styles from "./page.module.css"

export default function Home() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to SchoolApp</h1>
      <p>Manage schools easily with Add & View pages.</p>
      <div className={styles.buttons}>
        <Link href="/addSchool"><button className={styles.addSchool}>Add School</button></Link>
        <Link href="/showSchools"><button className={styles.showSchools}>View Schools</button></Link>
      </div>
    </div>
  );
}
