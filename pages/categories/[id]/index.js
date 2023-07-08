"use client";
import { useEffect, useState } from "react";
import { getCategory } from "../../../services/apiCalls";
import AppShellDemo from "../../../components/AppShell";
import { useRouter } from "next/router";
import DeleteConfirm from "../../../components/DeleteConfirm";
import UpdateForm from "../../../components/UpdateForm";

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
      if (action === "delete") {
        return (
          <DeleteConfirm
            data={categoryData}
            id={id}
            action={action}
            tableName={tableName}
          />
        );
      } else if (action === "put") {
        return <UpdateForm data={categoryData} id={id} tableName={tableName}/>;
      }
    }

    return <p>Category not found.</p>;
  };

  return (
    <>
      <AppShellDemo page={page} />
    </>
  );
}
