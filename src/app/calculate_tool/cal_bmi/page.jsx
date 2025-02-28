'use client';
import React, { useState } from 'react';

function page() {
    const [formData, setFormData] = useState({
        height: 0,
        weight: 0,
    });

    const [bmiResult, setBmiResult] = useState(null);
    const [message, setMessage] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const getBmiMessage = (bmi) => {
        if (bmi < 18.5) {
            return "You are Underweight."
        } else if (bmi >= 18.5 && bmi <= 24.9) {
            return "You have Normal weight.";
        }
        else if (bmi >= 25 && bmi <= 29.9) {
            return "You are Overweight.";
        } else {
            return "You are Obese.";
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        let BMI = formData.weight / ((formData.height * formData.height) / 10000);
        setBmiResult(Math.round(BMI * 10) / 10);
        setMessage(getBmiMessage(Math.round(BMI * 10) / 10))
    };

    return (
        <div>
            <div className='bg-[#FFF7E6] text-gray-800 py-8 px-6 md:px-16 lg:px-28 space-y-6'>
                <h1 className='text-3xl font-bold text-orange-600'>BMI Calculator</h1>

                <div className='space-y-4 text-base leading-relaxed'>
                    <p className='text-lg font-semibold'>What is BMI?</p>
                    <p>
                        <span className='font-medium'>BMI</span> stands for <span className='font-medium'>Body Mass Index</span>, meaning the total number that helps measure whether a person’s weight is healthy compared to their height.
                    </p>

                    <hr className='border-t border-orange-300' />

                    <p className='text-lg font-semibold'>What does BMI mean?</p>
                    <p>
                        It’s a basic tool to check weight status, but it does not consider muscle mass, fat percentage, or body type.
                    </p>

                    <ul className='bg-orange-100 p-4 rounded-md space-y-2'>
                        <li className='flex items-center gap-2'>
                            🟢 BMI under 18.5 = <span className='font-semibold'>Underweight</span>
                        </li>
                        <li className='flex items-center gap-2'>
                            ✅ BMI 18.5 - 24.9 = <span className='font-semibold'>Normal weight</span>
                        </li>
                        <li className='flex items-center gap-2'>
                            🟠 BMI 25 - 29.9 = <span className='font-semibold'>Overweight</span>
                        </li>
                        <li className='flex items-center gap-2'>
                            🔴 BMI 30+ = <span className='font-semibold'>Obese</span>
                        </li>
                    </ul>
                </div>
            </div>

            <form className="space-y-6 py-6 px-32 bg-white rounded-md shadow-md" onSubmit={handleSubmit}>
                {/* age, height, weight */}
                <div className="grid grid-cols-3 gap-4">
                    <div className="border p-4 rounded-md flex flex-col items-center">
                        <span className="font-semibold">Height (cm)</span>
                        <span className="text-orange-600 text-4xl font-bold">{formData.height}</span>
                        <input type="range" name="height" className="w-full mt-2" min="0" max="250" value={formData.height} onChange={handleChange} />
                    </div>
                    <div className="border p-4 rounded-md flex flex-col items-center">
                        <span className="font-semibold">Weight (kg)</span>
                        <span className="text-orange-600 text-4xl font-bold">{formData.weight}</span>
                        <input type="range" name="weight" className="w-full mt-2" min="0" max="200" value={formData.weight} onChange={handleChange} />
                    </div>
                </div>

                <div className="flex justify-center mt-4">
                    <button type="submit" className="bg-orange-600 text-white px-6 py-3 rounded-md font-semibold">Get BMI Result</button>
                </div>
            </form>
            {bmiResult && (
                <div className="my-6 text-center text-xl font-bold text-orange-600 flex flex-col justify-center">
                    <h3>
                        Your Estimated BMI: <span className="text-3xl">{bmiResult}</span>
                    </h3>
                    <span className='text-base text-orange-300'>{message}</span>
                </div>
            )}
        </div>
    );
}

export default page;