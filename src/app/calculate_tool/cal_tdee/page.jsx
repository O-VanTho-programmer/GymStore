'use client';
import React, { useState } from 'react';

function page() {
    const [formData, setFormData] = useState({
        goal: 'Gain Weight',
        gender: 'Male',
        age: 0,
        height: 0,
        weight: 0,
        activityLevel: 'Low',
        workoutFrequency: 'None',
        bmrFormula: 'Katch-McArdle',
        bodyFat: '',
        weightGainSpeed: 'Slow'
    });

    const [tdeeResult, setTdeeResult] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const calculateBMR = () => {
        const { gender, age, height, weight, bmrFormula, bodyFat } = formData;

        if (bmrFormula === 'Katch-McArdle' && !bodyFat) {
            alert('Enter your body fat percentage');
            return null;
        }

        let BMR = 0;

        if (bmrFormula === 'Mifflin-St Jeor') {
            if (gender === 'Male') {
                BMR = 10 * weight + 6.25 * height - 5 * age + 5;
            } else {
                BMR = 10 * weight + 6.25 * height - 5 * age - 161;
            }
        } else if (bmrFormula === 'Harris-Benedict') {
            if (gender === 'Male') {
                BMR = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
            } else {
                BMR = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
            }
        } else if (bmrFormula === 'Katch-McArdle') {
            const leanMass = weight * (1 - bodyFat / 100);
            BMR = 370 + (21.6 * leanMass);
        }

        return BMR;
    };

    const getActivityFactor = () => {
        switch (formData.activityLevel) {
            case 'Low':
                return 1.2;
            case 'Light':
                return 1.375;
            case 'Moderate':
                return 1.55;
            case 'High':
                return 1.725;
            case 'Very High':
                return 1.9;
            default:
                return 1.2;
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const BMR = calculateBMR();
        if (BMR === null) return;

        const activityFactor = getActivityFactor();
        let TDEE = BMR * activityFactor;

        if (formData.goal === 'Gain Weight') {
            if (formData.weightGainSpeed === 'Slow') {
                TDEE *= 1.1;
            } else if (formData.weightGainSpeed === 'Normal') {
                TDEE *= 1.2;
            } else {
                TDEE *= 1.3;
            }
        } else if (formData.goal === 'Lose Weight') {
            TDEE *= 0.85;
        }

        setTdeeResult(Math.round(TDEE));
    };

    return (
        <div>
            <div className='bg-[#FFF7E6] text-gray-800 py-8 px-6 md:px-16 lg:px-28 space-y-6'>
                <h1 className='text-3xl font-bold text-orange-600'>TDEE Calculator</h1>

                <div className='space-y-4 text-base leading-relaxed'>
                    <p className='text-lg font-semibold'>What is TDEE?</p>
                    <p>
                        <span className='font-medium'>TDEE</span> stands for <span className='font-medium'>Total Daily Energy Expenditure</span>, meaning the total number of calories your body burns each day.
                    </p>

                    <div className='bg-orange-100 p-4 rounded-md space-y-2'>
                        <p className='flex items-center gap-2'>
                            <span className='text-xl text-orange-500'>🔥</span> Calories burned to stay alive (breathing, digestion — called <span className='font-semibold'>BMR</span>)
                        </p>
                        <p className='flex items-center gap-2'>
                            <span className='text-xl text-orange-500'>🔥</span> Calories burned from daily activities and exercise
                        </p>
                    </div>

                    <hr className='border-t border-orange-300' />

                    <p className='text-lg font-semibold'>Why is TDEE important?</p>
                    <p>
                        Knowing your TDEE helps you plan your diet based on your fitness goal:
                    </p>

                    <ul className='space-y-2'>
                        <li className='flex items-center gap-2'>
                            ✅ Eat less than TDEE to <span className='font-semibold'>lose weight</span>
                        </li>
                        <li className='flex items-center gap-2'>
                            ✅ Eat the same as TDEE to <span className='font-semibold'>maintain weight</span>
                        </li>
                        <li className='flex items-center gap-2'>
                            ✅ Eat more than TDEE to <span className='font-semibold'>gain weight</span>
                        </li>
                    </ul>
                </div>
            </div>

            <form className="space-y-6 py-6 px-32 bg-white rounded-md shadow-md" onSubmit={handleSubmit}>
                {/* Goal, gender */}
                <div className="flex justify-between items-center">
                    <div className="flex flex-col gap-2">
                        <label className="font-semibold">Goal</label>
                        <select name="goal" className="border p-2 rounded-md" value={formData.goal} onChange={handleChange}>
                            <option>Gain Weight</option>
                            <option>Lose Weight</option>
                            <option>Maintain Weight</option>
                        </select>
                    </div>
                    <div className="flex gap-4">
                        <button type="button" className={`px-6 py-2 rounded-md font-semibold ${formData.gender === 'Male' ? 'bg-orange-600 text-white' : 'border'}`} onClick={() => setFormData({ ...formData, gender: 'Male' })}>Male</button>
                        <button type="button" className={`px-6 py-2 rounded-md font-semibold ${formData.gender === 'Female' ? 'bg-orange-600 text-white' : 'border'}`} onClick={() => setFormData({ ...formData, gender: 'Female' })}>Female</button>
                    </div>
                </div>

                {/* age, height, weight */}
                <div className="grid grid-cols-3 gap-4">
                    <div className="border p-4 rounded-md flex flex-col items-center">
                        <span className="font-semibold">Age</span>
                        <span className="text-orange-600 text-4xl font-bold">{formData.age}</span>
                        <input type="range" name="age" className="w-full mt-2" min="0" max="100" value={formData.age} onChange={handleChange} />
                    </div>
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
                {/* Activity level */}
                <div className="space-y-2">
                    <span className="font-semibold">Daily Activity Level</span>
                    <div className="grid grid-cols-5 gap-2">
                        {['Low', 'Light', 'Moderate', 'High', 'Very High'].map(level => (
                            <button type="button" key={level} className={`py-2 rounded-md ${formData.activityLevel === level ? 'bg-orange-600 text-white' : 'border'}`} onClick={() => setFormData({ ...formData, activityLevel: level })}>{level}</button>
                        ))}
                    </div>
                </div>
                {/* workout frequency */}
                <div className="space-y-2">
                    <span className="font-semibold">Workout Frequency</span>
                    <div className="grid grid-cols-5 gap-2">
                        {['None', 'Low', 'Moderate', 'High', 'Very High'].map(frequency => (
                            <button type="button" key={frequency} className={`py-2 rounded-md ${formData.workoutFrequency === frequency ? 'bg-orange-600 text-white' : 'border'}`} onClick={() => setFormData({ ...formData, workoutFrequency: frequency })}>{frequency}</button>
                        ))}
                    </div>
                </div>
                {/* formular, % fat, demand */}
                <div className="grid grid-cols-3 gap-4">
                    <div className="flex flex-col gap-2">
                        <label className="font-semibold">BMR Formula</label>
                        <select name="bmrFormula" className="border p-2 rounded-md" value={formData.bmrFormula} onChange={handleChange}>
                            <option>Katch-McArdle</option>
                            <option>Mifflin-St Jeor</option>
                            <option>Harris-Benedict</option>
                        </select>
                    </div>
                    {formData.bmrFormula === "Katch-McArdle" && (
                        <div className="flex flex-col gap-2">
                            <label className="font-semibold">Body Fat %</label>
                            <input type="text" name="bodyFat" className="border p-2 rounded-md" placeholder="Enter %" value={formData.bodyFat} onChange={handleChange} />
                        </div>
                    )}
                    {formData.goal !== 'Maintain Weight' && (
                        <div className="flex flex-col gap-2">
                            <label className="font-semibold">{formData.goal === 'Gain Weight' ? 'Weight Gain Speed' : 'Weight Lose Speed'}</label>
                            <select name="weightGainSpeed" className="border p-2 rounded-md" value={formData.weightGainSpeed} onChange={handleChange}>
                                <option>Slow</option>
                                <option>Normal</option>
                                <option>Fast</option>
                            </select>
                        </div>
                    )}
                </div>

                <div className="flex justify-center mt-4">
                    <button type="submit" className="bg-orange-600 text-white px-6 py-3 rounded-md font-semibold">Get TDEE Result</button>
                </div>
            </form>
            {tdeeResult && (
                <div className="my-6 text-center text-xl font-bold text-orange-600">
                    Your Estimated TDEE: <span className="text-3xl">{tdeeResult} kcal/day</span>
                </div>
            )}
        </div>
    );
}

export default page;