"use client";
import { useEffect, useState } from "react";
import { getLayer } from "../../../services/apiCalls";
import AppShellDemo from "../../../components/AppShell";
import { useRouter } from "next/router";
import DeleteConfirm from "../../../components/DeleteConfirm";
import UpdateForm from "../../../components/UpdateForm";

export default function Layer() {
  const router = useRouter();

  const { id } = router.query;
  const [layerData, setLayerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const action = router.query.action || "default-action";
  const tableName = "layers";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const layer = await getLayer(id);
        setLayerData(layer);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching layer: ", error);
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

    if (layerData) {
      if (action === "delete") {
        return (
          <DeleteConfirm
            data={layerData}
            id={id}
            action={action}
            tableName={tableName}
          />
        );
      } else if (action === "put") {
        return <UpdateForm tableName={tableName} data={layerData} id={id} action={action}  />;
      }
    }

    return <p>Layer not found.</p>;
  };

  return (
    <>
      <AppShellDemo page={page} />
    </>
  );
}
