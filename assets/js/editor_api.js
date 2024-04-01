

/*
TODO:
use workers
*/


let testFunctions = new Map();
let windowArray = new Array();
var running = false;
var currentEditorId = 0;

function OnStdout(msg)
{
    console.log("stdout: " + msg);

    let windowObj = windowArray[currentEditorId];
    //windowObj.output.innerHTML = msg;
    windowObj.stdoutHasResult = true;
    if(windowObj.testFuncName != undefined)
    {
        let func = testFunctions.get(windowObj.testFuncName);
        if (func != undefined)
        {
            func(msg, (resultstr) => {
                windowObj.output.innerHTML = resultstr;
            });
            //console.log("test" + func);
        }
    }
    
    //console.log("OnStdout()");
}

function onClickRun(e)
{
    //console.log("OnClick(start)");
    if (!running)
    {
        let windowId = e.currentTarget.getAttribute("exercise-window-id");
        let windowObj = windowArray[windowId];

        //console.log("ID: " + windowId);
        //console.log("Text: " + windowObj.editor.state.doc.toString());

        running = true;
        currentEditorId = windowId;
        windowObj.stdoutHasResult = false;
        windowObj.output.innerHTML = "Wait...<br/>";

        evaluatePython(windowObj.editor.state.doc.toString(), (out, error) => {
            running = false;
            if (error)
            {
                windowObj.output.innerHTML = "Error: " + out;
            }

            if(!windowObj.stdoutHasResult)
            {
                windowObj.output.innerHTML += "Ошибка!";
            }
            //console.log("Callback()");
        });
    }
    else
    {
        alert("Wait until code run.");
        //console.log("Interrupt!");
    }
    //console.log("OnClick(end)");
}

function getWindowArray()
{
    return windowArray;
}

function exercisesInit()
{
    var windowCollection = document.getElementsByClassName("exercise-window");
    console.log(windowCollection);
    for(let wnd of windowCollection)
    {
        let testFuncAttr = wnd.attributes["test-func"];

        var newIdx = windowArray.length;

        let buttonEl = wnd.querySelectorAll(".exercise-window__button")[0];
        let editorWrapperEl = wnd.querySelectorAll(".editor-wrapper")[0];
        let outputEl = wnd.querySelectorAll(".editor-output")[0];

        let predefinedEl = wnd.querySelectorAll(".exercise-window__predefined")[0];
        
        buttonEl.addEventListener("click", onClickRun);
        buttonEl.setAttribute("exercise-window-id", newIdx);

        let data = {
            wrapper: editorWrapperEl,
            editor: undefined,
            output: outputEl,
            predefinedCode: predefinedEl.innerHTML,
            testFuncName: testFuncAttr.value,
            stdoutHasResult: false
        };
        windowArray.push(data);

        predefinedEl.remove();
    }
}

setPyodideStdout(OnStdout);
exercisesInit();
