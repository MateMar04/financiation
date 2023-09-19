import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import IconButton from "@mui/material/IconButton";
import ClearIcon from '@mui/icons-material/Clear';

const AdvisorCardGroup = ({ advisor, onDelete }) => {
  const [showButton, setShowButton] = useState(false);

  const handleDelete = () => {
    onDelete(advisor.id_user);
  };

  return (
    <Container key={advisor.id_user}>
        <Container key={advisor.id_user}>
                <Row className='AdvisorBorder'>
                    <Col xs={2} md={2} className='"d-flex align-items-center justify-content-center'>
                        <Avatar alt="Remy Sharp" className='AvatarImg' src={'data:image/png;base64, ' + advisor?.profile_picture}>
                        </Avatar>
                    </Col>
                    <Col>
                        <Row>
                            <div className="d-flex align-items-center">
                                <strong className='PrimaryText'>
                                    <p>{advisor.first_name} {advisor.last_name}</p>
                                </strong>
                            </div>
                            <sub className='SecondaryText'>Asesor</sub>
                        </Row>
                    </Col>
                    <Col md={1} xs={1}>
                        <Row className={'justify-content-end'}>
                            {showButton && <IconButton onClick={() => DeleteAdvisor(advisor.id_user)}><ClearIcon/></IconButton>}
                        </Row>
                    </Col>
                </Row>
                <hr/>
        </Container>
        <Row className={'justify-content-end'}>
            {showButton && (
            <IconButton onClick={handleDelete}>
                <ClearIcon />
            </IconButton>
            )}
        </Row>
    </Container>
  );
};

export default AdvisorCardGroup;