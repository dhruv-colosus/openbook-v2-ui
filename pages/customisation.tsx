import { useState, useEffect } from "react";
import CustomForm from "../components/CustomForm";
import ManualCustom from "../components/ManualCustom";
import Joyride, { STATUS } from "react-joyride";

export default function customisation() {
  const [runTour, setRunTour] = useState(true);
  const [steps, setSteps] = useState([]);

  useEffect(() => {
    setSteps([
      {
        target: ".automatic-customization",
        content: "Click here to start automatic customization.",
        disableBeacon: true,
      },
      {
        target: ".manual-customization",
        content: "Click here to start Manual customization.",
      },
      {
        target: ".colors-button",
        content: "You can change the colors of your application Here",
      },
      {
        target: ".logo-button",
        content: "You can change the Logo by uploading a png file here",
      },
      {
        target: ".rpc-button",
        content: "You can change the RPC URL of your application Here",
      },
    ]);
  }, []);
  const handleJoyrideCallback = (data) => {
    const { status } = data;
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      setRunTour(false);
    }
  };
  const [type, setType] = useState("auto");
  return (
    <>
      <Joyride
        steps={steps}
        run={runTour}
        continuous={true}
        showSkipButton={true}
        showProgress={true}
        styles={{
          options: {
            arrowColor: "#e3ffeb",
            backgroundColor: "#e3ffeb",
            overlayColor: "rgba(79, 26, 0, 0.4)",
            primaryColor: "#000",
            textColor: "#004a14",
            width: 300,
            zIndex: 1000,
          },
        }}
        callback={handleJoyrideCallback}
      />
      <div className="p-4 h-screen text-main-text mb-32">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 p-5">
            <h2 className="leading-7 font-bold text-5xl text-title-text mb-4">
              Customize your Application
            </h2>

            <p className="mt-1 text-sm leading-6 text-grey-600 w-[70%] mb-8">
              Customize your application logo, colors, and RPC links from here
              (works only from your own VM or localhost). Please delete this
              page after customizing
            </p>
            <div className="flex gap-4 mb-4">
              {" "}
              <button
                id="#automatic-customization"
                onClick={() => setType("auto")}
                className={`${
                  type == "auto" ? "bg-hover-one" : "bg-secondary-bg"
                } px-8 py-2 rounded-lg hover:bg-hover-one hover:text-hover-two automatic-customization`}
              >
                Automatic Customisation
              </button>
              <button
                id="#manual-customization"
                onClick={() => setType("manual")}
                className={`${
                  type == "manual" ? "bg-hover-one" : "bg-secondary-bg"
                } px-8 py-2  rounded-lg hover:bg-hover-one hover:text-hover-two manual-customization`}
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
