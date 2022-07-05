import React, { useEffect, useState } from "react";
import api from "../../api/api";

import "./index.css";

import searchIcon from "../../assets/svg/iconSearch.svg";
import Pagination from "../../components/Pagination";
import CardTurma from "../../components/CardTurma";

type turmasPaged = {
  data: {
    nome: string;
    professor: string;
    participantes: string[];
    comments: string[];
    _id: string;
  }[];
  numberOfPages: number;
  currentPage: number;
};

const Turmas = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [turmas, setTurmas] = useState<turmasPaged>();

  useEffect(() => {
    async function fetchData() {
      const response = await api.get(`/turmas?page=${page}`);
      return response;
    }


    fetchData().then((response) => { setTurmas(response.data) })
  }, [page]);

  useEffect(() => {
    async function fetchData() {
      const response = await api.get(`/turmas/search?searchQuery=${search}`);
      return response;
    }

    fetchData().then((response) => setTurmas(response.data));
  }, [search]);

  if (!turmas) return <div>Loading</div>;

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
        {turmas.data.map((turma, index) => {
          return <CardTurma key={index} turma={turma} />
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
