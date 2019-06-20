import React, { useState } from "react";
import { createGlobalStyle, css } from "styled-components";
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

export default function MyInterests(props: Props) {
    const [interestValue, setInterestValue] = useState('');
    const [showAll, setShowAll] = useState(false);
    const [showContent, setShowContent] = useState(true);

    const onShowMore = () => {
        setShowAll(true);
    };

    const onShowLess = () => {
        setShowAll(false);
    };

    const onFollowClick: React.ReactEventHandler<HTMLButtonElement> = (e) => {
        const currentTarget = e.currentTarget;
        if (currentTarget.getAttribute('data-selected') === 'true') {
            props.onUnfollowClick(currentTarget.getAttribute('data-tag') as string);
        } else {
            props.onFollowClick(currentTarget.getAttribute('data-tag') as string);
        }
    };

    const onEnableAlertClick: React.ReactEventHandler<HTMLElement> = (e) => {
        const currentTarget = e.currentTarget;
        props.onEnableAlertClick(currentTarget.getAttribute('data-tag') as string);
    };

    const onDisableAlertClick: React.ReactEventHandler<HTMLElement> = (e) => {
        const currentTarget = e.currentTarget;
        props.onDisableAlertClick(currentTarget.getAttribute('data-tag') as string);
    };

    const toggleShowContent = () => {
        setShowContent(!showContent);
    };

    const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.keyCode === 13) {
            setInterestValue('');
            if (props.onAddInterest) { props.onAddInterest(e.currentTarget.value); }
        }
    };

    const onInterestChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInterestValue(e.currentTarget.value);
    };

    const onAddInterest = () => {
        if (props.onAddInterest) { props.onAddInterest(interestValue); }
        setInterestValue('');
    };

    return (
        <>
            <GlobalStyle/>
            <Card cardStyle={props.cardStyle} className={`fd-my-interests${props.className ? ` ${props.className}` : ''}${showAll ? ' show-all' : ''}`}>
                <TypoGraphy className="fd-my-interests-h" textStyle="card-h">
                    <h3><span>{props.title ? props.title : 'Onderwerpen aanpassen'}</span> {showContent ? <i className="icon-chevron-up" onClick={toggleShowContent}/> : <i className="icon-chevron-down" onClick={toggleShowContent}/>}</h3>
                </TypoGraphy>
                {showContent ? <div className="content">
                    <div className="fd-my-interests-controls">
                        <div className="fd-my-interests-input"><input type="text" placeholder="Nieuw onderwerp..." onChange={onInterestChange} value={interestValue} onKeyUp={onKeyUp}/> <AddButton buttonStyle={props.cardStyle === 'persoonlijk' ? props.cardStyle : 'default'} onClick={onAddInterest}>Toevoegen</AddButton></div>
                    </div>

                    <ul>
                        {
                            props.interests.map((interest: Interest, idx: number) => {
                                if (idx > 4) { return null; }

                                return (
                                    <li key={interest.uuid}>
                                        <div className={`interest-container${interest.selected ? ' selected' : ''}`}>
                                            <a href={`${interest.link ? interest.link : `/tag/${interest.tag}`}`} title={interest.tag}>{interest.tag}</a>
                                            <span className="interest-controls">
                                                <span className={`alert${interest.alertSelected ? ' selected' : ''}`} data-addurl={interest.addAlertLink ? interest.addAlertLink : '/add-alert'} data-deleteurl={interest.addAlertLink ? interest.addAlertLink : '/add-alert'}>
                                                    <i className="default-icon icon-bell" data-tag={interest.tag} onClick={onEnableAlertClick}/>
                                                    <i className="active-icon icon-bell1" data-tag={interest.tag} onClick={onDisableAlertClick}/>
                                                </span>
                                                <FollowButton
                                                    buttonStyle={props.cardStyle === 'persoonlijk' ? props.cardStyle : 'default'}
                                                    onClick={onFollowClick}
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
                    {props.interests.length > 4 ? <>
                            <ul className="optional-content">
                                {
                                    props.interests.map((interest: Interest, idx: number) => {
                                        if (idx <= 4) { return null; }

                                        return (
                                            <li key={interest.uuid}>
                                                <div className={`interest-container${interest.selected ? ' selected' : ''}`}>
                                                    <a href={`${interest.link ? interest.link : `/tag/${interest.tag}`}`} title={interest.tag}>{interest.tag}</a>
                                                    <span className="interest-controls">
                                                        <span className={`alert${interest.alertSelected ? ' selected' : ''}`} data-addurl={interest.addAlertLink ? interest.addAlertLink : '/add-alert'} data-deleteurl={interest.addAlertLink ? interest.addAlertLink : '/add-alert'}>
                                                            <i className="default-icon icon-bell" data-tag={interest.tag} onClick={onEnableAlertClick}/>
                                                            <i className="active-icon icon-bell1" data-tag={interest.tag} onClick={onDisableAlertClick}/>
                                                        </span>
                                                        <FollowButton
                                                            buttonStyle={props.cardStyle === 'persoonlijk' ? props.cardStyle : 'default'}
                                                            onClick={onFollowClick}
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
                            <span className="show-less" onClick={onShowLess}><i className="icon-chevron-up"/><div>Toon minder</div></span>
                            <span className="show-more" onClick={onShowMore}><div>Toon meer</div><i className="icon-chevron-down"/></span>
                        </> : null}
                </div> : null}
            </Card>
        </>
    );
}

const styles = css`
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

const GlobalStyle = createGlobalStyle`${styles}`;

export const MyInterestsStyle = css`
${CardStyle}
${getAllTextStyles(['card-h'])}
${AddButtonStyle}
${FollowButtonStyle}
${styles}
`;
