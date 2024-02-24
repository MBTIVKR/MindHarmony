import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";

export interface IlinksState {
    entyId?: string | undefined
    inView: boolean
  }

export const useIntersectionObserverLinks = () => {
    const [links, setLinks] = useState<IlinksState>({
        entyId: '#account',
        inView: true
    });
        
    const {ref: accountRef, inView: accountCard, entry: entryAccount} = useInView({threshold: 0.3})
    const {ref: cardRef, inView: viewCard, entry: entryCard} = useInView({threshold: 0.3})
    const {ref: familyRef, inView: viewFamily, entry: entyFamily} = useInView({threshold: 0.3})
    const {ref: manualRef, inView: manualFamily, entry: entyManual} = useInView({threshold: 0.3})
    const {ref: calenderRef, inView: calenderFamily, entry: entyCalender} = useInView({threshold: 0.3})
  
    useEffect(() => {
        if(accountCard) {
          setLinks({
            entyId: entryAccount?.target.id.replace('#', ''),
            inView: accountCard
          })
        } else if (viewCard) {
          setLinks({
            entyId: entryCard?.target.id.replace('#', ' '),
            inView: viewCard
          })
        } else if (viewFamily) {
          setLinks({
            entyId: entyFamily?.target.id.replace('#', ' '),
            inView: viewFamily
          })
        } else if (manualFamily) {
          setLinks({
            entyId: entyManual?.target.id.replace('#', ' '),
            inView: manualFamily
          })
        } else if (calenderFamily) {
          setLinks({
            entyId: entyCalender?.target.id.replace('#', ' '),
            inView: calenderFamily
          })
        } else {
          setLinks({
            entyId: '',
            inView: false
          })
        }
    
      }, [calenderFamily, accountCard, viewCard, viewFamily, manualFamily])

      return { 
        refs: {
          accountRef,
          cardRef,
          familyRef,
          manualRef,
          calenderRef
        },
        links,
    } 
    
} 