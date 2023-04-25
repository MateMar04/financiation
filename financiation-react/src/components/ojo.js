import {useState} from 'react'
import {Icon} from 'react-icons-kit'
import {eye} from 'react-icons-kit/feather/eye'
import {eyeOff} from 'react-icons-kit/feather/eyeOff'


function OjoPassword() {

    const [password, setType] = useState('password');
    const [icon, setIcon] = useState(eyeOff);

    const handleToggle = () => {
        if (password === 'password') {
            setIcon(eye);
            setType('text');
        } else {
            setIcon(eyeOff);
            setType('password');
        }
    }

    return (

        <div className='input-wrapper'>

            <input type={password} className="fadeIn third" id="Contraseña" name='Contraseña' placeholder='Contraseña'/>
            <div onClick={handleToggle} className="fadeIn third"><Icon icon={icon} size={20} className='boton-puton'/>
            </div>
        </div>

    );
}

export default OjoPassword;