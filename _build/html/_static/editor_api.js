

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

var func = new Function("function test_my_script(msg){console.log(msg);}");
func("Hello");

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

        evaluatePython(windowObj.editor.state.doc.toString(), (out, error) => {
            running = false;
            if (error)
            {
                windowObj.output.innerHTML = "Error: " + o;
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
            testFuncName: testFuncAttr.value
        };
        windowArray.push(data);

        predefinedEl.remove();
    }
}

setPyodideStdout(OnStdout);
exercisesInit();
