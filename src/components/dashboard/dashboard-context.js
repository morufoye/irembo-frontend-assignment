import React, { useState, useContext } from 'react'

const DashboardContext = React.createContext()


function Dashboardrovider({children}){
    


    return (
        <DashboardContext.Provider 
        value={
            {

            }
        }>
            {children}

        </DashboardContext.Provider>
    )
}

const useDashboard= () => useContext(DashboardContext);

export {useDashboard, Dashboardrovider}