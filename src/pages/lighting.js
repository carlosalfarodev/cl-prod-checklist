import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import TaskItem from "../components/task-item"

import { lightingData } from "../data/lighting-data"

const LightingPage = props => {
  if (window) {
    // use localStorage
    const windowGlobal = typeof window !== "undefined" && window
    let checkboxValues =
      JSON.parse(
        windowGlobal.localStorage.getItem("checkboxValues_lighting")
      ) || lightingData

    let isChecked = false
    const handleChange = e => {
      const checkboxID = parseInt(e.target.id.split("_").slice(-1))
      isChecked = !checkboxValues[checkboxID].isChecked
      checkboxValues[checkboxID].isChecked = isChecked
      windowGlobal.localStorage.setItem(
        "checkboxValues_lighting",
        JSON.stringify(checkboxValues)
      )
      checkboxValues = JSON.parse(
        windowGlobal.localStorage.getItem("checkboxValues_lighting")
      )
    }

    const handleClick = () => {
      checkboxValues.forEach(task => {
        task.isChecked = false
      })
      windowGlobal.localStorage.setItem(
        "checkboxValues_lighting",
        JSON.stringify(checkboxValues)
      )

      window.location.reload()
    }
  } else {
    return true
  }

  return (
    <Layout>
      <SEO title="LIGHTING" />
      <h1>Lighting</h1>
      <div className="menu">
        <Link to="/">Go back to the homepage</Link>
        <button className="uncheck-button" onClick={handleClick}>
          RESET
        </button>
      </div>
      <div className="checklist-container">
        {checkboxValues.map((task, index) => {
          return (
            <TaskItem
              key={index}
              number={task.taskNumber}
              value={task.taskNumber}
              time={task.taskTime}
              description={task.taskDescription}
              steps={task.taskSteps}
              change={handleChange}
              check={task.isChecked}
            />
          )
        })}
      </div>
    </Layout>
  )
}

export default LightingPage
