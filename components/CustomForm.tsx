// components/ColorForm.js
import { useState } from "react";

const CustomForm = () => {
  const [formData, setFormData] = useState({
    mainBg: "",
    mainText: "",
    secondaryBg: "",
    titleText: "",
    hoverOne: "",
    hoverTwo: "",
  });
  const [rpc, setRpc] = useState("");
  const [file, setFile] = useState(null);

  const handleChangeRPC = (e) => {
    setRpc(e.target.value);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send data to the server
    const response = await fetch("/api/update-colors", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      // Handle successful response
      alert("Colors updated successfully!");
    } else {
      // Handle error
      alert("Error updating colors.");
    }
  };
  const handleSubmitRPC = async (e) => {
    e.preventDefault();

    // Send data to the server
    const response = await fetch("/api/update-rpc", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ rpc }),
    });

    if (response.ok) {
      // Handle successful response
      alert("RPC URL updated successfully!");
    } else {
      // Handle error
      alert("Error updating RPC URL.");
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    console.log("Selected file:", selectedFile);
    setFile(selectedFile);
  };

  const handleSubmitFile = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (!file) {
      console.log("No file selected");
      return;
    }
    formData.append("file", file);
    console.log("FormData contents:", formData.get("file"));

    const response = await fetch("/api/update-logo", {
      method: "POST",
      body: formData,
    });
    console.log("Response status:", response.status);

    if (response.ok) {
      alert("Logo updated successfully!");
    } else {
      alert("Error updating logo.");
    }
  };

  const [activeTab, setActiveTab] = useState("colors");

  return (
    <div className="flex">
      <div className="w-1/5 py-8 px-2  font-semibold">
        <button
          onClick={() => setActiveTab("colors")}
          className={`flex w-full py-4 px-4 mb-4  rounded-lg justify-between ${
            activeTab === "colors"
              ? "text-hover-two  bg-hover-one "
              : "text-main-text bg-secondary-bg"
          }`}
        >
          <p> Change Theme Colors</p>
          <p>&gt;</p>
        </button>
        <button
          onClick={() => setActiveTab("logo")}
          className={`flex w-full py-4 px-4 mb-4  rounded-lg justify-between ${
            activeTab === "logo"
              ? "text-hover-two  bg-hover-one "
              : "text-main-text bg-secondary-bg"
          }`}
        >
          <p> Change Logo</p>
          <p>&gt;</p>
        </button>
        <button
          onClick={() => setActiveTab("rpc")}
          className={`flex w-full py-4 px-4 mb-4  rounded-lg justify-between ${
            activeTab === "rpc"
              ? "text-hover-two  bg-hover-one "
              : "text-main-text bg-secondary-bg"
          }`}
        >
          <p> Configure RPC</p>
          <p>&gt;</p>
        </button>
      </div>
      <div className="w-4/5 p-8">
        {activeTab === "colors" && (
          <div>
            <h1 className="leading-7 font-bold text-3xl mb-2">
              1. Change Theme Colors
            </h1>
            <p className="mb-6 text-hover-two">
              Please Provide Hex Codes eg: #ffffff
            </p>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 text-md"
            >
              <div className="flex items-center">
                <label className="w-1/3">Main Background Color:</label>
                <input
                  type="text"
                  name="mainBg"
                  value={formData.mainBg}
                  onChange={handleChange}
                  className="bg-secondary-bg rounded-lg px-4 py-3 ml-4 outline-none flex-1"
                  placeholder="#1e1924"
                />
              </div>
              <div className="flex items-center">
                <label className="w-1/3">Main Text Color:</label>
                <input
                  type="text"
                  name="mainText"
                  value={formData.mainText}
                  onChange={handleChange}
                  className="bg-secondary-bg rounded-lg px-4 py-3 ml-4 outline-none flex-1"
                  placeholder="#b2aacd"
                />
              </div>
              <div className="flex items-center">
                <label className="w-1/3">Secondary Background Color:</label>
                <input
                  type="text"
                  name="secondaryBg"
                  value={formData.secondaryBg}
                  onChange={handleChange}
                  className="bg-secondary-bg rounded-lg px-4 py-3 ml-4 outline-none flex-1"
                  placeholder="#483c58"
                />
              </div>
              <div className="flex items-center">
                <label className="w-1/3">Title Text Color:</label>
                <input
                  type="text"
                  name="titleText"
                  value={formData.titleText}
                  onChange={handleChange}
                  className="bg-secondary-bg rounded-lg px-4 py-3 ml-4 outline-none flex-1"
                  placeholder="#a78bfa"
                />
              </div>
              <div className="flex items-center">
                <label className="w-1/3">Hover One Color:</label>
                <input
                  type="text"
                  name="hoverOne"
                  value={formData.hoverOne}
                  onChange={handleChange}
                  className="bg-secondary-bg rounded-lg px-4 py-3 ml-4 outline-none flex-1"
                  placeholder="#5a4c6b"
                />
              </div>
              <div className="flex items-center">
                <label className="w-1/3">Hover Two Color:</label>
                <input
                  type="text"
                  name="hoverTwo"
                  value={formData.hoverTwo}
                  onChange={handleChange}
                  className="bg-secondary-bg rounded-lg px-4 py-3 ml-4 outline-none flex-1"
                  placeholder="#ab82ae"
                />
              </div>
              <button
                type="submit"
                className="bg-title-text w-1/5 p-3 rounded-lg mt-4 text-white font-bold"
              >
                Update Colors
              </button>
            </form>
          </div>
        )}
        {activeTab === "logo" && (
          <div>
            <h1 className="leading-7 font-bold text-3xl mb-4 ">
              2. Change Logo
            </h1>
            <form
              onSubmit={handleSubmitFile}
              className="flex flex-col gap-4 text-md"
            >
              <label className="flex items-center">
                Logo Png file:
                <div className="relative ml-4 flex-1">
                  <input
                    type="file"
                    accept="image/png"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="bg-secondary-bg text-main-text rounded-lg px-4 py-3 cursor-pointer inline-block w-full overflow-hidden text-ellipsis whitespace-nowrap"
                  >
                    {file ? file.name : "Choose file"}
                  </label>
                </div>
              </label>
              <button
                type="submit"
                className="bg-title-text w-1/2 p-3 rounded-lg mt-4 text-white font-bold"
              >
                Update Logo
              </button>
            </form>
          </div>
        )}
        {activeTab === "rpc" && (
          <div>
            <h1 className="leading-7 font-bold text-3xl mb-2">
              3. Change RPC URL
            </h1>
            <p className="mb-6 text-hover-two">
              Please Provide RPC URL to update
            </p>
            <form
              onSubmit={handleSubmitRPC}
              className="flex flex-col gap-4 text-md"
            >
              <label className="flex items-center">
                YOUR RPC URL:
                <input
                  type="text"
                  name="rpcUrl"
                  value={rpc}
                  onChange={handleChangeRPC}
                  className="bg-secondary-bg rounded-lg px-4 py-3 ml-4 outline-none flex-1"
                  placeholder="solana.my-rpc.mainnet.com"
                />
              </label>
              <button
                type="submit"
                className="bg-title-text w-1/2 p-3 rounded-lg mt-4 text-white font-bold"
              >
                Update RPC URL
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomForm;
