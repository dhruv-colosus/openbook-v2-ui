import { useState } from "react";
import CustomForm from "../components/CustomForm";
import ManualCustom from "../components/ManualCustom";

export default function customisation() {
  const [type, setType] = useState("auto");
  return (
    <>
      <div className="p-4 h-screen text-main-text mb-32">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 p-5">
            <h2 className="leading-7 font-bold text-5xl text-title-text mb-4">
              Customize your Application
            </h2>

            <p className="mt-1 text-sm leading-6 text-grey-600 w-[70%] mb-8">
              Customize your application logo, colors, and RPC links from here.
            </p>
            <div className="flex gap-4 mb-4">
              {" "}
              <button
                onClick={() => setType("auto")}
                className={`${
                  type == "auto" ? "bg-hover-one" : "bg-secondary-bg"
                } px-8 py-2 rounded-lg hover:bg-hover-one hover:text-hover-two`}
              >
                Automatic Customisation
              </button>
              <button
                onClick={() => setType("manual")}
                className={`${
                  type == "manual" ? "bg-hover-one" : "bg-secondary-bg"
                } px-8 py-2  rounded-lg hover:bg-hover-one hover:text-hover-two`}
              >
                Manual Customisation
              </button>
            </div>
            <div className={`${type == "manual" ? "block" : "hidden"}`}>
              <ManualCustom />
            </div>
            <div className={`${type == "auto" ? "block" : "hidden"}`}>
              <CustomForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// objective
// 1. logo customisation
// 2. color customisaiton
// 3. RPC customisation
