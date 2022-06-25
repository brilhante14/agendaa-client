import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Header from ".";

export default {
  title: "Header",
  component: Header,
} as ComponentMeta<typeof Header>;

export const NotLoggedIn: ComponentStory<typeof Header> = () => <Header />;
export const LoggedIn: ComponentStory<typeof Header> = () => (
  <Header
    profile={{
      name: "Usuário de teste",
      img: "#",
    }}
  />
);
