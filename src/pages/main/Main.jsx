import React from "react";
import { CategorySelector } from "../../components/categorySelector/CategorySelector";
import { ScrollHeader } from "../../components/scrollHeader/ScrollHeader";
import { NavBar } from "../../components/navBar/NavBar";

export const Main = () => {
  return (
    <>
      <NavBar />
      <CategorySelector />
      <ScrollHeader />
    </>
  );
};
