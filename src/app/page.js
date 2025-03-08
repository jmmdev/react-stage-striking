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

  function getStages() {
    fetch("/files/stages.json")
      .then(response => response.json())
        .then(json => {
          return json;
        })
        .catch(e => alert("Stages could not be loaded. Please refresh and try again."))
      .catch(e => alert("Stages could not be loaded. Please refresh and try again."));
  }

  useEffect(() => {
    function initialize() {
      const stage_data = getStages();
      console.log(stage_data);
      const savedBanned = localStorage.getItem("rss_banned_stages");
      const savedActive = localStorage.getItem("rss_active_stages");

      if (savedBanned)
        setBanned(JSON.parse(savedBanned));

      if (savedActive)
        setActive(JSON.parse(savedActive));
      
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
          <button className="flex" disabled={language === "en"} onClick={() => setLanguage("en")}>
            <ReactCountryFlag className={`${language === 'es' ? "hover:opacity-100 opacity-50" : ""} leading-6`} countryCode="GB" svg/>
          </button>
          <button className="flex" disabled={language === "es"} onClick={() => setLanguage("es")}>
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
