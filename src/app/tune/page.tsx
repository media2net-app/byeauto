"use client";

import { useState } from "react";
import Link from "next/link";

interface TuningPart {
  id: string;
  name: string;
  description: string;
  powerGain: string;
  torqueGain: string;
  price: number;
  duration: string;
  warranty: string;
  features: string[];
}

interface AdditionalPart {
  id: string;
  name: string;
  description: string;
  price: number;
  powerGain?: string;
  weight?: string;
  maintenance?: string;
  sizes?: string;
}

interface SearchResult {
  vehicle: string;
  licensePlate: string;
  vin?: string;
  engine?: string;
  currentPower?: string;
  currentTorque?: string;
  year?: string;
  mileage?: string;
  transmission?: string;
  drivetrain?: string;
  tuningParts?: TuningPart[];
  additionalParts?: AdditionalPart[];
  message?: string;
}

export default function TunePage() {
  const [licensePlate, setLicensePlate] = useState("");
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedTune, setSelectedTune] = useState<string | null>(null);
  const [showBmwWizard, setShowBmwWizard] = useState(false);
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedStage, setSelectedStage] = useState("");
  const [bmwTuningOptions, setBmwTuningOptions] = useState<TuningPart[]>([]);

  // BMW Models and Years Data
  const bmwModels = [
    { name: "BMW 1 Series", years: ["2019", "2020", "2021", "2022", "2023", "2024"] },
    { name: "BMW 2 Series", years: ["2019", "2020", "2021", "2022", "2023", "2024"] },
    { name: "BMW 3 Series", years: ["2019", "2020", "2021", "2022", "2023", "2024"] },
    { name: "BMW 4 Series", years: ["2019", "2020", "2021", "2022", "2023", "2024"] },
    { name: "BMW 5 Series", years: ["2019", "2020", "2021", "2022", "2023", "2024"] },
    { name: "BMW 6 Series", years: ["2019", "2020", "2021", "2022", "2023", "2024"] },
    { name: "BMW 7 Series", years: ["2019", "2020", "2021", "2022", "2023", "2024"] },
    { name: "BMW 8 Series", years: ["2019", "2020", "2021", "2022", "2023", "2024"] },
    { name: "BMW X1", years: ["2019", "2020", "2021", "2022", "2023", "2024"] },
    { name: "BMW X2", years: ["2019", "2020", "2021", "2022", "2023", "2024"] },
    { name: "BMW X3", years: ["2019", "2020", "2021", "2022", "2023", "2024"] },
    { name: "BMW X4", years: ["2019", "2020", "2021", "2022", "2023", "2024"] },
    { name: "BMW X5", years: ["2019", "2020", "2021", "2022", "2023", "2024"] },
    { name: "BMW X6", years: ["2019", "2020", "2021", "2022", "2023", "2024"] },
    { name: "BMW X7", years: ["2019", "2020", "2021", "2022", "2023", "2024"] },
    { name: "BMW Z4", years: ["2019", "2020", "2021", "2022", "2023", "2024"] },
    { name: "BMW M2", years: ["2019", "2020", "2021", "2022", "2023", "2024"] },
    { name: "BMW M3", years: ["2019", "2020", "2021", "2022", "2023", "2024"] },
    { name: "BMW M4", years: ["2019", "2020", "2021", "2022", "2023", "2024"] },
    { name: "BMW M5", years: ["2019", "2020", "2021", "2022", "2023", "2024"] },
    { name: "BMW M8", years: ["2019", "2020", "2021", "2022", "2023", "2024"] },
    { name: "BMW X3M", years: ["2019", "2020", "2021", "2022", "2023", "2024"] },
    { name: "BMW X4M", years: ["2019", "2020", "2021", "2022", "2023", "2024"] },
    { name: "BMW X5M", years: ["2019", "2020", "2021", "2022", "2023", "2024"] },
    { name: "BMW X6M", years: ["2019", "2020", "2021", "2022", "2023", "2024"] }
  ];

  // BMW Tuning Options by Stage
  const getBmwTuningOptions = (model: string, year: string, stage: string) => {
    const baseOptions = {
      stage1: [
        {
          id: "stage1-ecu",
          name: "Stage 1 ECU Tune",
          description: "Optimized engine mapping for increased power and torque while maintaining reliability",
          powerGain: "+15-25%",
          torqueGain: "+20-30%",
          price: 599,
          duration: "2-3 hours",
          warranty: "2 years",
          features: ["Increased power output", "Better throttle response", "Improved fuel efficiency", "Maintained reliability", "No hardware changes required"]
        }
      ],
      stage2: [
        {
          id: "stage2-ecu",
          name: "Stage 2 ECU Tune",
          description: "Advanced tuning with optimized fuel and ignition mapping",
          powerGain: "+25-35%",
          torqueGain: "+30-40%",
          price: 799,
          duration: "3-4 hours",
          warranty: "2 years",
          features: ["Maximum power gain", "Enhanced performance", "Sport mode optimization", "Improved acceleration", "Professional dyno testing"]
        },
        {
          id: "stage2-downpipes",
          name: "High-Flow Downpipes",
          description: "Performance exhaust downpipes for improved airflow",
          powerGain: "+5-10%",
          torqueGain: "+8-12%",
          price: 899,
          duration: "2-3 hours",
          warranty: "1 year",
          features: ["Improved exhaust flow", "Sport exhaust sound", "Reduced backpressure", "Better turbo spool", "Stainless steel construction"]
        },
        {
          id: "stage2-intake",
          name: "Performance Air Intake",
          description: "High-flow air intake system for better breathing",
          powerGain: "+3-8%",
          torqueGain: "+5-10%",
          price: 399,
          duration: "1-2 hours",
          warranty: "1 year",
          features: ["Increased airflow", "Better engine breathing", "Sport intake sound", "Reusable filter", "Easy maintenance"]
        }
      ]
    };

    // Add model-specific adjustments
    const modelMultiplier = model.includes("M") ? 1.3 : 1.0;
    const yearMultiplier = parseInt(year) >= 2022 ? 1.2 : 1.0;

    return baseOptions[stage as keyof typeof baseOptions]?.map(option => ({
      ...option,
      price: Math.round(option.price * modelMultiplier * yearMultiplier),
      powerGain: model.includes("M") ? option.powerGain.replace("+", "+") : option.powerGain,
      torqueGain: model.includes("M") ? option.torqueGain.replace("+", "+") : option.torqueGain
    })) || [];
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSearching(false);
      
                   // Example data for DB 99BYE
             if (licensePlate.toUpperCase() === "DB99BYE" || licensePlate.toUpperCase() === "DB 99BYE") {
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
    if (!searchResult || !selectedTune || !searchResult.currentPower || !searchResult.tuningParts) return searchResult?.currentPower;
    const tune = searchResult.tuningParts.find((t: TuningPart) => t.id === selectedTune);
    if (!tune) return searchResult.currentPower;

    const currentPower = parseInt(searchResult.currentPower);
    const powerGain = parseInt(tune.powerGain.replace("+", ""));
    return `${currentPower + powerGain} HP`;
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Page Title */}
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">BMW Tuning Services</h2>
          <p className="text-gray-400 text-sm sm:text-base">Professional ECU tuning and performance upgrades</p>
        </div>

        {/* Search Section */}
        <div className="bg-gray-900 border border-gray-700 rounded-lg shadow-lg p-6 sm:p-8 mb-6 sm:mb-8">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6">Find Your Vehicle</h3>
            
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
                         placeholder="e.g., DB99BYE"
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
                       Try: <code className="bg-gray-700 px-1 rounded text-white">DB99BYE</code> (BMW M8 Competition)
                     </p>
                   </div>

                   {/* BMW Tuning Wizard */}
                   <div className="mt-6 p-4 bg-blue-900 border border-blue-700 rounded-lg">
                     <div className="text-center">
                       <h4 className="text-lg font-semibold text-white mb-2">🚗 BMW Tuning Wizard</h4>
                       <p className="text-sm text-gray-300 mb-4">
                         Don&apos;t have a license plate? Use our step-by-step BMW tuning wizard to find the perfect upgrade for your BMW.
                       </p>
                       <button
                         onClick={() => setShowBmwWizard(true)}
                         className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                       >
                         Start BMW Tuning Wizard
                       </button>
                     </div>
                   </div>
          </div>
        </div>

        {/* Search Results */}
        {searchResult && (
          <div className="space-y-8">
            {/* Vehicle Information */}
            <div className="bg-gray-900 border border-gray-700 rounded-lg shadow-lg p-8">
              <h3 className="text-xl font-semibold text-white mb-6">Vehicle Information</h3>
              
              {searchResult.message ? (
                <div className="text-center py-8">
                  <p className="text-gray-400 text-lg">{searchResult.message}</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-gray-400">Vehicle</p>
                    <p className="text-white font-medium">{searchResult.vehicle}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">License Plate</p>
                    <p className="text-white font-medium">{searchResult.licensePlate}</p>
                  </div>
                  {searchResult.engine && (
                    <div>
                      <p className="text-sm text-gray-400">Engine</p>
                      <p className="text-white font-medium">{searchResult.engine}</p>
                    </div>
                  )}
                  {searchResult.currentPower && (
                    <div>
                      <p className="text-sm text-gray-400">Current Power</p>
                      <p className="text-white font-medium">{searchResult.currentPower}</p>
                    </div>
                  )}
                  {searchResult.currentTorque && (
                    <div>
                      <p className="text-sm text-gray-400">Current Torque</p>
                      <p className="text-white font-medium">{searchResult.currentTorque}</p>
                    </div>
                  )}
                  {searchResult.year && (
                    <div>
                      <p className="text-sm text-gray-400">Year</p>
                      <p className="text-white font-medium">{searchResult.year}</p>
                    </div>
                  )}
                  {searchResult.mileage && (
                    <div>
                      <p className="text-sm text-gray-400">Mileage</p>
                      <p className="text-white font-medium">{searchResult.mileage}</p>
                    </div>
                  )}
                  {searchResult.transmission && (
                    <div>
                      <p className="text-sm text-gray-400">Transmission</p>
                      <p className="text-white font-medium">{searchResult.transmission}</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Tuning Options */}
            {searchResult.tuningParts && (
              <div className="bg-gray-900 border border-gray-700 rounded-lg shadow-lg p-6 sm:p-8">
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6">Tuning Packages</h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  {searchResult.tuningParts.map((tune: TuningPart) => (
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
              <div className="bg-gray-900 border border-gray-700 rounded-lg shadow-lg p-6 sm:p-8">
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6">Performance Summary</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                      {searchResult.tuningParts?.find((t: TuningPart) => t.id === selectedTune)?.powerGain}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Additional Parts */}
            {searchResult.additionalParts && (
              <div className="bg-gray-900 border border-gray-700 rounded-lg shadow-lg p-6 sm:p-8">
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6">Additional Performance Parts</h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  {searchResult.additionalParts.map((part: AdditionalPart) => (
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

        {/* BMW Tuning Wizard Modal */}
        {showBmwWizard && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 border border-gray-700 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-white">🚗 BMW Tuning Wizard</h3>
                  <button
                    onClick={() => {
                      setShowBmwWizard(false);
                      setSelectedModel("");
                      setSelectedYear("");
                      setSelectedStage("");
                      setBmwTuningOptions([]);
                    }}
                    className="text-gray-400 hover:text-white text-2xl"
                  >
                    ×
                  </button>
                </div>

                {/* Step-by-Step Wizard */}
                <div className="space-y-6">
                  {/* Step 1: Model Selection */}
                  <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                    <h4 className="text-lg font-semibold text-white mb-3">Step 1: Select Your BMW Model</h4>
                    <select
                      value={selectedModel}
                      onChange={(e) => {
                        setSelectedModel(e.target.value);
                        setSelectedYear("");
                        setSelectedStage("");
                        setBmwTuningOptions([]);
                      }}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                    >
                      <option value="">Choose your BMW model...</option>
                      {bmwModels.map((model) => (
                        <option key={model.name} value={model.name}>
                          {model.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Step 2: Year Selection */}
                  {selectedModel && (
                    <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                      <h4 className="text-lg font-semibold text-white mb-3">Step 2: Select Year</h4>
                      <select
                        value={selectedYear}
                        onChange={(e) => {
                          setSelectedYear(e.target.value);
                          setSelectedStage("");
                          setBmwTuningOptions([]);
                        }}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                      >
                        <option value="">Choose year...</option>
                        {bmwModels.find(m => m.name === selectedModel)?.years.map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Step 3: Tuning Stage Selection */}
                  {selectedModel && selectedYear && (
                    <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                      <h4 className="text-lg font-semibold text-white mb-3">Step 3: Select Tuning Stage</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <button
                          onClick={() => {
                            setSelectedStage("stage1");
                            setBmwTuningOptions(getBmwTuningOptions(selectedModel, selectedYear, "stage1"));
                          }}
                          className={`p-4 border rounded-lg text-left transition-colors ${
                            selectedStage === "stage1"
                              ? "border-purple-500 bg-purple-900"
                              : "border-gray-600 bg-gray-700 hover:bg-gray-600"
                          }`}
                        >
                          <h5 className="font-semibold text-white mb-2">Stage 1 Tuning</h5>
                          <p className="text-sm text-gray-300 mb-2">Software-only upgrade</p>
                          <ul className="text-xs text-gray-400 space-y-1">
                            <li>• ECU remapping</li>
                            <li>• Power increase: +15-25%</li>
                            <li>• Torque increase: +20-30%</li>
                            <li>• No hardware changes</li>
                            <li>• Maintains reliability</li>
                          </ul>
                        </button>

                        <button
                          onClick={() => {
                            setSelectedStage("stage2");
                            setBmwTuningOptions(getBmwTuningOptions(selectedModel, selectedYear, "stage2"));
                          }}
                          className={`p-4 border rounded-lg text-left transition-colors ${
                            selectedStage === "stage2"
                              ? "border-purple-500 bg-purple-900"
                              : "border-gray-600 bg-gray-700 hover:bg-gray-600"
                          }`}
                        >
                          <h5 className="font-semibold text-white mb-2">Stage 2 Tuning</h5>
                          <p className="text-sm text-gray-300 mb-2">Software + Hardware upgrade</p>
                          <ul className="text-xs text-gray-400 space-y-1">
                            <li>• ECU remapping</li>
                            <li>• Performance downpipes</li>
                            <li>• High-flow air intake</li>
                            <li>• Power increase: +25-35%</li>
                            <li>• Maximum performance gain</li>
                          </ul>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 4: Tuning Options */}
                  {selectedModel && selectedYear && selectedStage && bmwTuningOptions.length > 0 && (
                    <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                      <h4 className="text-lg font-semibold text-white mb-3">
                        Step 4: Tuning Options for {selectedModel} ({selectedYear})
                      </h4>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {bmwTuningOptions.map((option) => (
                          <div key={option.id} className="border border-gray-600 bg-gray-700 rounded-lg p-4">
                            <h5 className="font-semibold text-white mb-2">{option.name}</h5>
                            <p className="text-sm text-gray-300 mb-3">{option.description}</p>
                            
                            <div className="grid grid-cols-2 gap-3 mb-3">
                              <div className="text-center p-2 bg-green-900 rounded">
                                <p className="text-xs text-green-300">Power Gain</p>
                                <p className="text-sm font-bold text-green-300">{option.powerGain}</p>
                              </div>
                              <div className="text-center p-2 bg-blue-900 rounded">
                                <p className="text-xs text-blue-300">Torque Gain</p>
                                <p className="text-sm font-bold text-blue-300">{option.torqueGain}</p>
                              </div>
                            </div>

                            <div className="space-y-2 mb-4">
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Duration:</span>
                                <span className="text-white">{option.duration}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Warranty:</span>
                                <span className="text-white">{option.warranty}</span>
                              </div>
                            </div>

                            <div className="text-center">
                              <p className="text-xl font-bold text-purple-400 mb-2">€{option.price}</p>
                              <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors">
                                Select This Option
                              </button>
                            </div>

                            <div className="mt-3">
                              <p className="text-xs text-gray-400 mb-2">Features:</p>
                              <ul className="text-xs text-gray-300 space-y-1">
                                {option.features.map((feature, index) => (
                                  <li key={index}>• {feature}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Summary */}
                  {selectedModel && selectedYear && selectedStage && (
                    <div className="bg-purple-900 border border-purple-700 rounded-lg p-4">
                      <h4 className="text-lg font-semibold text-white mb-3">📋 Your Selection Summary</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                        <div>
                          <p className="text-sm text-purple-300">Model</p>
                          <p className="text-white font-medium">{selectedModel}</p>
                        </div>
                        <div>
                          <p className="text-sm text-purple-300">Year</p>
                          <p className="text-white font-medium">{selectedYear}</p>
                        </div>
                        <div>
                          <p className="text-sm text-purple-300">Stage</p>
                          <p className="text-white font-medium">{selectedStage === "stage1" ? "Stage 1" : "Stage 2"}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 