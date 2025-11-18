import React, { useState } from 'react';

const SpecialitiesProceduresSlider = () => {
    const [isRightPanelActive, setIsRightPanelActive] = useState(false);

    const handleSignUpClick = () => {
        setIsRightPanelActive(true);
    };

    const handleSignInClick = () => {
        setIsRightPanelActive(false);
    };

    const specialities = [
        { img: 'cancer care oncology.svg', text: 'Cancer Care / Oncology' },
        { img: 'cardia.svg', text: 'Cardiac Sciences' },
        { img: 'Orthopaedics.svg', text: 'Orthopaedics & Joint Replacement' },
        { img: 'Gastroenterology.svg', text: 'Gastroenterology, Hepatology & Endoscopy' },
        { img: 'The Da Vinci Xi Robotic Surgery.svg', text: 'Robotic Surgery' },
        { img: 'Liver Transplant and bs.svg', text: 'Liver Transplant and Biliary Sciences' },
        { img: 'Neurosciences.svg', text: 'Neurosciences' },
        { img: 'Thoracic Surgery.svg', text: 'Thoracic Surgery' },
    ];

    const procedures = [
        { img: 'procedure-new.svg', text: 'CAR T-Cell Therapy' },
        { img: 'Valvular Heart Surgery.svg', text: 'Aortic Valve Surgery' },
        { img: 'Knee Replacement Surgery.svg', text: 'Knee Replacement Surgery' },
        { img: 'The Da Vinci Xi Robotic Surgery.svg', text: 'Da Vinci Robotic Surgery' },
        { img: 'Bone Marrow Transplant .svg', text: 'Bone Marrow Transplant (BMT)' },
        { img: 'Lung Transplant.svg', text: 'Lung Transplant' },
        { img: 'Thoracic Surgery.svg', text: 'Thoracic Surgery' },
        { img: 'LVAD.svg', text: 'LVAD Surgery' },
    ];

    return (
        <div className="flex justify-center items-center min-h-screen font-montserrat bg-neutral">
            <div className={`relative w-[900px] max-w-full min-h-[600px] bg-white rounded-xl shadow-2xl overflow-hidden ${isRightPanelActive ? 'right-panel-active' : ''}`} id="container">
                <div className="absolute top-0 h-full transition-all duration-600 ease-in-out left-0 w-1/2 z-20 sign-in-container">
                    <form className="bg-white flex flex-col items-center justify-center p-12 h-full text-center">
                        <h1 className="font-bold m-0 text-2xl">Specialities</h1>
                        <hr className="my-4 w-full border-neutral" />
                        <div className="specialties-container max-w-[500px] max-h-[550px] m-1 p-1 bg-white shadow-md rounded-lg">
                            <div className="specialties-grid grid grid-cols-2 gap-5 p-4">
                                {specialities.map((item, index) => (
                                    <a href="#" className="specialty-item flex items-center text-dark border border-neutral p-2 rounded-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-1" key={index}>
                                        <img src={item.img} alt={item.text + " Icon"} className="w-10 h-10 mr-2" />
                                        <span className="text-sm font-bold">{item.text}</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </form>
                </div>

                <div className="absolute top-0 h-full transition-all duration-600 ease-in-out left-0 w-1/2 opacity-0 z-10 sign-up-container">
                    <form className="bg-white flex flex-col items-center justify-center p-12 h-full text-center">
                        <h1 className="font-bold m-0 text-2xl">Procedures</h1>
                        <hr className="my-4 w-full border-neutral" />
                        <div className="specialties-container max-w-[500px] max-h-[550px] m-1 p-1 bg-white shadow-md rounded-lg">
                            <div className="specialties-grid grid grid-cols-2 gap-5 p-4">
                                {procedures.map((item, index) => (
                                    <a href="#" className="specialty-item flex items-center text-dark border border-neutral p-2 rounded-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-1" key={index}>
                                        <img src={item.img} alt={item.text + " Icon"} className="w-10 h-10 mr-2" />
                                        <span className="text-sm font-bold">{item.text}</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </form>
                </div>

                <div className="absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-600 ease-in-out z-50 overlay-container">
                    <div className="bg-gradient-to-r from-primary to-blue-700 bg-cover bg-no-repeat bg-left text-white relative -left-full h-full w-[200%] transform-none transition-transform duration-600 ease-in-out overlay">
                        <div className="absolute flex items-center justify-center flex-col p-10 text-center top-0 h-full w-1/2 transform-none transition-transform duration-600 ease-in-out overlay-panel overlay-left">
                            <h1 className="font-bold m-0 text-2xl">Specialities</h1>
                            <p className="text-sm font-light leading-5 tracking-wider my-5">
                                Click button to see Specialities.
                            </p>
                            <button className="rounded-full border border-white bg-transparent text-white text-xs font-bold py-3 px-11 tracking-wider uppercase transition-transform duration-80 ease-in hover:scale-95 focus:outline-none" id="signIn" onClick={handleSignInClick}>
                                Specialities
                            </button>
                        </div>

                        <div className="absolute flex items-center justify-center flex-col p-10 text-center top-0 h-full w-1/2 transform-none transition-transform duration-600 ease-in-out overlay-panel overlay-right right-0">
                            <h1 className="font-bold m-0 text-2xl">Procedures</h1>
                            <p className="text-sm font-light leading-5 tracking-wider my-5">Click Button to see Procedures.</p>
                            <button className="rounded-full border border-white bg-transparent text-white text-xs font-bold py-3 px-11 tracking-wider uppercase transition-transform duration-80 ease-in hover:scale-95 focus:outline-none" id="signUp" onClick={handleSignUpClick}>
                                Procedures
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SpecialitiesProceduresSlider;
