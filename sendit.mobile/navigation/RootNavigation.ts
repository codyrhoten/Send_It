import { createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export function navigate(name: NavigationPaths, params?: object) {
    if (navigationRef.isReady()) {
        navigationRef.navigate(name, params);
    }
}

export enum NavigationPaths {
    DRAWER_MAIN = 'DrawerMain',
    DRAWER_ASSETS = 'DrawerAssets',
    DRAWER_SETTINGS = 'DrawerSettings',

    MAIN_TAB_CASH_FLOW = 'MainTabCashFlow',
    MAIN_TAB_SWAP = 'MainTabSwap',
    MAIN_TAB_TREASURY = 'MainTabTreasury',
    MAIN_TAB_CHAT = 'MainTabChat',

    SCREEN_CASH_FLOW = 'ScreenCashFlow',
    SCREEN_CASH_FLOW_COURIER_SEARCH = 'ScreenCashFlowCourierSearch',

    SCREEN_TREASURY = 'ScreenTreasury',

    SCREEN_CHAT = 'ScreenChat',
    SCREEN_CHAT_CONVERSATION = 'ScreenChatConversation',

    SCREEN_ASSETS = 'ScreenAssets',

    SCREEN_SWAP = 'ScreenSwap',
};
