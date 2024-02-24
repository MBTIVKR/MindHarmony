import React, { FC, useState } from 'react'
import './AccountSection.scss'
import { refProps } from '@/Pages/AccountPage/AccountPage'
import { CompoundFrom } from '@/Components/Form/CompoundForm/CompoundForm'
import { User } from 'lucide-react'


const AccountSection: FC<refProps> = ({refrence}) => {

  const [value, setValue] = useState<boolean>(false);

  return (
    <section ref={refrence} id='#' className='accountSection'>
            <div className="accountSection__wrapper">
                <div className="accountSection__content">
                    <CompoundFrom>
                        <div className="accountSection__flexImg">
                          {value ? 
                            <CompoundFrom.Image /> : 
                              <div className="accountSection__img">
                                <User/>
                              </div>
                            }
                            <div className="accountSection__changeImg">
                                <div className="accountSection__changeImg-title">Персонализируйте свою учетную запись с помощью фотографии</div>
                                <button className='accountSection__changeImg-btn animated-button'>
                                  <span>Изменить фотографию</span>
                                  <span></span>
                                </button>
                            </div>
                        </div>
                        <CompoundFrom.TitleRow label='Изменить никнейм' title='Имя пользователя'>
                            Xtabalen
                          </CompoundFrom.TitleRow>
                    </CompoundFrom>

                    <CompoundFrom className='accountSection__persondata'>
                      <CompoundFrom.TitleRow label='Изменить данные' title='Персональные данные'/>
                      <CompoundFrom.Row title='Полное имя'>Михаил Поляков</CompoundFrom.Row>
                      <CompoundFrom.Row title='Дата рождения'>21.08.1992</CompoundFrom.Row>
                      <CompoundFrom.Row title='Страна'>Россия</CompoundFrom.Row>
                    </CompoundFrom>

                    <CompoundFrom className='accountSection__authdata'>
                      <CompoundFrom.TitleRow label='Изменить данные' title='Персональные данные'/>
                      <CompoundFrom.Row title='Адрес электронной почты'>vokubannaussa@yopmail.com</CompoundFrom.Row>
                      <CompoundFrom.Row title='Номер телефона'>Нет</CompoundFrom.Row>
                      <CompoundFrom.Row title='Пароль'>********</CompoundFrom.Row>
                    </CompoundFrom>
                </div>
            </div>  
    </section>
  )
}

export {AccountSection}