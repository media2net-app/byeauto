"use client";

import { useState } from "react";
import Link from "next/link";

export default function TunePage() {
  const [licensePlate, setLicensePlate] = useState("");
  const [searchResult, setSearchResult] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedTune, setSelectedTune] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSearching(false);
      
      // Example data for DB 99BYE
      if (licensePlate.toUpperCase() === "DB 99BYE") {
        setSearchResult({
          vehicle: "BMW M8 Competition",
          licensePlate: "DB 99BYE",
          vin: "WBS83CD0X1234567",
          engine: "4.4L V8 Twin-Turbo",
          currentPower: "625 HP",
          currentTorque: "750 Nm",
          year: "2023",
          mileage: "12,500 km",
          transmission: "8-speed M Steptronic",
          drivetrain: "M xDrive AWD",
          tuningParts: [
            {
              id: "stage1",
              name: "Stage 1 ECU Tune",
              description: "Optimized engine mapping for increased power and torque",
              powerGain: "+85 HP",
              torqueGain: "+120 Nm",
              price: 899,
              duration: "2-3 hours",
              warranty: "2 years",
              features: ["Increased power", "Better throttle response", "Maintained reliability"]
            },
            {
              id: "stage2",
              name: "Stage 2 ECU Tune + Downpipes",
              description: "Advanced tuning with high-flow catalytic converters",
              powerGain: "+125 HP",
              torqueGain: "+180 Nm",
              price: 1899,
              duration: "4-5 hours",
              warranty: "2 years",
              features: ["Maximum power gain", "Sport exhaust sound", "Improved airflow"]
            },
            {
              id: "stage3",
              name: "Stage 3 Complete Package",
              description: "Full performance upgrade with all components",
              powerGain: "+180 HP",
              torqueGain: "+250 Nm",
              price: 3499,
              duration: "6-8 hours",
              warranty: "2 years",
              features: ["Maximum performance", "Complete exhaust system", "Cold air intake", "Intercooler upgrade"]
            }
          ],
          additionalParts: [
            {
              id: "exhaust",
              name: "Akrapovic Exhaust System",
              description: "Titanium exhaust with carbon fiber tips",
              price: 2899,
              powerGain: "+15 HP",
              weight: "-8 kg"
            },
            {
              id: "intake",
              name: "BMC Air Filter",
              description: "High-flow air filter for better breathing",
              price: 199,
              powerGain: "+5 HP",
              maintenance: "Clean every 10,000 km"
            },
            {
              id: "wheels",
              name: "HRE P101 Wheels",
              description: "Forged aluminum wheels 21\"",
              price: 4599,
              weight: "-12 kg total",
              sizes: "21x10.5 Front, 21x11.5 Rear"
            }
          ]
        });
      } else {
        setSearchResult({
          vehicle: "Vehicle Not Found",
          licensePlate: licensePlate,
          message: "This license plate is not in our database. Please contact us for custom tuning options."
        });
      }
    }, 2000);
  };

  const getTotalPower = () => {
    if (!searchResult || !selectedTune) return searchResult?.currentPower;
    const tune = searchResult.tuningParts.find((t: any) => t.id === selectedTune);
    if (!tune) return searchResult.currentPower;
    
    const currentPower = parseInt(searchResult.currentPower);
    const powerGain = parseInt(tune.powerGain.replace("+", ""));
    return `${currentPower + powerGain} HP`;
  };

  const getTotalTorque = () => {
    if (!searchResult || !selectedTune) return searchResult?.currentTorque;
    const tune = searchResult.tuningParts.find((t: any) => t.id === selectedTune);
    if (!tune) return searchResult.currentTorque;
    
    const currentTorque = parseInt(searchResult.currentTorque);
    const torqueGain = parseInt(tune.torqueGain.replace("+", ""));
    return `${currentTorque + torqueGain} Nm`;
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-gray-900 shadow-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-white">BYE AUTO</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="text-sm text-gray-400 hover:text-white">
                Dashboard
              </Link>
              <Link href="/" className="text-sm text-gray-400 hover:text-white">
                Logout
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">BMW Tuning Services</h2>
          <p className="text-gray-400">Professional ECU tuning and performance upgrades</p>
        </div>

        {/* Search Section */}
        <div className="bg-gray-900 border border-gray-700 rounded-lg shadow-lg p-8 mb-8">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-white mb-6">Find Your Vehicle</h3>
            
            <form onSubmit={handleSearch} className="space-y-4">
              <div>
                <label htmlFor="licensePlate" className="block text-sm font-medium text-gray-300 mb-2">
                  License Plate
                </label>
                <input
                  id="licensePlate"
                  type="text"
                  value={licensePlate}
                  onChange={(e) => setLicensePlate(e.target.value.toUpperCase())}
                  placeholder="e.g., DB 99BYE"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400"
                  required
                />
                <p className="text-sm text-gray-500 mt-1">Enter your license plate to find tuning options</p>
              </div>

              <button
                type="submit"
                disabled={isSearching}
                className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSearching ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Searching...
                  </div>
                ) : (
                  "Find Tuning Options"
                )}
              </button>
            </form>

            {/* Example */}
            <div className="mt-6 p-4 bg-gray-800 border border-gray-700 rounded-lg">
              <p className="text-sm font-medium text-purple-400 mb-2">Example:</p>
              <p className="text-sm text-gray-300">
                Try: <code className="bg-gray-700 px-1 rounded text-white">DB 99BYE</code> (BMW M8 Competition)
              </p>
            </div>
          </div>
        </div>

        {/* Search Results */}
        {searchResult && (
          <div className="space-y-8">
            {/* Vehicle Information */}
            <div className="bg-gray-900 border border-gray-700 rounded-lg shadow-lg p-8">
              <h3 className="text-xl font-semibold text-white mb-6">Vehicle Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <p className="text-sm text-gray-400">Vehicle</p>
                  <p className="text-white font-medium">{searchResult.vehicle}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">License Plate</p>
                  <p className="text-white font-medium">{searchResult.licensePlate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Engine</p>
                  <p className="text-white font-medium">{searchResult.engine}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Current Power</p>
                  <p className="text-white font-medium">{searchResult.currentPower}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Current Torque</p>
                  <p className="text-white font-medium">{searchResult.currentTorque}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Year</p>
                  <p className="text-white font-medium">{searchResult.year}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Mileage</p>
                  <p className="text-white font-medium">{searchResult.mileage}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Transmission</p>
                  <p className="text-white font-medium">{searchResult.transmission}</p>
                </div>
              </div>
            </div>

            {/* Tuning Options */}
            {searchResult.tuningParts && (
              <div className="bg-gray-900 border border-gray-700 rounded-lg shadow-lg p-8">
                <h3 className="text-xl font-semibold text-white mb-6">Tuning Packages</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {searchResult.tuningParts.map((tune: any) => (
                    <div
                      key={tune.id}
                      className={`border rounded-lg p-6 cursor-pointer transition-all ${
                        selectedTune === tune.id
                          ? "border-purple-500 bg-gray-800"
                          : "border-gray-700 bg-gray-800/50 hover:border-gray-600"
                      }`}
                      onClick={() => setSelectedTune(tune.id)}
                    >
                      <div className="text-center mb-4">
                        <h4 className="text-lg font-semibold text-white mb-2">{tune.name}</h4>
                        <p className="text-sm text-gray-400">{tune.description}</p>
                      </div>
                      
                      <div className="space-y-3 mb-4">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Power Gain:</span>
                          <span className="text-green-400 font-medium">{tune.powerGain}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Torque Gain:</span>
                          <span className="text-green-400 font-medium">{tune.torqueGain}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Duration:</span>
                          <span className="text-white">{tune.duration}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Warranty:</span>
                          <span className="text-white">{tune.warranty}</span>
                        </div>
                      </div>

                      <div className="text-center">
                        <p className="text-2xl font-bold text-purple-400 mb-2">€{tune.price}</p>
                        <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors">
                          Select Package
                        </button>
                      </div>

                      <div className="mt-4">
                        <p className="text-xs text-gray-400 mb-2">Features:</p>
                        <ul className="text-xs text-gray-300 space-y-1">
                          {tune.features.map((feature: string, index: number) => (
                            <li key={index}>• {feature}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Performance Summary */}
            {selectedTune && (
              <div className="bg-gray-900 border border-gray-700 rounded-lg shadow-lg p-8">
                <h3 className="text-xl font-semibold text-white mb-6">Performance Summary</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-gray-800 rounded-lg">
                    <p className="text-sm text-gray-400 mb-2">Current Power</p>
                    <p className="text-2xl font-bold text-white">{searchResult.currentPower}</p>
                  </div>
                  <div className="text-center p-6 bg-purple-900 rounded-lg">
                    <p className="text-sm text-purple-300 mb-2">After Tuning</p>
                    <p className="text-2xl font-bold text-purple-300">{getTotalPower()}</p>
                  </div>
                  <div className="text-center p-6 bg-green-900 rounded-lg">
                    <p className="text-sm text-green-300 mb-2">Power Gain</p>
                    <p className="text-2xl font-bold text-green-300">
                      {searchResult.tuningParts.find((t: any) => t.id === selectedTune)?.powerGain}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Additional Parts */}
            {searchResult.additionalParts && (
              <div className="bg-gray-900 border border-gray-700 rounded-lg shadow-lg p-8">
                <h3 className="text-xl font-semibold text-white mb-6">Additional Performance Parts</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {searchResult.additionalParts.map((part: any) => (
                    <div key={part.id} className="border border-gray-700 bg-gray-800 rounded-lg p-6">
                      <h4 className="text-lg font-semibold text-white mb-2">{part.name}</h4>
                      <p className="text-sm text-gray-400 mb-4">{part.description}</p>
                      
                      <div className="space-y-2 mb-4">
                        {part.powerGain && (
                          <div className="flex justify-between">
                            <span className="text-gray-400">Power Gain:</span>
                            <span className="text-green-400">{part.powerGain}</span>
                          </div>
                        )}
                        {part.weight && (
                          <div className="flex justify-between">
                            <span className="text-gray-400">Weight:</span>
                            <span className="text-blue-400">{part.weight}</span>
                          </div>
                        )}
                        {part.maintenance && (
                          <div className="flex justify-between">
                            <span className="text-gray-400">Maintenance:</span>
                            <span className="text-yellow-400">{part.maintenance}</span>
                          </div>
                        )}
                      </div>

                      <div className="text-center">
                        <p className="text-xl font-bold text-purple-400 mb-2">€{part.price}</p>
                        <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                          Add to Quote
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 