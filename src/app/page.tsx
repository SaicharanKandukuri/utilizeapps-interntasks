"use client";
import { type LucideProps, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction, useState } from "react";
import { PaginatedLucidIcons, LucideIconComponent, PaginatedLucidIconsTask } from '@/components/icons-lib/lucid/lucid_pagination';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog"
import { cn } from '@/lib/utils';

export default function Home() {
  const [Icon, setIcon] = useState<LucideIconComponent | null | undefined>();
  const [iconProps, setIconProps] = useState<LucideProps | null | undefined>();

  return (
    <div className="h-screen w-screen flex flex-col gap-4 justify-center items-center">
      <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl">
        The Icon Selector Experiment
      </h1>
      <blockquote className="mt-6 border-l-2 pl-6 italic max-w-[40%]">
        A simple icon selector with lucide, Icons imported from lucide-react, type gaurded and paginated. Press the button to open the dialog. Use the arrow buttons to navigate. After selecting an icon
      </blockquote>
      <div className='border-4 border-dashed p-4 rounded-lg'>
        <IconSelectorPopOver setIcon={setIcon} pickerWidth={400} pickerHeight={400} />
      </div>

      <div className='flex flex-row border-2 border-dashed p-4 rounded-lg'>
        <div>{Icon ? <Icon {...iconProps} /> : null}</div>
        <div className="ml-4">{Icon ? <h3 className="text-lg font-bold">{Icon.displayName}</h3> : null}</div>
      </div>
    </div>
  )
  
}

interface Props {
  rowsInOnePage?: number
  columnsInOnePage?: number
  iconHeight?: number
  iconWidth?: number
  pickerWidth: number
  pickerHeight: number
  setIcon: Dispatch<SetStateAction<LucideIconComponent | null | undefined>>
}

function IconSelectorPopOver({ ...props }: Props) { 
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Select Icon</Button>
      </PopoverTrigger>
      <PopoverContent style={{ width: props.pickerWidth, height: props.pickerHeight }} >
        <Card>
          <CardHeader>
            <CardTitle>Select App Icon</CardTitle>
            <CardDescription>
              Select any app icon from the list below, use the arrow button in the corner to navigate.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PaginatedLucidIconsTask
              max_content={10}
              page={page}
              columnsInOnePage={props.columnsInOnePage || 5}
              rowsInOnePage={ props.rowsInOnePage || 2 }
              iconHeight={ props.iconHeight || 24 }
              iconWidth={ props.iconWidth || 24 }
              setIcon={props.setIcon}
              setTotal={setPageCount}
            />
          </CardContent>
          <CardFooter className='flex justify-center items-center text-gray-700 font-mono mt-2'>
            <p>Result {page}/{pageCount.toFixed(0)}</p>
            <Button variant="outline" onClick={() => setPage(page - 1)}><ArrowLeft /></Button>
            <Button variant="outline" onClick={() => setPage(page + 1)}><ArrowRight /></Button>
          </CardFooter>
       </Card>
      </PopoverContent>
    </Popover>
  )
}

/**
 * Old Icon Selector with dialog prototype before reading problem statement
 */
function IconSelectorDialog({ ...props }: Props) {
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  return (
    <Dialog >
      <DialogTrigger asChild>
        <Button variant="outline">Select Icon</Button>
      </DialogTrigger>
      <DialogContent className={cn()}>
        <DialogHeader>
          <DialogTitle>Select App Icon</DialogTitle>
          <DialogDescription>
            Select any app icon from the list below, use the arrow button in the corner to navigate.
          </DialogDescription>
        </DialogHeader>
        <DialogClose asChild>
          <PaginatedLucidIcons max_content={40} page={page} setIcon={props.setIcon} setTotal={setPageCount} />
        </DialogClose>
        <DialogFooter className='flex justify-center items-center text-gray-700 font-mono mt-2'>
          <p>Result {page}/{pageCount.toFixed(0)}</p>
          <Button variant="outline" onClick={() => setPage(page - 1)}><ArrowLeft /></Button>
          <Button variant="outline" onClick={() => setPage(page + 1)}><ArrowRight /></Button>
          <DialogClose asChild>
            <Button>Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}


