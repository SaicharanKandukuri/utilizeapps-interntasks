"use client";
import * as c from 'lucide-react';
import { type LucideProps } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Dispatch, FC, SetStateAction, useState } from "react";

type LucideIconComponent = React.ForwardRefExoticComponent<LucideProps & React.RefAttributes<SVGSVGElement>>;

export default function Home() {
  const [Icon, setIcon] = useState<LucideIconComponent | null | undefined>();
  const [ page, setPage ] = useState(0);

  return (
    <div className="p-4">
      <PaginatedLucidIcons max_content={10} page={page} setIcon={setIcon} />
      <p>Result</p>
      <div>{
        Icon ? <Icon /> : null
      }</div>

      <Button onClick={() => setPage(page + 1)}>Next</Button>
    </div>
  )
  
}

const isValidComponent = (value: any): value is LucideIconComponent => {
  return typeof value === 'function' || (typeof value === 'object' && value.$$typeof === Symbol.for('react.forward_ref'));
};

const getIcon = (iconName: string): LucideIconComponent | undefined => {
  const icon = c[iconName as keyof typeof c];
  return isValidComponent(icon) ? icon : undefined;
};

function PaginatedLucidIcons({
  max_content,
  page,
  setIcon
}: {
  max_content: number;
  page: number;
  setIcon?: Dispatch<SetStateAction<LucideIconComponent | null | undefined>>;
}) {

  const icons = Object.entries(c)
    .filter(([_, component]) => isValidComponent(component))
    .slice(max_content * page, max_content * (page + 1)) as [string, LucideIconComponent][];

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
        <div key={name} className="flex flex-col items-center">
          <Icon size={24} onClick={() => onIconClickHandler(name)}  />
        </div>
      ))}
    </div>
  );
}
