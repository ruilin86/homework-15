//function to change event
function optionChanged(id) {
    getPlot(id);
    getData(id);    
}

//create function to get the data based on id selection
function getData(id) {
    // read the json file to get metadata
    d3.json("samples.json").then((d) => {
    var metadata = d.metadata;
    console.log(metadata);
    
    var data = metadata.filter(data=> data.id.toString() === id)[0];
    var panel = d3.select("#sample-metadata");
    panel.html("");
    var list = panel.append("ul").style()
    Object.entries(data).forEach(([key, value]) => {
        panel.append("h6").text(`${key}:${value}`);
    });
});
}
// create a function to create bar chart and bubble chart
function getPlot(id) {
    d3.json("samples.json").then(data=> {
        console.log(data);
        var ids=data.samples[0].otu_ids;
        var top_ids=ids.slice(0,10).reverse();
        var otu_id=top_ids.map(d=>"OTU "+d);
        console.log(otu_id);

        var values=data.samples[0].sample_values;
        var top_values=values.slice(0,10).reverse();
        console.log(top_values);

        var labels=data.samples[0].otu_labels;
        var top_labels=labels.slice(0,10).reverse();
        console.log(top_labels);

        var trace1={
            x: top_values,
            y: otu_id,
            text: top_labels,
            type: "bar",
            orientation: "h"
        };
        
        // Create bubble chart
        var trace1=[trace1];
        var layout1={
            title: "Top 10 OTU Sample Values",
            yaxis:{title: "OTU ID"}
        };
        Plotly.newPlot("bar",trace1,layout1);

        var trace2={
            x:ids,
            y:values,
            mode:"markers",
            marker:{
                size:values,
                color:ids
            },
            text:labels,
            
        };

        var trace2=[trace2];
        var layout2={
            xaxis: {title: "OUT ID"},
             
        }
        Plotly.newPlot("bubble",trace2,layout2)
    })

}






// function for initial data rendering
function init() {

    var dropdown =d3.select("#selDataset");
    d3.json("samples.json").then(data=>{
    console.log(data);
    data.names.forEach(name=>dropdown.append("option").text(name).property("value"));
    getPlot(data.names[0]);
    getData(data.names[0]);
    });
}

init();

