import { GestureResponderEvent } from "react-native";

export type RootStackParamList = {
    Root: undefined;
    NotFound: undefined;
};

export type BottomTabParamList = {
    TabOne: undefined;
    TabTwo: undefined;
};

export type TabOneParamList = {
    TabOneScreen: undefined;
};

export type DrawerParamList = {
    Maps: undefined;
    FileSystem: undefined;
    Clients: undefined;
};

export type MapsParamList = {
    MapsScreen: undefined;
};

export type FileSystemParamList = {
    FileSystemScreen: undefined;
};

export type ClientsParamList = {
    ClientsScreen: undefined;
};

export type onPressFunc = (event: GestureResponderEvent) => void;