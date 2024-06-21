import React, { useEffect, useState } from 'react'
import { LayoutDashboard, BriefcaseBusiness, FolderKanban, AlignStartVertical,  } from 'lucide-react'
import { motion } from 'framer-motion'
import logo from '/assets/logo.png'
import arrowRight from '/assets/arrow-right.png'
import { Link, useLocation } from 'react-router-dom'
const navLinks = [
    {
        name: "Dashboard",
        icon: LayoutDashboard,
        path: '/'
    },
    {
        name: "Experience",
        icon: BriefcaseBusiness,
        path: '/experience'
    },
    {
        name: "Projects",
        icon: FolderKanban,
        path: '/projects'
    },
    {
        name: "Skills",
        icon: AlignStartVertical,
        path: '/skills'
    },
];

const variants = {
    expanded: {width: "17%"},
    nonExpanded: {width: "5%"}
}

const arrowVariants = {
    expanded: {
        rotate: 180,
        transition: { duration: 0.5 }
    },
    nonExpanded: { 
        rotate: 0,
        transition: { duration: 0.5 }
     }
    
}

const NavigationBar = () => {

    const [activeNavIndex, setActiveNavIndex] = useState(0);
    const [isExpanded, setIsExpanded] = useState(true);

    const location = useLocation();

    useEffect(() => {
        const currentPath = location.pathname;
        const currentIndex = navLinks.findIndex(link => link.path === currentPath);
        setActiveNavIndex(currentIndex);
    } , [location.pathname])

    const handleNavItemClick = (itemNo) => {
        setActiveNavIndex(itemNo)
    }

  return (
    <motion.div animate={isExpanded ? "expanded" : "nonExpanded"} variants={variants} className={`py-12 flex flex-col border border-r-1 w-[17%] h-screen relative px-5`}>
        <div className='logo-div flex space-x-3 items-center mb-10 whitespace-nowrap'>
            <img className='w-[50px]' src={logo} alt="logo" />
            <motion.span className={`font-medium text-xl ${isExpanded ? "block" : "hidden"}`}>Seig CMS</motion.span>
        </div>

        <div className="w-5 h-5 p-[5px]  bg-[#082f49] rounded-full absolute -right-[10px] top-[60px] flex items-center justify-center cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
            <motion.img variants={arrowVariants} animate={isExpanded ? "expanded" : "nonExpanded"} src={arrowRight} alt="arrow-right" /> 
        </div>

        <div className="mt-9 flex flex-col space-y-3">
            {navLinks.map((item, index) => (
                <Link to={item.path} key={index}>
                    <div className={`flex space-x-3 p-3 rounded cursor-pointer ${isExpanded ? "" : "justify-center"}  ${activeNavIndex === index ? " bg-[#082f49] text-white  font-semibold" : ""}`} onClick={() => handleNavItemClick(index)}>
                        <item.icon />
                        <span className={isExpanded ? "block" : "hidden"}>{item.name}</span>
                    </div>
                </Link>
                
            ))}
        </div>
    </motion.div>
  )
}

export default NavigationBar