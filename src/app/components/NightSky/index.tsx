import style from './index.module.scss'

const NightSky = () => {
    return (
        <div className={style.mainContainer}>
            <div className={style.subContainer}>
                <div className={style.sky}>
                    <div className={style.stars}></div>
                    <div className={style.stars2}></div>
                    <div className={style.stars3}></div>
                    <div className={style.comet}></div>
                </div>
            </div>
        </div>
    );
}
 
export default NightSky;
