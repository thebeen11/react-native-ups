import {TailwindProvider} from 'tailwind-rn';
import utilities from './tailwind.json';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './navigator/RootNavigator';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://mulongo.stepzen.net/api/masked-marmot/__graphql',
  headers: {'Authorization':'apikey mulongo::stepzen.io+1000::60fe0dc468f029a227c0a7765fcf78babb1d604607c745e1bdd33540ecf5a27d'},
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    // @ts-ignore
    <TailwindProvider utilities={utilities}>
      <ApolloProvider client={client}>
      <NavigationContainer>
      <RootNavigator/>
      </NavigationContainer>
      </ApolloProvider>
    </TailwindProvider>
  );
}
