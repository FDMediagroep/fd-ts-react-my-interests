import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import MyInterests from '../src/MyInterests';
import { createGlobalStyle } from 'styled-components';
import uniqid from 'uniqid';

const GlobalStyle = createGlobalStyle`
    .centered {
        width: 1064px;
        margin: auto;
    }
    section.main {
        width: 100%;
        display: table;
    }

    .content-area {
        &.overview {
            background-color: #f1ded0;
        }
        &.article {
            background-color: #ffeadb;
        }
        &.persoonlijk {
            background-color: white;
        }

        main {
            display: table-cell;
        }

        aside {
            display: table-cell;
            width: 300px;
            padding-top: 1rem;
            padding-bottom: 1rem;
        }
    }
`;

class App extends PureComponent<any, any> {
    state: any = {
        checked: false,
        interests: [{
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
    };

    onAddInterest = (interest: string) => {
        if (interest.length === 0) { return; }
        const interests = [...this.state.interests, {
            tag: interest,
            uuid: uniqid()
        }];
        interests.sort((a: any, b: any) => {
            if (a.tag.toUpperCase() < b.tag.toUpperCase()) {
                return -1;
            } else if (a.tag.toUpperCase() > b.tag.toUpperCase()) {
                return 1;
            }
            return 0;
        });
        this.setState({interests});
    }

    onDisableAlertClick = (tag: string) => {
        this.setState({interests: this.state.interests.map((interest: any) => {
            if (interest.tag === tag) {
                return {...interest, alertSelected: false};
            } else {
                return interest;
            }
        })});
    }

    onEnableAlertClick = (tag: string) => {
        this.setState({interests: this.state.interests.map((interest: any) => {
            if (interest.tag === tag) {
                return {...interest, alertSelected: true};
            } else {
                return interest;
            }
        })});
    }

    onFollowClick = (tag: string) => {
        this.setState({interests: this.state.interests.map((interest: any) => {
            if (interest.tag === tag) {
                return {...interest, selected: true};
            } else {
                return interest;
            }
        })});
    }

    onUnfollowClick = (tag: string) => {
        this.setState({interests: this.state.interests.map((interest: any) => {
            if (interest.tag === tag) {
                return {...interest, selected: false, alertSelected: false};
            } else {
                return interest;
            }
        })});
    }

    render() {
        return(
            <>
                <GlobalStyle/>
                <MyInterests
                    cardStyle={this.props.cardStyle}
                    onAddInterest={this.onAddInterest}
                    onDisableAlertClick={this.onDisableAlertClick}
                    onEnableAlertClick={this.onEnableAlertClick}
                    onFollowClick={this.onFollowClick}
                    onUnfollowClick={this.onUnfollowClick}
                    title="Onderwerpen aanpassen"
                    titleLink="https://fd.nl/mijn-nieuws"
                    interests={this.state.interests}
                />
            </>
        );
    }
}

ReactDOM.render((
    <>
        <div>
            <App cardStyle="default"/>
        </div>
    </>
),
document.querySelector('.overview aside'));

ReactDOM.render((
    <>
        <div>
            <App cardStyle="article"/>
        </div>
    </>
),
document.querySelector('.article aside'));

ReactDOM.render((
    <>
        <div>
            <App cardStyle="persoonlijk"/>
        </div>
    </>
),
document.querySelector('.persoonlijk aside'));
