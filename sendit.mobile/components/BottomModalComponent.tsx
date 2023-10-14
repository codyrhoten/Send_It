import { Modal, View, Text, Pressable, StyleSheet } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { BlurView } from 'expo-blur';
import { useKeyboardHeight } from '@/hooks';

export function BottomModalComponent({ isVisible, children, onClose, title = undefined, height = undefined }) {
    const keyboardHeight = useKeyboardHeight();
    console.log(keyboardHeight);
    const styles = StyleSheet.create({
        modalContent: {
            borderTopLeftRadius: 35,
            borderTopRightRadius: 35,
            position: 'absolute',
            //overflow: 'hidden',
            height: typeof height === 'number' ? height : 'auto',
            width: '100%',
            bottom: keyboardHeight,
        },
        blur: {
            width: '100%',
            height: '100%',
            padding: 20,
            paddingBottom: 35
        },
        titleContainer: {
            marginBottom: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        title: {
            flexGrow: 1,
            fontSize: 18,
            fontWeight: 'bold',
            textAlign: 'center'
        },
    });

    return (
        <Modal animationType="slide" transparent={true} visible={isVisible}>
            <View style={styles.modalContent}>
                <BlurView style={styles.blur} tint="light" intensity={80}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>{title}</Text>
                        <Pressable onPress={onClose}>
                            <MaterialIcons name="close" color="#1F2328" size={24} />
                        </Pressable>
                    </View>
                    {children}
                </BlurView>
            </View>
        </Modal>
    );
}
