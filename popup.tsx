import { useState, useEffect } from "react";

function IndexPopup() {
  const [currentUrl, setCurrentUrl] = useState<string>();

  const getCurrentUrl = async (): Promise<void> => {
    let tab = chrome.tabs.query(
      {
        active: true,
        currentWindow: true,
      },
      function (tabs) {
        const tab = tabs[0];
        if (tab.url) {
          debugger;
          setCurrentUrl(tab.url);
        }
      },
    )
  };

  useEffect(() => {
    getCurrentUrl();
  }, []);

  return (
    <div
      style={{
        padding: 16,
      }}
    >
      <input type="text" />
      <h2>This site is {currentUrl}</h2>
    </div>
  );
}

export default IndexPopup;