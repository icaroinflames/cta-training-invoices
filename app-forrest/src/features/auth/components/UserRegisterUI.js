import { Link } from "react-router-dom";
import TextInput from '../../customInputs/TextInput';

export const UserRegisterUI = ({handleSubmit, onChangeEmail, onChangePassword, onChangePassword2}) => {
    return (
        <div>
          <form onSubmit={handleSubmit}>
            <TextInput label='Email' changeCallback={onChangeEmail}/>
            <TextInput label='Password' changeCallback={onChangePassword}/>
            <TextInput label='Repeat password' changeCallback={onChangePassword2}/>
            <div>
              <button type="submit">Register</button>
            </div>
            <Link to="/login">Login</Link>
          </form>
        </div>
      )
}


