import TestRenderer from 'react-test-renderer';
import MyInterests from '../src/MyInterests';
import React from 'react';

describe('MyInterests', () => {
    const interests = [{
        tag: 'Detailhandel',
        uuid: '1'
    }, {
        selected: true,
        tag: 'Eten & Drinken',
        uuid: '2'
    }, {
        selected: true,
        tag: 'Foodie',
        uuid: '3'
    }, {
        selected: true,
        tag: 'Junkfood',
        uuid: '4'
    }, {
        alertSelected: true,
        selected: true,
        tag: 'Supermarkt',
        uuid: '5'
    }, {
        selected: true,
        tag: 'Sommelier',
        uuid: '5'
    }];

    test('renders correctly', () => {
        let myInterests = TestRenderer.create(<MyInterests
            cardStyle="default"
            onAddInterest={() => {}}
            onDisableAlertClick={() => {}}
            onEnableAlertClick={() => {}}
            onFollowClick={() => {}}
            onUnfollowClick={() => {}}
            title="Onderwerpen aanpassen"
            titleLink="https://fd.nl/mijn-nieuws"
            interests={interests}
        />);
        expect(myInterests.toJSON()).toMatchSnapshot();

        myInterests = TestRenderer.create(<MyInterests
            cardStyle="default"
            onAddInterest={() => {}}
            onDisableAlertClick={() => {}}
            onEnableAlertClick={() => {}}
            onFollowClick={() => {}}
            onUnfollowClick={() => {}}
            title="Onderwerpen aanpassen"
            titleLink="https://fd.nl/mijn-nieuws"
            interests={interests}
        />);
        expect(myInterests.toJSON()).toMatchSnapshot();
    });

    test('renders article correctly with less items', () => {
        let myInterests = TestRenderer.create(<MyInterests
            cardStyle="article"
            onAddInterest={() => {}}
            onDisableAlertClick={() => {}}
            onEnableAlertClick={() => {}}
            onFollowClick={() => {}}
            onUnfollowClick={() => {}}
            title="Onderwerpen aanpassen"
            titleLink="https://fd.nl/mijn-nieuws"
            interests={[interests[0], interests[1], interests[2]]}
        />);
        expect(myInterests.toJSON()).toMatchSnapshot();

        myInterests = TestRenderer.create(<MyInterests
            cardStyle="default"
            onAddInterest={() => {}}
            onDisableAlertClick={() => {}}
            onEnableAlertClick={() => {}}
            onFollowClick={() => {}}
            onUnfollowClick={() => {}}
            title="Onderwerpen aanpassen"
            titleLink="https://fd.nl/mijn-nieuws"
            interests={[interests[0], interests[1], interests[2]]}
        />);
        expect(myInterests.toJSON()).toMatchSnapshot();
    });

    test('renders persoonlijk correctly', () => {
        let myInterests = TestRenderer.create(<MyInterests
            cardStyle="persoonlijk"
            onAddInterest={() => {}}
            onDisableAlertClick={() => {}}
            onEnableAlertClick={() => {}}
            onFollowClick={() => {}}
            onUnfollowClick={() => {}}
            title="Onderwerpen aanpassen"
            titleLink="https://fd.nl/mijn-nieuws"
            interests={interests}
        />);
        expect(myInterests.toJSON()).toMatchSnapshot();

        myInterests = TestRenderer.create(<MyInterests
            cardStyle="persoonlijk"
            onAddInterest={() => {}}
            onDisableAlertClick={() => {}}
            onEnableAlertClick={() => {}}
            onFollowClick={() => {}}
            onUnfollowClick={() => {}}
            title="Onderwerpen aanpassen"
            titleLink="https://fd.nl/mijn-nieuws"
            interests={interests}
        />);
        expect(myInterests.toJSON()).toMatchSnapshot();
    });
});
