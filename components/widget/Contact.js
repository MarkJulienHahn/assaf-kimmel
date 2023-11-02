import { useEffect } from "react";
import styles from "./widget.module.css";

const Contact = ({ contact }) => {
  useEffect(() => {
    history.replaceState(null, "", `/contact`);
  }, []);
  return (
    <div className={styles.outer}>
      <div className={styles.left}></div>
      <div className={styles.inner}>
        <div className={styles.contactWrapper}>
          {contact.contact?.mail ? (
            <div className={styles.contactRow}>
              <p className={styles.contactHead}>Mail</p>
              <a href={`mailto:${contact.contact?.mail}`}>
                {contact.contact.mail}
              </a>
            </div>
          ) : (
            ""
          )}
          {contact.contact?.phone ? (
            <div className={styles.contactRow}>
              <p className={styles.contactHead}>Phone</p>
              <p>{contact.contact.phone}</p>
            </div>
          ) : (
            ""
          )}
          <br />
          {contact.contact?.addressLine1 ? (
            <div className={styles.contactRow}>
              <p className={styles.contactHead}>Address</p>
              <p>{contact.contact.addressLine1}</p>
            </div>
          ) : (
            ""
          )}
          {contact.contact?.addressLine2 ? (
            <div className={styles.contactRow}>
              <p className={styles.contactHead}></p>
              <p>{contact.contact.addressLine2}</p>
            </div>
          ) : (
            ""
          )}{" "}
          <br />{" "}
          {contact.links
            ? contact.links.map((link, i) => (
                <div className={styles.contactRow} key={i}>
                  <p className={styles.contactHead}></p>
                  <a href={link.link} target="_black" rel={"noreferrer"}>
                    {link.name}
                  </a>
                </div>
              ))
            : ""}
        </div>{" "}
      </div>{" "}
    </div>
  );
};

export default Contact;
