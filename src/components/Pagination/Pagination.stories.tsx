import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Pagination from ".";

export default {
  title: "Pagination",
  component: Pagination,
} as ComponentMeta<typeof Pagination>;

const Template: ComponentStory<typeof Pagination> = (args) => (
  <Pagination {...args} />
);

export const SimplePagination = Template.bind({});
SimplePagination.args = {
  totalPages: 4,
  currentPage: 2,
  onPageChange: (i: number) => alert(`Go to page ${i}`),
};
