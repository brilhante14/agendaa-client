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
      img: "https://avatars3.githubusercontent.com/u/53905853?s=460&u=f9f8b8d8f9f8b8d8f9f8b8d8f9f8b8d8f9f8b8d&v=4",
    }}
  />
);
