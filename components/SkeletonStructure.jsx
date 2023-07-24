import {Skeleton } from "@mantine/core";
import { useEffect } from "react";

const SkeletonStructure = ({loading, setLoading})=>{

    useEffect(() => {
        const delay = setTimeout(() => {
          setLoading(false);
        }, 1000);
        return () => clearTimeout(delay);
      }, []);

    return (
        <>
        <Skeleton height={50} count={10} style={{margin:10}} />
        <Skeleton height={50} count={10} style={{margin:10}}/>
        <Skeleton height={50} count={10} style={{margin:10}}/>
        <Skeleton height={50} count={10} style={{margin:10}}/>
        <Skeleton height={50} count={10} style={{margin:10}}/>
        <Skeleton height={50} count={10} style={{margin:10}}/>
        <Skeleton height={50} count={10} style={{margin:10}}/>
        <Skeleton height={50} count={10} style={{margin:10}}/>
        </>
    )
}

export default SkeletonStructure;