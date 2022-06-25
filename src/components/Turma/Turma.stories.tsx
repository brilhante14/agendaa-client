import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Turma from ".";

export default {
  title: "Turma",
  component: Turma,
} as ComponentMeta<typeof Turma>;

export const Default: ComponentStory<typeof Turma> = () => (
  <Turma
    turma={{
      nome: "Desenvolvimento de Software para Web",
      professor: "Fernando Trinta",
      participantes: 20,
    }}
    onClick={() => alert("Elemento clicado!")}
  />
);
