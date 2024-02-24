import { ReactNode } from "react";

interface ListProps<T> {
  data: T[]
  mapperData: (data: T, i: number) => ReactNode
}

function List<T>({data = [], mapperData}: ListProps<T>) {
  return (
    <>
      {data.map(mapperData)}
    </>
  );
}

export {List}