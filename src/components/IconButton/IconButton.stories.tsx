import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import IconButton from ".";
import sampleIcon from "../../assets/svg/edit.svg";

export default {
  title: "Botão com Ícone",
  component: IconButton,
  argTypes: {
    variant: {
      control: false,
    },
  },
} as ComponentMeta<typeof IconButton>;

const Template: ComponentStory<typeof IconButton> = ({
  title,
  showTitle = true,
  variant,
  icon = sampleIcon,
}) => {
  return (
    <IconButton
      title={title}
      showTitle={showTitle}
      variant={variant}
      icon={icon}
      onClick={() => alert("Botão clicado")}
    />
  );
};

export const Primary = Template.bind({});
Primary.args = {
  title: "Botão Primário",
  variant: "primary",
};
export const Secondary = Template.bind({});
Secondary.args = {
  title: "Botão Secundário",
  variant: "secondary",
};
export const Alert = Template.bind({});
Alert.args = {
  title: "Botão Importante!!!",
  variant: "alert",
};
