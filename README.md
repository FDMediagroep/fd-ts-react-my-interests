[![Build Status](https://travis-ci.org/FDMediagroep/fd-ts-react-my-interests.svg?branch=master)](https://travis-ci.org/FDMediagroep/fd-ts-react-my-interests)
[![Coverage Status](https://coveralls.io/repos/github/FDMediagroep/fd-ts-react-my-interests/badge.svg?branch=master)](https://coveralls.io/github/FDMediagroep/fd-ts-react-my-interests?branch=master)
[![npm version](https://badge.fury.io/js/%40fdmg%2Ffd-my-interests.svg)](https://badge.fury.io/js/%40fdmg%2Ffd-my-interests)


# fd-my-interests
FD-themed my interests.

# Installation
* Run `npm i -D @fdmg/fd-my-interests`

# Demo
To run the demo, check-out this repository and run `npm run build-demo`.
After the build succeeded you can open `dist/demo.html` with your webbrowser.
* [Demo](http://static.fd.nl/react/my-interests/demo.html)

# Usage
```
import MyInterests from '@fdmg/fd-my-interests';
...
<MyInterests
    cardStyle="default"
    onAddInterest={this.onAddInterest}
    onDisableAlertClick={this.onDisableAlertClick}
    onEnableAlertClick={this.onEnableAlertClick}
    onFollowClick={this.onFollowClick}
    onUnfollowClick={this.onUnfollowClick}
    title="Onderwerpen aanpassen"
    titleLink="https://fd.nl/mijn-nieuws"
    interests={[{
            tag: 'Detailhandel',
            uuid: uniqid()
        }, {
            selected: true,
            tag: 'Eten & Drinken',
            uuid: uniqid()
        }, {
            selected: true,
            tag: 'Foodie',
            uuid: uniqid()
        }, {
            selected: true,
            tag: 'Junkfood',
            uuid: uniqid()
        }, {
            alertSelected: true,
            selected: true,
            tag: 'Supermarkt',
            uuid: uniqid()
        }, {
            selected: true,
            tag: 'Sommelier',
            uuid: uniqid()
        }]
    }
/>
```
