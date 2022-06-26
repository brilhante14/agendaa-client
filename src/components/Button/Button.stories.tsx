import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Button } from ".";

export default {
  title: "Button",
  component: Button,
} as ComponentMeta<typeof Button>;

export const SmallButton: ComponentStory<typeof Button> = () => (
  <Button
    onClick={() => alert("Botão pressionado")}
    size={{ width: 120, height: 32 }}
    title="Exemplo"
  />
);
