import { Center, Flex, Skeleton } from "@mantine/core";
import { useEffect } from "react";
import { Container } from "rsuite";

const SkeletonMain = ({ loading, setLoading }) => {
  useEffect(() => {
    const delay = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(delay);
  }, [setLoading]);

  return (
    <>
      <Container style={{ display: Flex, justifyItems: Center }}>
        <Skeleton width="90%" height={150} count={10} style={{ margin: 10 }} />
      </Container>
    </>
  );
};

export default SkeletonMain;
