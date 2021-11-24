import React, {Component} from 'react';
import NavContentBtn from "../../components/NavContentButton";
import { CONTENT_LINKS } from "../../components/Constants"

class Programs extends Component {
    render() {
        return (
            <div className="h-full">
                <div className="flex justify-between my-3">
                    <div className="text-2xl">
                        Программы
                    </div>
                    <div>
                        Button
                    </div>
                </div>
                <NavContentBtn
                    links={CONTENT_LINKS}
                    className="bg-white"
                />
                <div className="bg-white h-full">
                    Programms Programms Programms Programms Programms
                    Programms Programms Programms Programms Programms
                    Programms Programms Programms Programms Programms
                    Programms Programms Programms Programms Programms
                    Programms Programms Programms Programms Programms
                    Programms Programms Programms Programms Programms
                </div>
            </div>
        );
    }
}

Programs.propTypes = {};

export default Programs;