import { Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export const recipientList = [
    {
        label: 'Add contact',
        value: 'add',
        icon: () => <AntDesign name="adduser" size={24} color="black" />
    },
    {
        label: 'Me',
        value: 'me',
        icon: () => <AntDesign name="user" size={20} color="black" />
    },
    {
        label: 'John Smith',
        value: 'js',
        icon: () => <AntDesign name="user" size={20} color="black" />
    },
    {
        label: 'Emily Johnson',
        value: 'ej',
        icon: () => <AntDesign name="user" size={20} color="black" />
    },
    {
        label: 'Michael Brown',
        value: 'mb',
        icon: () => <AntDesign name="user" size={20} color="black" />
    },
    {
        label: 'Sarah Davis',
        value: 'sd',
        icon: () => <AntDesign name="user" size={20} color="black" />
    },
    {
        label: 'Robert Wilson',
        value: 'rw',
        icon: () => <AntDesign name="user" size={20} color="black" />
    },
];

export const courierList = [
    {
        label: 'William Anderson',
        value: '1',
        rate: 1.361,
        icon: require(`../../assets/couriers/1.png`)
    },
    {
        label: 'David Clark',
        value: '2',
        rate: 1.38,
        icon: require(`../../assets/couriers/2.png`)
    },
    {
        label: 'Jennifer Martinez',
        value: '3',
        rate: 1.37,
        icon: require(`../../assets/couriers/3.png`)
    },
];

export const cryptoList = [
    {
        label: 'USDT',
        value: 'usdt',
        icon: () => <Image source={require(`../../assets/tokens/${'usdt'}.png`)} style={{ width: 20, height: 20 }} />
    },
    {
        label: 'USDC',
        value: 'usdc',
        icon: () => <Image source={require(`../../assets/tokens/${'usdc'}.png`)} style={{ width: 20, height: 20 }} />
    },
    {
        label: 'ETH',
        value: 'eth',
        icon: () => <Image source={require(`../../assets/tokens/${'eth'}.png`)} style={{ width: 20, height: 20 }} />
    }
];

export const fiatList = [
    {
        label: '$ USD',
        value: 'usd',
        alpha2code: 'us',
        title: '$ United States dollar',
        icon: () => <Image source={{ uri: 'https://flagcdn.com/h20/us.png' }} style={{ width: 30, height: 20 }} />
    },
    {
        label: '€ EUR',
        value: 'eur',
        alpha2code: 'eu',
        title: '€ Euro',
        icon: () => <Image source={{ uri: 'https://flagcdn.com/h20/eu.png' }} style={{ width: 30, height: 20 }} />
    },
    {
        label: '$ CAD',
        value: 'cad',
        alpha2code: 'ca',
        title: '$ Canadian dollar',
        icon: () => <Image source={{ uri: 'https://flagcdn.com/h20/ca.png' }} style={{ width: 30, height: 20 }} />
    },
    {
        label: '¥ CNY',
        value: 'cny',
        alpha2code: 'cn',
        title: '¥ Chinese yuan',
        icon: () => <Image source={{ uri: 'https://flagcdn.com/h20/cn.png' }} style={{ width: 30, height: 20 }} />
    },
    {
        label: '฿ THB',
        value: 'thb',
        alpha2code: 'th',
        title: '฿ Thai baht',
        icon: () => <Image source={{ uri: 'https://flagcdn.com/h20/th.png' }} style={{ width: 30, height: 20 }} />
    }
];


export type ChatModel = {
    id: string;
    title: string;
    address: string;
    avatar: number;
    participants: any[];
    messages: any[];
};

export const ChatData: ChatModel[] = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item',
        address: '0x61988e87c4d8e9e9e4567d248cad51823b071fd8',
        avatar: require(`../../assets/couriers/1.png`),
        participants: [],
        messages: [
            { text: 'Hello. I\'ll be there with cash in 30 minutes.', isMe: false },
            { text: 'Hello. Fine. I am waiting.', isMe: true }
        ],
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
        address: '0xa38d39e4266dfade14336a9ae31e1d16f4e56a95',
        avatar: require(`../../assets/couriers/2.png`),
        participants: [],
        messages: [],
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
        address: '0x3188a469339961f6e3f1ff603b85f8379dc2f227',
        avatar: require(`../../assets/couriers/3.png`),
        participants: [],
        messages: [],
    },
];