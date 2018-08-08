// PROPERTIES OF DATA SET
// json_data (Json objects pulled from Django)
var feature_categories = findDistinctFeatures(json_data);

function findDistinctFeatures(){
    var featureCategories = Object.keys(json_data[0].fields);
    featureCategories.splice(0, 1);
    return featureCategories;
}

function findTicks(featureCategories){
	var ticks = [];
	for (i = 1; i < featureCategories.length + 1; i++) {
		ticks.push(i);
	}
	return ticks;
}

function getFormattedScatterPlotData(){
    var scatterPlotData = [];
    var confidenceLevel = getConfidenceLevel();
    for ( i = 0; i < json_data.length; i++ ){
        for ( x = 0; x < feature_categories.length; x++ ){ 
            var confidence = parseFloat(json_data[i]['fields'][feature_categories[x]]);
            var feature = feature_categories[x];
            if( confidence > confidenceLevel){ // check if feature_value, add sparsity check here
                var scatterPlotPoint = [
                    feature,
                    feature_categories.indexOf(feature) + 1,
                    parseFloat(json_data[i].fields.ctr), //ctr
                    json_data[i].pk, // image name
                    confidence
                ];
                scatterPlotData.push(scatterPlotPoint);
            }
        }
    }
    //console.log(getAvgCTRData());
    return scatterPlotData;
}

function getfeatureDetails(){
    var featureDetails = [];
    var confidenceLevel = getConfidenceLevel();
    for( i = 0; i < feature_categories.length; i++ ){
        var feature = {
            feature: feature_categories[i],
            totalCTR: 0,
            countCTR: 0,
            countTotal: 0,
        };
        featureDetails.push(feature);
    }
    for( i = 0; i < json_data.length; i++ ){
        for ( x = 0; x < feature_categories.length; x++ ){
            var confidence = parseFloat(json_data[i]['fields'][feature_categories[x]]);
            if( confidence > 0 ) featureDetails[x].countTotal++;

            if( confidence > confidenceLevel ){
                featureDetails[x].countCTR++;
                featureDetails[x].totalCTR += parseFloat(json_data[i].fields.ctr);
            }
        }
    
    }
    return featureDetails;  
}

function getAvgCTRData(){
    var featureDetails = getfeatureDetails();
    var avgCTR = [];
    for(i = 0; i < featureDetails.length; i++){
        if( !isNaN(featureDetails[i].totalCTR/featureDetails[i].countCTR)){
            var feature = [ 
                featureDetails[i].feature, 
                (featureDetails[i].totalCTR/featureDetails[i].countCTR)
            ];
            avgCTR.push(feature);
        }
    }
    return avgCTR;
}

function getConfidenceLevel(){
    var confidenceLevel = parseFloat(document.getElementById('confidenceLevelInput').value);
    if( isNaN(confidenceLevel) ){
        return 0;
    }else{
        return confidenceLevel;
    }
}

//Average CTR for images that have this feature
var avg_ctr_1 = getAvgCTRData();

//Average CTR for images that don't have this feature
var avg_ctr_0 = [
    ['black_x', 0.009514896147551327],
    ['text', 0.010743236700575833],
    ['girl', 0.010025179922657277],
    ['headwear', 0.0095229173435875],
    ['poster', 0.010107272365394973],
    ['fun', 0.009395970958399183]
];

//Impact of not having feature
var diff_avg = [
    ['black_x', 0.0024923482736657846],
    ['text', -0.003037776292830454],
    ['girl', -0.0014542822449961842],
    ['headwear', 0.0016415493361958185],
    ['poster', -0.0018577469758141642],
    ['fun', 0.0017108306020637235]
];



