
// let interruptBuffer = new Uint8Array(new SharedArrayBuffer(1));


async function initPyodide() {
    let pyodide = await loadPyodide();
    // interruptBuffer[0] = 0;
    // pyodide.setInterruptBuffer(interruptBuffer);
    
    //Load micropip package manager
    //await pyodide.loadPackage("micropip");
    await pyodide.loadPackage(pythonPackages);
    return pyodide;
}

let pyodideReadyPromise = initPyodide();

async function setPyodideStdout(cb)
{
    let pyodide = await pyodideReadyPromise;
    pyodide.setStdout({batched: cb});
}

async function installPythonPackages(packageNames)
{
    let pyodide = await pyodideReadyPromise;
    const micropip = pyodide.pyimport("micropip");
    for(pn of packageNames)
    {
        micropip.install(pn);
    }
}

async function evaluatePython(codeString, cb) {
    let pyodide = await pyodideReadyPromise;
    try {
        let userOutput = pyodide.runPython(codeString);
        cb(userOutput, false);

    } catch (err) {
        cb(err, true);
    }
}
