import { Link } from "react-router-dom"
import TextInput from "../../customInputs/TextInput";

export const UserLoginUI = ({onChangeEmail, onChangePassword, handleSubmit}) => {
    return (
        <div>
          <form onSubmit={handleSubmit}>
            <TextInput label='Email' changeCallback={onChangeEmail}/>
            <TextInput label='Password' changeCallback={onChangePassword}/>        
            <div>
              <button type="submit">Login</button>
            </div>
            <Link to="/register">Register</Link>
          </form>
        </div>
      );
}
