import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { getVisits } from "../services/VisitServices";
import { TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import { Col, Container, Row } from "react-bootstrap";
import FlotantButton from "../components/FlotantButton";
import { Link } from "react-router-dom";
import LoadingModal from "../components/LoadingModal";

import {Pagination} from "antd";
import {VisitCard} from "../components/VisitCard";
import "../assets/styles/VisitPage.css";


export const VisitsPage = () => {
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  

 

  let { authTokens } = useContext(AuthContext);
  let [visits, setVisits] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const totalItems = visits.length;
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredVisits, setFilteredVisits] = useState([]);
  const [filterActive, setFilterActive] = useState(false);
  const [showloading, setShowloading] = useState(false);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const fetchVisits = () => {
    setShowloading(true);
    getVisits(authTokens.access)
      .then((data) => {
        setVisits(data);
      })
      .finally(() => {
        setShowloading(false);
      });
  };

  const handleDeleteSuccess = () => {
    fetchVisits();
  };

  useEffect(() => {
    fetchVisits();
  }, []);
  
  const currentData = filterActive
    ? filteredVisits.slice(startIndex, endIndex)
    : visits.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSizeChange = (number) => {};

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = visits.filter((visit) => {
      return visit.location_name && visit.location_name.toLowerCase().includes(query);
    });

    setFilteredVisits(filtered);
    setFilterActive(true);
    setCurrentPage(1);
  };

  const totalFilteredItems = filteredVisits.length;
  const totalFilteredPages = Math.ceil(totalFilteredItems / itemsPerPage);

  return (
    <Container>
      <Container>
        <Link to="/visits/add/">
          <FlotantButton name={"Nueva Visita"} />
        </Link>
      </Container>
      <Row className="justify-content-center text-center">
        <Col md={10}>
          <TextField
            fullWidth
            id="SearchVisit"
            variant="outlined"
            label="Buscar"
            className="SearchVisit"
            InputProps={{
              sx: { borderRadius: 5, color: "black" },
              endAdornment: (
                <IconButton>
                  <SearchIcon />
                </IconButton>
              ),
            }}
            value={searchQuery}
            onChange={handleSearch}
          />
        </Col>
      </Row>

      <Container>
        <Row className="justify-content-center text-center">
          <Col md={8}>
            {currentData.map((visit, i) => (
              <VisitCard key={i} visit={visit} onDeleteSuccess={handleDeleteSuccess}/>
            ))}
          </Col>
        </Row>
        {filterActive ? (
          <Pagination
            className="justify-content-center text-center visit-pagination-menu"
            defaultCurrent={1}
            onChange={handlePageChange}
            total={totalFilteredItems}
            defaultPageSize={itemsPerPage}
            showSizeChanger={false}
            current={currentPage}
          />
        ) : (
          <Pagination
            className="justify-content-center text-center visit-pagination-menu"
            defaultCurrent={1}
            onChange={handlePageChange}
            total={totalItems}
            defaultPageSize={itemsPerPage}
            showSizeChanger={false}
            current={currentPage}
          />
        )}
            </Container>
            <Container> 
                <LoadingModal message="cargando" show={showloading}/>
            </Container>
    </Container>
  );
};
