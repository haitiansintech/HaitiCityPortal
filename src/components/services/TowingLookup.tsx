"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Car, AlertTriangle } from "lucide-react";

export default function TowingLookup() {
    const [plate, setPlate] = useState("");
    const [result, setResult] = useState<any>(null);
    const [hasSearched, setHasSearched] = useState(false);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setHasSearched(true);
        // Mock result logic for demo purposes
        if (plate.length > 4) {
            setResult({
                status: "IMPOUNDED",
                lot: "Delmas 33 Impound Lot",
                date: "2025-02-14",
                fees: "5,000 HTG",
                phone: "+509 3700-0000"
            });
        } else {
            setResult(null);
        }
    };

    return (
        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
            <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Car className="h-6 w-6 text-brand-blue" />
                Find My Vehicle
            </h3>
            <form onSubmit={handleSearch} className="flex gap-4 mb-6">
                <Input
                    placeholder="Enter License Plate (e.g. AA-12345)"
                    value={plate}
                    onChange={(e) => setPlate(e.target.value.toUpperCase())}
                    className="flex-1 text-lg font-mono uppercase placeholder:font-sans"
                />
                <Button type="submit" size="lg" className="bg-slate-800 hover:bg-slate-700">
                    <Search className="h-4 w-4 mr-2" />
                    Search
                </Button>
            </form>

            {hasSearched && (
                <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                    {result ? (
                        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                            <div className="flex items-start gap-4">
                                <AlertTriangle className="h-6 w-6 text-amber-600 flex-shrink-0" />
                                <div>
                                    <h4 className="font-bold text-amber-900 text-lg mb-2">Vehicle Found</h4>
                                    <div className="grid grid-cols-2 gap-4 text-sm text-amber-800">
                                        <div>
                                            <span className="block opacity-70 uppercase text-xs font-bold">Location</span>
                                            {result.lot}
                                        </div>
                                        <div>
                                            <span className="block opacity-70 uppercase text-xs font-bold">Impound Date</span>
                                            {result.date}
                                        </div>
                                        <div>
                                            <span className="block opacity-70 uppercase text-xs font-bold">Estimated Fees</span>
                                            {result.fees}
                                        </div>
                                        <div>
                                            <span className="block opacity-70 uppercase text-xs font-bold">Contact</span>
                                            {result.phone}
                                        </div>
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-amber-200/50">
                                        <p className="text-xs text-amber-700">
                                            Please bring your registration, ID, and fee payment (Cash or MonCash) to the lot address to retrieve your vehicle.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center p-6 bg-slate-50 rounded-xl border border-slate-100">
                            <p className="text-slate-600 font-medium">No record found for plate "{plate}".</p>
                            <p className="text-sm text-slate-500 mt-1">If your car was towed recently, please allow 2-4 hours for it to appear in the system.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
