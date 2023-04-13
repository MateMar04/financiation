import React from "react"
import "../Assets/Styles/Navbar.css"
import 'bootstrap/dist/css/bootstrap.min.css';

function Navbar() {
    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">

            <div class="container">

                <a class="navbar-brand" href="#"><i class="fab fa-linkedin fa-2x"></i></a>
                <form class="input-group">
                    <input type="search" class="form-control" placeholder="¿Que estas buscando?" aria-label="Search" />
                    <button class="btn btn-outline-primary" type="button" data-mdb-ripple-color="dark" >
                        Buscar
                    </button>
                </form>

                <button class="navbar-toggler" type="button" data-mdb-toggle="collapse"
                    data-mdb-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <i class="fas fa-bars"></i>
                </button>


                <div class="collapse navbar-collapse" id="navbarSupportedContent">

                    <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link active d-flex flex-column text-center" aria-current="page" href="#"><i class="fas fa-home fa-lg"></i><span class="small">Home</span></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link d-flex flex-column text-center" aria-current="page" href="#"><i class="fas fa-user-friends fa-lg"></i><span class="small">Contacto</span></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link d-flex flex-column text-center" aria-current="page" href="#"><i class="fas fa-briefcase fa-lg"></i><span class="small">Nosotros</span></a>
                        </li>
                        
                        <li class="nav-item">
                            <a class="nav-link d-flex flex-column text-center" aria-current="page" href="#"><i class="fas fa-bell fa-lg"></i><span class="small">Notificaciones</span></a>
                        </li>
                        <li class="nav-item dropdown">
                            <a
                                class="nav-link dropdown-toggle d-flex align-items-center"
                                href="#"
                                id="navbarDropdownMenuLink"
                                role="button"
                                data-mdb-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <img
                                    src="https://mdbootstrap.com/img/Photos/Avatars/img%20(9).jpg"
                                    class="rounded-circle"
                                    height="30"
                                    alt=""
                                    loading="lazy"
                                />
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <li><a class="dropdown-item" href="#">My profile</a></li>
                                <li><a class="dropdown-item" href="#">Settings</a></li>
                                <li><a class="dropdown-item" href="#">Logout</a></li>
                            </ul>
                        </li>
                    </ul>

                </div>

            </div>

        </nav>





    );
}


export default Navbar;