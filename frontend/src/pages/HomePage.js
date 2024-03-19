import React, { useEffect } from "react";
import {
  Box,
  Container,
  Text,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Link,
} from "@chakra-ui/react";
import Signin from "../components/authentication/Signin";
import Signup from "../components/authentication/Signup";
import { useHistory } from "react-router-dom";

const HomePage = () => {
  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (user) {
      history.push("/chats");
    }
  });

  return (
    <Container maxW="xl" centerContent>
      <Box
        display="flex"
        justifyContent="center"
        p={3}
        bg={"white"}
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text fontSize="4xl" fontFamily="Work Sans" color="black">
          ANUniChat
        </Text>
      </Box>
      <Box
        bg="white"
        w="100%"
        p={4}
        borderRadius="lg"
        borderWidth="1px"
        color="black"
      >
        <Tabs variant="soft-rounded">
          <TabList>
            <Tab width="50%">Signin</Tab>
            <Tab width="50%">Signup</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Signin />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
      <Box p={4} display="flex" justifyContent="center" w="100%">
        <Link
          href="https://github.com/yufeng-pan/ANUniChat"
          isExternal
          fontWeight="bold"
        >
          Visit My GitHub Repo
        </Link>
      </Box>
    </Container>
  );
};

export default HomePage;
