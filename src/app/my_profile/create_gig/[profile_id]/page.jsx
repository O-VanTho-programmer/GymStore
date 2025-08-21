'use client';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

function Page() {
  const { profile_id } = useParams();

  const [step, setStep] = useState(1);
  const [gigInfo, setGigInfo] = useState({
    title: '',
    description: '',
    imageUrl: '',
    expertise: '',
  });

  const [image, setImage] = useState(null);
  const [packages, setPackages] = useState([
    { title: 'Basic', description: '', price: '', duration: '' },
    { title: 'Standard', description: '', price: '', duration: '' },
    { title: 'Premium', description: '', price: '', duration: '' },
  ]);
  const [expertiseOptions, setExpertiseOptions] = useState([]);

  useEffect(() => {
    const fetchExpertise = async () => {
      try {
        const res = await axios.get("gymstore-production.up.railway.app/api/get_expertises/all");
        setExpertiseOptions(res.data.expertises);
      } catch (error) {
        console.error("Error fetching expertise:", error);
      }
    };

    fetchExpertise();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setGigInfo({ ...gigInfo, imageUrl: URL.createObjectURL(file) });
  };

  const handleGigInfoChange = (e) => {
    const { name, value } = e.target;
    setGigInfo({ ...gigInfo, [name]: value });
  };

  const handleExpertiseChange = (e) => {
    setGigInfo({ ...gigInfo, expertise: e.target.value });
  };

  const handlePackageChange = (index, field, value) => {
    const updatedPackages = [...packages];
    updatedPackages[index][field] = value;
    setPackages(updatedPackages);
  };

  const handleSubmit = async () => {
    const validPackages = packages.filter(pkg => pkg.title && pkg.description && pkg.duration && pkg.price);

    if (validPackages.length === 0) {
      alert('Please fill all package details before submitting');
      return;
    }

    const formData = new FormData();
    formData.append('profile_id', profile_id);
    formData.append('title', gigInfo.title);
    formData.append('description', gigInfo.description);
    formData.append('image', image);
    formData.append('expertise', gigInfo.expertise);
    formData.append('packages', JSON.stringify(validPackages));

    try {
      const res = await axios.post('gymstore-production.up.railway.app/api/create_gig', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('Gig submitted successfully:', res.data);
      window.location.href = '/my_profile';
    } catch (error) {
      console.error('Error submitting gig:', error);
      alert('Failed to submit gig');
    }
  };

  return (
    <div className="max-w-3xl mt-10 mx-auto p-6 bg-white shadow border rounded">
      {step === 1 && (
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold mb-4">Step 1: Gig Information</h2>
          <input
            type="text"
            name="title"
            placeholder="Gig Title"
            value={gigInfo.title}
            onChange={handleGigInfoChange}
            className="border p-2 w-full mb-4"
          />
          <textarea
            name="description"
            placeholder="Gig Description"
            value={gigInfo.description}
            onChange={handleGigInfoChange}
            className="border p-2 w-full mb-4"
          />
          <div className="mb-4">
            <label className="block text-gray-700">Choose image for Gig</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full"
            />
            {gigInfo.imageUrl && (
              <img src={gigInfo.imageUrl} alt="Preview" className="mt-2 h-32 object-cover rounded" />
            )}
          </div>
          <label className="block mb-4">
            Expertise
            <select
              value={gigInfo.expertise}
              onChange={handleExpertiseChange}
              className="border p-2 w-full"
            >
              {expertiseOptions.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.expertise}
                </option>
              ))}
            </select>
          </label>

          <button
            onClick={() => setStep(2)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Next
          </button>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Step 2: Packages</h2>
          {packages.map((pkg, index) => (
            <div key={pkg.title} className="border p-4 mb-4 rounded">
              <h3 className="font-semibold mb-2">{pkg.title} Package</h3>
              <input
                type="number"
                placeholder="Price"
                value={pkg.price}
                onChange={(e) => handlePackageChange(index, 'price', e.target.value)}
                className="border p-2 w-full mb-2"
              />
              <input
                type="number"
                placeholder="Duration (months)"
                value={pkg.duration}
                onChange={(e) => handlePackageChange(index, 'duration', e.target.value)}
                className="border p-2 w-full mb-2"
              />
              <textarea
                placeholder="Description"
                value={pkg.description}
                onChange={(e) => handlePackageChange(index, 'description', e.target.value)}
                className="border p-2 w-full mb-2"
              />
            </div>
          ))}

          <div className="flex justify-between">
            <button
              onClick={() => setStep(1)}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Back
            </button>
            <button
              onClick={handleSubmit}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;
