import React, { useState } from "react";
import { Password } from 'primereact/password';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "../assets/styles/password.css"

export default function ToggleMaskDemo() {
    const [value, setValue] = useState('');

    return (
        <div className="card justify-content-center">
            <Password value={value} onChange={(e) => setValue(e.target.value)} toggleMask />
        </div>
    );
}
