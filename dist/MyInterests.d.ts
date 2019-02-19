import React, { PureComponent } from "react";
import { CardTypes } from "@fdmg/fd-card";
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
    state: any;
    constructor(props: Props);
    onShowMore: () => void;
    onShowLess: () => void;
    onFollowClick: React.ReactEventHandler<HTMLButtonElement>;
    onEnableAlertClick: React.ReactEventHandler<HTMLElement>;
    onDisableAlertClick: React.ReactEventHandler<HTMLElement>;
    toggleShowContent: () => void;
    onKeyUp: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    onInterestChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onAddInterest: () => void;
    render(): JSX.Element;
}
export declare const MyInterestsStyle: import("styled-components").GlobalStyleComponent<{}, import("styled-components").DefaultTheme>;
export {};
