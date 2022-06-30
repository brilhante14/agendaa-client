import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import ProfileModal from "./ProfileModal";
import Modal from ".";

export default {
  title: "Modais",
  component: Modal,
} as ComponentMeta<typeof Modal>;

export const EdicaoDePerfil: ComponentStory<typeof Modal> = () => (
  <ProfileModal isOpen={true} />
);
