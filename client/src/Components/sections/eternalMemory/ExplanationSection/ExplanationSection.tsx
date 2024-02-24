import React from 'react'

import './ExplanationSection.scss'

const ExplanationSection = () => {
  return (
    <section className='explanationSection'>
        <div className="container">
            <div className="explanationSection__wrapper">
                <div className="explanationSection__wrapper-block"></div>
                <div className="border-r-4 explanationSection__wrapper-text"></div>
            </div>
        </div>
    </section>
  )
}

export {ExplanationSection}