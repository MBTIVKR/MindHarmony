import { MutableRefObject, useCallback, useEffect, useState } from "react";

// export interface IlinksState {
//     entyId?: string | undefined;
//     inView: boolean;
//   }
  
  interface IntersectionConfig {
    ref: (node?: Element | null | undefined) => void;
    inView: boolean;
    entry: IntersectionObserverEntry | undefined;
  }
  
  export const useIntersectionObserverLinks = (elements: IntersectionConfig[]) => {
    const [links, setLinks] = useState<string>('');
  
    useEffect(() => {
      updateLinks();
    }, [elements]);
    
    const updateLinks = () => {
      for (const element of elements) {
        const { inView, entry } = element;
        if (inView && entry) {
          setLinks(entry.target.id.replace('#', ''));
          return;
        }
      }
      // Если ни один элемент не видим, обновляем состояние для отсутствия вида
      setLinks('');
    }
    return { links};
  };