"use client";
import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [amount, setAmount] = useState("");
  const [term, setTerm] = useState("");
  const [rate, setRate] = useState("");
  const [type, setType] = useState("");
  const [result, setResult] = useState(null);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!amount) newErrors.amount = "This field is required";
    if (!term) newErrors.term = "This field is required";
    if (!rate) newErrors.rate = "This field is required";
    if (!type) newErrors.type = "This field is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    const principal = parseFloat(amount);
    const annualRate = parseFloat(rate) / 100;
    const months = parseFloat(term) * 12;

    if (type === "repayment") {
      const monthlyRate = annualRate / 12;
      const repayment =
        (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1);
      
      setResult(repayment.toFixed(2));
    } else if (type === "interest") {
      const interestOnly = (principal * annualRate) / 12;
      setResult(interestOnly.toFixed(2));
    }
  };

  const clearAll = () => {
    setAmount("");
    setTerm("");
    setRate("");
    setType("");
    setResult(null);
    setErrors({});
  };

  
  const handleChange = (field, value) => {
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    if (field === "amount") setAmount(value);
    if (field === "term") setTerm(value);
    if (field === "rate") setRate(value);
  };

  const handleTypeChange = (value) => {
    setType(value);
    if (errors.type) {
      setErrors((prev) => ({ ...prev, type: undefined }));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen font-heading bg-white lg:bg-sky-100">
      <div className="max-w-4xl lg:border-2 border-black lg:rounded-lg flex flex-col lg:flex-row bg-white overflow-hidden">
        
        <div className="lg:w-1/2 p-8">
          <div className="flex justify-between">
            <h1 className="font-bold text-xl">Mortgage Calculator</h1>
            <button
              type="button"
              onClick={clearAll}
              className="underline text-gray-600 hover:text-black cursor-pointer"
            >
              Clear All
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
            
            <div>
              <label>Mortgage Amount</label>
              <div
                className={`group flex w-full border rounded-md transition-colors overflow-hidden
                  ${
                    errors.amount
                      ? "border-red-500"
                      : "border-black focus-within:border-yellow-400"
                  }`}
              >
                <span
                  className={`min-w-10 text-center px-2 py-1 flex items-center justify-center transition-colors
                    ${
                      errors.amount
                        ? "bg-red-500 text-white"
                        : "bg-blue-100 group-focus-within:bg-yellow-300"
                    }`}
                >
                  £
                </span>
                <input
                  type="text"
                  id="amount"
                  value={amount}
                  onChange={(e) => handleChange("amount", e.target.value)}
                  autoComplete="off"
                  className="w-full px-2 py-1 focus:outline-none bg-transparent"
                  onFocus={() => setErrors({})}
                />
              </div>
              {errors.amount && (
                <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
              )}
            </div>

            
            <div className="flex flex-col lg:flex-row justify-between">
              
              <div className="flex flex-col lg:w-[48%]">
                <label>Mortgage Term</label>
                <div
                  className={`group flex w-full border rounded-md transition-colors overflow-hidden
                    ${
                      errors.term
                        ? "border-red-500"
                        : "border-black focus-within:border-yellow-400"
                    }`}
                >
                  <input
                    type="text"
                    id="term"
                    value={term}
                    onChange={(e) => handleChange("term", e.target.value)}
                    autoComplete="off"
                    className="w-full px-2 py-1 focus:outline-none bg-transparent"
                    onFocus={() => setErrors({})}
                  />
                  <span
                    className={`min-w-15 text-center px-2 py-1 flex items-center justify-center transition-colors
                      ${
                        errors.term
                          ? "bg-red-500 text-white"
                          : "bg-blue-100 group-focus-within:bg-yellow-300"
                      }`}
                  >
                    years
                  </span>
                </div>
                {errors.term && (
                  <p className="text-red-500 text-sm mt-1">{errors.term}</p>
                )}
              </div>

              
              <div className="flex flex-col lg:w-[48%]">
                <label>Interest Rate</label>
                <div
                  className={`group flex w-full border rounded-md transition-colors overflow-hidden
                    ${
                      errors.rate
                        ? "border-red-500"
                        : "border-black focus-within:border-yellow-400"
                    }`}
                >
                  <input
                    type="text"
                    id="rate"
                    value={rate}
                    onChange={(e) => handleChange("rate", e.target.value)}
                    autoComplete="off"
                    className="w-full px-2 py-1 focus:outline-none bg-transparent"
                    onFocus={() => setErrors({})}
                  />
                  <span
                    className={`min-w-10 text-center px-2 py-1 flex items-center justify-center transition-colors
                      ${
                        errors.rate
                          ? "bg-red-500 text-white"
                          : "bg-blue-100 group-focus-within:bg-yellow-300"
                      }`}
                  >
                    %
                  </span>
                </div>
                {errors.rate && (
                  <p className="text-red-500 text-sm mt-1">{errors.rate}</p>
                )}
              </div>
            </div>

           
            <div>
              <label>Mortgage Type</label>
              <div className="flex flex-col gap-2 mt-1">
                {["repayment", "interest"].map((val) => (
                  <label
                    key={val}
                    className={`border rounded-md px-3 py-2 flex items-center gap-2 cursor-pointer transition-colors
                      ${
                        type === val
                          ? "border-yellow-500 bg-yellow-200"
                          : errors.type
                          ? "border-red-500"
                          : "border-black"
                      }`}
                  >
                    <input
                      type="radio"
                      name="type"
                      value={val}
                      checked={type === val}
                      onChange={() => handleTypeChange(val)}
                      className="accent-yellow-600"
                      onFocus={() => setErrors({})}
                      
                    />
                    {val === "repayment" ? "Repayment" : "Interest Only"}
                  </label>
                ))}
              </div>
              {errors.type && (
                <p className="text-red-500 text-sm mt-1">{errors.type}</p>
              )}
            </div>

            
            <button
              type="submit"
              className="bg-yellow-300 mt-4 py-2 font-bold rounded-md flex items-center justify-center gap-2 hover:bg-yellow-400 transition cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Image
                  src="/icon-calculator.svg"
                  alt="Calculator Icon"
                  width={24}
                  height={24}
                />
              
                <p>Calculate Repayments</p>
              </div>
            </button>
          </form>
        </div>

        
        <div className="lg:w-1/2 bg-sky-900 lg:rounded-bl-[100px] flex flex-col justify-center items-center text-white p-10">
          {result ? (
            <>
              <h2 className="text-xl font-bold mb-2">Your Result</h2>
              <p className="">Your results are shown below based on the information you provided. To adjust the results, edit the form and click “calculate repayments” again.</p>
              <div className="bg-blue-950 border-t-2 border-amber-300 min-w-1/2 p-6 rounded-lg">
                <p> Your Monthly Repayment </p>
                <span className="text-4xl font-bold text-amber-300">{result}</span>
                <hr className="border-0.5 border-amber-300/20 my-2" />
                <p>Total {`you'll`} repay over the term </p>
                <span className="text-2xl font-bold text-amber-300">£{(parseFloat(result) * parseFloat(term) * 12).toFixed(2)}</span>

              </div>
            </>
          ) : (
            <>
              <Image
                src="/illustration-empty.svg"
                alt="Illustration Empty"
                width={150}
                height={150}
              />
              <h1 className="text-xl mt-4 font-bold">Results shown here</h1>
              <p className="p-8 text-center text-sm text-sky-200">
                Complete the form and click{` "Calculate repayments" `}to see whata
                your monthly repayment would be.
              </p>

            </>
          )}
        </div>
      </div>
    </div>
  );
}
