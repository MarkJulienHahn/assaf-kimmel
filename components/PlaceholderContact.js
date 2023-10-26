import styles from "./placeholder.module.css";

const PlaceholderContact = ({ info }) => {

  return (
    <div className={styles.contactWrapper}>
      {info.contact?.mail ? (
        <div className={styles.contactRow}>
          <p className={styles.contactHead}>Mail</p>
          <a href={`mailto:${info.contact?.mail}`}>{info.contact.mail}</a>
        </div>
      ) : (
        ""
      )}
      {info.contact?.phone ? (
        <div className={styles.contactRow}>
          <p className={styles.contactHead}>Phone</p>
          <p>{info.contact.phone}</p>
        </div>
      ) : (
        ""
      )}
      <br />
      {info.contact?.adressLine1 ? (
        <div className={styles.contactRow}>
          <p className={styles.contactHead}>Adress</p>
          <p>{info.contact.adressLine1}</p>
        </div>
      ) : (
        ""
      )}
      {info.contact?.adressLine2 ? (
        <div className={styles.contactRow}>
          <p className={styles.contactHead}></p>
          <p>{info.contact.adressLine2}</p>
        </div>
      ) : (
        ""
      )}{" "}
      <br />{" "}
      {info.links
        ? info.links.map((link, i) => (
            <div className={styles.contactRow} key={i}>
              <p className={styles.contactHead}></p>
              <a
                href={`mailto:${link.link}`}
                target="_black"
                rel={"noreferrer"}
              >
                {link.name}
              </a>
            </div>
          ))
        : ""}
    </div>
  );
};

export default PlaceholderContact;
