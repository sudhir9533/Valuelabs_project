import React, { useState } from "react";

const MODELS = {
  ford: {
    Ranger: ["Raptor", "RaptorX", "Wildtrak"],
    Falcon: ["XR6", "XR6 Turbo", "XR8"],
    "Falcon Ute": ["XR6", "XR6 Turbo"]
  },
  bmw: {
    "130d": ["Drive 26d", "xDrive 30d"],
    "240i": ["xDrive 30d", "xDrive 50d"],
    "320e": ["Drive 75d", "xDrive 80d", "xDrive 85d"]
  },
  tesla: {
    "Model 3": ["Performance", "Long Range", "Dual Motor"]
  }
};

function App() {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [badge, setBadge] = useState("");
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState(null);

  const handleMakeChange = (e) => {
    const newMake = e.target.value;
    setMake(newMake);
    setModel("");
    setBadge("");
  };

  const handleModelChange = (e) => {
    const newModel = e.target.value;
    setModel(newModel);
    setBadge("");
  };

  const quickTesla = () => {
    setMake("tesla");
    setModel("Model 3");
    setBadge("Performance");
  };

  const quickFord = () => {
    setMake("ford");
    setModel("Ranger");
    setBadge("Raptor");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("make", make);
    formData.append("model", model);
    formData.append("badge", badge);
    formData.append("logbook", file);

    const res = await fetch("http://localhost:5000/submit", {
      method: "POST",
      body: formData
    });

    const data = await res.json();
    setResponse(data);
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Vehicle Logbook Upload</h2>

      <button onClick={quickTesla}>
        Quick: Tesla Model 3 Performance
      </button>

      <button onClick={quickFord} style={{ marginLeft: "10px" }}>
        Quick: Ford Ranger Raptor
      </button>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Make:</label>
          <select value={make} onChange={handleMakeChange} required>
            <option value="">Select Make</option>
            <option value="ford">Ford</option>
            <option value="bmw">BMW</option>
            <option value="tesla">Tesla</option>
          </select>
        </div>

        <div>
          <label>Model:</label>
          <select
            value={model}
            onChange={handleModelChange}
            disabled={!make}
            required
          >
            <option value="">Select Model</option>
            {make &&
              Object.keys(MODELS[make]).map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
          </select>
        </div>

        <div>
          <label>Badge:</label>
          <select
            value={badge}
            onChange={(e) => setBadge(e.target.value)}
            disabled={!model}
            required
          >
            <option value="">Select Badge</option>
            {make &&
              model &&
              MODELS[make][model].map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
          </select>
        </div>

        <div>
          <label>Upload Logbook (.txt only):</label>
          <input
            type="file"
            accept=".txt"
            required
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>

        <button type="submit">Submit</button>
      </form>

      {response && (
        <pre style={{ marginTop: "20px" }}>
          {JSON.stringify(response, null, 2)}
        </pre>
      )}
    </div>
  );
}

export default App;