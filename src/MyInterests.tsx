import React, { PureComponent } from "react";
import { createGlobalStyle } from "styled-components";
import TypoGraphy, { getAllTextStyles } from "@fdmg/fd-typography";
import Card, { CardStyle, CardTypes } from "@fdmg/fd-card";
import { FollowButtonStyle, FollowButton, AddButton, AddButtonStyle } from "@fdmg/fd-buttons";

interface Interest {
    activeButtonText?: string;
    alertSelected?: boolean;
    addInterestLink?: string;
    addAlertLink?: string;
    buttonText?: string;
    deleteInterestLink?: string;
    deleteAlertLink?: string;
    link?: string;
    selected?: boolean;
    tag: string;
    uuid: string;
}

export interface Props {
    cardStyle: CardTypes;
    className?: string;
    onAddInterest?: (tag: string) => void;
    onDisableAlertClick: (tag: string) => void;
    onEnableAlertClick: (tag: string) => void;
    onFollowClick: (tag: string) => void;
    onUnfollowClick: (tag: string) => void;
    interests: Interest[];
    title?: string;
    titleLink?: string;
}

export default class MyInterests extends PureComponent<any, any> {
    state: any = {};

    constructor(props: Props) {
        super(props);
        this.state = {
            interestValue: '',
            showAll: false,
            showContent: true
        };
    }

    onShowMore = () => {
        this.setState({showAll: true});
    }

    onShowLess = () => {
        this.setState({showAll: false});
    }

    onFollowClick: React.ReactEventHandler<HTMLButtonElement> = (e) => {
        const currentTarget = e.currentTarget;
        if (currentTarget.getAttribute('data-selected') === 'true') {
            this.props.onUnfollowClick(currentTarget.getAttribute('data-tag') as string);
        } else {
            this.props.onFollowClick(currentTarget.getAttribute('data-tag') as string);
        }
    }

    onEnableAlertClick: React.ReactEventHandler<HTMLElement> = (e) => {
        const currentTarget = e.currentTarget;
        this.props.onEnableAlertClick(currentTarget.getAttribute('data-tag') as string);
    }

    onDisableAlertClick: React.ReactEventHandler<HTMLElement> = (e) => {
        const currentTarget = e.currentTarget;
        this.props.onDisableAlertClick(currentTarget.getAttribute('data-tag') as string);
    }

    toggleShowContent = () => {
        this.setState({showContent: !this.state.showContent});
    }

    onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.keyCode === 13) {
            const interestValue = e.currentTarget.value;
            this.setState({interestValue: ''});
            if (this.props.onAddInterest) { this.props.onAddInterest(interestValue); }
        }
    }

    onInterestChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({interestValue: e.currentTarget.value});
    }

    onAddInterest = () => {
        if (this.props.onAddInterest) { this.props.onAddInterest(this.state.interestValue); }
        this.setState({interestValue: ''});
    }

    render() {
        return(
            <>
                <GlobalStyle/>
                <Card cardStyle={this.props.cardStyle} className={`fd-my-interests${this.props.className ? ` ${this.props.className}` : ''}${this.state.showAll ? ' show-all' : ''}`}>
                    <TypoGraphy className="fd-my-interests-h" textStyle="card-h">
                        <h3><span>{this.props.title ? this.props.title : 'Onderwerpen aanpassen'}</span> {this.state.showContent ? <i className="icon-chevron-up" onClick={this.toggleShowContent}/> : <i className="icon-chevron-down" onClick={this.toggleShowContent}/>}</h3>
                    </TypoGraphy>
                    {this.state.showContent ? <div className="content">
                        <div className="fd-my-interests-controls">
                            <div className="fd-my-interests-input"><input type="text" placeholder="Nieuw onderwerp..." onChange={this.onInterestChange} value={this.state.interestValue} onKeyUp={this.onKeyUp}/> <AddButton onClick={this.onAddInterest}>Toevoegen</AddButton></div>
                        </div>

                        <ul>
                            {
                                this.props.interests.map((interest: Interest, idx: number) => {
                                    if (idx > 4) { return null; }

                                    return (
                                        <li key={interest.uuid}>
                                            <div className={`interest-container${interest.selected ? ' selected' : ''}`}>
                                                <a href={`${interest.link ? interest.link : `/tag/${interest.tag}`}`} title={interest.tag}>{interest.tag}</a>
                                                <span className="interest-controls">
                                                    <span className={`alert${interest.alertSelected ? ' selected' : ''}`} data-addurl={interest.addAlertLink ? interest.addAlertLink : '/add-alert'} data-deleteurl={interest.addAlertLink ? interest.addAlertLink : '/add-alert'}>
                                                        <i className="default-icon icon-bell" data-tag={interest.tag} onClick={this.onEnableAlertClick}/>
                                                        <i className="active-icon icon-bell1" data-tag={interest.tag} onClick={this.onDisableAlertClick}/>
                                                    </span>
                                                    <FollowButton
                                                        buttonStyle={this.props.cardStyle === 'persoonlijk' ? this.props.cardStyle : 'default'}
                                                        onClick={this.onFollowClick}
                                                        tag={interest.tag}
                                                        selected={interest.selected}
                                                        followLink={interest.addInterestLink}
                                                        unFollowLink={interest.deleteInterestLink}
                                                        followButtonText={interest.buttonText}
                                                        unFollowButtonText={interest.activeButtonText}
                                                    />
                                                </span>
                                            </div>
                                        </li>
                                    );
                                })
                            }
                        </ul>
                        {this.props.interests.length > 4 ? <>
                                <ul className="optional-content">
                                    {
                                        this.props.interests.map((interest: Interest, idx: number) => {
                                            if (idx <= 4) { return null; }

                                            return (
                                                <li key={interest.uuid}>
                                                    <div className={`interest-container${interest.selected ? ' selected' : ''}`}>
                                                        <a href={`${interest.link ? interest.link : `/tag/${interest.tag}`}`} title={interest.tag}>{interest.tag}</a>
                                                        <span className="interest-controls">
                                                            <span className={`alert${interest.alertSelected ? ' selected' : ''}`} data-addurl={interest.addAlertLink ? interest.addAlertLink : '/add-alert'} data-deleteurl={interest.addAlertLink ? interest.addAlertLink : '/add-alert'}>
                                                                <i className="default-icon icon-bell" data-tag={interest.tag} onClick={this.onEnableAlertClick}/>
                                                                <i className="active-icon icon-bell1" data-tag={interest.tag} onClick={this.onDisableAlertClick}/>
                                                            </span>
                                                            <FollowButton
                                                                buttonStyle={this.props.cardStyle === 'persoonlijk' ? this.props.cardStyle : 'default'}
                                                                onClick={this.onFollowClick}
                                                                tag={interest.tag}
                                                                selected={interest.selected}
                                                                followLink={interest.addInterestLink}
                                                                unFollowLink={interest.deleteInterestLink}
                                                                followButtonText={interest.buttonText}
                                                                unFollowButtonText={interest.activeButtonText}
                                                            />
                                                        </span>
                                                    </div>
                                                </li>
                                            );
                                        })
                                    }
                                </ul>
                                <span className="show-less" onClick={this.onShowLess}><i className="icon-chevron-up"/><div>Toon minder</div></span>
                                <span className="show-more" onClick={this.onShowMore}><div>Toon meer</div><i className="icon-chevron-down"/></span>
                            </> : null}
                    </div> : null}
                </Card>
            </>
        );
    }
}

const GlobalStyle = createGlobalStyle`
.fd-my-interests {
    display: flex;
    flex-direction: column;

    .card-h.fd-my-interests-h,
    ul {
        padding: 12px 10px;
        @media only screen and (min-width: 641px) {
            padding: 12px;
        }
        @media only screen and (min-width: 861px) {
            padding: 12px 15px;
        }
    }

    h3.fd-my-interests-h {
        min-height: 20px;
        display: flex;
        align-items: center;
    }
    h3.fd-my-interests-h > span {
        flex: 1 1 auto;
    }


    .icon-chevron-up,
    .icon-chevron-down {
        cursor: pointer;
        color: #677381;
        user-select: none;
        @media only screen and (min-width: 641px) {
            display: none;
        }
    }

    .fd-my-interests-controls,
    ul {
        padding: 0;
        margin: 0;
        list-style: none;
    }

    .fd-my-interests-controls {
        border-top: 1px solid rgba(0, 0, 0, 0.1);
    }
    .fd-my-interests-input {
        display: flex;
        margin: 10px;
        justify-content: space-between;
        height: 30px;
        input {
            flex: 1 1 auto;
            border: 0;
            background: transparent;
            outline: none;
            font-family: 'ProximaNovaRegular', sans-serif;
            font-size: 1rem;
            @media only screen and (min-width: 641px) {
                font-size: 1.0625rem;
            }
        }
    }

    li {
        display: inline-block;
        width: 100%;
        border-top: 1px solid rgba(0, 0, 0, 0.1);
        > div {
            margin: 10px;
            display: flex;
            position: relative;
            height: 30px;
        }
    }

    .interest-container a {
        flex-grow: 1;
        position: relative;
        top: 5px;
        color: #191919;
        &:hover {
            color: #49a4a2;
        }
        display: block;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        text-decoration: none;
        font-family: 'ProximaNovaRegular', Helvetica, sans-serif;
    }

    .interest-controls {
        display: flex;
        justify-content: flex-end;
        flex: 0 0 140px;

        .alert {
            margin-right: .5rem;
            color: #677381;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            i {
                display: none;
                cursor: pointer;
            }
        }
    }

    .interest-container.selected {
        .default-icon {
            display: inline;
        }
    }

    .alert.selected {
        .default-icon {
            display: none;
        }
        .active-icon {
            display: inline;
        }
    }

    .show-less,
    .optional-content {
        display: none;
    }

    .show-more {
        display: flex;
    }

    &.show-all {
        .show-less {
            display: flex;
        }
        .optional-content {
            display: block;
        }
        .show-more {
            display: none;
        }
    }

    .show-more, .show-less {
        border-top: 1px solid rgba(0,0,0,0.1);
        flex-direction: column;
        justify-content: center;
        cursor: pointer;
        padding: .5rem;
        font-family: 'ProximaNovaRegular',Helvetica,sans-serif;
        font-size: 1rem;
        @media only screen and (min-width: 641px) {
            font-size: 1.0625rem;
        }
        &:hover {
            background: rgba(0, 0, 0, 0.04);
        }
        div {
            text-align: center;
        }
        i {
            color: #677381;
            display: flex;
            align-content: center;
            justify-content: center;
        }
    }
}
`;

export const MyInterestsStyle = createGlobalStyle`
${(CardStyle as any).globalStyle.rules}
${getAllTextStyles(['card-h']).globalStyle.rules}
${(AddButtonStyle as any).globalStyle.rules}
${(FollowButtonStyle as any).globalStyle.rules}
${(GlobalStyle as any).globalStyle.rules}
`;
