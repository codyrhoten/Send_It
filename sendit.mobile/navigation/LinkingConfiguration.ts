/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */
import * as Linking from 'expo-linking';

export default {
    prefixes: [Linking.createURL('/')],
    config: {
        screens: {
            Root: {
                screens: {
                    Maps: {
                        screens: {
                            MapsScreen: 'maps'
                        }
                    },
                    FileSystem: {
                        screens: {
                            FileSystemScreen: 'filesystem'
                        }
                    },
                    Clients: {
                        screens: {
                            ClientsScreen: 'clients'
                        }
                    }
                },
            },
            NotFound: '*',
        },
    },
};
