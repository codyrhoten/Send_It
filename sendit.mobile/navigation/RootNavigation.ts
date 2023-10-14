import { createNavigationContainerRef } from '@react-navigation/native';
import { NavigationNames } from '../constants';

export const navigationRef = createNavigationContainerRef();

export function navigate(name: NavigationNames, params?: object) {
    if (navigationRef.isReady()) {
        navigationRef.navigate(name, params);
    }
}
