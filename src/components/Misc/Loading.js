import React from "react"
import { motion } from "framer-motion"
import { VscLoading } from "react-icons/vsc"

const Loading = () => {
    return (
        <motion.div 
            className="loading-icon" 
            initial="start" 
            animate="end"
            variants={iconVar}
        >
            <VscLoading size={50} color="skyblue"/>
        </motion.div>
    )
}

export default Loading

const iconVar = {
    start: {rotate: 0},
    end: {rotate: 360, transition: {ease: "linear", duration: 3, repeat: Infinity}}
}