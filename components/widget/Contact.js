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
          <div className={styles.contactRow}>
            <p className={styles.contactLeft}>Contact</p>{" "}
            <div>
              {contact.contact?.mail && (
                <div className={styles.contactPart}>
                  <p>Mail</p>
                  <a
                    className={styles.contactHead}
                    href={`mailto:${contact.contact?.mail}`}
                  >
                    {contact.contact.mail}
                  </a>
                </div>
              )}

              {contact.contact?.phone && (
                <div className={styles.contactPart}>
                  <p>Phone</p>
                  <p className={styles.contactHead}>{contact.contact.phone}</p>
                </div>
              )}

              {contact.contact?.addressLine1 && (
                <div className={styles.contactPart}>
                  <p>Address</p>
                  <p className={styles.contactHead}>
                    {contact.contact.addressLine1}
                  </p>
                  <p className={styles.contactHead}>
                    {contact.contact?.addressLine2}
                  </p>
                </div>
              )}

              {contact.links &&
                contact.links.map((link, i) => (
                  <div className={styles.contactRow} key={i}>
                    <a
                      className={styles.contactHead}
                      href={link.link}
                      target="_black"
                      rel={"noreferrer"}
                    >
                      {link.name}
                    </a>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
