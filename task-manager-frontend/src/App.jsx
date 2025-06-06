import React from "react";
import { Provider, defaultTheme, View, Flex } from "@adobe/react-spectrum";
import TaskManager from "./TaskManager";
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:5035/graphql',
  cache: new InMemoryCache()
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Provider theme={defaultTheme}>
        <Flex
          direction="column"
          maxWidth="size-10000"
          height="100vh"
          alignItems="stretch" // Stretch to take full width
        >
          <View
            maxWidth="size-8000" 
            marginX="auto"
            padding="size-600"
            borderRadius="medium"
          >
            <TaskManager />
          </View>
        </Flex>
      </Provider>
    </ApolloProvider>
  );
}
