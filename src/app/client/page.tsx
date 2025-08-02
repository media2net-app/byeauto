"use client";

import { useState } from "react";
import Link from "next/link";

export default function ClientPortal() {
  const [licensePlate, setLicensePlate] = useState("");
  const [vin, setVin] = useState("");
  const [searchType, setSearchType] = useState("license");
  const [searchResult, setSearchResult] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSearching(false);
      setSearchResult({
        vehicle: "BMW X5 2020",
        licensePlate: licensePlate || "B-123-ABC",
        vin: vin || "WBA12345678901234",
        engine: "3.0L Diesel",
        power: "286 HP",
        transmission: "8-speed Automatic",
        mileage: "45,000 km",
        lastService: "2024-01-15",
        nextService: "2024-07-15",
        status: "Active",
        tuningParts: [
          { name: "ECU Tune Stage 1", price: "€450", powerGain: "+25 HP" },
          { name: "Performance Exhaust", price: "€680", powerGain: "+15 HP" },
          { name: "Cold Air Intake", price: "€320", powerGain: "+8 HP" },
          { name: "Intercooler Upgrade", price: "€890", powerGain: "+12 HP" }
        ]
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">BYE Auto</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="text-sm text-gray-500 hover:text-gray-700">
                Dashboard
              </Link>
              <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">
                Logout
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Client Portal</h2>
          <p className="text-gray-600">Search your vehicle information and explore tuning options</p>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Vehicle Search</h3>
            
            {/* Search Type Toggle */}
            <div className="flex space-x-4 mb-6">
              <button
                onClick={() => setSearchType("license")}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  searchType === "license"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                License Plate Search
              </button>
              <button
                onClick={() => setSearchType("vin")}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  searchType === "vin"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                VIN Search
              </button>
            </div>

            {/* Search Form */}
            <form onSubmit={handleSearch} className="space-y-4">
              {searchType === "license" ? (
                <div>
                  <label htmlFor="licensePlate" className="block text-sm font-medium text-gray-700 mb-2">
                    Romanian License Plate
                  </label>
                  <input
                    id="licensePlate"
                    type="text"
                    value={licensePlate}
                    onChange={(e) => setLicensePlate(e.target.value.toUpperCase())}
                    placeholder="e.g., B-123-ABC"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">Enter your Romanian license plate number</p>
                </div>
              ) : (
                <div>
                  <label htmlFor="vin" className="block text-sm font-medium text-gray-700 mb-2">
                    Vehicle Identification Number (VIN)
                  </label>
                  <input
                    id="vin"
                    type="text"
                    value={vin}
                    onChange={(e) => setVin(e.target.value.toUpperCase())}
                    placeholder="17-digit VIN number"
                    maxLength={17}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">Enter the 17-digit VIN from your vehicle</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isSearching}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSearching ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Searching...
                  </div>
                ) : (
                  "Search Vehicle"
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Search Results */}
        {searchResult && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Vehicle Information</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Vehicle Details */}
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4">Vehicle Specifications</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Vehicle:</span>
                    <span className="font-medium">{searchResult.vehicle}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">License Plate:</span>
                    <span className="font-medium">{searchResult.licensePlate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">VIN:</span>
                    <span className="font-medium font-mono text-sm">{searchResult.vin}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Engine:</span>
                    <span className="font-medium">{searchResult.engine}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Power:</span>
                    <span className="font-medium">{searchResult.power}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Transmission:</span>
                    <span className="font-medium">{searchResult.transmission}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Mileage:</span>
                    <span className="font-medium">{searchResult.mileage}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Last Service:</span>
                    <span className="font-medium">{searchResult.lastService}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Next Service:</span>
                    <span className="font-medium">{searchResult.nextService}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className="font-medium text-green-600">{searchResult.status}</span>
                  </div>
                </div>
              </div>

              {/* Tuning Parts */}
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4">Available Tuning Parts</h4>
                <div className="space-y-3">
                  {searchResult.tuningParts.map((part, index) => (
                    <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="font-medium text-gray-900">{part.name}</h5>
                        <span className="text-lg font-bold text-blue-600">{part.price}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Power Gain:</span>
                        <span className="text-sm font-medium text-green-600">{part.powerGain}</span>
                      </div>
                      <button className="w-full mt-3 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                        Add to Quote
                      </button>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h5 className="font-medium text-blue-900 mb-2">Power Gain Calculator</h5>
                  <p className="text-sm text-blue-700">
                    Total potential power gain: <span className="font-bold">+60 HP</span>
                  </p>
                  <p className="text-sm text-blue-700">
                    Estimated total cost: <span className="font-bold">€2,340</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 