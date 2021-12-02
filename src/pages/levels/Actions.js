import React, {Component} from 'react';
import "./style.css"
// import {ActiveIcon} from "../Constants";

const EditIcon = `<svg width="19" height="19" viewBox="0 0 19 19" fill="inherit" xmlns="http://www.w3.org/2000/svg">
<path d="M0 15.2496V18.9996H3.75L14.81 7.93957L11.06 4.18957L0 15.2496ZM17.71 5.03957C18.1 4.64957 18.1 4.01957 17.71 3.62957L15.37 1.28957C14.98 0.89957 14.35 0.89957 13.96 1.28957L12.13 3.11957L15.88 6.86957L17.71 5.03957V5.03957Z"/>
</svg>
`
const ArrowUP = `<svg width="24" height="24" viewBox="0 0 24 24" fill="inherit" xmlns="http://www.w3.org/2000/svg">
<rect x="10.5" y="6" width="2" height="13" rx="1" fill="inherit"/>
<path d="M6.20711 12.2071C5.81658 12.5976 5.18342 12.5976 4.79289 12.2071C4.40237 11.8166 4.40237 11.1834 4.79289 10.7929L10.7929 4.79289C11.1715 4.41432 11.7811 4.40107 12.1757 4.76285L18.1757 10.2628C18.5828 10.636 18.6103 11.2686 18.2372 11.6757C17.864 12.0828 17.2314 12.1103 16.8243 11.7372L11.5301 6.88414L6.20711 12.2071Z"/>
</svg>
`
const ArrowDown = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="10.5" y="6" width="2" height="13" rx="1" fill="inherit"/>
<path d="M6.20711 12.2071C5.81658 12.5976 5.18342 12.5976 4.79289 12.2071C4.40237 11.8166 4.40237 11.1834 4.79289 10.7929L10.7929 4.79289C11.1715 4.41432 11.7811 4.40107 12.1757 4.76285L18.1757 10.2628C18.5828 10.636 18.6103 11.2686 18.2372 11.6757C17.864 12.0828 17.2314 12.1103 16.8243 11.7372L11.5301 6.88414L6.20711 12.2071Z"/>
</svg>
`
const Trash = `<svg width="24" height="24" viewBox="0 0 24 24" fill="inherit" xmlns="http://www.w3.org/2000/svg">
<path d="M6 8V20.5C6 21.3284 6.67157 22 7.5 22H16.5C17.3284 22 18 21.3284 18 20.5V8H6Z" fill="inherit"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M14 4.5V4C14 3.44772 13.5523 3 13 3H11C10.4477 3 10 3.44772 10 4V4.5H5.5C5.22386 4.5 5 4.72386 5 5V5.5C5 5.77614 5.22386 6 5.5 6H18.5C18.7761 6 19 5.77614 19 5.5V5C19 4.72386 18.7761 4.5 18.5 4.5H14Z"/>
</svg>
`

const icons = [EditIcon, ArrowUP, ArrowDown, Trash]

class Actions extends Component {
    render() {
        return (
            <div className="icon-container transition-icon cursor a-i-center j-c-center display-flex">
                <div
                    className="edit-icon"
                    dangerouslySetInnerHTML={{__html: EditIcon}}
                />
                <div className="flex a-i-center j-c-center ml-7">
                    <div
                        className="arrow-icon"
                        dangerouslySetInnerHTML={{__html: ArrowUP}}
                    />
                    <div
                        className="arrow-icon arrow-down"
                        dangerouslySetInnerHTML={{__html: ArrowUP}}
                    />
                </div>
                <div
                    className="trash-icon ml-7"
                    dangerouslySetInnerHTML={{__html: Trash}}
                />
            </div>
        );
    }
}

export default Actions;