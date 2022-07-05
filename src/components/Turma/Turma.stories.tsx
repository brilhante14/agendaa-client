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
      professor: {
        nome: "Fernando Trinta",
        img: "#",
      },
      participantes: [
        {
          nome: "a",
          img: "#"
        },
        {
          nome: "b",
          img: "#"
        }
      ]
    }}
    onClick={() => alert("Elemento clicado!")}
  />
);
