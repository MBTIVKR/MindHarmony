import Jesus from '@/Assets/img/JesusMain.svg'
import './MainSection.scss'

const MainSection = () => {
  return (
    <section className='mainSection'>
      <div className="container">
        <div className="mainSection__wrapper">
          <div className="mainSection__wrapper-content">
              <h1 className="mainSection__wrapper-title">Ваш дом в цифровой <span>бескрайней памяти</span></h1>
              <div className="mainSection__wrapper-subtitle section-subtitle">Мы создаем уникальное цифровое кладбище, где можно сохранить воспоминания о любимых людях. Позвольте светлым воспоминаниям оживиться в виртуальном пространстве, где каждый может отдать должное уважение и сохранить историю жизни</div>
              <button className='mainSection__wrapper-btn section-title animated-button'>
                <span>СОЗДАТЬ СТРАНИЦУ</span>
                <span></span>
              </button>
          </div>
          <div className="mainSection__wrapper-img">
            <img src={Jesus} alt="Jesus" />
          </div>
        </div>
      </div>
    </section>
  )
}

export {MainSection}