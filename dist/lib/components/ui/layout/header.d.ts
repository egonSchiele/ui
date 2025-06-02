import React from "react";
export type NavigationItem = {
    name: string;
    href: string;
    selected: boolean;
};
export declare function Header({ navigation, companyName, companyLogo, actions, }: {
    navigation: NavigationItem[];
    companyName?: string;
    companyLogo?: string;
    actions?: React.ReactNode;
}): React.JSX.Element;
