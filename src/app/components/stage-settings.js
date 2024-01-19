import styles from '../page.module.css'
import { MdClose } from 'react-icons/md'

export default function StageSettings({stages, active, setActive, setShowSettings}) {
    
    const updateActive = index => {
        const activeSet = new Set([...active])
        if (activeSet.has(index)) {
            activeSet.delete(index)
        } else {
            activeSet.add(index)
        }
        setActive([...activeSet])
    }

    return (
        <div className={styles.fixed}>
            <div className={styles.settings}>
                <div className={styles.top}>
                    <button className={styles.close} onClick={() => setShowSettings(false)}>
                        <MdClose fontSize={24}/>
                    </button>
                </div>
                <div className={styles.toggles}>
                    {
                        stages.map(stage => {
                            const isActive = active.includes(stage.index);
                            return (
                                <div className={styles.setting} key={stage.index}>
                                    <p>{stage.name}</p>
                                    <button style={{cursor: 'pointer',backgroundColor: isActive ? '#00cc66' : '#666', justifyContent: isActive ? 'flex-end' : 'flex-start'}} onClick={() => updateActive(stage.index)}>
                                        <div className={styles.thumb}/>
                                    </button>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
  )
}