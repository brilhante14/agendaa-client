import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Calendar from ".";

export default {
  title: "Calendário",
  component: Calendar,
} as ComponentMeta<typeof Calendar>;

export const Abril2020: ComponentStory<typeof Calendar> = () => (
  <Calendar
    year={2020}
    month="04"
    navigate={(d) => alert(`You have selected ${d.getUTCDate()}`)}
  />
);
