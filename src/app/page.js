'use client';
import { React, useEffect, useState } from 'react'
import { MdRestartAlt, MdSettings } from 'react-icons/md'
import Stages from './components/stages'
import StageSettings from './components/stage-settings';
import { ReactCountryFlag } from 'react-country-flag';

export default function Home() {
  const [stages, setStages] = useState([])
  const [banned, setBanned] = useState([])
  const [active, setActive] = useState([0,1,2,3,4,5,6,7,8])  
  const [showSettings, setShowSettings] = useState(false)
  const [language, setLanguage] = useState('en');

  async function getStages() {
    try {
      const response = await fetch("/files/stages.json");
      const json = await response.json();
      return json;
    } catch (e) {
      alert("Stages could not be loaded. Please refresh and try again.");
    }
  }

  useEffect(() => {
    async function initialize() {
      const stage_data = await getStages();
      const localBanned = localStorage.getItem("rss_banned_stages");
      const localActive = localStorage.getItem("rss_active_stages");
      const localLanguage = localStorage.getItem("rss_language");

      if (localBanned)
        setBanned(JSON.parse(localBanned));

      if (localActive)
        setActive(JSON.parse(localActive));
      
      if (localLanguage)
        setLanguage(localLanguage);

      if (stage_data)
        setStages(stage_data);
    }
    initialize()
  }, [])

  function bannedHandler(value) {
    localStorage.setItem("rss_banned_stages", JSON.stringify(value));
    setBanned(value);
  }

  function activeHandler(value) {
    localStorage.setItem("rss_active_stages", JSON.stringify(value));
    setActive(value);
  }

  function languageHandler(value) {
    localStorage.setItem("rss_language", value);
    setLanguage(value);
  }

  const MyButton = ({content, action}) => {
    return (
      <button className="p-1 border-2 rounded-full hover:bg-zinc-100/20" onClick={action}>
        {content}
      </button>
    )
  }

  return (
    <div className="mx-auto min-h-screen px-1.5 py-4 sm:p-4 lg:p-8 xl:p-12 flex flex-col justify-between gap-8">
      <header className="sm:flex justify-between items-end px-1.5">
        <div className="text-zinc-100">
          <p className="text-3xl mb-1 font-bold">Stage Striking</p>
          <p className="text-sm font-bold">Super Smash Bros. Ultimate</p>
        </div>
        <div className="flex gap-2 text-2xl h-fit mt-4 sm:mt-0">
          <button className="flex" disabled={language === "en"} onClick={() => languageHandler("en")}>
            <ReactCountryFlag className={`${language === 'es' ? "hover:opacity-100 opacity-50" : ""} leading-6`} countryCode="GB" svg/>
          </button>
          <button className="flex" disabled={language === "es"} onClick={() => languageHandler("es")}>
            <ReactCountryFlag className={`${language === 'en' ? "hover:opacity-100 opacity-50" : ""} leading-6`} countryCode="ES" svg/>
          </button>
        </div>
      </header>
        <Stages stages={stages} banned={banned} setBanned={bannedHandler} active={active} language={language} />
      <div className="flex gap-4 text-4xl text-zinc-100 self-center">
        {active.length > 0 &&
        <MyButton content={<MdRestartAlt />} action={() => bannedHandler([])} />
        }
        <MyButton content={<MdSettings />} action={() => {
          setShowSettings(true);
          document.documentElement.style.overflowY = "hidden";
        }} />
      </div>
      {showSettings &&
        <StageSettings stages={stages} active={active} setActive={activeHandler} setShowSettings={setShowSettings} language={language} />
      }
    </div>
  )
}
