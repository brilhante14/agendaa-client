import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import ProfileModal from ".";

export default {
  title: "Edição de Perfil",
  component: ProfileModal,
} as ComponentMeta<typeof ProfileModal>;

export const Default: ComponentStory<typeof ProfileModal> = () => (
  <ProfileModal isOpen={true} />
);
