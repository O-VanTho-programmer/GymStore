import React from 'react';

const categories = [
    { id: 1, name: 'Cardio Equipment', itemCount: 10 },
    { id: 2, name: 'Strength Training', itemCount: 15 },
    { id: 3, name: 'Accessories', itemCount: 8 },
];

const CategoryTableAdmin = () => {
    return (
        <div className="p-5 font-sans">
            <h2 className="text-lg font-semibold mb-4">Categories</h2>
            <table className="w-full border-collapse">
                <thead>
                    <tr>
                        <th className="border border-gray-300 p-2 bg-gray-200">Category Name</th>
                        <th className="border border-gray-300 p-2 bg-gray-200">Number of Items</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category) => (
                        <tr key={category.id}>
                            <td className="border border-gray-300 p-2">{category.name}</td>
                            <td className="border border-gray-300 p-2">{category.itemCount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CategoryTableAdmin;