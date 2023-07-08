"use client"
import { useState, useEffect } from "react";
import AppShellDemo from "../../components/AppShell";
import Tables from "../../components/Tables";
import { getLayers} from "../../services/apiCalls";

export default function Layers() {

  const [layers, setLayers] = useState([]);
  useEffect(() => {
    fetchLayers();
  }, []);

  const fetchLayers = async () => {
    const layers = await getLayers();
    setLayers(layers);
  };

  const page = () => {
    return (
      <Tables table={layers} tableName="layers"/>
    )
  }


  return (
    <>
      <AppShellDemo page={page}/>
    </>
  );
}