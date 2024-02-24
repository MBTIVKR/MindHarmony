import { List } from '@/Components'
import { manualData, IManualData } from './manualData'
import png from '@/Assets/img/Familytree.svg'
import './FamilyTreeSection.scss'


const FamilyTreeSection = () => {
  return (
    <section className='familyTree'>
        <div className="container">
            <div className="familyTree__wrapper">
                <div className="familyTree__title section-title section-title-lines">СЕМЕЙНОЕ ДРЕВО</div>
                <div className="familyTree__subtitle section-subtitle">Здесь мы предлагаем вам создать уникальную страницу в память о вашей семье, оставив здесь вечный след своих корней</div>
                <div className="familyTree__flex">
                    <div className="familyTree__flex-img border-r-4">
                        <img src={png} alt='png' />
                    </div>
                    <div className="familyTree__flex-manual border-r-4">
                        <List 
                            data={manualData} 
                            mapperData={(item: IManualData) => (
                                <div className="familyTree__manual-row">
                                    <div className="familyTree__manual-icon">{item.icon}</div>
                                    <div className="familyTree__manual-description">{item.description}</div>
                                </div>
                            )}/>
                        
                        <button className='familyTree__manual-btn'>
                            <span>СОЗДАТЬ ДРЕВО</span>
                            <span></span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export {FamilyTreeSection}