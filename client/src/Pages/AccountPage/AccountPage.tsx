import { AccountSection, Menu, MyCardSection, MyFamilyTreeSection, MyManualCapsul, NavigationAccount, MyCalendar } from '@/Components'
import React, {useState, useEffect} from 'react'
import { useMenu } from '@/Utils/Hooks';
import './AccountPage.scss'
import { InView, useInView } from 'react-intersection-observer';
import {useIntersectionObserverLinks } from '@/Utils/Hooks';
import { authActions } from '@/Stores/Reducers/authSlice';
import { useAppDispatch } from '@/Stores';

export interface refProps {
  refrence?: (node?: Element | null | undefined) => void
}
const AccountPage = () => {
  // const dispatch = useAppDispatch()
    
  // useEffect(() => {
  //     dispatch(authActions.getCookie())
  // }, []);

  
  const {ref: accountRef, inView: accountView, entry: accountEntry} = useInView({threshold: 0.3})
  const {ref: cardRef, inView: cardView, entry: cardEntry} = useInView({threshold: 0.3})
  const {ref: familyRef, inView: familyView, entry: familyEnty} = useInView({threshold: 0.3})
  const {ref: manualRef, inView: manualView, entry: manualEnty} = useInView({threshold: 0.3})
  const {ref: calenderRef, inView: calendarView, entry: calendarEntry} = useInView({threshold: 0.3})
  const {links} = useIntersectionObserverLinks([
    {
      ref: accountRef,
      inView: accountView,
      entry: accountEntry
    },
    {
      ref: cardRef,
      inView: cardView,
      entry: cardEntry
    },
    {
      ref: familyRef,
      inView: familyView,
      entry: familyEnty
    },
    {
      ref: manualRef,
      inView: manualView,
      entry: manualEnty
    },
    {
      ref: manualRef,
      inView: manualView,
      entry: manualEnty
    },
    {
      ref: calenderRef,
      inView: calendarView,
      entry: calendarEntry
    },
  ])

  return (
    <div>
      <div className="container">
        <div className="accountPage__wrapper">
          <div className='accountPage__wrapper-nav'>
            <NavigationAccount entryId={links}/>
          </div>
          <div className='accountPage__wrapper-content'>
            <AccountSection refrence={accountRef} />
            <MyCardSection refrence={cardRef}/>
            <MyFamilyTreeSection refrence={familyRef}/>
            <MyManualCapsul refrence={manualRef}/>
            <MyCalendar refrence={calenderRef}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountPage