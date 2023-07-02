"use client";
import { useEffect, useState } from "react";
import { getCategory } from "../../../services/apiCalls";
import AppShellDemo from "../../../components/AppShell";
import { useRouter } from "next/router";
import DeleteConfirm from "../../../components/DeleteConfirm";

export default function Category() {
  const router = useRouter();

  const { id } = router.query;
  const [categoryData, setCategoryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const action = router.query.action || "default-action";
  const tableName = "categories";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const category = await getCategory(id);
        setCategoryData(category);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching category: ", error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const page = () => {
    if (loading) {
      return <p>Loading...</p>;
    }

    if (categoryData) {
      return (
        <>
          <DeleteConfirm data={categoryData} id={id} action={action} tableName={tableName}/>
        </>
      );
    }

    return <p>Category not found.</p>;
  };

  return (
    <>
      <AppShellDemo page={page} />
    </>
  );
}
