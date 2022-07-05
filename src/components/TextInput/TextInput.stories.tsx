import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { TextInput } from ".";

export default {
  title: "Text Input",
  component: TextInput,
} as ComponentMeta<typeof TextInput>;

const Template: ComponentStory<typeof TextInput> = (args) => (
  <TextInput {...args} />
);

export const SimpleTextInput = Template.bind({});
SimpleTextInput.args = {
  title: "Campo",
  placeholder: "Exemplo de campo",
  isSecure: false,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  }
};
