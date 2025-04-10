import React, {useState} from "react";

const Inputs = ({ currentInput, setCurrentInput, onInputSave, isEditing }) => {
    const handleChange = (e) => {
        set
    };

    const [Form, setForm] = useState({website:"", username:"", password:""})
    const handleClick = () => {
        onInputSave();
    };

    return (
        <div className="flex w-full justify-between mt-4">
            <input
                type="text"
                value={form.website}
                onChange={handleChange}
                placeholder="www.google.com"
                className="secondaryTextColor w-[75%] h-9 rounded-full px-2 border border-gray-300 outline-none focus:ring-2 focus:ring-blue-400 quaternaryBackgroundColor secondaryTextColor font-bold text-xl"
            />
    

            <button
                onClick={handleClick}
                className="w-max h-10 px-3 border border-gray-300 outline-none quaternaryBackgroundColor secondaryTextColor font-bold text-2xl hover-style-heading"
            >
                {isEditing ? 'Update' : 'Save'}
            </button>
        </div>
    );
};

export default Inputs;
