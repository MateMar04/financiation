import {useState} from 'react'
import { Icon } from 'react-icons-kit'
import {eye} from 'react-icons-kit/feather/eye'
import {eyeOff} from 'react-icons-kit/feather/eyeOff'


function OjoPassword() {

  const [password, setType]=useState('password');
  const [icon, setIcon]=useState(eyeOff);

  const handleToggle=()=>{    
    if(password==='password'){
      setIcon(eye);      
      setType('text');
    }
    else{
      setIcon(eyeOff);     
      setType('password');
    }
  }

  return (
    <div className='wrapper'>
        <div className='input-field'>
          <input type={password} className="fadeIn third" id="Contraseña" name='Contraseña' placeholder='Contraseña'/>
          <span onClick={handleToggle}><Icon icon={icon} size={15}/></span>
        </div>
    </div>
  );
}

export default OjoPassword;