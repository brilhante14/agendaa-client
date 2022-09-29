import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Material from ".";

export default {
  title: "Material",
  component: Material,
} as ComponentMeta<typeof Material>;

export const Default: ComponentStory<typeof Material> = () => (
  <Material
    nome="Material"
    authorId={56}
    link="#"
    deleteItem={() => alert("Item deletado")}
  />
);
