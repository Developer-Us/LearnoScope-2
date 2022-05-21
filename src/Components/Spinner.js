import React from 'react'
import '../Styles/Spinner.css';

export default function Spinner() {
    return (
        <div style={{ width: "30%", height: "30%" }} id="Spinner" className="my-auto">
            <div className="text-center" style={{ height: "10em", marginTop: "20px" }}>
                <div className="lds-ripple"><div></div><div></div></div>
            </div>
        </div>
    )
}
