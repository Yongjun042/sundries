var save = document.querySelector('#btn-save');
  
save.addEventListener('click', (w) => {
    // Resolves to a Promise<Object>  
    var title = document.querySelector('#title');
    var subtitle = document.querySelector('#subtitle');
    var start = document.querySelector('#start-minute');
    var titleval=title.value;
    if(titleval ===""){
        titleval = "Untitled";
    }
    console.log(titleval)
    window.api.send("createAss",{title:titleval,text:subtitle.value,minute:start.value})
    window.api.receive("createAssResult", (data) => {
        console.log(data);
    });
});
