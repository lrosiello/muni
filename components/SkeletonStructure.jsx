import {Skeleton } from "@mantine/core";
import { useEffect } from "react";

const SkeletonStructure = ({loading, setLoading})=>{

    useEffect(() => {
        const delay = setTimeout(() => {
          setLoading(false);
        }, 2000);
        return () => clearTimeout(delay);
      }, [setLoading]);

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