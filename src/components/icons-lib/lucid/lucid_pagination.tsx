import * as c from 'lucide-react';
import { type LucideProps } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { DialogClose } from '@/components/ui/dialog';

export type LucideIconComponent = React.ForwardRefExoticComponent<LucideProps & React.RefAttributes<SVGSVGElement>>;

const isValidComponent = (value: any): value is LucideIconComponent => {
    return typeof value === 'function' || (typeof value === 'object' && value.$$typeof === Symbol.for('react.forward_ref'));
};

const getIcon = (iconName: string): LucideIconComponent | undefined => {
    const icon = c[iconName as keyof typeof c];
    return isValidComponent(icon) ? icon : undefined;
};

export function PaginatedLucidIcons({
    max_content,
    page,
    setIcon,
    setTotal,
}: {
    max_content: number;
    page: number;
    setIcon?: Dispatch<SetStateAction<LucideIconComponent | null | undefined>>;
    setTotal?: Dispatch<SetStateAction<number>>
}) {

    const _icons = Object.entries(c)
        .filter(([_, component]) => isValidComponent(component))
        .slice(max_content * page, max_content * (page + 1)) as [string, LucideIconComponent][];
    
    const icons = _icons
        .slice(max_content * page, max_content * (page + 1)) as [string, LucideIconComponent][];
    
    setTotal?.(Object.entries(c).length/max_content);

    const onIconClickHandler = (name: string) => {
        const IconComponent = getIcon(name);
        if (IconComponent && setIcon) {
            setIcon(IconComponent);
        }
        console.log(name, IconComponent);
    };

    return (
        <div className="grid grid-cols-5 gap-4">
            {icons.map(([name, Icon]) => (
                <Button type='submit' key={name} onClick={() => onIconClickHandler(name)} className="flex flex-col items-center">
                    <Icon size={24} />
                </Button>
            ))}
        </div>
    );
}


interface PaginatedLucidIconsProps {
    max_content: number;
    page: number;
    rowsInOnePage?: number;
    columnsInOnePage?: number;
    iconHeight?: number;
    iconWidth?: number;
    pickerWidth?: number;
    pickerHeight?: number;
    setIcon?: Dispatch<SetStateAction<LucideIconComponent | null | undefined>>;
    setTotal?: Dispatch<SetStateAction<number>>;
}

export function PaginatedLucidIconsTask({
    max_content,
    page,
    rowsInOnePage = 5, // Default to 5 rows if not provided
    columnsInOnePage = 5, // Default to 5 columns if not provided
    iconHeight = 24, // Default icon height
    iconWidth = 24, // Default icon width
    pickerWidth,
    pickerHeight,
    setIcon,
    setTotal,
}: PaginatedLucidIconsProps) {

    const allIcons = Object.entries(c).filter(([_, component]) => isValidComponent(component)) as [string, LucideIconComponent][];

    // Calculate total pages based on max_content
    const totalPages = Math.ceil(allIcons.length / max_content);
    setTotal?.(totalPages);

    // Paginate the icons for the current page
    const startIndex = max_content * page;
    const endIndex = startIndex + max_content;
    const iconsToShow = allIcons.slice(startIndex, endIndex);

    // Calculate grid styles
    const gridTemplateColumns = `repeat(${columnsInOnePage}, minmax(0, 1fr))`;
    const gridTemplateRows = `repeat(${rowsInOnePage}, auto)`;

    const onIconClickHandler = (name: string) => {
        const IconComponent = getIcon(name);
        if (IconComponent && setIcon) {
            setIcon(IconComponent);
        }
        console.log(name, IconComponent);
    };

    return (
        <div
            className="grid gap-4"
            style={{
                gridTemplateColumns,
                gridTemplateRows,
                width: pickerWidth,
                height: pickerHeight,
            }}
        >
            {iconsToShow.map(([name, Icon]) => (
                <Button key={name} onClick={() => onIconClickHandler(name)} className="flex flex-col items-center">
                    <Icon width={iconWidth} height={iconHeight} />
                </Button>
            ))}
        </div>
    );
}
