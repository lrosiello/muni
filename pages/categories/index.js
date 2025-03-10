"use client"
import { useState, useEffect } from "react";
import AppShellDemo from "../../components/AppShell";
import Tables from "../../components/Tables";
import { getCategories} from "../../services/apiCalls";

export default function Categories() {

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const categories = await getCategories();
    setCategories(categories);
  };

  const page = () => {
    return (
      <Tables table={categories} tableName="categories"/>
    )
  }


  return (
    <>
      <AppShellDemo page={page}/>
    </>
  );
}