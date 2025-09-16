import Image from "next/image";
import styles from "./page.module.css";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
export default function Home() {
  return (
    <div >
     <LoginForm/>
     <SignUpForm/>
    </div>
  );
}
