import React from 'react'
import styles from './style.module.css'

function Shimmer() {
  return (
    <div>
        <div className="w-full h-[20vh] mb-4">
            <div className={styles.box1}></div>
            <div className={styles.box2}></div>
            <div className={styles.box3}></div>
        </div>
        <div className="w-full h-[20vh] mb-4">
            <div className={styles.box1}></div>
            <div className={styles.box2}></div>
            <div className={styles.box3}></div>
        </div>
        <div className="w-full h-[20vh] mb-4">
            <div className={styles.box1}></div>
            <div className={styles.box2}></div>
            <div className={styles.box3}></div>
        </div>
    </div>
  )
}

export default Shimmer