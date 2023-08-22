import { CaretLeft } from "phosphor-react";
import { Link } from "react-router-dom";
import Header from "../components/header";
import { NotLoggedIn } from "../components/settings/not-logged-in";
import pageStyles from "./page.module.css";
import styles from "./settings.module.css";
import {
  getAccountEmail,
  registerAccount,
  setAccountEmail,
} from "../storage/cloud/cloud-auth";

const Settings = () => {
  const handleGetAccountEmail = async () => {
    return getAccountEmail();
  };
  const handleSetAccountEmail = async (email: string) => {
    return setAccountEmail(email);
  };
  const handleRegisterAccount = async () => {
    return registerAccount();
  };

  return (
    <div>
      <Header
        Left={
          <Link to={"/"} aria-label="Zurück">
            <CaretLeft className={styles.back} />
          </Link>
        }
        title="Einstellungen"
      />
      <div className={pageStyles.page}>
        <NotLoggedIn
          getAccountEmail={handleGetAccountEmail}
          setAccountEmail={handleSetAccountEmail}
          registerAccount={handleRegisterAccount}
        />
      </div>
    </div>
  );
};

export default Settings;
