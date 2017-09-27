import { svg } from './svg';

export const localData = {
    'user': {
        'id': '251733058',
        'xp': 400
    },
    'locations': [
        {
            'id': 1,
            'name': 'Дремучий лес'
        },
        {
            'id': 2,
            'name': 'Паучья пещера'
        },
        {
            'id': 3,
            'name': 'Тихое озеро'
        },
        {
            'id': 4,
            'name': 'Песчаная пустошь'
        },
        {
            'id': 5,
            'name': 'Старое болото'
        }
    ],
    'pages': {
        'main': [
            {
                name: 'profile',
                title: 'Профиль',
                icon: svg.profile,
                active: true
            },
            {
                name: 'city',
                title: 'Город',
                icon: svg.city,
                active: false
            },
            {
                name: 'location',
                title: 'Локации',
                icon: svg.location,
                active: false
            },
            {
                name: 'bosses',
                title: 'Розыск',
                icon: svg.bosses,
                active: false
            }
        ]
    }
};
