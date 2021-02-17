import React from "react";
import { CategorySelector } from "../../components/categorySelector/CategorySelector";
import { ScrollHeader } from "../../components/scrollHeader/ScrollHeader";

export const MainPage = () => {
  return (
    <>
      <CategorySelector />
      <ScrollHeader />
    </>
  );
};
