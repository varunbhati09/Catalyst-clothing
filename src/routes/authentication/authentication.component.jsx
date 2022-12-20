import SignUpForm from "../../components/sign-up-form/sign-up.component";
import SignInForm from "../../components/sign-in/sign-in.component";
import './authentication.components.scss';


const Authentication= () =>{


    return(
        <div className="authentication-container">
            <SignInForm />
            <SignUpForm />
        </div>
    )
};


export default Authentication;