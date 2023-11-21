import React from "react";
import '../assets/styles/RowWithCheck.css'
import Load from "../assets/images/Loading.gif";
import {Link} from "react-router-dom";
import {Button, Col, Container, Modal, Row} from "react-bootstrap";
import { Space, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import "../assets/styles/LoadingModal.css";

const LoadingModal = (props) => {
    if (props.show) {
      return (

        // @ELQUEARREGLEESTO:  CUANDO TERMINES, DESCOMENTA LAS LINEAS DE ABAJO Y VA A CARGAR EL SPINNER LINDO!!!!!! ATTE:LAUTIN

          <div className="loading-modal">
             <LoadingOutlined size="large" tip="Cargando..." style={{
                  fontSize: 80
             }}>
              </LoadingOutlined>
        </div>
        
    )
  }
}
export default LoadingModal;
