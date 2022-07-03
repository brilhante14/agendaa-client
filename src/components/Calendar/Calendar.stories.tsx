import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Calendar from ".";

export default {
  title: "Calendário",
  component: Calendar,
  argTypes: {
    year: {
      control: {
        type: "range",
        min: 2000,
        max: 2022,
        step: 1,
      },
    },
  },
} as ComponentMeta<typeof Calendar>;

const Template: ComponentStory<typeof Calendar> = ({
  initialYear,
  initialMonth,
}) => {
  return (
    <Calendar
      initialYear={initialYear}
      initialMonth={initialMonth}
      navigate={(d) => alert(d)}
    />
  );
};

export const Calendário = Template.bind({});
Calendário.args = {
  initialYear: 2020,
  initialMonth: 4,
};
