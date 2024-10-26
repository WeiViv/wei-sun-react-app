import { signInWithGoogle, signOut, useAuthState } from "../utilities/firebase";

const SignInButton = () => (
    <button className="ms-auto btn btn-outline-success" onClick={signInWithGoogle}>Sign in</button>
);

const SignOutButton = () => (
    <button className="ms-auto btn btn-outline-danger" onClick={signOut}>Sign out</button>
);

const AuthButton = () => {
    const [user] = useAuthState();
    return user ? <SignOutButton /> : <SignInButton />;
};
const Banner = ({title}) => {
    return(
        <div className="tittle">
            <br/>
            <center><h1>{title}</h1></center>
            <div className="log-in">
                <AuthButton />
            </div>
        </div>
    );
};
    

export default Banner;