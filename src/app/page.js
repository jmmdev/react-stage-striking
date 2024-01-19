'use client';
import { useEffect, useState } from 'react'
import { MdRestartAlt, MdSettings } from 'react-icons/md'
import Image from 'next/image'

import styles from './page.module.css'
import Stages from './components/stages'
import StageSettings from './components/stage-settings';

export const getStaticProps = async () => {
    const res = await fetch('https://files/stages.json')
    const stage_data = await res.json() 

    return {
      stage_data: {
        stage_data,
      },
    }
}

export default function Home({stage_data}) {
  const [stages, setStages] = useState([])
  const [banned, setBanned] = useState([])
  const [active, setActive] = useState([0,1,2,3,4,5,6,7,10])  
  const [showSettings, setShowSettings] = useState(false)

  useEffect(() => {
    setStages(stages_data)
  }, [])

  const Settings = () => {
    if (showSettings) {
      return (
        <StageSettings stages={stages} active={active} setActive={setActive} setShowSettings={setShowSettings} />
      )
    }
    return null;
  }

  return (
    <main className={styles.main}>
      <div className={styles.logo}>
        <Image fill src={`/assets/logo.svg`} alt='Logo'/>
      </div>
      <Stages stages={stages} banned={banned} setBanned={setBanned} active={active}/>
      <div className={styles.buttons}>
          <button className={styles.button} onClick={() => setBanned([])}>
              <MdRestartAlt fontSize={36}/>
          </button>
          <button className={styles.button} onClick={() => setShowSettings(true)}>
              <MdSettings fontSize={36}/>
          </button>
      </div>
      <Settings />
    </main>
  )
}
