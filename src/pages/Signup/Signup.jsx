import SignupForm from "../../components/SignupForm/SignupForm";
import styles from "./Signup.module.css";
import { useState } from "react";

function Signup(props) {
  const [message, setMessage] = useState([""]);

  const updateMessage = (msg) => {
    setMessage(msg);
  };
  return (
    <>
      <h2 className={styles.signupTitle}>Sign Up</h2>
      <p>{message}</p>
      <SignupForm {...props} updateMessage={updateMessage} />
    </>
  );
}

export default Signup;
