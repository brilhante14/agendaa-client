import React, { useEffect, useState } from "react";
import api from "../../api/api";

import "./index.css";

import searchIcon from "../../assets/icon-search.svg";
import Pagination from "../../components/Pagination";

type turmasInfo = {
  data: {
    nome: string;
    professor: string;
    participantes: number;
    comments: string[];
    id: string;
  }[];
  numberOfPages: number;
  currentPage: number;
};

const Turmas = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [turmas, setTurmas] = useState<turmasInfo>();

  useEffect(() => {
    async function fetchData() {
      const response = await api.get(`/turmas?page=${page}`);
      return response;
    }

    fetchData().then((response) => setTurmas(response.data));
  }, [page]);

  useEffect(() => {
    async function fetchData() {
      const response = await api.get(`/turmas/search?searchQuery=${search}`);
      return response;
    }

    fetchData().then((response) => setTurmas(response.data));
  }, [search]);

  if (!turmas) return <div>Loading</div>;

  console.log(turmas);
  return (
    <div className="turmas_container">
      <h1 className="turmas_title">Turmas Cadastradas</h1>

      <div className="turmas_searchBar">
        <img
          src={searchIcon}
          alt="Search Button"
          className="turmas_searchIcon"
        />
        <input
          title="Buscar turmas"
          type="text"
          placeholder="Buscar turmas"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="turmas_search"
        />
      </div>

      <div className="turma_cardsContainer">
        {turmas.data.map((turma) => {
          return (
            <div className="turma_card" key={turma.id}>
              <div className="turma_cardHeader">
                <span className="turma_profilePic" />
                <span
                  title={turma.professor}
                >{`Professor - ${turma.professor}`}</span>
              </div>
              <p title={turma.nome}>{turma.nome}</p>
              <hr color="#DBCCCC" />
              <div className="turmas_cardFooter">
                <span>{`${turma.participantes} Participantes`}</span>
                <button className="turmas_cardButton">Entrar</button>
              </div>
            </div>
          );
        })}
      </div>

      <Pagination
        totalPages={turmas.numberOfPages}
        currentPage={page}
        onPageChange={(newPage) => setPage(newPage)}
      />
    </div>
  );
};

export default Turmas;
