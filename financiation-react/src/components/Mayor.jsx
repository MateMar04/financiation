import React, {useContext, useEffect, useState} from 'react';
import AuthContext from "../context/AuthContext";


export const AddMayor = () => {

    let {authTokens} = useContext(AuthContext)
    let history = useNavigate()
    const [showfail, setShowfailture] = useState(false);
    const [showsuccess, setShowsuccese] = useState(false);
    const toggleModalsucceed = () => setShowsuccese(!showsuccess);
    const toggleModalfailed = () => setShowfailture(!showfail);

    let postMayor = async (e) => {
        e.preventDefault()
        let response = await fetch('api/mayors/add/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "JWT " + String(authTokens.access),
                "Accept": "application/json"
            },
            body: JSON.stringify({
                "first_name": e.target.first_name.value,
                "last_name": e.target.last_name.value,
            })
        })
        if (response.status === 200) {
            toggleModalsucceed();
            await postAdvised()
        } else if (response.status == 500) {
            toggleModalfailed();
            //alert('no se a registrado la visita (Uno de los datos ingresados no coincide con la base de datos)')
            await postAdvised()
        } else if (response.status == 401) {
            toggleModalfailed();
            //alert('no se a registrado la visita (Desautorizado)')
            await postAdvised()
        } else if (response.status == 400) {
            toggleModalfailed();
            //alert('no se a registrado la visita (Bad request)')
            await postAdvised()
        }
    }

    return (
        <Form onSubmit={postMayor}>
            <SucceedModal message="funca" show={showsuccess}/>
            <FailedModal message="funca" show={showfail}/>
            <Form.Control placeholder='Nombre del Intendente' name="first_name" type="text" required></Form.Control>
            <Form.Control placeholder='Apellido del Intendente' name="last_name" type="text" required></Form.Control>
            <Button type="submit">Registrar</Button>
        </Form>
    )
}